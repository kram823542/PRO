

// const Employee = require('../models/Employee');
// const User = require('../models/User');
// const CLF = require('../models/CLF');
// const bcrypt = require('bcryptjs');
// const AuditLog = require('../models/AuditLog');
// const DESIGNATIONS = require('../utils/designations');

// // @desc    Get all designations
// // @route   GET /api/admin/employees/designations
// // @access  Private
// const getDesignations = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       designations: DESIGNATIONS,
//     });
//   } catch (error) {
//     console.error('Get Designations Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Create employee
// // @route   POST /api/admin/employees
// // @access  Private (Super Admin or CLF Admin)
// const createEmployee = async (req, res) => {
//   try {
//     const {
//       name,
//       userId,
//       password,
//       designation,
//       mobile,
//       bankName,
//       bankAccountNumber,
//       branch,
//       ifscCode,
//       clfId,
//       joiningDate,
//     } = req.body;

//     const clf = await CLF.findById(clfId);
//     if (!clf) {
//       return res.status(404).json({
//         success: false,
//         message: 'CLF not found',
//       });
//     }

//     if (clf.status !== 'ACTIVE') {
//       return res.status(400).json({
//         success: false,
//         message: 'CLF is inactive. Cannot add employees.',
//       });
//     }

//     const employeeExists = await Employee.findOne({ userId });
//     if (employeeExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'Employee ID already exists',
//       });
//     }

//     const userExists = await User.findOne({ userId });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'Employee ID already exists in system',
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(password, salt);

//     const employee = await Employee.create({
//       name,
//       userId,
//       passwordHash,
//       designation,
//       mobile,
//       bankName,
//       bankAccountNumber,
//       branch,
//       ifscCode: ifscCode.toUpperCase(),
//       clfId,
//       joiningDate: joiningDate || new Date(),
//     });

//     await User.create({
//       name,
//       userId,
//       passwordHash,
//       role: 'EMPLOYEE',
//       clfId,
//       status: 'ACTIVE',
//     });

//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'EMPLOYEE_CREATE',
//       targetId: employee._id,
//       targetModel: 'Employee',
//       details: { name, userId, designation, clfId },
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Employee created successfully',
//       employee: {
//         id: employee._id,
//         name: employee.name,
//         userId: employee.userId,
//         designation: employee.designation,
//         mobile: employee.mobile,
//         bankName: employee.bankName,
//         bankAccountNumber: employee.bankAccountNumber,
//         branch: employee.branch,
//         ifscCode: employee.ifscCode,
//         clfId: employee.clfId,
//         joiningDate: employee.joiningDate,
//         status: employee.status,
//       },
//     });
//   } catch (error) {
//     console.error('Create Employee Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server error',
//     });
//   }
// };

// // @desc    Get all employees (with filters)
// // @route   GET /api/admin/employees
// // @access  Private
// const getEmployees = async (req, res) => {
//   try {
//     const { clfId, designation, status, search } = req.query;

//     const filter = {};

//     if (clfId) filter.clfId = clfId;
//     if (designation) filter.designation = designation;
//     if (status) filter.status = status;
//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { userId: { $regex: search, $options: 'i' } },
//       ];
//     }

//     if (req.user.role === 'CLF_ADMIN') {
//       filter.clfId = req.user.clfId;
//     }

//     const employees = await Employee.find(filter)
//       .populate('clfId', 'name code')
//       .sort({ name: 1 });

//     res.status(200).json({
//       success: true,
//       count: employees.length,
//       employees,
//     });
//   } catch (error) {
//     console.error('Get Employees Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Get single employee
// // @route   GET /api/admin/employees/:id
// // @access  Private
// const getEmployee = async (req, res) => {
//   try {
//     const employeeId = req.params.id;

//     const employee = await Employee.findById(employeeId).populate('clfId', 'name code');
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: 'Employee not found',
//       });
//     }

//     if (req.user.role === 'CLF_ADMIN' &&
//         employee.clfId._id.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this employee',
//       });
//     }

//     if (req.user.role === 'EMPLOYEE') {
//       const userEmployee = await Employee.findOne({ userId: req.user.userId });
//       if (!userEmployee || userEmployee._id.toString() !== employeeId) {
//         return res.status(403).json({
//           success: false,
//           message: 'You can only access your own data',
//         });
//       }
//     }

//     res.status(200).json({
//       success: true,
//       employee,
//     });
//   } catch (error) {
//     console.error('Get Employee Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Update employee
// // @route   PUT /api/admin/employees/:id
// // @access  Private
// const updateEmployee = async (req, res) => {
//   try {
//     const employeeId = req.params.id;
//     const {
//       name,
//       designation,
//       mobile,
//       bankName,
//       bankAccountNumber,
//       branch,
//       ifscCode,
//       status,
//       joiningDate,
//     } = req.body;

//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: 'Employee not found',
//       });
//     }

