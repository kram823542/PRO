import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Leave } from './leave.model.js';
import { Employee } from '../employees/employee.model.js';
import { Attendance } from '../attendance/attendance.model.js'; 
import { ApiError } from '../../utils/ApiError.js';

/* ────────────────────────────────────────────
   Fonts — Auto Detect Path (PDF ke liye)
   ──────────────────────────────────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFontPath = (fontName) => {
  const possiblePaths = [
    path.join(process.cwd(), 'assets', 'fonts', fontName),
    path.join(process.cwd(), 'src', 'assets', 'fonts', fontName),
    path.join(__dirname, '..', '..', '..', 'assets', 'fonts', fontName),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const BUNDLED_FONT_REGULAR = getFontPath('NotoSansDevanagari-Regular.ttf');
const BUNDLED_FONT_BOLD = getFontPath('NotoSansDevanagari-Bold.ttf');

// ✅ 1. Employee ke liye nayi Leave Apply karna
export const applyLeave = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login again' });
    }

    const { leaveType, startDate, endDate, reason, startTime, endTime } = req.body;
    const user = req.user;
    const targetUserId = user.userId || user._id;

    const emp = await Employee.findOne({ userId: targetUserId });
    if (!emp) throw ApiError.notFound('Employee profile not found for this user');

    if (!leaveType || !startDate || !endDate || !reason) {
      throw ApiError.badRequest('Start Date, End Date, Type, and Reason are required');
    }

    if (leaveType === 'Half Day' && (!startTime || !endTime)) {
      throw ApiError.badRequest('Start Time and End Time are required for Half Day leave');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    
    if (leaveType === 'Half Day') totalDays = 0.5;

    const leave = await Leave.create({
      employeeId: emp._id,
      clfId: emp.clfId,
      blockId: emp.blockId,
      leaveType,
      startDate,
      endDate,
      startTime: leaveType === 'Half Day' ? startTime : null,
      endTime: leaveType === 'Half Day' ? endTime : null,
      totalDays,
      reason,
      appliedBy: targetUserId, 
      status: 'PENDING',
    });

    res.status(201).json({
      success: true,
      message: 'Leave applied successfully',
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ 2. Employee apni saari leaves dekhe
export const getMyLeaves = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login again' });
    }

    const user = req.user;
    const targetUserId = user.userId || user._id;

    const emp = await Employee.findOne({ userId: targetUserId });
    if (!emp) throw ApiError.notFound('Employee profile not found');

    const leaves = await Leave.find({ employeeId: emp._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ 3. Leave Cancel karna
export const cancelLeave = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Please login again' });
    }

    const { id } = req.params;
    const user = req.user;
    const targetUserId = user.userId || user._id;

    const emp = await Employee.findOne({ userId: targetUserId });
    if (!emp) throw ApiError.notFound('Employee profile not found');

    const leave = await Leave.findById(id);
    if (!leave) throw ApiError.notFound('Leave application not found');

    if (String(leave.employeeId) !== String(emp._id)) {
      throw ApiError.forbidden('You can only cancel your own leave');
    }

    if (leave.status !== 'PENDING') {
      throw ApiError.badRequest('Only pending leaves can be cancelled');
    }

    await Leave.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Leave cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ✅ 4. CLF/BPM ke liye saari leaves dekhna (Admin View)
export const getAllLeavesForAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'Unauthorized' });

    let filter = {};
    if (user.role === 'CLF') {
      filter.clfId = user.clfId;
    } else if (user.role === 'BPM') {
      filter.blockId = user.blockId;
    }

    const leaves = await Leave.find(filter)
      .populate('employeeId', 'name employeeCode designation')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ 5. CLF Admin dwara Leave Approve/Reject + Attendance Auto-Update
export const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, reviewRemarks } = req.body; 
    const user = req.user;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });

    if (user.role === 'CLF' && String(leave.clfId) !== String(user.clfId)) {
      return res.status(403).json({ success: false, message: 'Not authorized to review this leave' });
    }

    leave.status = status;
    leave.reviewRemarks = reviewRemarks || '';
    leave.reviewedBy = user._id || user.userId;
    await leave.save();

    // ✅ MAGIC: Agar Approve hua hai to Attendance update karo
    if (status === 'APPROVED') {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      
      // Jitne din ki leave hai, utne din ka loop chala kar attendance mark karo
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]; 
        
        let existingAtt = await Attendance.findOne({ 
          employeeId: leave.employeeId, 
          date: dateStr 
        });

        if (existingAtt) {
          existingAtt.status = 'LEAVE';
          existingAtt.remarks = `Leave Approved (${leave.leaveType})`;
          await existingAtt.save();
        } else {
          await Attendance.create({
            employeeId: leave.employeeId,
            clfId: leave.clfId,
            blockId: leave.blockId,
            date: dateStr,
            status: 'LEAVE',
            remarks: `Leave Approved (${leave.leaveType})`,
            markedBy: user._id || user.userId
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      message: `Leave ${status.toLowerCase()} successfully`,
      data: leave,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ 6. NAYA: Leave Application ki PDF Download karna
export const downloadLeavePDF = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Employee ki detail bhi laao taaki PDF mein naam aaye
    const leave = await Leave.findById(id).populate('employeeId', 'name employeeCode designation');
    
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });

    // Security Check
    if (req.user.role === 'CLF' && String(leave.clfId) !== String(req.user.clfId)) {
       return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Font Register karo (Hindi ke liye)
    if (BUNDLED_FONT_REGULAR) doc.registerFont('Devanagari', BUNDLED_FONT_REGULAR);
    else doc.registerFont('Devanagari', 'Helvetica');
    
    if (BUNDLED_FONT_BOLD) doc.registerFont('Devanagari-Bold', BUNDLED_FONT_BOLD);
    else doc.registerFont('Devanagari-Bold', 'Helvetica-Bold');

    // Headers set karo download ke liye
    const filename = `Leave-${leave.employeeId?.employeeCode || 'App'}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    // ─── PDF Content Design ───
    const pageWidth = 595.28;
    const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // Header
    doc.font('Devanagari-Bold').fontSize(18).text('सतबरवा आजीविका महिला संकुल स्तरीय', { align: 'center' });
    doc.font('Devanagari-Bold').fontSize(14).text('प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड', { align: 'center' });
    doc.font('Devanagari').fontSize(10).text('ग्राम- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)', { align: 'center' });
    doc.moveDown(1);

    // Line
    doc.moveTo(50, doc.y).lineTo(pageWidth - 50, doc.y).stroke();
    doc.moveDown(2);

    // Date & To
    doc.font('Devanagari').fontSize(12);
    doc.text(`दिनांक: ${formatDate(leave.createdAt)}`, { align: 'right' });
    doc.moveDown(1);
    doc.text('प्रति,', { continued: true });
    doc.text('CLF Admin', { align: 'left' });
    doc.text('सतबरवा CLF');
    doc.moveDown(2);

    // Subject
    doc.font('Devanagari-Bold').fontSize(14).text('विषय: अवकाश (Leave) हेतु आवेदन', { align: 'center', underline: true });
    doc.moveDown(2);

    // Body
    doc.font('Devanagari').fontSize(12).text('महोदय/महोदया,', { align: 'left' });
    doc.moveDown(1);

    const bodyText = `सविनय निवेदन है कि मुझे ${leave.totalDays} दिनों का अवकाश चाहिए। मुझे दिनांक ${formatDate(leave.startDate)} से ${formatDate(leave.endDate)} तक अवकाश की आवश्यकता है${leave.leaveType === 'Half Day' ? ` (समय: ${leave.startTime} से ${leave.endTime} तक)` : ''}।`;
    
    doc.text(bodyText, { align: 'justify', lineGap: 4 });
    doc.moveDown(1);

    doc.text('अवकाश का कारण निम्नलिखित है:', { align: 'left' });
    doc.moveDown(0.5);
    doc.font('Devanagari-Bold').text(`"${leave.reason}"`, { indent: 20, align: 'justify' });
    doc.font('Devanagari');
    doc.moveDown(1);

    doc.text('अतः आपसे निवेदन है कि मेरे इस अवकाश आवेदन को स्वीकृत (Approve) करने की कृपा करें।', { align: 'justify' });
    doc.moveDown(4);

    // Signature
    doc.text('धन्यवाद,', { align: 'left' });
    doc.moveDown(3);
    doc.font('Devanagari-Bold').text(leave.employeeId?.name || 'Employee Name', { align: 'right' });
    doc.font('Devanagari').text(leave.employeeId?.designation || 'Designation', { align: 'right' });
    doc.text(`Emp Code: ${leave.employeeId?.employeeCode || 'N/A'}`, { align: 'right' });
    
    // Status Box
    doc.moveDown(3);
    if (leave.status === 'APPROVED') {
      doc.fillColor('green').text('Status: APPROVED', { align: 'center' });
    } else if (leave.status === 'REJECTED') {
      doc.fillColor('red').text('Status: REJECTED', { align: 'center' });
      if (leave.reviewRemarks) {
        doc.text(`Remark: ${leave.reviewRemarks}`, { align: 'center' });
      }
    } else {
      doc.fillColor('orange').text('Status: PENDING', { align: 'center' });
    }

    doc.end();
  } catch (error) {
    next(error);
  }
};