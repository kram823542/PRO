// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import mongoose from 'mongoose';
// import { Advice } from './advice.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';
// import { getISTDateString } from '../../utils/security.js';

// /* ────────────────────────────────────────────
//    Fonts — Work Done PDF wale same SYSTEM_FONTS
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
//       /* ignore */
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
//     } catch {
//       doc.registerFont('Devanagari', 'Helvetica');
//     }
//   } else {
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

// /* ────────────────────────────────────────────
//    Helpers
//    ──────────────────────────────────────────── */
// const formatAmountInWords = (num) => {
//   if (!num || num === 0) return 'Zero Rupees Only';
//   const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
//   const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

//   const numToWords = (n) => {
//     if (n < 10) return ones[n];
//     if (n < 20) return teens[n - 10];
//     if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
//     if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
//     if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
//     if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
//     return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
//   };

//   return numToWords(Math.floor(num)) + ' Rupees Only';
// };

// const getBankShortName = (fullName) => {
//   if (!fullName) return '';
//   const map = {
//     'state bank of india': 'SBI',
//     'punjab national bank': 'PNB',
//     'bank of india': 'BOI',
//     'bank of baroda': 'BOB',
//     'canara bank': 'Canara',
//     'union bank of india': 'UBI',
//     'indian bank': 'Indian Bank',
//     'hdfc bank': 'HDFC',
//     'icici bank': 'ICICI',
//     'axis bank': 'Axis',
//     'jharkhand rajya gramin bank': 'JRGB',
//     'jharkhand gramin bank': 'JGB',
//   };
//   const key = fullName.toLowerCase().trim();
//   return map[key] || fullName;
// };

// /** ✅ Next advice number generate karo — SAT/CLF/2026/001 */
// const generateAdviceNumber = async (clfId) => {
//   const year = new Date().getFullYear();
//   const count = await Advice.countDocuments({ clfId, adviceNumber: { $regex: `/${year}/` } });
//   return `SAT/CLF/${year}/${String(count + 1).padStart(3, '0')}`;
// };

// /** ✅ Common: Scope check */
// const assertScope = async (user, clfId) => {
//   const clf = await CLF.findById(clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');

//   if (user.role === 'SUPER_ADMIN') return clf;
//   if (user.role === 'BPM' && String(user.blockId) === String(clf.blockId)) return clf;
//   if (user.role === 'CLF' && String(user.clfId) === String(clf._id)) return clf;
//   throw ApiError.forbidden('Access denied');
// };

// /* ────────────────────────────────────────────
//    CREATE — Advice store + PDF return
//    ──────────────────────────────────────────── */
// export const createAdvice = async (req, data) => {
//   const user = req.user;

//   const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
//   if (!clfId) throw ApiError.badRequest('CLF is required');

//   const clf = await assertScope(user, clfId);

//   if (!data.employees || !data.employees.length) {
//     throw ApiError.badRequest('At least one employee required');
//   }

//   // ✅ Validate each row
//   const cleaned = data.employees.map((e, i) => {
//     if (!e.name || !e.name.trim()) {
//       throw ApiError.badRequest(`Row ${i + 1}: name is required`);
//     }
//     const amt = Number(e.amount);
//     if (!amt || amt <= 0) {
//       throw ApiError.badRequest(`Row ${i + 1}: amount must be greater than 0`);
//     }
//     return {
//       sl: i + 1,
//       name: String(e.name).trim(),
//       month: e.month ? String(e.month).trim() : '',
//       bankAccountNumber: e.bankAccountNumber ? String(e.bankAccountNumber).trim() : '',
//       bankName: e.bankName ? String(e.bankName).trim() : '',
//       branch: e.branch ? String(e.branch).trim() : '',
//       ifscCode: e.ifscCode ? String(e.ifscCode).trim().toUpperCase() : '',
//       amount: amt,
//     };
//   });

//   const totalAmount = cleaned.reduce((s, e) => s + e.amount, 0);

//   // ✅ Advice number
//   const adviceNumber = await generateAdviceNumber(clfId);

//   // ✅ Save to DB
//   const advice = await Advice.create({
//     adviceType: data.adviceType === 'EXPENSE' ? 'EXPENSE' : 'SALARY',
//     adviceNumber,
//     adviceDate: data.adviceDate || getISTDateString(),
//     createdByRole: user.role,
//     createdByUser: user._id,
//     createdByName: user.name || '',
//     clfId: clf._id,
//     blockId: clf.blockId,
//     bankName: data.bankName || '',
//     branch: data.branch || '',
//     employees: cleaned,
//     totalAmount,
//     totalRows: cleaned.length,
//   });

//   await createAudit({
//     req,
//     action: 'ADVICE_CREATED',
//     targetType: 'Advice',
//     targetId: advice._id,
//     metadata: {
//       adviceNumber,
//       totalAmount,
//       rows: cleaned.length,
//       adviceType: advice.adviceType,
//     },
//   });

