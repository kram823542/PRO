const User = require('../models/User');

// Check if user has required role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Check if user has access to specific CLF
const checkCLFAccess = async (req, res, next) => {
  try {
    const clfId = req.params.clfId || req.body.clfId || req.query.clfId;
    
    if (!clfId) {
      return res.status(400).json({
        success: false,
        message: 'CLF ID is required',
      });
    }

    // Super Admin has access to all CLFs
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    // CLF Admin and Employee can only access their own CLF
    if (req.user.clfId && req.user.clfId.toString() === clfId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'You do not have access to this CLF',
    });
  } catch (error) {
    console.error('CLF Access Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking CLF access',
    });
  }
};

// Check if user has access to specific employee
const checkEmployeeAccess = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId || req.body.employeeId;
    
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID is required',
      });
    }

    // Super Admin has access to all employees
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }

    // CLF Admin: Check if employee belongs to their CLF
    if (req.user.role === 'CLF_ADMIN') {
      const Employee = require('../models/Employee');
      const employee = await Employee.findById(employeeId);
      
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }

      if (employee.clfId.toString() === req.user.clfId.toString()) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'You do not have access to this employee',
      });
    }

    // Employee: Only access their own data
    if (req.user.role === 'EMPLOYEE') {
      const Employee = require('../models/Employee');
      const employee = await Employee.findOne({ userId: req.user.userId });
      
      if (employee && employee._id.toString() === employeeId) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'You can only access your own data',
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  } catch (error) {
    console.error('Employee Access Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking employee access',
    });
  }
};

module.exports = { authorize, checkCLFAccess, checkEmployeeAccess };