//     if (req.user.role === 'CLF_ADMIN' &&
//         employee.clfId.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this employee',
//       });
//     }

//     if (name) employee.name = name;
//     if (designation) employee.designation = designation;
//     if (mobile) employee.mobile = mobile;
//     if (bankName) employee.bankName = bankName;
//     if (bankAccountNumber) employee.bankAccountNumber = bankAccountNumber;
//     if (branch) employee.branch = branch;
//     if (ifscCode) employee.ifscCode = ifscCode.toUpperCase();
//     if (status) employee.status = status;
//     if (joiningDate) employee.joiningDate = joiningDate;

//     await employee.save();

//     await User.findOneAndUpdate(
//       { userId: employee.userId },
//       { name, status }
//     );

//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'EMPLOYEE_UPDATE',
//       targetId: employee._id,
//       targetModel: 'Employee',
//       details: { updates: req.body },
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Employee updated successfully',
//       employee,
//     });
//   } catch (error) {
//     console.error('Update Employee Error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Server error',
//     });
//   }
// };

// // @desc    Delete/Deactivate employee
// // @route   DELETE /api/admin/employees/:id
// // @access  Private
// const deleteEmployee = async (req, res) => {
//   try {
//     const employeeId = req.params.id;

//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: 'Employee not found',
//       });
//     }

//     if (req.user.role === 'CLF_ADMIN' &&
//         employee.clfId.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this employee',
//       });
//     }

//     employee.status = 'INACTIVE';
//     await employee.save();

//     await User.findOneAndUpdate(
//       { userId: employee.userId },
//       { status: 'INACTIVE' }
//     );

//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'EMPLOYEE_DELETE',
//       targetId: employee._id,
//       targetModel: 'Employee',
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Employee deactivated successfully',
//     });
//   } catch (error) {
//     console.error('Delete Employee Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Reset employee password
// // @route   POST /api/admin/employees/:id/reset-password
// // @access  Private
// const resetEmployeePassword = async (req, res) => {
//   try {
//     const employeeId = req.params.id;
//     const { newPassword } = req.body;

//     if (!newPassword || newPassword.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: 'Password must be at least 6 characters',
//       });
//     }

//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: 'Employee not found',
//       });
//     }

//     if (req.user.role === 'CLF_ADMIN' &&
//         employee.clfId.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this employee',
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(newPassword, salt);

//     employee.passwordHash = passwordHash;
//     await employee.save();

//     await User.findOneAndUpdate(
//       { userId: employee.userId },
//       { passwordHash }
//     );

//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'PASSWORD_RESET',
//       targetId: employee._id,
//       targetModel: 'Employee',
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Password reset successfully',
//     });
//   } catch (error) {
//     console.error('Reset Password Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// module.exports = {
//   getDesignations,
//   createEmployee,
//   getEmployees,
//   getEmployee,
//   updateEmployee,
//   deleteEmployee,
//   resetEmployeePassword,
// };

const Employee = require('../models/Employee');
const User = require('../models/User');
const CLF = require('../models/CLF');
const bcrypt = require('bcryptjs');
const AuditLog = require('../models/AuditLog');
const DESIGNATIONS = require('../utils/designations');
const BANKS = require('../utils/banks');