//   return advice;
// };

// /* ────────────────────────────────────────────
//    LIST — CLF/BPM apni advices dekhe
//    ──────────────────────────────────────────── */
// export const listAdvices = async (req, query) => {
//   const user = req.user;
//   const filter = { isDeleted: false };

//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

//   if (query.adviceType) filter.adviceType = query.adviceType;

//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(100, parseInt(query.limit) || 20);

//   const [items, total] = await Promise.all([
//     Advice.find(filter)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean(),
//     Advice.countDocuments(filter),
//   ]);

//   return {
//     advices: items,
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//   };
// };

// /* ────────────────────────────────────────────
//    GET ONE
//    ──────────────────────────────────────────── */
// export const getAdvice = async (req, id) => {
//   const advice = await Advice.findById(id);
//   if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');
//   await assertScope(req.user, advice.clfId);
//   return advice;
// };

// /* ────────────────────────────────────────────
//    DELETE — hard delete
//    ──────────────────────────────────────────── */
// export const deleteAdvice = async (req, id) => {
//   const advice = await Advice.findById(id);
//   if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');

//   const user = req.user;
//   if (user.role === 'CLF' && String(user.clfId) !== String(advice.clfId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(advice.blockId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (!['CLF', 'BPM', 'SUPER_ADMIN'].includes(user.role)) {
//     throw ApiError.forbidden('Not allowed to delete');
//   }

//   // ✅ Soft delete
//   advice.isDeleted = true;
//   advice.deletedAt = new Date();
//   advice.deletedBy = user._id;
//   await advice.save();

//   await createAudit({
//     req,
//     action: 'ADVICE_DELETED',
//     targetType: 'Advice',
//     targetId: advice._id,
//     metadata: { adviceNumber: advice.adviceNumber },
//   });

//   return { deleted: true, adviceNumber: advice.adviceNumber };
// };

// /* ────────────────────────────────────────────
//    PDF GENERATE — pdfkit se
//    ──────────────────────────────────────────── */
// export const generateAdvicePDF = async (req, id, res) => {
//   const advice = await Advice.findById(id);
//   if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');
//   await assertScope(req.user, advice.clfId);

//   // ✅ PDF ka page setup
//   const doc = new PDFDocument({
//     size: 'A4',
//     margin: 0,
//     bufferPages: true,
//     autoFirstPage: false,
//   });
//   registerFonts(doc);

//   const pageWidth = 595.28;  // A4 in points
//   const pageHeight = 841.89;
//   const marginLeft = 30;
//   const marginRight = 30;
//   const contentWidth = pageWidth - marginLeft - marginRight;

//   const employees = advice.employees;
//   const totalAmount = advice.totalAmount;

//   /* ─── Chunking (page distribution) ─── */
//   const PAGE_1_MAX = 5;
//   const PAGE_NEXT_MAX = 11;
//   const SIGNATURE_FITS_THRESHOLD = 4;

//   const chunks = [];
//   if (employees.length <= PAGE_1_MAX) {
//     chunks.push(employees);
//   } else {
//     chunks.push(employees.slice(0, PAGE_1_MAX));
//     let rem = employees.slice(PAGE_1_MAX);
//     while (rem.length > 0) {
//       chunks.push(rem.slice(0, PAGE_NEXT_MAX));
//       rem = rem.slice(PAGE_NEXT_MAX);
//     }
//   }
//   const lastChunk = chunks[chunks.length - 1];
//   if (lastChunk.length > SIGNATURE_FITS_THRESHOLD) chunks.push([]);

//   /* ─── Header strip helper ─── */
//   const drawStrip = (y) => {
//     const h = 8;
//     const w1 = contentWidth * 0.3;
//     const w2 = contentWidth * 0.7;
//     doc.rect(marginLeft, y, w1, h).fill('#82c828');
//     doc.rect(marginLeft + w1, y, w2, h).fill('#e05a10');
//     doc.fillColor('black');
//   };

//   /* ─── Render each page ─── */
//   chunks.forEach((chunk, pageIndex) => {
//     doc.addPage({ size: 'A4', margin: 0 });

//     const isLastPage = pageIndex === chunks.length - 1;
//     const isSignatureOnlyPage = isLastPage && chunk.length === 0;

//     let y = 30;

//     // ─── TOP STRIP ───
//     drawStrip(y);
//     y += 18;

