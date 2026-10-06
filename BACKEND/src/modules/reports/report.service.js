// import PDFDocument from 'pdfkit';
// import ExcelJS from 'exceljs';
// import { ActionPlan } from '../actionPlans/actionPlan.model.js';
// import { WorkDone } from '../workDone/workDone.model.js';
// import { Attendance } from '../attendance/attendance.model.js';
// import { Employee } from '../employees/employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { ApiError } from '../../utils/ApiError.js';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const monthRange = (year, month) => {
//   const start = `${year}-${String(month).padStart(2, '0')}-01`;
//   const lastDay = new Date(year, month, 0).getDate();
//   const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
//   return { start, end };
// };

// const assertEmployeeScope = async (req, employeeId) => {
//   const emp = await Employee.findById(employeeId);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   const user = req.user;
//   if (user.role === 'SUPER_ADMIN') return emp;
//   if (user.role === 'BPM' && String(user.blockId) === String(emp.blockId)) return emp;
//   if (user.role === 'CLF' && String(user.clfId) === String(emp.clfId)) return emp;
//   if (user.role === 'EMPLOYEE' && String(user._id) === String(emp.userId)) return emp;
//   throw ApiError.forbidden('Access denied');
// };

// /** Monthly Action Plan PDF */
// export const actionPlanPDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);

//   const { start, end } = monthRange(year, month);

//   const plans = await ActionPlan.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });

//   doc.fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.moveDown(0.3);
//   doc.fontSize(14).text('ACTION PLAN REPORT', { align: 'center' });
//   doc.fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();

//   doc.fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
//   doc.moveDown();

//   const tableTop = doc.y + 5;
//   const colDate = 40;
//   const colPlan = 120;
//   const rowHeight = 20;

//   doc.font('Helvetica-Bold');
//   doc.text('Date', colDate, tableTop);
//   doc.text('Action Plan', colPlan, tableTop);
//   doc.font('Helvetica');
//   doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

//   let y = tableTop + 20;
//   plans.forEach((p) => {
//     if (y > 780) {
//       doc.addPage();
//       y = 40;
//     }
//     const d = p.date.split('-').reverse().slice(0, 2).join('/');
//     doc.text(d, colDate, y);
//     doc.text(p.plan, colPlan, y, { width: 420, height: rowHeight * 2 });
//     y += rowHeight + Math.max(0, doc.heightOfString(p.plan, { width: 420 }) - 12);
//   });

//   doc.moveDown(2);
//   doc.fontSize(9).fillColor('#666').text(`Total Days: ${plans.length}`, { align: 'right' });
//   doc.end();
//   return doc;
// };

// /** Monthly Work Done PDF */
// export const workDonePDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);
//   const { start, end } = monthRange(year, month);

//   const works = await WorkDone.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });

//   doc.fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.fontSize(14).text('WORK DONE REPORT', { align: 'center' });
//   doc.fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.moveDown();

//   let approved = 0, rejected = 0, pending = 0;
//   let y = doc.y;
//   const colDate = 40, colDesc = 100, colStatus = 500;

//   doc.font('Helvetica-Bold');
//   doc.text('Date', colDate, y);
//   doc.text('Work Done', colDesc, y);
//   doc.text('Status', colStatus, y);
//   doc.font('Helvetica');
//   doc.moveTo(40, y + 15).lineTo(555, y + 15).stroke();
//   y += 22;

//   works.forEach((w) => {
//     if (y > 780) { doc.addPage(); y = 40; }
//     if (w.status === 'APPROVED') approved++;
//     else if (w.status === 'REJECTED') rejected++;
//     else pending++;

//     const d = w.date.split('-').reverse().slice(0, 2).join('/');
//     doc.text(d, colDate, y);
//     doc.text(w.description.slice(0, 90), colDesc, y, { width: 380 });
//     doc.text(w.status, colStatus, y);
//     y += Math.max(18, doc.heightOfString(w.description.slice(0, 90), { width: 380 }) + 4);
//   });

//   doc.moveDown(2);
//   doc.fontSize(9).fillText
//   doc.text(`Approved: ${approved} | Rejected: ${rejected} | Pending: ${pending}`, 40, 800);
//   doc.end();
//   return doc;
// };

// /** Excel export of attendance */
// export const attendanceExcel = async (req, { clfId, from, to }) => {
//   const user = req.user;
//   const filter = {};
//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (clfId) filter.clfId = clfId;

//   if (from || to) {
//     filter.date = {};
//     if (from) filter.date.$gte = from;
//     if (to) filter.date.$lte = to;
//   }

//   const records = await Attendance.find(filter)
//     .populate('employeeId', 'name employeeCode designation')
//     .sort({ date: 1 });

//   const wb = new ExcelJS.Workbook();
//   const ws = wb.addWorksheet('Attendance');
//   ws.columns = [
//     { header: 'Date', key: 'date', width: 15 },
//     { header: 'Employee Code', key: 'code', width: 18 },
//     { header: 'Name', key: 'name', width: 25 },
//     { header: 'Designation', key: 'designation', width: 20 },
//     { header: 'Status', key: 'status', width: 12 },
//     { header: 'Source', key: 'source', width: 22 },
//   ];
//   records.forEach((r) => {
//     ws.addRow({
//       date: r.date,
//       code: r.employeeId?.employeeCode || '',
//       name: r.employeeId?.name || '',
//       designation: r.employeeId?.designation || '',
//       status: r.status,
//       source: r.source,
//     });
//   });
//   ws.getRow(1).font = { bold: true };
//   return wb;
// };






