// const WorkSubmission = require('../models/WorkSubmission');
// const Employee = require('../models/Employee');
// const Attendance = require('../models/Attendance');
// const User = require('../models/User');
// const AuditLog = require('../models/AuditLog');
// const cloudinaryService = require('../services/cloudinaryService');
// const attendanceService = require('../services/attendanceService');

// // @desc    Submit work (Employee)
// // @route   POST /api/admin/work/submit
// // @access  Private/Employee
// const submitWork = async (req, res) => {
//   try {
//     const { description, workType, date } = req.body;
    
//     // Get employee details
//     const employee = await Employee.findOne({ userId: req.user.userId });
//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: 'Employee not found',
//       });
//     }

//     if (employee.status !== 'ACTIVE') {
//       return res.status(400).json({
//         success: false,
//         message: 'Employee account is inactive',
//       });
//     }

//     // Check if photo uploaded
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Photo is required',
//       });
//     }

//     // Upload photo to Cloudinary
//     const uploadResult = await cloudinaryService.uploadToCloudinary(
//       req.file.path,
//       `attendance_photos/${employee.clfId}`
//     );







//     //   // TEMPORARY: Accept photoUrl directly from body
//     // const { photoUrl } = req.body;

//     // if (!photoUrl) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: 'Photo URL is required',
//     //   });
//     // }

//     // const uploadResult = { url: photoUrl };









//     // Check if work already submitted for today
//     const workDate = date ? new Date(date) : new Date();
//     const startOfDay = new Date(workDate);
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date(workDate);
//     endOfDay.setHours(23, 59, 59, 999);

//     const existingSubmission = await WorkSubmission.findOne({
//       employeeId: employee._id,
//       date: {
//         $gte: startOfDay,
//         $lt: endOfDay,
//       },
//     });

//     if (existingSubmission) {
//       return res.status(400).json({
//         success: false,
//         message: 'Work already submitted for this date',
//       });
//     }

//     // Create work submission
//     const submission = await WorkSubmission.create({
//       employeeId: employee._id,
//       clfId: employee.clfId,
//       date: workDate,
//       description,
//       photoUrl: uploadResult.url,
//       status: 'PENDING',
//       workType: workType || 'Other',
//     });

//     // Update attendance to PENDING
//     await attendanceService.calculateDailyAttendance(employee._id, workDate);

//     res.status(201).json({
//       success: true,
//       message: 'Work submitted successfully',
//       submission: {
//         id: submission._id,
//         date: submission.date,
//         description: submission.description,
//         photoUrl: submission.photoUrl,
//         status: submission.status,
//         workType: submission.workType,
//       },
//     });
//   } catch (error) {
//     console.error('Submit Work Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Get pending submissions
// // @route   GET /api/admin/work/pending
// // @access  Private (Admin only)
// const getPendingSubmissions = async (req, res) => {
//   try {
//     const { clfId, page = 1, limit = 20 } = req.query;

//     const filter = { status: 'PENDING' };
    
//     if (req.user.role === 'CLF_ADMIN') {
//       filter.clfId = req.user.clfId;
//     } else if (clfId && req.user.role === 'SUPER_ADMIN') {
//       filter.clfId = clfId;
//     }

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const submissions = await WorkSubmission.find(filter)
//       .populate('employeeId', 'name userId employeeType')
//       .populate('clfId', 'name code')
//       .sort({ date: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await WorkSubmission.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / parseInt(limit)),
//       submissions,
//     });
//   } catch (error) {
//     console.error('Get Pending Submissions Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Get work submission by ID
// // @route   GET /api/admin/work/:id
// // @access  Private
// const getSubmission = async (req, res) => {
//   try {
//     const submissionId = req.params.id;

//     const submission = await WorkSubmission.findById(submissionId)
//       .populate('employeeId', 'name userId employeeType mobile')
//       .populate('clfId', 'name code')
//       .populate('approvedBy', 'name userId');

//     if (!submission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Submission not found',
//       });
//     }

//     // Check access
//     if (req.user.role === 'CLF_ADMIN' && 
//         submission.clfId._id.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this submission',
//       });
//     }

