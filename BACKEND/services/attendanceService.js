// const Attendance = require('../models/Attendance');
// const WorkSubmission = require('../models/WorkSubmission');
// const Employee = require('../models/Employee');
// const mongoose = require('mongoose');

// // Calculate attendance for a single day
// const calculateDailyAttendance = async (employeeId, date) => {
//   try {
//     // Check if attendance already exists
//     let attendance = await Attendance.findOne({
//       employeeId,
//       date: {
//         $gte: new Date(date.setHours(0, 0, 0, 0)),
//         $lt: new Date(date.setHours(23, 59, 59, 999)),
//       },
//     });

//     if (attendance) {
//       return attendance;
//     }

//     // Get work submission for this employee on this date
//     const submission = await WorkSubmission.findOne({
//       employeeId,
//       date: {
//         $gte: new Date(date.setHours(0, 0, 0, 0)),
//         $lt: new Date(date.setHours(23, 59, 59, 999)),
//       },
//     });

//     let status = 'ABSENT';
//     let submissionId = null;

//     if (submission) {
//       if (submission.status === 'APPROVED') {
//         status = 'PRESENT';
//       } else if (submission.status === 'PENDING') {
//         status = 'PENDING';
//       } else if (submission.status === 'REJECTED') {
//         status = 'ABSENT';
//       }
//       submissionId = submission._id;
//     }

//     // Create attendance record
//     attendance = await Attendance.create({
//       employeeId,
//       clfId: (await Employee.findById(employeeId)).clfId,
//       date: new Date(date.setHours(0, 0, 0, 0)),
//       status,
//       submissionId,
//     });

//     return attendance;
//   } catch (error) {
//     console.error('Calculate Daily Attendance Error:', error);
//     throw error;
//   }
// };

// // Calculate monthly attendance for an employee
// const calculateMonthlyAttendance = async (employeeId, month, year) => {
//   try {
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     const attendance = await Attendance.find({
//       employeeId,
//       date: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     }).sort({ date: 1 });

//     return attendance;
//   } catch (error) {
//     console.error('Calculate Monthly Attendance Error:', error);
//     throw error;
//   }
// };

// // Get attendance summary for a CLF
// const getCLFAttendanceSummary = async (clfId, month, year) => {
//   try {
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     const employees = await Employee.find({ clfId, status: 'ACTIVE' });
//     const employeeIds = employees.map(emp => emp._id);

//     const attendance = await Attendance.find({
//       employeeId: { $in: employeeIds },
//       date: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     });

//     // Calculate summary
//     const summary = {
//       totalEmployees: employees.length,
//       present: 0,
//       absent: 0,
//       pending: 0,
//       dailyStatus: {},
//     };

//     const dates = [];
//     let currentDate = new Date(startDate);
//     while (currentDate <= endDate) {
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // Initialize daily status
//     dates.forEach(date => {
//       const dateStr = date.toISOString().split('T')[0];
//       summary.dailyStatus[dateStr] = {
//         present: 0,
//         absent: 0,
//         pending: 0,
//         total: 0,
//       };
//     });

//     // Process attendance data
//     attendance.forEach(record => {
//       const dateStr = record.date.toISOString().split('T')[0];
//       if (summary.dailyStatus[dateStr]) {
//         summary.dailyStatus[dateStr].total++;
//         if (record.status === 'PRESENT') {
//           summary.dailyStatus[dateStr].present++;
//           summary.present++;
//         } else if (record.status === 'ABSENT') {
//           summary.dailyStatus[dateStr].absent++;
//           summary.absent++;
//         } else if (record.status === 'PENDING') {
//           summary.dailyStatus[dateStr].pending++;
//           summary.pending++;
//         }
//       }
//     });

//     return summary;
//   } catch (error) {
//     console.error('Get CLF Attendance Summary Error:', error);
//     throw error;
//   }
// };

// module.exports = {
//   calculateDailyAttendance,
//   calculateMonthlyAttendance,
//   getCLFAttendanceSummary,
// };






const Attendance = require('../models/Attendance');
const WorkSubmission = require('../models/WorkSubmission');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// Helper: Get UTC start and end of a given date
const getUTCDayRange = (date) => {
  const d = new Date(date);
  const startOfDay = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0)
  );
  const endOfDay = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 59, 59, 999)
  );
  return { startOfDay, endOfDay };
};

// Calculate attendance for a single day
const calculateDailyAttendance = async (employeeId, date) => {
  try {
    // Setup UTC date range (fixes timezone bug)
    const { startOfDay, endOfDay } = getUTCDayRange(date);

    // Get employee for clfId
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error('Employee not found');
    }

    // Get work submission for this employee on this date
    const submission = await WorkSubmission.findOne({
      employeeId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Calculate status based on submission
    let status = 'ABSENT';
    let submissionId = null;

    if (submission) {
      if (submission.status === 'APPROVED') {
        status = 'PRESENT';
      } else if (submission.status === 'PENDING') {
        status = 'PENDING';
      } else if (submission.status === 'REJECTED') {
        status = 'ABSENT';
      }
      submissionId = submission._id;
    }

    // Upsert: create if not exists, update if exists
    const attendance = await Attendance.findOneAndUpdate(
      {
        employeeId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      },
      {
        employeeId,
        clfId: employee.clfId,
        date: startOfDay,
        status,
        submissionId,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return attendance;
  } catch (error) {
    console.error('Calculate Daily Attendance Error:', error);
    throw error;
  }
};

// Calculate monthly attendance for an employee
const calculateMonthlyAttendance = async (employeeId, month, year) => {
  try {
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const attendance = await Attendance.find({
      employeeId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    return attendance;
  } catch (error) {
    console.error('Calculate Monthly Attendance Error:', error);
    throw error;
  }
};

// Get attendance summary for a CLF
const getCLFAttendanceSummary = async (clfId, month, year) => {
  try {
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    const employees = await Employee.find({ clfId, status: 'ACTIVE' });
    const employeeIds = employees.map((emp) => emp._id);

    const attendance = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Calculate summary
    const summary = {
      totalEmployees: employees.length,
      present: 0,
      absent: 0,
      pending: 0,
      dailyStatus: {},
    };

    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    // Initialize daily status
    dates.forEach((date) => {
      const dateStr = date.toISOString().split('T')[0];
      summary.dailyStatus[dateStr] = {
        present: 0,
        absent: 0,
        pending: 0,
        total: 0,
      };
    });

    // Process attendance data
    attendance.forEach((record) => {
      const dateStr = record.date.toISOString().split('T')[0];
      if (summary.dailyStatus[dateStr]) {
        summary.dailyStatus[dateStr].total++;
        if (record.status === 'PRESENT') {
          summary.dailyStatus[dateStr].present++;
          summary.present++;
        } else if (record.status === 'ABSENT') {
          summary.dailyStatus[dateStr].absent++;
          summary.absent++;
        } else if (record.status === 'PENDING') {
          summary.dailyStatus[dateStr].pending++;
          summary.pending++;
        }
      }
    });

    return summary;
  } catch (error) {
    console.error('Get CLF Attendance Summary Error:', error);
    throw error;
  }
};

module.exports = {
  calculateDailyAttendance,
  calculateMonthlyAttendance,
  getCLFAttendanceSummary,
};