// import PDFDocument from 'pdfkit';
// import ExcelJS from 'exceljs';
// import fs from 'fs';
// import { ActionPlan } from '../actionPlans/actionPlan.model.js';
// import { WorkDone } from '../workDone/workDone.model.js';
// import { Attendance } from '../attendance/attendance.model.js';
// import { Employee } from '../employees/employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { ApiError } from '../../utils/ApiError.js';

// /* ────────────────────────────────────────────
//    ✅ System Devanagari fonts (no download needed)
//    Priority order:
//    1. Nirmala UI (Windows 10/11) — best
//    2. Mangal (older Windows)
//    3. Arial Unicode (fallback)
//    4. Helvetica (last resort — Hindi broken)
//    ──────────────────────────────────────────── */
// const SYSTEM_FONTS = {
//   regular: [
//     'C:\\Windows\\Fonts\\Nirmala.ttf',
//     'C:\\Windows\\Fonts\\mangal.ttf',
//     'C:\\Windows\\Fonts\\arialuni.ttf',
//     '/System/Library/Fonts/Supplemental/Devanagari Sangam MN.ttc',
//     '/Library/Fonts/Arial Unicode.ttf',
//     '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf',
//   ],
//   bold: [
//     'C:\\Windows\\Fonts\\NirmalaB.ttf',
//     'C:\\Windows\\Fonts\\mangalb.ttf',
//     'C:\\Windows\\Fonts\\arialunib.ttf',
//     '/System/Library/Fonts/Supplemental/Devanagari Sangam MN Bold.ttc',
//     '/Library/Fonts/Arial Unicode Bold.ttf',
//     '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf',
//   ],
// };

// /** Find first existing font file from a list */
// const findFont = (candidates) => {
//   for (const p of candidates) {
//     try {
//       if (fs.existsSync(p)) return p;
//     } catch {
//       // ignore
//     }
//   }
//   return null;
// };

// /** Register fonts on the document with graceful fallback */
// const registerFonts = (doc) => {
//   const regular = findFont(SYSTEM_FONTS.regular);
//   const bold = findFont(SYSTEM_FONTS.bold);

//   if (regular) {
//     try {
//       doc.registerFont('Devanagari', regular);
//       console.log(`✅ Loaded font: ${regular}`);
//     } catch (err) {
//       console.warn(`⚠️ Failed to load ${regular}: ${err.message}`);
//       doc.registerFont('Devanagari', 'Helvetica');
//     }
//   } else {
//     console.warn('⚠️ No Devanagari system font found — Hindi may render incorrectly');
//     doc.registerFont('Devanagari', 'Helvetica');
//   }