//     if (req.user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: req.user.userId });
//       if (!employee || employee._id.toString() !== submission.employeeId._id.toString()) {
//         return res.status(403).json({
//           success: false,
//           message: 'You can only access your own submissions',
//         });
//       }
//     }

//     res.status(200).json({
//       success: true,
//       submission,
//     });
//   } catch (error) {
//     console.error('Get Submission Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Approve work submission
// // @route   PUT /api/admin/work/:id/approve
// // @access  Private (Admin only)
// const approveSubmission = async (req, res) => {
//   try {
//     const submissionId = req.params.id;

//     const submission = await WorkSubmission.findById(submissionId)
//       .populate('employeeId', 'name userId clfId');

//     if (!submission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Submission not found',
//       });
//     }

//     // Check access
//     if (req.user.role === 'CLF_ADMIN' && 
//         submission.clfId.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this submission',
//       });
//     }

//     // Check if already processed
//     if (submission.status !== 'PENDING') {
//       return res.status(400).json({
//         success: false,
//         message: `Submission already ${submission.status.toLowerCase()}`,
//       });
//     }

//     // Update submission
//     submission.status = 'APPROVED';
//     submission.approvedBy = req.user._id;
//     submission.approvedAt = new Date();
//     await submission.save();

//     // Update attendance
//     await attendanceService.calculateDailyAttendance(
//       submission.employeeId._id,
//       submission.date
//     );

//     // Log the action
//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'WORK_APPROVE',
//       targetId: submission._id,
//       targetModel: 'WorkSubmission',
//       details: { employeeName: submission.employeeId.name },
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Work approved successfully',
//       submission: {
//         id: submission._id,
//         status: submission.status,
//         approvedBy: submission.approvedBy,
//         approvedAt: submission.approvedAt,
//       },
//     });
//   } catch (error) {
//     console.error('Approve Submission Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Reject work submission
// // @route   PUT /api/admin/work/:id/reject
// // @access  Private (Admin only)
// const rejectSubmission = async (req, res) => {
//   try {
//     const submissionId = req.params.id;
//     const { rejectionReason } = req.body;

//     if (!rejectionReason || rejectionReason.length < 5) {
//       return res.status(400).json({
//         success: false,
//         message: 'Rejection reason is required (minimum 5 characters)',
//       });
//     }

//     const submission = await WorkSubmission.findById(submissionId)
//       .populate('employeeId', 'name userId clfId');

//     if (!submission) {
//       return res.status(404).json({
//         success: false,
//         message: 'Submission not found',
//       });
//     }

//     // Check access
//     if (req.user.role === 'CLF_ADMIN' && 
//         submission.clfId.toString() !== req.user.clfId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: 'You do not have access to this submission',
//       });
//     }

//     // Check if already processed
//     if (submission.status !== 'PENDING') {
//       return res.status(400).json({
//         success: false,
//         message: `Submission already ${submission.status.toLowerCase()}`,
//       });
//     }

//     // Update submission
//     submission.status = 'REJECTED';
//     submission.rejectionReason = rejectionReason;
//     submission.approvedBy = req.user._id;
//     submission.approvedAt = new Date();
//     await submission.save();

//     // Update attendance
//     await attendanceService.calculateDailyAttendance(
//       submission.employeeId._id,
//       submission.date
//     );

//     // Log the action
//     await AuditLog.create({
//       userId: req.user._id,
//       action: 'WORK_REJECT',
//       targetId: submission._id,
//       targetModel: 'WorkSubmission',
//       details: { 
//         employeeName: submission.employeeId.name,
//         reason: rejectionReason,
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Work rejected successfully',
//       submission: {
//         id: submission._id,
//         status: submission.status,
//         rejectionReason: submission.rejectionReason,
//         approvedBy: submission.approvedBy,
//         approvedAt: submission.approvedAt,
//       },
//     });
//   } catch (error) {
//     console.error('Reject Submission Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// // @desc    Get employee work history
// // @route   GET /api/admin/work/history
// // @access  Private
// const getWorkHistory = async (req, res) => {
//   try {
//     const { page = 1, limit = 30, status } = req.query;
    
