const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { generateUserId } = require('../utils/generateUserId');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide user ID and password',
      });
    }

    let user = null;
    let role = '';
    let clfId = null;

    // Check if user exists in User model (Admin users)
    user = await User.findOne({ userId });

    if (user) {
      role = user.role;
      clfId = user.clfId;
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          userId: user.userId,
          name: user.name,
          role: user.role,
          clfId: user.clfId,
          status: user.status,
        },
      });
    }

    // Check if user exists in Employee model
    const employee = await Employee.findOne({ userId }).populate('clfId');

    if (employee) {
      role = 'EMPLOYEE';
      clfId = employee.clfId;
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, employee.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Create or get user record for employee
      let userRecord = await User.findOne({ userId: employee.userId });
      if (!userRecord) {
        userRecord = await User.create({
          userId: employee.userId,
          name: employee.name,
          passwordHash: employee.passwordHash,
          role: 'EMPLOYEE',
          clfId: employee.clfId,
          status: employee.status,
        });
      }

      // Update last login
      userRecord.lastLogin = new Date();
      await userRecord.save();

      // Generate token
      const token = generateToken(userRecord);

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: userRecord._id,
          userId: userRecord.userId,
          name: userRecord.name,
          role: userRecord.role,
          clfId: userRecord.clfId,
          status: userRecord.status,
          employeeId: employee._id,
          employeeType: employee.employeeType,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    let response = {
      id: user._id,
      userId: user.userId,
      name: user.name,
      role: user.role,
      clfId: user.clfId,
      status: user.status,
    };

    // If employee, get additional data
    if (user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: user.userId });
      if (employee) {
        response.employeeId = employee._id;
        response.employeeType = employee.employeeType;
        response.designation = employee.designation;
        response.mobile = employee.mobile;
        response.joiningDate = employee.joiningDate;
        response.clfName = employee.clfId ? (await employee.populate('clfId')).clfId.name : null;
      }
    }

    res.status(200).json({
      success: true,
      user: response,
    });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { login, getMe };