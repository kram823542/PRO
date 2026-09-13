const CLF = require('../models/CLF');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AuditLog = require('../models/AuditLog');

// @desc    Create new CLF
// @route   POST /api/admin/clfs
// @access  Private/Super Admin
const createCLF = async (req, res) => {
  try {
    const { name, code, block, district, adminName, adminUserId, adminPassword } = req.body;

    // Check if CLF code exists
    const clfExists = await CLF.findOne({ code });
    if (clfExists) {
      return res.status(400).json({
        success: false,
        message: 'CLF code already exists',
      });
    }

    // Check if admin user ID exists
    if (adminUserId) {
      const userExists = await User.findOne({ userId: adminUserId });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'Admin user ID already exists',
        });
      }
    }

    // Create CLF
    const clf = await CLF.create({
      name,
      code: code.toUpperCase(),
      block,
      district: district || 'Palamu',
    });

    // Create CLF Admin user
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const adminUser = await User.create({
      name: adminName,
      userId: adminUserId,
      passwordHash,
      role: 'CLF_ADMIN',
      clfId: clf._id,
    });

    // Update CLF with adminId
    clf.adminId = adminUser._id;
    await clf.save();

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'CLF_CREATE',
      targetId: clf._id,
      targetModel: 'CLF',
      details: { name, code },
    });

    res.status(201).json({
      success: true,
      message: 'CLF created successfully',
      clf: {
        id: clf._id,
        name: clf.name,
        code: clf.code,
        block: clf.block,
        district: clf.district,
        admin: {
          id: adminUser._id,
          name: adminUser.name,
          userId: adminUser.userId,
        },
      },
    });
  } catch (error) {
    console.error('Create CLF Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all CLFs
// @route   GET /api/admin/clfs
// @access  Private/Super Admin
const getCLFs = async (req, res) => {
  try {
    const clfs = await CLF.find().populate('adminId', 'name userId').sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: clfs.length,
      clfs,
    });
  } catch (error) {
    console.error('Get CLFs Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single CLF
// @route   GET /api/admin/clfs/:id
// @access  Private
const getCLF = async (req, res) => {
  try {
    const clfId = req.params.id;

    // Check access
    if (req.user.role === 'CLF_ADMIN' && req.user.clfId.toString() !== clfId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this CLF',
      });
    }

    const clf = await CLF.findById(clfId).populate('adminId', 'name userId');
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    res.status(200).json({
      success: true,
      clf,
    });
  } catch (error) {
    console.error('Get CLF Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update CLF
// @route   PUT /api/admin/clfs/:id
// @access  Private/Super Admin
const updateCLF = async (req, res) => {
  try {
    const clfId = req.params.id;
    const { name, block, status } = req.body;

    const clf = await CLF.findById(clfId);
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    // Update fields
    if (name) clf.name = name;
    if (block) clf.block = block;
    if (status) clf.status = status;

    await clf.save();

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'CLF_UPDATE',
      targetId: clf._id,
      targetModel: 'CLF',
      details: { updates: req.body },
    });

    res.status(200).json({
      success: true,
      message: 'CLF updated successfully',
      clf,
    });
  } catch (error) {
    console.error('Update CLF Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete/Deactivate CLF
// @route   DELETE /api/admin/clfs/:id
// @access  Private/Super Admin
const deleteCLF = async (req, res) => {
  try {
    const clfId = req.params.id;

    const clf = await CLF.findById(clfId);
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    // Deactivate CLF
    clf.status = 'INACTIVE';
    await clf.save();

    // Deactivate CLF Admin
    if (clf.adminId) {
      await User.findByIdAndUpdate(clf.adminId, { status: 'INACTIVE' });
    }

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'CLF_DELETE',
      targetId: clf._id,
      targetModel: 'CLF',
    });

    res.status(200).json({
      success: true,
      message: 'CLF deactivated successfully',
    });
  } catch (error) {
    console.error('Delete CLF Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  createCLF,
  getCLFs,
  getCLF,
  updateCLF,
  deleteCLF,
};