//     let filter = {};
    
//     // If employee, only their own submissions
//     if (req.user.role === 'EMPLOYEE') {
//       const employee = await Employee.findOne({ userId: req.user.userId });
//       if (!employee) {
//         return res.status(404).json({
//           success: false,
//           message: 'Employee not found',
//         });
//       }
//       filter.employeeId = employee._id;
//     } else if (req.user.role === 'CLF_ADMIN') {
//       filter.clfId = req.user.clfId;
//     }

//     if (status) filter.status = status;

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const submissions = await WorkSubmission.find(filter)
//       .populate('employeeId', 'name userId employeeType')
//       .populate('clfId', 'name code')
//       .populate('approvedBy', 'name userId')
//       .sort({ date: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const total = await WorkSubmission.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / parseInt(limit)),
//       submissions,
//     });
//   } catch (error) {
//     console.error('Get Work History Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

// module.exports = {
//   submitWork,
//   getPendingSubmissions,
//   getSubmission,
//   approveSubmission,
//   rejectSubmission,
//   getWorkHistory,
// };






const WorkSubmission = require('../models/WorkSubmission');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const cloudinaryService = require('../services/cloudinaryService');
const attendanceService = require('../services/attendanceService');

// @desc    Submit work (Employee)
// @route   POST /api/admin/work/submit
// @access  Private/Employee
const submitWork = async (req, res) => {
  try {
    // ✅ Safety check — req.body undefined ho sakta hai
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message:
          'Invalid request body. Send as multipart/form-data with fields: description, workType, photo',
      });
    }

    const { description, workType, date } = req.body;

    // ✅ Check description
    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Description is required and must be at least 10 characters',
      });
    }

    // ✅ Check photo
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          'Photo is required. Upload using form-data with "photo" field (type: File).',
      });
    }

    // Get employee details
    const employee = await Employee.findOne({ userId: req.user.userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    if (employee.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Employee account is inactive',
      });
    }

    // Upload photo to Cloudinary
    const uploadResult = await cloudinaryService.uploadToCloudinary(
      req.file.buffer,
      `attendance_photos/${employee.clfId}`
    );

    // Check if work already submitted for today
    const workDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(workDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(workDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingSubmission = await WorkSubmission.findOne({
      employeeId: employee._id,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: 'Work already submitted for this date',
      });
    }

    // Create work submission
    const submission = await WorkSubmission.create({
      employeeId: employee._id,
      clfId: employee.clfId,
      date: workDate,
      description,
      photoUrl: uploadResult.url,
      status: 'PENDING',
      workType: workType || 'Other',
    });

    // Update attendance to PENDING
    await attendanceService.calculateDailyAttendance(employee._id, workDate);

    res.status(201).json({
      success: true,
      message: 'Work submitted successfully',
      submission: {
        id: submission._id,
        date: submission.date,
        description: submission.description,
        photoUrl: submission.photoUrl,
        status: submission.status,
        workType: submission.workType,
      },
    });
  } catch (error) {
    console.error('Submit Work Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get pending submissions
// @route   GET /api/admin/work/pending
// @access  Private (Admin only)
const getPendingSubmissions = async (req, res) => {
  try {
    const { clfId, page = 1, limit = 20 } = req.query;

    const filter = { status: 'PENDING' };
    
    if (req.user.role === 'CLF_ADMIN') {
      filter.clfId = req.user.clfId;
    } else if (clfId && req.user.role === 'SUPER_ADMIN') {
      filter.clfId = clfId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const submissions = await WorkSubmission.find(filter)
      .populate('employeeId', 'name userId employeeType')
      .populate('clfId', 'name code')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await WorkSubmission.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      submissions,
    });
  } catch (error) {
    console.error('Get Pending Submissions Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get work submission by ID
// @route   GET /api/admin/work/:id
// @access  Private
const getSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const submission = await WorkSubmission.findById(submissionId)
      .populate('employeeId', 'name userId employeeType mobile')
      .populate('clfId', 'name code')
      .populate('approvedBy', 'name userId');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Check access
    if (req.user.role === 'CLF_ADMIN' && 
        submission.clfId._id.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this submission',
      });
    }

    if (req.user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: req.user.userId });
      if (!employee || employee._id.toString() !== submission.employeeId._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You can only access your own submissions',
        });
      }
    }

    res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error('Get Submission Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Approve work submission
// @route   PUT /api/admin/work/:id/approve
// @access  Private (Admin only)
const approveSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const submission = await WorkSubmission.findById(submissionId)
      .populate('employeeId', 'name userId clfId');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Check access
    if (req.user.role === 'CLF_ADMIN' && 
        submission.clfId.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this submission',
      });
    }

    // Check if already processed
    if (submission.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: `Submission already ${submission.status.toLowerCase()}`,
      });
    }

    // Update submission
    submission.status = 'APPROVED';
    submission.approvedBy = req.user._id;
    submission.approvedAt = new Date();
    await submission.save();

    // Update attendance
    await attendanceService.calculateDailyAttendance(
      submission.employeeId._id,
      submission.date
    );

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'WORK_APPROVE',
      targetId: submission._id,
      targetModel: 'WorkSubmission',
      details: { employeeName: submission.employeeId.name },
    });

    res.status(200).json({
      success: true,
      message: 'Work approved successfully',
      submission: {
        id: submission._id,
        status: submission.status,
        approvedBy: submission.approvedBy,
        approvedAt: submission.approvedAt,
      },
    });
  } catch (error) {
    console.error('Approve Submission Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Reject work submission
// @route   PUT /api/admin/work/:id/reject
// @access  Private (Admin only)
const rejectSubmission = async (req, res) => {
  try {
    const submissionId = req.params.id;

    // ✅ Safety check — req.body undefined ho sakta hai
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required',
      });
    }

    const { rejectionReason } = req.body;

    if (!rejectionReason || rejectionReason.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required (minimum 5 characters)',
      });
    }

    const submission = await WorkSubmission.findById(submissionId)
      .populate('employeeId', 'name userId clfId');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found',
      });
    }

    // Check access
    if (req.user.role === 'CLF_ADMIN' && 
        submission.clfId.toString() !== req.user.clfId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this submission',
      });
    }

    // Check if already processed
    if (submission.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: `Submission already ${submission.status.toLowerCase()}`,
      });
    }

    // Update submission
    submission.status = 'REJECTED';
    submission.rejectionReason = rejectionReason;
    submission.approvedBy = req.user._id;
    submission.approvedAt = new Date();
    await submission.save();

    // Update attendance
    await attendanceService.calculateDailyAttendance(
      submission.employeeId._id,
      submission.date
    );

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'WORK_REJECT',
      targetId: submission._id,
      targetModel: 'WorkSubmission',
      details: { 
        employeeName: submission.employeeId.name,
        reason: rejectionReason,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Work rejected successfully',
      submission: {
        id: submission._id,
        status: submission.status,
        rejectionReason: submission.rejectionReason,
        approvedBy: submission.approvedBy,
        approvedAt: submission.approvedAt,
      },
    });
  } catch (error) {
    console.error('Reject Submission Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get employee work history
// @route   GET /api/admin/work/history
// @access  Private
const getWorkHistory = async (req, res) => {
  try {
    const { page = 1, limit = 30, status } = req.query;
    
    let filter = {};
    
    // If employee, only their own submissions
    if (req.user.role === 'EMPLOYEE') {
      const employee = await Employee.findOne({ userId: req.user.userId });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
        });
      }
      filter.employeeId = employee._id;
    } else if (req.user.role === 'CLF_ADMIN') {
      filter.clfId = req.user.clfId;
    }

    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const submissions = await WorkSubmission.find(filter)
      .populate('employeeId', 'name userId employeeType')
      .populate('clfId', 'name code')
      .populate('approvedBy', 'name userId')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await WorkSubmission.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      submissions,
    });
  } catch (error) {
    console.error('Get Work History Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  submitWork,
  getPendingSubmissions,
  getSubmission,
  approveSubmission,
  rejectSubmission,
  getWorkHistory,
};