//     // ─── LOGO + CLF TITLE ───
//     // (Logos ko skip kar rahe hain — external URL fetch karna complex hai)
//     // बस text title center me
//     doc.font('Devanagari-Bold').fontSize(20).fillColor('black');
//     doc.text('सतबरवा आजीविका महिला संकुल स्तरीय', 0, y, {
//       width: pageWidth,
//       align: 'center',
//     });
//     y += 24;
//     doc.font('Devanagari-Bold').fontSize(15);
//     doc.text('प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड', 0, y, {
//       width: pageWidth,
//       align: 'center',
//     });
//     y += 22;
//     doc.font('Devanagari').fontSize(9);
//     doc.text('ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)', 0, y, {
//       width: pageWidth,
//       align: 'center',
//     });
//     y += 13;
//     doc.text('निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023', 0, y, {
//       width: pageWidth,
//       align: 'center',
//     });
//     y += 20;

//     // ─── BOTTOM STRIP ───
//     drawStrip(y);
//     y += 18;

//     // ─── PATRANK / DINANK ───
//     doc.font('Devanagari').fontSize(10).fillColor('black');
//     const dateStr = new Date(advice.adviceDate).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//     doc.text(`पत्रांक - ${advice.adviceNumber}`, marginLeft, y);
//     doc.text(`दिनांक - ${dateStr}`, marginLeft, y, {
//       width: contentWidth,
//       align: 'right',
//     });
//     y += 18;

//     // ─── PAGE 1: FULL HEADER CONTENT ───
//     if (pageIndex === 0) {
//       doc.font('Devanagari-Bold').fontSize(10).text('To', marginLeft, y);
//       y += 12;
//       doc.font('Devanagari').fontSize(10).text('The Branch Manager', marginLeft, y);
//       y += 12;
//       doc.text(advice.bankName || '-', marginLeft, y);
//       y += 12;
//       if (advice.branch) {
//         doc.text(`Branch: ${advice.branch}`, marginLeft, y);
//         y += 12;
//       }
//       y += 4;
//       doc
//         .font('Devanagari-Bold')
//         .fontSize(11)
//         .text('Subject: Bank Advice for transfer', marginLeft, y, {
//           underline: true,
//         });
//       y += 18;
//       doc.font('Devanagari').fontSize(10);
//       doc.text(
//         'Ref: SB Account number : सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No. 265200010080538',
//         marginLeft,
//         y,
//         { width: contentWidth }
//       );
//       y += 24;
//       doc.text('Dear Sir,', marginLeft, y);
//       y += 14;
//       doc.text(
//         `Please debit a sum of Rs. ${totalAmount.toLocaleString('en-IN')}/- (${formatAmountInWords(
//           totalAmount
//         )}) From our saving bank account of सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No. 265200010080538 by the fastest mode of remittance as per the details given below:`,
//         marginLeft,
//         y,
//         { width: contentWidth, align: 'justify' }
//       );
//       y = doc.y + 12;
//     } else {
//       // subsequent pages: sirf page number
//       doc.font('Devanagari').fontSize(10);
//       doc.text(`(Page ${pageIndex + 1} of ${chunks.length})`, 0, y, {
//         width: pageWidth,
//         align: 'center',
//       });
//       y += 18;
//     }

//     // ─── TABLE ───
//     if (!isSignatureOnlyPage) {
//       const colWidths = {
//         sl: 22,
//         name: 90,
//         month: 70,
//         bankAccountNumber: 95,
//         bank: 55,
//         branch: 60,
//         ifsc: 75,
//         amount: 68,
//       };
//       const totalTableWidth =
//         colWidths.sl +
//         colWidths.name +
//         colWidths.month +
//         colWidths.bankAccountNumber +
//         colWidths.bank +
//         colWidths.branch +
//         colWidths.ifsc +
//         colWidths.amount;

//       const startX = marginLeft + (contentWidth - totalTableWidth) / 2;
//       const rowHeight = 20;

//       // Header row
//       let x = startX;
//       const headers = [
//         { w: colWidths.sl, label: 'Sl.' },
//         { w: colWidths.name, label: 'Name' },
//         { w: colWidths.month, label: 'Month' },
//         { w: colWidths.bankAccountNumber, label: 'Bank A/c' },
//         { w: colWidths.bank, label: 'Bank' },
//         { w: colWidths.branch, label: 'Branch' },
//         { w: colWidths.ifsc, label: 'IFSC' },
//         { w: colWidths.amount, label: 'Amount' },
//       ];

//       // Header background
//       doc.rect(startX, y, totalTableWidth, rowHeight).fill('#F3F4F6');
//       doc.fillColor('black');
//       doc.font('Devanagari-Bold').fontSize(8);

//       headers.forEach((h) => {
//         doc.rect(x, y, h.w, rowHeight).stroke();
//         doc.text(h.label, x + 3, y + 6, {
//           width: h.w - 6,
//           align: h.label === 'Amount' ? 'right' : 'left',
//         });
//         x += h.w;
//       });
//       y += rowHeight;

