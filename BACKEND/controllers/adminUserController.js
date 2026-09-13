const User = require('../models/User');
const CLF = require('../models/CLF');
const bcrypt = require('bcryptjs');
const { generateUserId } = require('../utils/generateUserId');
const AuditLog = require('../models/AuditLog');

// @desc    Create new admin user (Super Admin only)
// @route   POST /api/admin/users
// @access  Private/Super Admin
const createAdminUser = async (req, res) => {
  try {
    const { name, userId, password, role, clfId } = req.body;

    // Validate role
    if (!['SUPER_ADMIN', 'CLF_ADMIN'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Only SUPER_ADMIN and CLF_ADMIN can be created here',
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ userId });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User ID already exists',
      });
    }

    // Check if CLF exists for CLF_ADMIN
    if (role === 'CLF_ADMIN' && clfId) {
      const clf = await CLF.findById(clfId);
      if (!clf) {
        return res.status(404).json({
          success: false,
          message: 'CLF not found',
        });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      userId,
      passwordHash,
      role,
      clfId: role === 'CLF_ADMIN' ? clfId : undefined,
    });

    // If CLF_ADMIN, update CLF with adminId
    if (role === 'CLF_ADMIN' && clfId) {
      await CLF.findByIdAndUpdate(clfId, { adminId: user._id });
    }

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'USER_CREATE',
      targetId: user._id,
      targetModel: 'User',
      details: { role, clfId },
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: user._id,
        name: user.name,
        userId: user.userId,
        role: user.role,
        clfId: user.clfId,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Create Admin User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all admin users
// @route   GET /api/admin/users
// @access  Private/Super Admin
const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ['SUPER_ADMIN', 'CLF_ADMIN'] },
    }).select('-passwordHash').populate('clfId', 'name code');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Get Admin Users Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update admin user
// @route   PUT /api/admin/users/:id
// @access  Private/Super Admin
const updateAdminUser = async (req, res) => {
  try {
    const { name, status, clfId, password } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role === 'SUPER_ADMIN') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update super admin through this endpoint',
      });
    }

    // Update fields
    if (name) user.name = name;
    if (status) user.status = status;
    
    if (clfId && user.role === 'CLF_ADMIN') {
      const clf = await CLF.findById(clfId);
      if (!clf) {
        return res.status(404).json({
          success: false,
          message: 'CLF not found',
        });
      }
      user.clfId = clfId;
      
      // Update CLF admin
      await CLF.findByIdAndUpdate(clfId, { adminId: user._id });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'USER_UPDATE',
      targetId: user._id,
      targetModel: 'User',
      details: { updates: req.body },
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id,
        name: user.name,
        userId: user.userId,
        role: user.role,
        clfId: user.clfId,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Update Admin User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete/Deactivate admin user
// @route   DELETE /api/admin/users/:id
// @access  Private/Super Admin
const deleteAdminUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (user.role === 'SUPER_ADMIN') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete super admin',
      });
    }

    // If CLF_ADMIN, remove reference from CLF
    if (user.role === 'CLF_ADMIN' && user.clfId) {
      await CLF.findByIdAndUpdate(user.clfId, { adminId: null });
    }

    // Soft delete by deactivating
    user.status = 'INACTIVE';
    await user.save();

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'USER_DEACTIVATE',
      targetId: user._id,
      targetModel: 'User',
      details: { role: user.role },
    });

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
    });
  } catch (error) {
    console.error('Delete Admin User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  createAdminUser,
  getAdminUsers,
  updateAdminUser,
  deleteAdminUser,
};