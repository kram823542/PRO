const ExcelJS = require('exceljs');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const CLF = require('../models/CLF');
const mongoose = require('mongoose');

const generateAttendanceExcel = async (clfId, month, year) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Report');

    // Get CLF details
    const clf = await CLF.findById(clfId);
    
    // Get all active employees for this CLF
    const employees = await Employee.find({ clfId, status: 'ACTIVE' });
    const employeeIds = employees.map(emp => emp._id);

    // Get attendance data
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendance = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    // Get all dates in month
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create headers
    const headers = ['S.No', 'Employee Name', 'Employee Type'];
    dates.forEach(date => {
      const day = String(date.getDate()).padStart(2, '0');
      headers.push(day);
    });
    headers.push('Present', 'Absent', 'Total');

    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Process each employee
    let serialNo = 1;
    for (const employee of employees) {
      const rowData = [
        serialNo++,
        employee.name,
        employee.employeeType,
      ];

      let presentCount = 0;
      let absentCount = 0;

      // Get attendance for each date
      for (const date of dates) {
        const attendanceRecord = attendance.find(record => 
          record.employeeId.toString() === employee._id.toString() &&
          record.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
        );

        let status = 'A'; // Default absent
        if (attendanceRecord) {
          if (attendanceRecord.status === 'PRESENT') {
            status = 'P';
            presentCount++;
          } else if (attendanceRecord.status === 'ABSENT') {
            status = 'A';
            absentCount++;
          } else if (attendanceRecord.status === 'PENDING') {
            status = 'Pend';
          }
        } else {
          // No record means absent
          absentCount++;
        }

        rowData.push(status);
      }

      rowData.push(presentCount, absentCount, presentCount + absentCount);
      
      const row = worksheet.addRow(rowData);
      
      // Apply color coding
      row.eachCell((cell, colNumber) => {
        if (colNumber > 3 && colNumber <= 3 + dates.length) {
          if (cell.value === 'P') {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFC6EFCE' },
            };
            cell.font = { color: { argb: 'FF006100' } };
          } else if (cell.value === 'A') {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFC7CE' },
            };
            cell.font = { color: { argb: 'FF9C0006' } };
          } else if (cell.value === 'Pend') {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFEB9C' },
            };
            cell.font = { color: { argb: 'FF9C6500' } };
          }
        }
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    }

    // Auto-fit columns
    worksheet.columns.forEach(column => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, cell => {
        const value = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, value.length + 2);
      });
      column.width = Math.min(maxLength, 30);
    });

    // Add summary at the bottom
    const totalEmployees = employees.length;
    const totalPresent = attendance.filter(a => a.status === 'PRESENT').length;
    const totalAbsent = attendance.filter(a => a.status === 'ABSENT').length;
    const totalPending = attendance.filter(a => a.status === 'PENDING').length;

    const summaryRow = worksheet.addRow([]);
    worksheet.addRow([
      'Summary',
      `Total Employees: ${totalEmployees}`,
      `Present: ${totalPresent}`,
      `Absent: ${totalAbsent}`,
      `Pending: ${totalPending}`,
    ]);

    // Add title
    worksheet.addRow([]);
    worksheet.addRow([
      `Attendance Report - ${clf.name}`,
      `Month: ${new Date(year, month - 1).toLocaleString('default', { month: 'long' })} ${year}`,
    ]);

    return workbook;
  } catch (error) {
    console.error('Generate Excel Error:', error);
    throw error;
  }
};

module.exports = { generateAttendanceExcel };