//       // Body rows
//       doc.font('Devanagari').fontSize(8);
//       chunk.forEach((emp) => {
//         x = startX;
//         const rowValues = [
//           { w: colWidths.sl, value: `${emp.sl}.`, align: 'center' },
//           { w: colWidths.name, value: emp.name, align: 'left' },
//           { w: colWidths.month, value: emp.month || '-', align: 'left' },
//           { w: colWidths.bankAccountNumber, value: emp.bankAccountNumber || '-', align: 'left' },
//           { w: colWidths.bank, value: getBankShortName(emp.bankName), align: 'left' },
//           { w: colWidths.branch, value: emp.branch || '-', align: 'left' },
//           { w: colWidths.ifsc, value: emp.ifscCode || '-', align: 'left' },
//           {
//             w: colWidths.amount,
//             value: emp.amount.toLocaleString('en-IN'),
//             align: 'right',
//           },
//         ];
//         rowValues.forEach((v) => {
//           doc.rect(x, y, v.w, rowHeight).stroke();
//           doc.text(v.value, x + 3, y + 6, {
//             width: v.w - 6,
//             align: v.align,
//             lineBreak: false,
//             ellipsis: true,
//           });
//           x += v.w;
//         });
//         y += rowHeight;
//       });

//       // TOTAL row on last page
//       if (isLastPage && chunk.length > 0) {
//         x = startX;
//         const totalRowValues = [
//           { w: colWidths.sl + colWidths.name + colWidths.month + colWidths.bankAccountNumber + colWidths.bank + colWidths.branch + colWidths.ifsc, value: 'TOTAL', align: 'right', bold: true },
//           { w: colWidths.amount, value: `${totalAmount.toLocaleString('en-IN')}.00`, align: 'right', bold: true },
//         ];
//         totalRowValues.forEach((v) => {
//           doc.rect(x, y, v.w, rowHeight).fillAndStroke('#F9FAFB', 'black');
//           doc.fillColor('black');
//           doc.font(v.bold ? 'Devanagari-Bold' : 'Devanagari').fontSize(9);
//           doc.text(v.value, x + 3, y + 6, {
//             width: v.w - 6,
//             align: v.align,
//           });
//           x += v.w;
//         });
//         y += rowHeight + 10;

//         doc.font('Devanagari').fontSize(10);
//         doc.text(
//           `Rs. ${totalAmount.toLocaleString('en-IN')}/- (${formatAmountInWords(totalAmount)})`,
//           marginLeft,
//           y,
//           { width: contentWidth }
//         );
//         y = doc.y + 10;
//       } else {
//         y += 6;
//       }
//     }

//     // ─── SIGNATURE + FOOTER on last page ───
//     if (isLastPage) {
//       const footerTop = pageHeight - 110;

//       // Signature row
//       const sigY = footerTop - 40;
//       const sigWidth = 80;
//       const gap = 20;
//       const sigLabels = ['अध्यक्ष', 'सचिव', 'कोषाध्यक्ष'];

//       doc.font('Devanagari-Bold').fontSize(10);
//       sigLabels.forEach((label, i) => {
//         const sx = marginLeft + i * (sigWidth + gap);
//         doc.moveTo(sx, sigY).lineTo(sx + sigWidth, sigY).stroke();
//         doc.text(label, sx, sigY + 4, { width: sigWidth, align: 'center' });
//       });

//       // Thanking You block
//       doc.font('Devanagari-Bold').fontSize(9);
//       const rightX = marginLeft + contentWidth - 180;
//       doc.text('Thanking You.', rightX, sigY - 30, { width: 180, align: 'right' });
//       doc.text('सतबरवा आजीविका महिला संकुल स्तरीय', rightX, sigY - 16, {
//         width: 180,
//         align: 'right',
//       });
//       doc.text('प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड', rightX, sigY - 4, {
//         width: 180,
//         align: 'right',
//       });

//       // Footer strip
//       drawStrip(footerTop);
//       let fy = footerTop + 14;
//       doc.font('Devanagari').fontSize(7.5).fillColor('black');
//       const footerLines = [
//         'प्रखंड कार्यालय :- प्रखंड मिशन प्रबंधन इकाई, राँची रोड, सतबरवा पलामू 822126',
//         'जिला कार्यालय :- जिला मिशन प्रबंधन इकाई, पुराना DRDA कार्यालय भवन , पलामू , 822102',
//         'राज्य कार्यालय :- द्वितीय तल, झारखण्ड राज्य कृषि विपणन पर्षद, ईटकी रोड, हेहल,राँची – 834005 झारखण्ड',
//         'फोन नं0 0651 2360038 / 2360142',
//       ];
//       footerLines.forEach((line) => {
//         doc.text(line, 0, fy, { width: pageWidth, align: 'center' });
//         fy += 10;
//       });
//     }
//   });

