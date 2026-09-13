const excelService = require('../services/excelService');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const CLF = require('../models/CLF');
const AuditLog = require('../models/AuditLog');

// @desc    Generate attendance report
// @route   GET /api/admin/reports/attendance
// @access  Private
const getAttendanceReport = async (req, res) => {
  try {
    const { clfId, month, year } = req.query;

    if (!clfId || !month || !year) {
      return res.status(400).json({
        success: false,
        message: 'CLF ID, month, and year are required',
      });
    }

    // Check access
    if (req.user.role === 'CLF_ADMIN' && 
        req.user.clfId.toString() !== clfId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this CLF',
      });
    }

    const clf = await CLF.findById(clfId);
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const employees = await Employee.find({ clfId, status: 'ACTIVE' });
    const employeeIds = employees.map(emp => emp._id);

    const attendanceRecords = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Process report data
    const reportData = employees.map(employee => {
      const records = attendanceRecords.filter(
        r => r.employeeId.toString() === employee._id.toString()
      );

      const present = records.filter(r => r.status === 'PRESENT').length;
      const absent = records.filter(r => r.status === 'ABSENT').length;
      const pending = records.filter(r => r.status === 'PENDING').length;

      return {
        employee: {
          id: employee._id,
          name: employee.name,
          userId: employee.userId,
          employeeType: employee.employeeType,
          designation: employee.designation,
          mobile: employee.mobile,
        },
        present,
        absent,
        pending,
        total: present + absent + pending,
        records,
      };
    });

    res.status(200).json({
      success: true,
      clf: {
        id: clf._id,
        name: clf.name,
        code: clf.code,
        block: clf.block,
      },
      month: parseInt(month),
      year: parseInt(year),
      totalEmployees: employees.length,
      reportData,
    });
  } catch (error) {
    console.error('Get Attendance Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Export attendance report as Excel
// @route   GET /api/admin/reports/attendance/excel
// @access  Private
const exportAttendanceExcel = async (req, res) => {
  try {
    const { clfId, month, year } = req.query;

    if (!clfId || !month || !year) {
      return res.status(400).json({
        success: false,
        message: 'CLF ID, month, and year are required',
      });
    }

    // Check access
    if (req.user.role === 'CLF_ADMIN' && 
        req.user.clfId.toString() !== clfId) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this CLF',
      });
    }

    const clf = await CLF.findById(clfId);
    if (!clf) {
      return res.status(404).json({
        success: false,
        message: 'CLF not found',
      });
    }

    // Generate Excel
    const workbook = await excelService.generateAttendanceExcel(
      clfId,
      parseInt(month),
      parseInt(year)
    );

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: 'REPORT_DOWNLOAD',
      targetId: clfId,
      targetModel: 'CLF',
      details: { month, year, type: 'excel' },
    });

    // Set response headers
    const fileName = `Attendance_${clf.code}_${month}_${year}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Send workbook
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export Attendance Excel Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get CLF summary report
// @route   GET /api/admin/reports/clf-summary
// @access  Private/Super Admin
const getCLFSummaryReport = async (req, res) => {
  try {
    const clfs = await CLF.find({ status: 'ACTIVE' });
    
    const summaryData = await Promise.all(
      clfs.map(async (clf) => {
        const employeeCount = await Employee.countDocuments({ 
          clfId: clf._id, 
          status: 'ACTIVE' 
        });

        // Get today's attendance
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const employees = await Employee.find({ clfId: clf._id, status: 'ACTIVE' });
        const employeeIds = employees.map(emp => emp._id);

        const todayAttendance = await Attendance.find({
          employeeId: { $in: employeeIds },
          date: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        });

        const present = todayAttendance.filter(a => a.status === 'PRESENT').length;
        const absent = todayAttendance.filter(a => a.status === 'ABSENT').length;
        const pending = todayAttendance.filter(a => a.status === 'PENDING').length;

        return {
          clf: {
            id: clf._id,
            name: clf.name,
            code: clf.code,
            block: clf.block,
          },
          employeeCount,
          presentToday: present,
          absentToday: absent,
          pendingToday: pending,
        };
      })
    );

    res.status(200).json({
      success: true,
      summaryData,
    });
  } catch (error) {
    console.error('Get CLF Summary Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getAttendanceReport,
  exportAttendanceExcel,
  getCLFSummaryReport,
};