//   if (bold) {
//     try {
//       doc.registerFont('Devanagari-Bold', bold);
//     } catch {
//       doc.registerFont('Devanagari-Bold', 'Helvetica-Bold');
//     }
//   } else {
//     doc.registerFont('Devanagari-Bold', regular || 'Helvetica-Bold');
//   }
// };

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const monthRange = (year, month) => {
//   const start = `${year}-${String(month).padStart(2, '0')}-01`;
//   const lastDay = new Date(year, month, 0).getDate();
//   const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
//   return { start, end };
// };

// const assertEmployeeScope = async (req, employeeId) => {
//   const emp = await Employee.findById(employeeId);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   const user = req.user;
//   if (user.role === 'SUPER_ADMIN') return emp;
//   if (user.role === 'BPM' && String(user.blockId) === String(emp.blockId)) return emp;
//   if (user.role === 'CLF' && String(user.clfId) === String(emp.clfId)) return emp;
//   if (user.role === 'EMPLOYEE' && String(user._id) === String(emp.userId)) return emp;
//   throw ApiError.forbidden('Access denied');
// };

// /* ────────────────────────────────────────────
//    ACTION PLAN PDF
//    ──────────────────────────────────────────── */
// export const actionPlanPDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);
//   const { start, end } = monthRange(year, month);

//   const plans = await ActionPlan.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
//   registerFonts(doc);

//   // Header
//   doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.font('Devanagari-Bold').fontSize(14).text('ACTION PLAN REPORT', { align: 'center' });
//   doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();

//   // Employee info
//   doc.font('Devanagari').fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
//   doc.moveDown();

//   const tableTop = doc.y + 5;
//   const colDate = 40;
//   const colPlan = 120;

//   doc.font('Devanagari-Bold').fontSize(10);
//   doc.text('Date', colDate, tableTop);
//   doc.text('Action Plan', colPlan, tableTop);
//   doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

//   let y = tableTop + 22;
//   doc.font('Devanagari');

//   if (plans.length === 0) {
//     doc.fontSize(10).text('No action plans submitted in this month.', 40, y);
//   } else {
//     plans.forEach((p) => {
//       if (y > 750) {
//         doc.addPage();
//         registerFonts(doc);
//         y = 40;
//       }
//       const d = p.date.split('-').reverse().slice(0, 2).join('/');
//       const planText = p.plan || '-';

//       doc.font('Devanagari').fontSize(10).text(d, colDate, y);
//       const h = doc.heightOfString(planText, { width: 420 });
//       doc.font('Devanagari').fontSize(10).text(planText, colPlan, y, { width: 420 });
//       y += Math.max(20, h + 6);
//     });
//   }

//   doc.moveDown(2);
//   doc
//     .font('Devanagari')
//     .fontSize(9)
//     .fillColor('#666')
//     .text(`Total Days: ${plans.length}`, { align: 'right' });

//   doc.end();
//   return doc;
// };

// /* ────────────────────────────────────────────
//    WORK DONE PDF
//    ──────────────────────────────────────────── */
// export const workDonePDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);
//   const { start, end } = monthRange(year, month);

//   const works = await WorkDone.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
//   registerFonts(doc);

//   // Header
//   doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.font('Devanagari-Bold').fontSize(14).text('WORK DONE REPORT', { align: 'center' });
//   doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();

//   doc.font('Devanagari').fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
//   doc.moveDown();

//   let y = doc.y + 5;
//   const colDate = 40;
//   const colDesc = 110;
//   const colStatus = 500;

//   doc.font('Devanagari-Bold').fontSize(10);
//   doc.text('Date', colDate, y);
//   doc.text('Work Description', colDesc, y);
//   doc.text('Status', colStatus, y);
//   doc.moveTo(40, y + 15).lineTo(555, y + 15).stroke();
//   y += 24;

//   let approved = 0, rejected = 0, pending = 0;

//   if (works.length === 0) {
//     doc.font('Devanagari').fontSize(10).text('No work reports submitted in this month.', 40, y);
//   } else {
//     works.forEach((w) => {
//       if (y > 750) {
//         doc.addPage();
//         registerFonts(doc);
//         y = 40;
//       }

//       if (w.status === 'APPROVED') approved++;
//       else if (w.status === 'REJECTED') rejected++;
//       else pending++;

//       const d = w.date.split('-').reverse().slice(0, 2).join('/');
//       const desc = (w.description || 'No description').slice(0, 200);

//       doc.font('Devanagari').fontSize(10).fillColor('black').text(d, colDate, y, { width: 65 });

//       const descHeight = doc.heightOfString(desc, { width: 380 });
//       doc.font('Devanagari').fontSize(10).fillColor('black').text(desc, colDesc, y, { width: 380 });

//       const statusColor =
//         w.status === 'APPROVED' ? '#16A34A'
//         : w.status === 'REJECTED' ? '#DC2626'
//         : '#D97706';
//       doc.font('Devanagari').fontSize(10).fillColor(statusColor).text(w.status, colStatus, y, { width: 70 });
//       doc.fillColor('black');

//       y += Math.max(20, descHeight + 8);
//     });
//   }

//   const summaryY = Math.min(y + 20, 780);
//   doc
//     .font('Devanagari')
//     .fontSize(9)
//     .fillColor('#475569')
//     .text(
//       `Total: ${works.length} | Approved: ${approved} | Rejected: ${rejected} | Pending: ${pending}`,
//       40,
//       summaryY
//     );

//   doc.end();
//   return doc;
// };

// /* ────────────────────────────────────────────
//    ATTENDANCE EXCEL
//    ──────────────────────────────────────────── */
// export const attendanceExcel = async (req, { clfId, from, to }) => {
//   const user = req.user;
//   const filter = {};
//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (clfId) filter.clfId = clfId;

//   if (from || to) {
//     filter.date = {};
//     if (from) filter.date.$gte = from;
//     if (to) filter.date.$lte = to;
//   }

//   const records = await Attendance.find(filter)
//     .populate('employeeId', 'name employeeCode designation')
//     .sort({ date: 1 });

//   const wb = new ExcelJS.Workbook();
//   const ws = wb.addWorksheet('Attendance');
//   ws.columns = [
//     { header: 'Date', key: 'date', width: 15 },
//     { header: 'Employee Code', key: 'code', width: 18 },
//     { header: 'Name', key: 'name', width: 25 },
//     { header: 'Designation', key: 'designation', width: 20 },
//     { header: 'Status', key: 'status', width: 12 },
//     { header: 'Source', key: 'source', width: 22 },
//   ];
//   records.forEach((r) => {
//     ws.addRow({
//       date: r.date,
//       code: r.employeeId?.employeeCode || '',
//       name: r.employeeId?.name || '',
//       designation: r.employeeId?.designation || '',
//       status: r.status,
//       source: r.source,
//     });
//   });
//   ws.getRow(1).font = { bold: true };
//   return wb;
// };



// import PDFDocument from 'pdfkit';
// import ExcelJS from 'exceljs';
// import fs from 'fs';
// import { ActionPlan } from '../actionPlans/actionPlan.model.js';
// import { WorkDone } from '../workDone/workDone.model.js';
// import { Attendance } from '../attendance/attendance.model.js';
// import { Employee } from '../employees/employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { ApiError } from '../../utils/ApiError.js';

// /* ────────────────────────────────────────────
//    System Devanagari fonts (no download needed)
//    ──────────────────────────────────────────── */
// const SYSTEM_FONTS = {
//   regular: [
//     'C:\\Windows\\Fonts\\Nirmala.ttf',
//     'C:\\Windows\\Fonts\\mangal.ttf',
//     'C:\\Windows\\Fonts\\arialuni.ttf',
//     '/System/Library/Fonts/Supplemental/Devanagari Sangam MN.ttc',
//     '/Library/Fonts/Arial Unicode.ttf',
//     '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf',
//   ],
//   bold: [
//     'C:\\Windows\\Fonts\\NirmalaB.ttf',
//     'C:\\Windows\\Fonts\\mangalb.ttf',
//     'C:\\Windows\\Fonts\\arialunib.ttf',
//     '/System/Library/Fonts/Supplemental/Devanagari Sangam MN Bold.ttc',
//     '/Library/Fonts/Arial Unicode Bold.ttf',
//     '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf',
//   ],
// };

// const findFont = (candidates) => {
//   for (const p of candidates) {
//     try {
//       if (fs.existsSync(p)) return p;
//     } catch {
//       // ignore
//     }
//   }
//   return null;
// };

// const registerFonts = (doc) => {
//   const regular = findFont(SYSTEM_FONTS.regular);
//   const bold = findFont(SYSTEM_FONTS.bold);

//   if (regular) {
//     try {
//       doc.registerFont('Devanagari', regular);
//       console.log(`✅ Loaded font: ${regular}`);
//     } catch (err) {
//       console.warn(`⚠️ Failed to load ${regular}: ${err.message}`);
//       doc.registerFont('Devanagari', 'Helvetica');
//     }
//   } else {
//     console.warn('⚠️ No Devanagari system font found — Hindi may render incorrectly');
//     doc.registerFont('Devanagari', 'Helvetica');
//   }

//   if (bold) {
//     try {
//       doc.registerFont('Devanagari-Bold', bold);
//     } catch {
//       doc.registerFont('Devanagari-Bold', 'Helvetica-Bold');
//     }
//   } else {
//     doc.registerFont('Devanagari-Bold', regular || 'Helvetica-Bold');
//   }
// };

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const monthRange = (year, month) => {
//   const start = `${year}-${String(month).padStart(2, '0')}-01`;
//   const lastDay = new Date(year, month, 0).getDate();
//   const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
//   return { start, end };
// };

// const assertEmployeeScope = async (req, employeeId) => {
//   const emp = await Employee.findById(employeeId);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   const user = req.user;
//   if (user.role === 'SUPER_ADMIN') return emp;
//   if (user.role === 'BPM' && String(user.blockId) === String(emp.blockId)) return emp;
//   if (user.role === 'CLF' && String(user.clfId) === String(emp.clfId)) return emp;
//   if (user.role === 'EMPLOYEE' && String(user._id) === String(emp.userId)) return emp;
//   throw ApiError.forbidden('Access denied');
// };

// /* ────────────────────────────────────────────
//    ACTION PLAN PDF
//    ──────────────────────────────────────────── */
// export const actionPlanPDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);
//   const { start, end } = monthRange(year, month);

//   const plans = await ActionPlan.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
//   registerFonts(doc);

//   doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.font('Devanagari-Bold').fontSize(14).text('ACTION PLAN REPORT', { align: 'center' });
//   doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();

//   doc.font('Devanagari').fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
//   doc.moveDown();

//   const tableTop = doc.y + 5;
//   const colDate = 40;
//   const colPlan = 120;

//   doc.font('Devanagari-Bold').fontSize(10);
//   doc.text('Date', colDate, tableTop);
//   doc.text('Action Plan', colPlan, tableTop);
//   doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

//   let y = tableTop + 22;
//   doc.font('Devanagari');

//   if (plans.length === 0) {
//     doc.fontSize(10).text('No action plans submitted in this month.', 40, y);
//   } else {
//     plans.forEach((p) => {
//       if (y > 750) {
//         doc.addPage();
//         registerFonts(doc);
//         y = 40;
//       }
//       const d = p.date.split('-').reverse().slice(0, 2).join('/');
//       const planText = p.plan || '-';

//       doc.font('Devanagari').fontSize(10).text(d, colDate, y);
//       const h = doc.heightOfString(planText, { width: 420 });
//       doc.font('Devanagari').fontSize(10).text(planText, colPlan, y, { width: 420 });
//       y += Math.max(20, h + 6);
//     });
//   }

//   doc.moveDown(2);
//   doc
//     .font('Devanagari')
//     .fontSize(9)
//     .fillColor('#666')
//     .text(`Total Days: ${plans.length}`, { align: 'right' });

//   doc.end();
//   return doc;
// };

// /* ────────────────────────────────────────────
//    WORK DONE PDF
//    ──────────────────────────────────────────── */
// export const workDonePDF = async (req, { employeeId, year, month }) => {
//   const emp = await assertEmployeeScope(req, employeeId);
//   const clf = await CLF.findById(emp.clfId);
//   const { start, end } = monthRange(year, month);

//   const works = await WorkDone.find({
//     employeeId: emp._id,
//     date: { $gte: start, $lte: end },
//   }).sort({ date: 1 });

//   const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
//   registerFonts(doc);

//   doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
//   doc.font('Devanagari-Bold').fontSize(14).text('WORK DONE REPORT', { align: 'center' });
//   doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
//   doc.moveDown();

//   doc.font('Devanagari').fontSize(10);
//   doc.text(`Employee: ${emp.name}`);
//   doc.text(`Employee ID: ${emp.employeeCode}`);
//   doc.text(`Designation: ${emp.designation}`);
//   doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
//   doc.moveDown();

//   let y = doc.y + 5;
//   const colDate = 40;
//   const colDesc = 110;
//   const colStatus = 500;

//   doc.font('Devanagari-Bold').fontSize(10);
//   doc.text('Date', colDate, y);
//   doc.text('Work Description', colDesc, y);
//   doc.text('Status', colStatus, y);
//   doc.moveTo(40, y + 15).lineTo(555, y + 15).stroke();
//   y += 24;

//   let approved = 0, rejected = 0, pending = 0;

//   if (works.length === 0) {
//     doc.font('Devanagari').fontSize(10).text('No work reports submitted in this month.', 40, y);
//   } else {
//     works.forEach((w) => {
//       if (y > 750) {
//         doc.addPage();
//         registerFonts(doc);
//         y = 40;
//       }

//       if (w.status === 'APPROVED') approved++;
//       else if (w.status === 'REJECTED') rejected++;
//       else pending++;

//       const d = w.date.split('-').reverse().slice(0, 2).join('/');
//       const desc = (w.description || 'No description').slice(0, 200);

//       doc.font('Devanagari').fontSize(10).fillColor('black').text(d, colDate, y, { width: 65 });

//       const descHeight = doc.heightOfString(desc, { width: 380 });
//       doc.font('Devanagari').fontSize(10).fillColor('black').text(desc, colDesc, y, { width: 380 });

//       const statusColor =
//         w.status === 'APPROVED' ? '#16A34A'
//         : w.status === 'REJECTED' ? '#DC2626'
//         : '#D97706';
//       doc.font('Devanagari').fontSize(10).fillColor(statusColor).text(w.status, colStatus, y, { width: 70 });
//       doc.fillColor('black');

//       y += Math.max(20, descHeight + 8);
//     });
//   }

//   const summaryY = Math.min(y + 20, 780);
//   doc
//     .font('Devanagari')
//     .fontSize(9)
//     .fillColor('#475569')
//     .text(
//       `Total: ${works.length} | Approved: ${approved} | Rejected: ${rejected} | Pending: ${pending}`,
//       40,
//       summaryY
//     );

//   doc.end();
//   return doc;
// };

// /* ────────────────────────────────────────────
//    ATTENDANCE EXCEL — Matrix format
//    Same layout as the frontend attendance grid:
//    - Rows = employees
//    - Columns = days (1..N)
//    - Cell = P / A / H / L
//    - Last two columns: P total, A total
//    ──────────────────────────────────────────── */
// export const attendanceExcel = async (req, { clfId, from, to }) => {
//   const user = req.user;
//   const filter = {};

//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (clfId) filter.clfId = clfId;

//   if (from || to) {
//     filter.date = {};
//     if (from) filter.date.$gte = from;
//     if (to) filter.date.$lte = to;
//   }

//   const records = await Attendance.find(filter)
//     .populate('employeeId', 'name employeeCode designation')
//     .sort({ date: 1 });

//   // Determine month range from `from`
//   const refDate = from ? new Date(from) : new Date();
//   const year = refDate.getFullYear();
//   const month = refDate.getMonth() + 1;
//   const totalDays = new Date(year, month, 0).getDate();

//   // Build employee → { name, code, designation, days }
//   const matrixMap = new Map();

//   records.forEach((r) => {
//     const emp = r.employeeId;
//     if (!emp) return;
//     const id = String(emp._id);

//     if (!matrixMap.has(id)) {
//       matrixMap.set(id, {
//         name: emp.name || '—',
//         code: emp.employeeCode || '—',
//         designation: emp.designation || '—',
//         days: {},
//       });
//     }

//     const day = Number(r.date.split('-')[2]);
//     const statusLabel =
//       r.status === 'PRESENT' ? 'P'
//       : r.status === 'ABSENT' ? 'A'
//       : r.status === 'HALF_DAY' ? 'H'
//       : r.status === 'LEAVE' ? 'L'
//       : '';

//     matrixMap.get(id).days[day] = statusLabel;
//   });

//   const rows = Array.from(matrixMap.values()).sort((a, b) =>
//     String(a.code).localeCompare(String(b.code))
//   );

//   // ─── Build workbook ───
//   const wb = new ExcelJS.Workbook();
//   wb.creator = 'CLF Portal';
//   wb.created = new Date();

//   const ws = wb.addWorksheet(`Attendance ${month}-${year}`, {
//     views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
//   });

//   // Columns: Employee label + N day columns + P + A
//   ws.columns = [
//     { header: 'Employee', key: 'employee', width: 30 },
//     ...Array.from({ length: totalDays }, (_, i) => ({
//       header: String(i + 1),
//       key: `d${i + 1}`,
//       width: 4,
//     })),
//     { header: 'P', key: 'present', width: 5 },
//     { header: 'A', key: 'absent', width: 5 },
//   ];

//   // Header styling
//   const headerRow = ws.getRow(1);
//   headerRow.height = 22;
//   headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
//   headerRow.eachCell((cell, colNumber) => {
//     cell.fill = {
//       type: 'pattern',
//       pattern: 'solid',
//       fgColor: { argb: 'FFF1F5F9' },
//     };
//     cell.border = {
//       top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//       bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//       left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//       right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//     };

//     if (colNumber === 1) {
//       cell.font = { bold: true, color: { argb: 'FF334155' }, size: 11 };
//       cell.alignment = { horizontal: 'left', vertical: 'middle' };
//     } else if (colNumber === totalDays + 2) {
//       cell.font = { bold: true, color: { argb: 'FF15803D' }, size: 11 };
//     } else if (colNumber === totalDays + 3) {
//       cell.font = { bold: true, color: { argb: 'FFB91C1C' }, size: 11 };
//     } else {
//       cell.font = { bold: true, color: { argb: 'FF334155' }, size: 10 };
//     }
//   });

//   // Body rows
//   rows.forEach((row) => {
//     let p = 0;
//     let a = 0;
//     const values = {
//       employee: `${row.name}\n${row.code} • ${row.designation}`,
//     };

//     for (let d = 1; d <= totalDays; d++) {
//       const status = row.days[d] || '';
//       values[`d${d}`] = status;
//       if (status === 'P') p++;
//       else if (status === 'A') a++;
//     }
//     values.present = p;
//     values.absent = a;

//     const excelRow = ws.addRow(values);
//     excelRow.height = 30;

//     excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//       cell.border = {
//         top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//         bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//         left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//         right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
//       };

//       // Employee label column
//       if (colNumber === 1) {
//         cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
//         cell.font = { size: 10, color: { argb: 'FF0F172A' } };
//         return;
//       }

//       // P total column
//       if (colNumber === totalDays + 2) {
//         cell.alignment = { horizontal: 'center', vertical: 'middle' };
//         cell.font = { bold: true, color: { argb: 'FF15803D' }, size: 11 };
//         return;
//       }

//       // A total column
//       if (colNumber === totalDays + 3) {
//         cell.alignment = { horizontal: 'center', vertical: 'middle' };
//         cell.font = { bold: true, color: { argb: 'FFB91C1C' }, size: 11 };
//         return;
//       }

//       // Day cells — color-coded
//       cell.alignment = { horizontal: 'center', vertical: 'middle' };
//       const v = cell.value;
//       let bg = 'FFFFFFFF';
//       let fg = 'FFCBD5E1';
//       if (v === 'P') { bg = 'FFDCFCE7'; fg = 'FF15803D'; }
//       else if (v === 'A') { bg = 'FFFEE2E2'; fg = 'FFB91C1C'; }
//       else if (v === 'H') { bg = 'FFFEF3C7'; fg = 'FFB45309'; }
//       else if (v === 'L') { bg = 'FFDBEAFE'; fg = 'FF1D4ED8'; }

//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: bg },
//       };
//       cell.font = { bold: true, color: { argb: fg }, size: 10 };
//     });
//   });

//   return wb;
// };



import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import fs from 'fs';
import { ActionPlan } from '../actionPlans/actionPlan.model.js';
import { WorkDone } from '../workDone/workDone.model.js';
import { Attendance } from '../attendance/attendance.model.js';
import { Employee } from '../employees/employee.model.js';
import { CLF } from '../clfs/clf.model.js';
import { ApiError } from '../../utils/ApiError.js';

/* ────────────────────────────────────────────
   System Devanagari fonts (no download needed)
   ──────────────────────────────────────────── */
const SYSTEM_FONTS = {
  regular: [
    'C:\\Windows\\Fonts\\Nirmala.ttf',
    'C:\\Windows\\Fonts\\mangal.ttf',
    'C:\\Windows\\Fonts\\arialuni.ttf',
    '/System/Library/Fonts/Supplemental/Devanagari Sangam MN.ttc',
    '/Library/Fonts/Arial Unicode.ttf',
    '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf',
  ],
  bold: [
    'C:\\Windows\\Fonts\\NirmalaB.ttf',
    'C:\\Windows\\Fonts\\mangalb.ttf',
    'C:\\Windows\\Fonts\\arialunib.ttf',
    '/System/Library/Fonts/Supplemental/Devanagari Sangam MN Bold.ttc',
    '/Library/Fonts/Arial Unicode Bold.ttf',
    '/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf',
  ],
};

const findFont = (candidates) => {
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      // ignore
    }
  }
  return null;
};