//   /* ─── Stream PDF to response ─── */
//   const filename = `Advice-${advice.adviceNumber.replace(/\//g, '-')}.pdf`;

//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

//   doc.pipe(res);
//   doc.end();
// };


import PDFDocument from 'pdfkit';
import fs from 'fs';
import mongoose from 'mongoose';
import { Advice } from './advice.model.js';
import { CLF } from '../clfs/clf.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { createAudit } from '../../middlewares/audit.middleware.js';
import { getISTDateString } from '../../utils/security.js';

/* ────────────────────────────────────────────
   Fonts
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
      /* ignore */
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
    } catch {
      doc.registerFont('Devanagari', 'Helvetica');
    }
  } else {
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

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */
const formatAmountInWords = (num) => {
  if (!num || num === 0) return 'Zero Rupees Only';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const numToWords = (n) => {
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
    return numToWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
  };

  return numToWords(Math.floor(num)) + ' Rupees Only';
};

const getBankShortName = (fullName) => {
  if (!fullName) return '';
  const map = {
    'state bank of india': 'SBI',
    'punjab national bank': 'PNB',
    'bank of india': 'BOI',
    'bank of baroda': 'BOB',
    'canara bank': 'Canara',
    'union bank of india': 'UBI',
    'indian bank': 'Indian Bank',
    'hdfc bank': 'HDFC',
    'icici bank': 'ICICI',
    'axis bank': 'Axis',
    'jharkhand rajya gramin bank': 'JRGB',
    'jharkhand gramin bank': 'JGB',
  };
  const key = fullName.toLowerCase().trim();
  return map[key] || fullName;
};

/** ✅ Cloudinary se image fetch karo */
const fetchImageBuffer = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (err) {
    console.warn(`⚠️ Logo fetch failed (${url}):`, err.message);
    return null;
  }
};

const generateAdviceNumber = async (clfId) => {
  const year = new Date().getFullYear();
  const count = await Advice.countDocuments({ clfId, adviceNumber: { $regex: `/${year}/` } });
  return `SAT/CLF/${year}/${String(count + 1).padStart(3, '0')}`;
};

const assertScope = async (user, clfId) => {
  const clf = await CLF.findById(clfId);
  if (!clf) throw ApiError.notFound('CLF not found');

  if (user.role === 'SUPER_ADMIN') return clf;
  if (user.role === 'BPM' && String(user.blockId) === String(clf.blockId)) return clf;
  if (user.role === 'CLF' && String(user.clfId) === String(clf._id)) return clf;
  throw ApiError.forbidden('Access denied');
};

/* ────────────────────────────────────────────
   CREATE
   ──────────────────────────────────────────── */
export const createAdvice = async (req, data) => {
  const user = req.user;
  const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
  if (!clfId) throw ApiError.badRequest('CLF is required');

  const clf = await assertScope(user, clfId);

  if (!data.employees || !data.employees.length) {
    throw ApiError.badRequest('At least one employee required');
  }

  const cleaned = data.employees.map((e, i) => {
    if (!e.name || !e.name.trim()) {
      throw ApiError.badRequest(`Row ${i + 1}: name is required`);
    }
    const amt = Number(e.amount);
    if (!amt || amt <= 0) {
      throw ApiError.badRequest(`Row ${i + 1}: amount must be greater than 0`);
    }
    return {
      sl: i + 1,
      name: String(e.name).trim(),
      month: e.month ? String(e.month).trim() : '',
      bankAccountNumber: e.bankAccountNumber ? String(e.bankAccountNumber).trim() : '',
      bankName: e.bankName ? String(e.bankName).trim() : '',
      branch: e.branch ? String(e.branch).trim() : '',
      ifscCode: e.ifscCode ? String(e.ifscCode).trim().toUpperCase() : '',
      amount: amt,
    };
  });

  const totalAmount = cleaned.reduce((s, e) => s + e.amount, 0);
  const adviceNumber = await generateAdviceNumber(clfId);

  const advice = await Advice.create({
    adviceType: data.adviceType === 'EXPENSE' ? 'EXPENSE' : 'SALARY',
    adviceNumber,
    adviceDate: data.adviceDate || getISTDateString(),
    createdByRole: user.role,
    createdByUser: user._id,
    createdByName: user.name || '',
    clfId: clf._id,
    blockId: clf.blockId,
    bankName: data.bankName || '',
    branch: data.branch || '',
    employees: cleaned,
    totalAmount,
    totalRows: cleaned.length,
  });

  await createAudit({
    req,
    action: 'ADVICE_CREATED',
    targetType: 'Advice',
    targetId: advice._id,
    metadata: { adviceNumber, totalAmount, rows: cleaned.length, adviceType: advice.adviceType },
  });

  return advice;
};

/* ────────────────────────────────────────────
   LIST
   ──────────────────────────────────────────── */
