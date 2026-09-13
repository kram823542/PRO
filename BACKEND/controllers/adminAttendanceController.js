const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const CLF = require('../models/CLF');
const attendanceService = require('../services/attendanceService');
const mongoose = require('mongoose');

// @desc    Get attendance for a specific month
// @route   GET /api/admin/attendance/monthly
// @access  Private
const getMonthlyAttendance = async (req, res) => {
  try {
    const { clfId, employeeType, month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Month and year are required',
      });
    }

    // Build filter for employees
    const employeeFilter = { status: 'ACTIVE' };
    
    if (req.user.role === 'CLF_ADMIN') {
      employeeFilter.clfId = req.user.clfId;
    } else if (clfId && req.user.role === 'SUPER_ADMIN') {
      employeeFilter.clfId = clfId;
    }

    if (employeeType) {
      employeeFilter.employeeType = employeeType;
    }

    const employees = await Employee.find(employeeFilter).populate('clfId', 'name code');
    
    if (employees.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        summary: {
          totalEmployees: 0,
          present: 0,
          absent: 0,
          pending: 0,
        },
      });
    }

    const employeeIds = employees.map(emp => emp._id);

    // Get attendance for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendanceRecords = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Calculate summary
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalPending = 0;

    // Prepare response data
    const attendanceData = employees.map(employee => {
      const employeeRecords = attendanceRecords.filter(
        record => record.employeeId.toString() === employee._id.toString()
      );

      const present = employeeRecords.filter(r => r.status === 'PRESENT').length;
      const absent = employeeRecords.filter(r => r.status === 'ABSENT').length;
      const pending = employeeRecords.filter(r => r.status === 'PENDING').length;

      totalPresent += present;
      totalAbsent += absent;
      totalPending += pending;

      // Get daily status for the month
      const dailyStatus = {};
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const record = employeeRecords.find(
          r => r.date.toISOString().split('T')[0] === dateStr
        );
        dailyStatus[dateStr] = record ? record.status : 'ABSENT';
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return {
        employeeId: employee._id,
        name: employee.name,
        userId: employee.userId,
        employeeType: employee.employeeType,
        clfName: employee.clfId ? employee.clfId.name : null,
        dailyStatus,
        present,
        absent,
        pending,
        total: present + absent + pending,
      };
    });

    res.status(200).json({
      success: true,
      data: attendanceData,
      summary: {
        totalEmployees: employees.length,
        totalPresent,
        totalAbsent,
        totalPending,
      },
      month: parseInt(month),
      year: parseInt(year),
    });
  } catch (error) {
    console.error('Get Monthly Attendance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get attendance summary for dashboard
// @route   GET /api/admin/attendance/summary
// @access  Private
const getAttendanceSummary = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Build filter
    let employeeFilter = { status: 'ACTIVE' };
    
    if (req.user.role === 'CLF_ADMIN') {
      employeeFilter.clfId = req.user.clfId;
    }

    const employees = await Employee.find(employeeFilter);
    const employeeIds = employees.map(emp => emp._id);

    // Get today's attendance
    const todayAttendance = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    // Get pending work submissions
    let workFilter = { status: 'PENDING' };
    if (req.user.role === 'CLF_ADMIN') {
      workFilter.clfId = req.user.clfId;
    }

    const pendingWork = await require('../models/WorkSubmission').countDocuments(workFilter);

    const present = todayAttendance.filter(a => a.status === 'PRESENT').length;
    const absent = todayAttendance.filter(a => a.status === 'ABSENT').length;
    const pending = todayAttendance.filter(a => a.status === 'PENDING').length;

    res.status(200).json({
      success: true,
      summary: {
        totalEmployees: employees.length,
        presentToday: present,
        absentToday: absent,
        pendingToday: pending,
        pendingApprovals: pendingWork,
        today: today.toISOString().split('T')[0],
      },
    });
  } catch (error) {
    console.error('Get Attendance Summary Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get employee attendance history
// @route   GET /api/admin/attendance/employee/:employeeId
// @access  Private
const getEmployeeAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { month, year } = req.query;

    // Check access
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

    if (req.user.role === 'EMPLOYEE') {
      const userEmployee = await Employee.findOne({ userId: req.user.userId });
      if (!userEmployee || userEmployee._id.toString() !== employeeId) {
        return res.status(403).json({
          success: false,
          message: 'You can only access your own data',
        });
      }
    }

    // Get attendance
    const attendance = await attendanceService.calculateMonthlyAttendance(
      employeeId,
      parseInt(month) || new Date().getMonth() + 1,
      parseInt(year) || new Date().getFullYear()
    );

    res.status(200).json({
      success: true,
      employee: {
        id: employee._id,
        name: employee.name,
        userId: employee.userId,
        employeeType: employee.employeeType,
      },
      attendance,
    });
  } catch (error) {
    console.error('Get Employee Attendance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getMonthlyAttendance,
  getAttendanceSummary,
  getEmployeeAttendance,
};