const registerFonts = (doc) => {
  const regular = findFont(SYSTEM_FONTS.regular);
  const bold = findFont(SYSTEM_FONTS.bold);

  if (regular) {
    try {
      doc.registerFont('Devanagari', regular);
      console.log(`✅ Loaded font: ${regular}`);
    } catch (err) {
      console.warn(`⚠️ Failed to load ${regular}: ${err.message}`);
      doc.registerFont('Devanagari', 'Helvetica');
    }
  } else {
    console.warn('⚠️ No Devanagari system font found — Hindi may render incorrectly');
    doc.registerFont('Devanagari', 'Helvetica');
  }

  if (bold) {
    try {
      doc.registerFont('Devanagari-Bold', bold);
    } catch {
      doc.registerFont('Devanagari-Bold', 'Helvetica-Bold');
    }
  } else {
    doc.registerFont('Devanagari-Bold', regular || 'Helvetica-Bold');
  }
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const monthRange = (year, month) => {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { start, end };
};

const assertEmployeeScope = async (req, employeeId) => {
  const emp = await Employee.findById(employeeId);
  if (!emp) throw ApiError.notFound('Employee not found');
  const user = req.user;
  if (user.role === 'SUPER_ADMIN') return emp;
  if (user.role === 'BPM' && String(user.blockId) === String(emp.blockId)) return emp;
  if (user.role === 'CLF' && String(user.clfId) === String(emp.clfId)) return emp;
  if (user.role === 'EMPLOYEE' && String(user._id) === String(emp.userId)) return emp;
  throw ApiError.forbidden('Access denied');
};

/* ────────────────────────────────────────────
   ACTION PLAN PDF
   ──────────────────────────────────────────── */
export const actionPlanPDF = async (req, { employeeId, year, month }) => {
  const emp = await assertEmployeeScope(req, employeeId);
  const clf = await CLF.findById(emp.clfId);
  const { start, end } = monthRange(year, month);

  const plans = await ActionPlan.find({
    employeeId: emp._id,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });

  const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
  registerFonts(doc);

  doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
  doc.font('Devanagari-Bold').fontSize(14).text('ACTION PLAN REPORT', { align: 'center' });
  doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
  doc.moveDown();

  doc.font('Devanagari').fontSize(10);
  doc.text(`Employee: ${emp.name}`);
  doc.text(`Employee ID: ${emp.employeeCode}`);
  doc.text(`Designation: ${emp.designation}`);
  doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
  doc.moveDown();

  const tableTop = doc.y + 5;
  const colDate = 40;
  const colPlan = 120;

  doc.font('Devanagari-Bold').fontSize(10);
  doc.text('Date', colDate, tableTop);
  doc.text('Action Plan', colPlan, tableTop);
  doc.moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();

  let y = tableTop + 22;
  doc.font('Devanagari');

  if (plans.length === 0) {
    doc.fontSize(10).text('No action plans submitted in this month.', 40, y);
  } else {
    plans.forEach((p) => {
      if (y > 750) {
        doc.addPage();
        registerFonts(doc);
        y = 40;
      }
      const d = p.date.split('-').reverse().slice(0, 2).join('/');
      const planText = p.plan || '-';

      doc.font('Devanagari').fontSize(10).text(d, colDate, y);
      const h = doc.heightOfString(planText, { width: 420 });
      doc.font('Devanagari').fontSize(10).text(planText, colPlan, y, { width: 420 });
      y += Math.max(20, h + 6);
    });
  }

  doc.moveDown(2);
  doc
    .font('Devanagari')
    .fontSize(9)
    .fillColor('#666')
    .text(`Total Days: ${plans.length}`, { align: 'right' });

  doc.end();
  return doc;
};

/* ────────────────────────────────────────────
   WORK DONE PDF
   ──────────────────────────────────────────── */
export const workDonePDF = async (req, { employeeId, year, month }) => {
  const emp = await assertEmployeeScope(req, employeeId);
  const clf = await CLF.findById(emp.clfId);
  const { start, end } = monthRange(year, month);

  const works = await WorkDone.find({
    employeeId: emp._id,
    date: { $gte: start, $lte: end },
  }).sort({ date: 1 });

  const doc = new PDFDocument({ size: 'A4', margin: 40, bufferPages: true });
  registerFonts(doc);

  doc.font('Devanagari-Bold').fontSize(16).text(clf?.name || 'CLF', { align: 'center' });
  doc.font('Devanagari-Bold').fontSize(14).text('WORK DONE REPORT', { align: 'center' });
  doc.font('Devanagari').fontSize(11).text(`${MONTHS[month - 1]} ${year}`, { align: 'center' });
  doc.moveDown();

  doc.font('Devanagari').fontSize(10);
  doc.text(`Employee: ${emp.name}`);
  doc.text(`Employee ID: ${emp.employeeCode}`);
  doc.text(`Designation: ${emp.designation}`);
  doc.text(`Panchayat: ${emp.workLocation?.panchayat || '-'}`);
  doc.moveDown();

  let y = doc.y + 5;
  const colDate = 40;
  const colDesc = 110;
  const colStatus = 500;

  doc.font('Devanagari-Bold').fontSize(10);
  doc.text('Date', colDate, y);
  doc.text('Work Description', colDesc, y);
  doc.text('Status', colStatus, y);
  doc.moveTo(40, y + 15).lineTo(555, y + 15).stroke();
  y += 24;

  let approved = 0, rejected = 0, pending = 0;

  if (works.length === 0) {
    doc.font('Devanagari').fontSize(10).text('No work reports submitted in this month.', 40, y);
  } else {
    works.forEach((w) => {
      if (y > 750) {
        doc.addPage();
        registerFonts(doc);
        y = 40;
      }

      if (w.status === 'APPROVED') approved++;
      else if (w.status === 'REJECTED') rejected++;
      else pending++;

      const d = w.date.split('-').reverse().slice(0, 2).join('/');
      const desc = (w.description || 'No description').slice(0, 200);

      doc.font('Devanagari').fontSize(10).fillColor('black').text(d, colDate, y, { width: 65 });

      const descHeight = doc.heightOfString(desc, { width: 380 });
      doc.font('Devanagari').fontSize(10).fillColor('black').text(desc, colDesc, y, { width: 380 });

      const statusColor =
        w.status === 'APPROVED' ? '#16A34A'
        : w.status === 'REJECTED' ? '#DC2626'
        : '#D97706';
      doc.font('Devanagari').fontSize(10).fillColor(statusColor).text(w.status, colStatus, y, { width: 70 });
      doc.fillColor('black');

      y += Math.max(20, descHeight + 8);
    });
  }

  const summaryY = Math.min(y + 20, 780);
  doc
    .font('Devanagari')
    .fontSize(9)
    .fillColor('#475569')
    .text(
      `Total: ${works.length} | Approved: ${approved} | Rejected: ${rejected} | Pending: ${pending}`,
      40,
      summaryY
    );

  doc.end();
  return doc;
};

/* ────────────────────────────────────────────
   ATTENDANCE EXCEL — Matrix format
   ✅ Includes ALL active employees (even with zero records)
   ──────────────────────────────────────────── */
export const attendanceExcel = async (req, { clfId, from, to }) => {
  const user = req.user;

  // ─── Scope filter for employees ───
  const employeeFilter = {};
  if (user.role === 'CLF') employeeFilter.clfId = user.clfId;
  else if (user.role === 'BPM') employeeFilter.blockId = user.blockId;
  else if (clfId) employeeFilter.clfId = clfId;

  // ─── Fetch ALL active employees (so even zero-attendance ones show up) ───
  const employees = await Employee.find({
    ...employeeFilter,
    status: 'ACTIVE',
  })
    .select('name employeeCode designation')
    .sort({ employeeCode: 1 });

  // ─── Fetch attendance records ───
  const attFilter = { ...employeeFilter };
  if (from || to) {
    attFilter.date = {};
    if (from) attFilter.date.$gte = from;
    if (to) attFilter.date.$lte = to;
  }

  const records = await Attendance.find(attFilter).sort({ date: 1 });

  // ─── Month range ───
  const refDate = from ? new Date(from) : new Date();
  const year = refDate.getFullYear();
  const month = refDate.getMonth() + 1;
  const totalDays = new Date(year, month, 0).getDate();

  // ─── Build matrix ───
  const matrixMap = new Map();

  // Step 1: Seed EVERY active employee — days empty initially
  employees.forEach((emp) => {
    matrixMap.set(String(emp._id), {
      name: emp.name || '—',
      code: emp.employeeCode || '—',
      designation: emp.designation || '—',
      days: {},
    });
  });

  // Step 2: Fill in attendance
  records.forEach((r) => {
    const id = String(r.employeeId);
    if (!matrixMap.has(id)) {
      // attendance exists for an employee not in active list — still include
      matrixMap.set(id, {
        name: r.employeeId?.name || '—',
        code: r.employeeId?.employeeCode || '—',
        designation: r.employeeId?.designation || '—',
        days: {},
      });
    }

    const day = Number(r.date.split('-')[2]);
    const statusLabel =
      r.status === 'PRESENT' ? 'P'
      : r.status === 'ABSENT' ? 'A'
      : r.status === 'HALF_DAY' ? 'H'
      : r.status === 'LEAVE' ? 'L'
      : '';

    matrixMap.get(id).days[day] = statusLabel;
  });

  const rows = Array.from(matrixMap.values()).sort((a, b) =>
    String(a.code).localeCompare(String(b.code))
  );

  // ─── Build workbook ───
  const wb = new ExcelJS.Workbook();
  wb.creator = 'CLF Portal';
  wb.created = new Date();

  const ws = wb.addWorksheet(`Attendance ${month}-${year}`, {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  });

  // Columns
  ws.columns = [
    { header: 'Employee', key: 'employee', width: 30 },
    ...Array.from({ length: totalDays }, (_, i) => ({
      header: String(i + 1),
      key: `d${i + 1}`,
      width: 4,
    })),
    { header: 'P', key: 'present', width: 5 },
    { header: 'A', key: 'absent', width: 5 },
  ];

  // Header styling
  const headerRow = ws.getRow(1);
  headerRow.height = 22;
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.eachCell((cell, colNumber) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF1F5F9' },
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    };

    if (colNumber === 1) {
      cell.font = { bold: true, color: { argb: 'FF334155' }, size: 11 };
      cell.alignment = { horizontal: 'left', vertical: 'middle' };
    } else if (colNumber === totalDays + 2) {
      cell.font = { bold: true, color: { argb: 'FF15803D' }, size: 11 };
    } else if (colNumber === totalDays + 3) {
      cell.font = { bold: true, color: { argb: 'FFB91C1C' }, size: 11 };
    } else {
      cell.font = { bold: true, color: { argb: 'FF334155' }, size: 10 };
    }
  });

  // Body rows
  rows.forEach((row) => {
    let p = 0;
    let a = 0;
    const values = {
      employee: `${row.name}\n${row.code} • ${row.designation}`,
    };

    for (let d = 1; d <= totalDays; d++) {
      const status = row.days[d] || '';
      values[`d${d}`] = status;
      if (status === 'P') p++;
      else if (status === 'A') a++;
    }
    values.present = p;
    values.absent = a;

    const excelRow = ws.addRow(values);
    excelRow.height = 30;

    excelRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };

      // Employee label column
      if (colNumber === 1) {
        cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };
        cell.font = { size: 10, color: { argb: 'FF0F172A' } };
        return;
      }

      // P total column
      if (colNumber === totalDays + 2) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.font = { bold: true, color: { argb: 'FF15803D' }, size: 11 };
        return;
      }

      // A total column
      if (colNumber === totalDays + 3) {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.font = { bold: true, color: { argb: 'FFB91C1C' }, size: 11 };
        return;
      }

      // Day cells — color coded
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      const v = cell.value;
      let bg = 'FFFFFFFF';
      let fg = 'FFCBD5E1';
      if (v === 'P') { bg = 'FFDCFCE7'; fg = 'FF15803D'; }
      else if (v === 'A') { bg = 'FFFEE2E2'; fg = 'FFB91C1C'; }
      else if (v === 'H') { bg = 'FFFEF3C7'; fg = 'FFB45309'; }
      else if (v === 'L') { bg = 'FFDBEAFE'; fg = 'FF1D4ED8'; }

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: bg },
      };
      cell.font = { bold: true, color: { argb: fg }, size: 10 };
    });
  });

  return wb;
};