export const listAdvices = async (req, query) => {
  const user = req.user;
  const filter = { isDeleted: false };

  if (user.role === 'CLF') filter.clfId = user.clfId;
  else if (user.role === 'BPM') filter.blockId = user.blockId;
  else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

  if (query.adviceType) filter.adviceType = query.adviceType;

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);

  const [items, total] = await Promise.all([
    Advice.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Advice.countDocuments(filter),
  ]);

  return {
    advices: items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};

/* ────────────────────────────────────────────
   GET ONE
   ──────────────────────────────────────────── */
export const getAdvice = async (req, id) => {
  const advice = await Advice.findById(id);
  if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');
  await assertScope(req.user, advice.clfId);
  return advice;
};

/* ────────────────────────────────────────────
   DELETE
   ──────────────────────────────────────────── */
export const deleteAdvice = async (req, id) => {
  const advice = await Advice.findById(id);
  if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');

  const user = req.user;
  if (user.role === 'CLF' && String(user.clfId) !== String(advice.clfId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (user.role === 'BPM' && String(user.blockId) !== String(advice.blockId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (!['CLF', 'BPM', 'SUPER_ADMIN'].includes(user.role)) {
    throw ApiError.forbidden('Not allowed to delete');
  }

  advice.isDeleted = true;
  advice.deletedAt = new Date();
  advice.deletedBy = user._id;
  await advice.save();

  await createAudit({
    req,
    action: 'ADVICE_DELETED',
    targetType: 'Advice',
    targetId: advice._id,
    metadata: { adviceNumber: advice.adviceNumber },
  });

  return { deleted: true, adviceNumber: advice.adviceNumber };
};

/* ────────────────────────────────────────────
   PDF GENERATE — with logos + footer at bottom
   ──────────────────────────────────────────── */
export const generateAdvicePDF = async (req, id, res, { inline = false } = {}) => {
  const advice = await Advice.findById(id);
  if (!advice || advice.isDeleted) throw ApiError.notFound('Advice not found');
  await assertScope(req.user, advice.clfId);

  // ✅ Logos fetch
  const LEFT_LOGO_URL =
    'https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg';
  const RIGHT_LOGO_URL =
    'https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg';

  const [leftLogoBuf, rightLogoBuf] = await Promise.all([
    fetchImageBuffer(LEFT_LOGO_URL),
    fetchImageBuffer(RIGHT_LOGO_URL),
  ]);

  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    bufferPages: true,
    autoFirstPage: false,
  });
  registerFonts(doc);

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginLeft = 30;
  const marginRight = 30;
  const contentWidth = pageWidth - marginLeft - marginRight;

  const employees = advice.employees;
  const totalAmount = advice.totalAmount;

  const PAGE_1_MAX = 5;
  const PAGE_NEXT_MAX = 11;
  const SIGNATURE_FITS_THRESHOLD = 4;

  const chunks = [];
  if (employees.length <= PAGE_1_MAX) {
    chunks.push(employees);
  } else {
    chunks.push(employees.slice(0, PAGE_1_MAX));
    let rem = employees.slice(PAGE_1_MAX);
    while (rem.length > 0) {
      chunks.push(rem.slice(0, PAGE_NEXT_MAX));
      rem = rem.slice(PAGE_NEXT_MAX);
    }
  }
  const lastChunk = chunks[chunks.length - 1];
  if (lastChunk.length > SIGNATURE_FITS_THRESHOLD) chunks.push([]);

  const drawStrip = (y) => {
    const h = 8;
    const w1 = contentWidth * 0.3;
    const w2 = contentWidth * 0.7;
    doc.rect(marginLeft, y, w1, h).fill('#82c828');
    doc.rect(marginLeft + w1, y, w2, h).fill('#e05a10');
    doc.fillColor('black');
  };

  chunks.forEach((chunk, pageIndex) => {
    doc.addPage({ size: 'A4', margin: 0 });

    const isLastPage = pageIndex === chunks.length - 1;
    const isSignatureOnlyPage = isLastPage && chunk.length === 0;

    let y = 30;

    // ─── TOP STRIP ───
    drawStrip(y);
    y += 18;

    /* ─── HEADER WITH LOGOS ─── */
    const logoSize = 70;
    const logoY = y;
    const titleWidth = pageWidth - marginLeft - marginRight - logoSize * 2 - 20;
    const titleX = marginLeft + logoSize + 10;

    // ✅ Left logo
    if (leftLogoBuf) {
      try {
        doc.image(leftLogoBuf, marginLeft, logoY, { fit: [logoSize, logoSize] });
      } catch (e) {
        console.warn('Left logo embed failed:', e.message);
      }
    }

    // ✅ Right logo
    if (rightLogoBuf) {
      try {
        doc.image(rightLogoBuf, pageWidth - marginRight - logoSize, logoY, {
          fit: [logoSize, logoSize],
        });
      } catch (e) {
        console.warn('Right logo embed failed:', e.message);
      }
    }

    // ✅ Title between logos
    let ty = logoY + 10;
    doc.font('Devanagari-Bold').fontSize(18).fillColor('black');
    doc.text('सतबरवा आजीविका महिला संकुल स्तरीय', titleX, ty, {
      width: titleWidth,
      align: 'center',
    });
    ty += 22;

    doc.font('Devanagari-Bold').fontSize(13);
    doc.text('प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड', titleX, ty, {
      width: titleWidth,
      align: 'center',
    });
    ty += 18;

    doc.font('Devanagari').fontSize(8.5);
    doc.text('ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)', titleX, ty, {
      width: titleWidth,
      align: 'center',
    });
    ty += 11;

    doc.text('निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023', titleX, ty, {
      width: titleWidth,
      align: 'center',
    });

    y = Math.max(logoY + logoSize, ty + 10) + 6;

    // ─── BOTTOM STRIP ───
    drawStrip(y);
    y += 18;

    // ─── PATRANK / DINANK ───
    doc.font('Devanagari').fontSize(10).fillColor('black');
    const dateStr = new Date(advice.adviceDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    doc.text(`पत्रांक - ${advice.adviceNumber}`, marginLeft, y);
    doc.text(`दिनांक - ${dateStr}`, marginLeft, y, {
      width: contentWidth,
      align: 'right',
    });
    y += 18;

    // ─── PAGE 1 CONTENT ───
    if (pageIndex === 0) {
      doc.font('Devanagari-Bold').fontSize(10).text('To', marginLeft, y);
      y += 12;
      doc.font('Devanagari').fontSize(10).text('The Branch Manager', marginLeft, y);
      y += 12;
      doc.text(advice.bankName || '-', marginLeft, y);
      y += 12;
      if (advice.branch) {
        doc.text(`Branch: ${advice.branch}`, marginLeft, y);
        y += 12;
      }
      y += 4;
      doc
        .font('Devanagari-Bold')
        .fontSize(11)
        .text('Subject: Bank Advice for transfer', marginLeft, y, { underline: true });
      y += 18;
      doc.font('Devanagari').fontSize(10);
      doc.text(
        'Ref: SB Account number : सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No. 265200010080538',
        marginLeft,
        y,
        { width: contentWidth }
      );
      y += 24;
      doc.text('Dear Sir,', marginLeft, y);
      y += 14;
      doc.text(
        `Please debit a sum of Rs. ${totalAmount.toLocaleString('en-IN')}/- (${formatAmountInWords(
          totalAmount
        )}) From our saving bank account of सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No. 265200010080538 by the fastest mode of remittance as per the details given below:`,
        marginLeft,
        y,
        { width: contentWidth, align: 'justify' }
      );
      y = doc.y + 12;
    } else {
      doc.font('Devanagari').fontSize(10);
      doc.text(`(Page ${pageIndex + 1} of ${chunks.length})`, 0, y, {
        width: pageWidth,
        align: 'center',
      });
      y += 18;
    }

    // ─── TABLE ───
    if (!isSignatureOnlyPage) {
      const colWidths = {
        sl: 22,
        name: 90,
        month: 70,
        bankAccountNumber: 95,
        bank: 55,
        branch: 60,
        ifsc: 75,
        amount: 68,
      };
      const totalTableWidth =
        colWidths.sl + colWidths.name + colWidths.month + colWidths.bankAccountNumber +
        colWidths.bank + colWidths.branch + colWidths.ifsc + colWidths.amount;

      const startX = marginLeft + (contentWidth - totalTableWidth) / 2;
      const rowHeight = 20;

      let x = startX;
      const headers = [
        { w: colWidths.sl, label: 'Sl.' },
        { w: colWidths.name, label: 'Name' },
        { w: colWidths.month, label: 'Month' },
        { w: colWidths.bankAccountNumber, label: 'Bank A/c' },
        { w: colWidths.bank, label: 'Bank' },
        { w: colWidths.branch, label: 'Branch' },
        { w: colWidths.ifsc, label: 'IFSC' },
        { w: colWidths.amount, label: 'Amount' },
      ];

      doc.rect(startX, y, totalTableWidth, rowHeight).fill('#F3F4F6');
      doc.fillColor('black');
      doc.font('Devanagari-Bold').fontSize(8);

      headers.forEach((h) => {
        doc.rect(x, y, h.w, rowHeight).stroke();
        doc.text(h.label, x + 3, y + 6, {
          width: h.w - 6,
          align: h.label === 'Amount' ? 'right' : 'left',
        });
        x += h.w;
      });
      y += rowHeight;

      doc.font('Devanagari').fontSize(8);
      chunk.forEach((emp) => {
        x = startX;
        const rowValues = [
          { w: colWidths.sl, value: `${emp.sl}.`, align: 'center' },
          { w: colWidths.name, value: emp.name, align: 'left' },
          { w: colWidths.month, value: emp.month || '-', align: 'left' },
          { w: colWidths.bankAccountNumber, value: emp.bankAccountNumber || '-', align: 'left' },
          { w: colWidths.bank, value: getBankShortName(emp.bankName), align: 'left' },
          { w: colWidths.branch, value: emp.branch || '-', align: 'left' },
          { w: colWidths.ifsc, value: emp.ifscCode || '-', align: 'left' },
          { w: colWidths.amount, value: emp.amount.toLocaleString('en-IN'), align: 'right' },
        ];
        rowValues.forEach((v) => {
          doc.rect(x, y, v.w, rowHeight).stroke();
          doc.text(v.value, x + 3, y + 6, {
            width: v.w - 6,
            align: v.align,
            lineBreak: false,
            ellipsis: true,
          });
          x += v.w;
        });
        y += rowHeight;
      });

      if (isLastPage && chunk.length > 0) {
        x = startX;
        const totalRowValues = [
          {
            w: colWidths.sl + colWidths.name + colWidths.month + colWidths.bankAccountNumber +
               colWidths.bank + colWidths.branch + colWidths.ifsc,
            value: 'TOTAL',
            align: 'right',
            bold: true,
          },
          {
            w: colWidths.amount,
            value: `${totalAmount.toLocaleString('en-IN')}.00`,
            align: 'right',
            bold: true,
          },
        ];
        totalRowValues.forEach((v) => {
          doc.rect(x, y, v.w, rowHeight).fillAndStroke('#F9FAFB', 'black');
          doc.fillColor('black');
          doc.font(v.bold ? 'Devanagari-Bold' : 'Devanagari').fontSize(9);
          doc.text(v.value, x + 3, y + 6, { width: v.w - 6, align: v.align });
          x += v.w;
        });
        y += rowHeight + 10;

        doc.font('Devanagari').fontSize(10);
        doc.text(
          `Rs. ${totalAmount.toLocaleString('en-IN')}/- (${formatAmountInWords(totalAmount)})`,
          marginLeft,
          y,
          { width: contentWidth }
        );
        y = doc.y + 10;
      } else {
        y += 6;
      }
    }

    // ─── SIGNATURE + FOOTER (last page) ───
    if (isLastPage) {
      // ✅ Footer pageHeight - 90 par (aur niche)
      const footerTop = pageHeight - 90;

      // Signature ke liye thoda upar
      const sigY = footerTop - 40;
      const sigWidth = 80;
      const gap = 20;
      const sigLabels = ['अध्यक्ष', 'सचिव', 'कोषाध्यक्ष'];

      doc.font('Devanagari-Bold').fontSize(10).fillColor('black');
      sigLabels.forEach((label, i) => {
        const sx = marginLeft + i * (sigWidth + gap);
        doc.moveTo(sx, sigY).lineTo(sx + sigWidth, sigY).stroke();
        doc.text(label, sx, sigY + 4, { width: sigWidth, align: 'center' });
      });

      doc.font('Devanagari-Bold').fontSize(9);
      const rightX = marginLeft + contentWidth - 180;
      doc.text('Thanking You.', rightX, sigY - 30, { width: 180, align: 'right' });
      doc.text('सतबरवा आजीविका महिला संकुल स्तरीय', rightX, sigY - 16, { width: 180, align: 'right' });
      doc.text('प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड', rightX, sigY - 4, { width: 180, align: 'right' });

      // Footer strip + text
      drawStrip(footerTop);
      let fy = footerTop + 12;
      doc.font('Devanagari').fontSize(7.5).fillColor('black');
      const footerLines = [
        'प्रखंड कार्यालय :- प्रखंड मिशन प्रबंधन इकाई, राँची रोड, सतबरवा पलामू 822126',
        'जिला कार्यालय :- जिला मिशन प्रबंधन इकाई, पुराना DRDA कार्यालय भवन , पलामू , 822102',
        'राज्य कार्यालय :- द्वितीय तल, झारखण्ड राज्य कृषि विपणन पर्षद, ईटकी रोड, हेहल,राँची – 834005 झारखण्ड',
        'फोन नं0 0651 2360038 / 2360142',
      ];
      footerLines.forEach((line) => {
        doc.text(line, 0, fy, { width: pageWidth, align: 'center' });
        fy += 10;
      });
    }
  });

  const filename = `Advice-${advice.adviceNumber.replace(/\//g, '-')}.pdf`;
  const disposition = inline ? 'inline' : 'attachment';

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `${disposition}; filename="${filename}"`);

  doc.pipe(res);
  doc.end();
};