// @desc    Get all designations
// @route   GET /api/admin/employees/designations
// @access  Private
const getDesignations = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      designations: DESIGNATIONS,
    });
  } catch (error) {
    console.error('Get Designations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get all banks
// @route   GET /api/admin/employees/banks
// @access  Private
const getBanks = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      banks: BANKS,
    });
  } catch (error) {
    console.error('Get Banks Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create employee
// @route   POST /api/admin/employees
// @access  Private (Super Admin or CLF Admin)
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      userId,
      password,
      designation,
      mobile,
      bankName,
      bankAccountNumber,
      branch,
      ifscCode,
      clfId,
      joiningDate,
    } = req.body;

    // ✅ Validation — saare fields zaroori hain
    if (
      !name ||
      !userId ||
      !password ||
      !designation ||
      !mobile ||
      !bankName ||
      !bankAccountNumber ||
      !branch ||
      !ifscCode ||
      !clfId
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // ✅ Validate designation
    if (!DESIGNATIONS.includes(designation)) {
      return res.status(400).json({
        success: false,
        message: `${designation} is not a valid designation`,
      });
    }

    // ✅ Validate bank
    if (!BANKS.includes(bankName)) {
      return res.status(400).json({
        success: false,
        message: `${bankName} is not a valid bank`,
      });
    }

    const clf = await CLF.findById(clfId);
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    if (clf.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'CLF is inactive. Cannot add employees.',
      });
    }

    const employeeExists = await Employee.findOne({ userId });
    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID already exists',
      });
    }

    const userExists = await User.findOne({ userId });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID already exists in system',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const employee = await Employee.create({
      name,
      userId,
      passwordHash,
      designation,
      mobile,
      bankName,
      bankAccountNumber,
      branch,
      ifscCode: ifscCode.toUpperCase(),
      clfId,
      joiningDate: joiningDate || new Date(),
    });

    await User.create({
      name,
      userId,
      passwordHash,
      role: 'EMPLOYEE',
      clfId,
      status: 'ACTIVE',
    });

    await AuditLog.create({
      userId: req.user._id,
      action: 'EMPLOYEE_CREATE',
      targetId: employee._id,
      targetModel: 'Employee',
      details: { name, userId, designation, clfId },
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee: {
        id: employee._id,
        name: employee.name,
        userId: employee.userId,
        designation: employee.designation,
        mobile: employee.mobile,
        bankName: employee.bankName,
        bankAccountNumber: employee.bankAccountNumber,
        branch: employee.branch,
        ifscCode: employee.ifscCode,
        clfId: employee.clfId,
        joiningDate: employee.joiningDate,
        status: employee.status,
      },
    });
  } catch (error) {
    console.error('Create Employee Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get all employees (with filters)
// @route   GET /api/admin/employees
// @access  Private
const getEmployees = async (req, res) => {
  try {
    const { clfId, designation, status, search } = req.query;

    const filter = {};

    if (clfId) filter.clfId = clfId;
    if (designation) filter.designation = designation;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { userId: { $regex: search, $options: 'i' } },
      ];
    }

    if (req.user.role === 'CLF_ADMIN') {
      filter.clfId = req.user.clfId;
    }

    const employees = await Employee.find(filter)
      .populate('clfId', 'name code')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error('Get Employees Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single employee
// @route   GET /api/admin/employees/:id
// @access  Private
const getEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId).populate('clfId', 'name code');
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (req.user.role === 'CLF_ADMIN' &&
        employee.clfId._id.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this employee',
      });
    }

    if (req.user.role === 'EMPLOYEE') {
      const userEmployee = await Employee.findOne({ userId: req.user.userId });
      if (!userEmployee || userEmployee._id.toString() !== employeeId) {
        return res.status(403).json({
          success: false,
          message: 'You can only access your own data',
        });
      }
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error('Get Employee Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update employee
// @route   PUT /api/admin/employees/:id
// @access  Private
const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const {
      name,
      designation,
      mobile,
      bankName,
      bankAccountNumber,
      branch,
      ifscCode,
      status,
      joiningDate,
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (req.user.role === 'CLF_ADMIN' &&
        employee.clfId.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this employee',
      });
    }

    // ✅ Validate designation if provided
    if (designation && !DESIGNATIONS.includes(designation)) {
      return res.status(400).json({
        success: false,
        message: `${designation} is not a valid designation`,
      });
    }

    // ✅ Validate bank if provided
    if (bankName && !BANKS.includes(bankName)) {
      return res.status(400).json({
        success: false,
        message: `${bankName} is not a valid bank`,
      });
    }

    if (name) employee.name = name;
    if (designation) employee.designation = designation;
    if (mobile) employee.mobile = mobile;
    if (bankName) employee.bankName = bankName;
    if (bankAccountNumber) employee.bankAccountNumber = bankAccountNumber;
    if (branch) employee.branch = branch;
    if (ifscCode) employee.ifscCode = ifscCode.toUpperCase();
    if (status) employee.status = status;
    if (joiningDate) employee.joiningDate = joiningDate;

    await employee.save();

    await User.findOneAndUpdate(
      { userId: employee.userId },
      { name, status }
    );

    await AuditLog.create({
      userId: req.user._id,
      action: 'EMPLOYEE_UPDATE',
      targetId: employee._id,
      targetModel: 'Employee',
      details: { updates: req.body },
    });

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    console.error('Update Employee Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Delete/Deactivate employee
// @route   DELETE /api/admin/employees/:id
// @access  Private
const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (req.user.role === 'CLF_ADMIN' &&
        employee.clfId.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this employee',
      });
    }

    employee.status = 'INACTIVE';
    await employee.save();

    await User.findOneAndUpdate(
      { userId: employee.userId },
      { status: 'INACTIVE' }
    );

    await AuditLog.create({
      userId: req.user._id,
      action: 'EMPLOYEE_DELETE',
      targetId: employee._id,
      targetModel: 'Employee',
    });

    res.status(200).json({
      success: true,
      message: 'Employee deactivated successfully',
    });
  } catch (error) {
    console.error('Delete Employee Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Reset employee password
// @route   POST /api/admin/employees/:id/reset-password
// @access  Private
const resetEmployeePassword = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (req.user.role === 'CLF_ADMIN' &&
        employee.clfId.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this employee',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    employee.passwordHash = passwordHash;
    await employee.save();

    await User.findOneAndUpdate(
      { userId: employee.userId },
      { passwordHash }
    );

    await AuditLog.create({
      userId: req.user._id,
      action: 'PASSWORD_RESET',
      targetId: employee._id,
      targetModel: 'Employee',
    });

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getDesignations,
  getBanks,
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  resetEmployeePassword,
};