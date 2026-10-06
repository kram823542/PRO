// import { theme } from '../../config/theme.js';

// /**
//  * Generic AdviceFormate
//  * Props:
//  *  - title: string — Header title
//  *  - description: string — What this advice is about
//  *  - icon: string — Emoji/icon
//  *  - tone: 'info' | 'warning' | 'success' | 'danger' — color
//  *  - points: string[] — Bullet list of advice points
//  *  - footer: string — optional footer note
//  */
// export default function AdviceFormate({
//   title,
//   description,
//   icon = '💡',
//   tone = 'info',
//   points = [],
//   footer,
// }) {
//   const toneStyles = {
//     info: {
//       bg: '#EFF6FF',
//       border: '#3B82F6',
//       text: '#1E40AF',
//       icon: 'ℹ️',
//     },
//     warning: {
//       bg: '#FEF3C7',
//       border: '#F59E0B',
//       text: '#92400E',
//       icon: '⚠️',
//     },
//     success: {
//       bg: '#DCFCE7',
//       border: '#16A34A',
//       text: '#166534',
//       icon: '✅',
//     },
//     danger: {
//       bg: '#FEE2E2',
//       border: '#DC2626',
//       text: '#991B1B',
//       icon: '🚫',
//     },
//   };

//   const t = toneStyles[tone] || toneStyles.info;

//   return (
//     <div
//       style={{
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         border: `1px solid ${theme.colors.border}`,
//         borderLeft: `4px solid ${t.border}`,
//         padding: 18,
//         boxShadow: theme.shadow.sm,
//         marginBottom: 12,
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
//         <span style={{ fontSize: 22 }}>{icon}</span>
//         <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: theme.colors.text }}>
//           {title}
//         </h3>
//       </div>

//       {/* Description */}
//       {description && (
//         <p
//           style={{
//             margin: '0 0 12px',
//             fontSize: 13,
//             color: theme.colors.muted,
//             lineHeight: 1.5,
//           }}
//         >
//           {description}
//         </p>
//       )}

//       {/* Points */}
//       {points.length > 0 && (
//         <div
//           style={{
//             background: t.bg,
//             borderRadius: 8,
//             padding: '12px 14px',
//             borderLeft: `2px solid ${t.border}`,
//           }}
//         >
//           <ul
//             style={{
//               margin: 0,
//               paddingLeft: 20,
//               fontSize: 13,
//               color: t.text,
//               lineHeight: 1.7,
//             }}
//           >
//             {points.map((p, i) => (
//               <li key={i} style={{ marginBottom: 4 }}>
//                 {p}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Footer */}
//       {footer && (
//         <p
//           style={{
//             margin: '12px 0 0',
//             fontSize: 12,
//             color: theme.colors.muted,
//             fontStyle: 'italic',
//           }}
//         >
//           {footer}
//         </p>
//       )}
//     </div>
//   );
// }








// import React, { useRef, useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { useReactToPrint } from 'react-to-print';
// import { getBankShortName, formatAmountInWords } from './AdviceUtils';

// const AdviceFormate = ({ advicePreview }) => {
//   const printRef = useRef(null);
//   const pdfRef = useRef(null);
//   const [mounted, setMounted] = useState(false);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // ---- PRINT handler ----
//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: `Bank-Advice-${Date.now()}`,
//     pageStyle: `
//       @page { size: A4 portrait; margin: 0; }
//       @media print {
//         html, body {
//           width: 210mm !important;
//           margin: 0 !important;
//           padding: 0 !important;
//           background: #fff !important;
//           -webkit-print-color-adjust: exact !important;
//           print-color-adjust: exact !important;
//         }
//         body * { visibility: hidden !important; }
//         .print-root, .print-root * { visibility: visible !important; }
//         .print-root {
//           position: absolute !important;
//           left: 0 !important;
//           top: 0 !important;
//           width: 210mm !important;
//           display: block !important;
//         }
//         .print-page-card {
//           width: 210mm !important;
//           height: 296mm !important;
//           box-sizing: border-box !important;
//           page-break-after: always !important;
//           break-after: page !important;
//           page-break-inside: avoid !important;
//           break-inside: avoid !important;
//           box-shadow: none !important;
//           margin: 0 !important;
//           padding: 8mm 10mm !important;
//           overflow: hidden !important;
//           display: flex !important;
//           flex-direction: column !important;
//           background: #fff !important;
//         }
//         .print-page-card:last-child {
//           page-break-after: auto !important;
//           break-after: auto !important;
//         }
//       }
//     `,
//   });

//   // ---- DOWNLOAD PDF handler ----
//   const handleDownloadPDF = async () => {
//     if (!pdfRef.current) return;
//     setDownloading(true);
//     try {
//       const html2pdf = (await import('html2pdf.js')).default;
//       await html2pdf()
//         .set({
//           margin: 0,
//           filename: `Bank-Advice-${new Date().toISOString().split('T')[0]}.pdf`,
//           image: { type: 'jpeg', quality: 0.98 },
//           html2canvas: {
//             scale: 2,
//             useCORS: true,
//             letterRendering: true,
//             backgroundColor: '#ffffff',
//             scrollY: 0,
//             windowWidth: pdfRef.current.scrollWidth,
//           },
//           jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//           pagebreak: { mode: ['css', 'legacy'], avoid: '.print-page-card' },
//         })
//         .from(pdfRef.current)
//         .save();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // Expose both functions via window
//   useEffect(() => {
//     window.__adviceFormatePrint = handlePrint;
//     window.__adviceFormateDownload = handleDownloadPDF;
//     return () => {
//       delete window.__adviceFormatePrint;
//       delete window.__adviceFormateDownload;
//     };
//   }, [handlePrint]);

//   if (!advicePreview || !advicePreview.employees || advicePreview.employees.length === 0) {
//     return null;
//   }

//   const totalAmount = advicePreview.employees.reduce(
//     (sum, emp) => sum + Number(emp.amount || 0),
//     0
//   );

//   const PAGE_1_MAX = 5;
//   const PAGE_NEXT_MAX = 11;
//   const SIGNATURE_FITS_THRESHOLD = 4;

//   const employees = advicePreview.employees;
//   const employeeChunks = [];

//   if (employees.length <= PAGE_1_MAX) {
//     employeeChunks.push(employees);
//   } else {
//     employeeChunks.push(employees.slice(0, PAGE_1_MAX));
//     let remaining = employees.slice(PAGE_1_MAX);
//     while (remaining.length > 0) {
//       employeeChunks.push(remaining.slice(0, PAGE_NEXT_MAX));
//       remaining = remaining.slice(PAGE_NEXT_MAX);
//     }
//   }

//   const lastChunk = employeeChunks[employeeChunks.length - 1];
//   if (lastChunk.length > SIGNATURE_FITS_THRESHOLD) {
//     employeeChunks.push([]);
//   }

//   // ============ SHARED PAGE RENDERER ============
//   const renderPageCard = (chunk, pageIndex, isPrintMode) => {
//     const isLastPage = pageIndex === employeeChunks.length - 1;
//     const isSignatureOnlyPage = isLastPage && chunk.length === 0;

//     return (
//       <div
//         key={pageIndex}
//         className={`print-page-card w-[210mm] h-[296mm] box-border p-[8mm_10mm] font-sans leading-snug text-black bg-white flex flex-col overflow-hidden ${
//           isPrintMode ? '' : 'shadow-lg'
//         }`}
//       >
//         <div className="flex-1 min-h-0 flex flex-col">
//           {/* HEADER TOP STRIP */}
//           <div className="flex w-full h-[7px] mb-3 shrink-0">
//             <div className="w-[30%] bg-[#82c828]"></div>
//             <div className="w-[70%] bg-[#e05a10]"></div>
//           </div>

//           {/* HEADER LOGOS AND TITLE */}
//           <div className="flex items-center justify-between gap-3 pb-3 shrink-0">
//             <img
//               src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
//               alt="Left Logo"
//               className="w-[100px] h-[100px] object-contain"
//               crossOrigin="anonymous"
//             />
//             <div className="flex-1 text-center font-serif">
//               <h1 className="text-[30px] font-extrabold leading-tight m-0 text-black">
//                 सतबरवा आजीविका महिला संकुल स्तरीय
//               </h1>
//               <h2 className="text-[24px] font-bold leading-tight mt-1 m-0 text-black">
//                 प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
//               </h2>
//               <p className="text-[15px] font-semibold mt-1.5 mb-0 text-black">
//                 ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
//               </p>
//               <p className="text-[15px] font-semibold mt-1 mb-0 text-black">
//                 निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
//               </p>
//             </div>
//             <img
//               src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
//               alt="Right Logo"
//               className="w-[100px] h-[100px] object-contain"
//               crossOrigin="anonymous"
//             />
//           </div>

//           {/* HEADER BOTTOM STRIP */}
//           <div className="flex w-full h-[7px] mt-2 mb-3 shrink-0">
//             <div className="w-[30%] bg-[#82c828]"></div>
//             <div className="w-[70%] bg-[#e05a10]"></div>
//           </div>

//           {/* PATRANK AND DINANK */}
//           <div className="flex justify-between text-[16px] font-semibold my-2 shrink-0">
//             <p className="m-0">पत्रांक - SAT/CLF/2026/</p>
//             <p className="m-0">
//               दिनांक -{' '}
//               {new Date(advicePreview.adviceDate).toLocaleDateString('en-IN', {
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric',
//               })}
//             </p>
//           </div>

//           {/* FIRST PAGE CONTENT */}
//           {pageIndex === 0 && (
//             <>
//               <div className="text-[16px] mb-2 font-medium shrink-0">
//                 <p className="font-bold m-0">To</p>
//                 <p className="m-0">The Branch Manager</p>
//                 <p className="m-0">{advicePreview.bankName}</p>
//                 {advicePreview.branch && <p className="m-0">Branch: {advicePreview.branch}</p>}
//               </div>

//               <div className="text-[16px] mb-2 shrink-0">
//                 <p className="font-bold m-0 underline">Subject: Bank Advice for transfer</p>
//               </div>

//               <div className="text-[16px] mb-2 shrink-0">
//                 <p className="m-0">
//                   <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल स्तरीय
//                   प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
//                   <strong> 265200010080538</strong>
//                 </p>
//               </div>

//               <p className="text-[16px] my-2 shrink-0">Dear Sir,</p>

//               <p className="text-[16px] mb-3 text-justify indent-8 m-0 leading-relaxed shrink-0">
//                 Please debit a sum of Rs.{' '}
//                 <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//                 {formatAmountInWords(totalAmount)}) From our saving bank account of सतबरवा
//                 आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.{' '}
//                 <strong>265200010080538</strong> by the fastest mode of remittance as per the
//                 details given below:
//               </p>
//             </>
//           )}

//           {/* TABLE SECTION */}
//           {!isSignatureOnlyPage && (
//             <div className="mb-2">
//               {employeeChunks.length > 1 && (
//                 <p className="text-center font-bold text-[15px] my-2">
//                   <span className="font-normal">
//                     (Page {pageIndex + 1} of {employeeChunks.length})
//                   </span>
//                 </p>
//               )}

//               <table className="w-full border-collapse border border-black table-fixed">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border border-black p-1.5 font-bold text-center text-[15px] w-[4%]">Sl.</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[18%]">Name</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[14%]">Month</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[16px] w-[20%]">Bank A/c</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[8%]">Bank</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[12%]">Branch</th>
//                     <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[14%]">IFSC</th>
//                     <th className="border border-black p-1.5 font-bold text-right text-[15px] w-[15%]">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {chunk.map((emp, idx) => {
//                     const globalIdx =
//                       pageIndex === 0
//                         ? idx + 1
//                         : PAGE_1_MAX + (pageIndex - 1) * PAGE_NEXT_MAX + idx + 1;
//                     return (
//                       <tr key={emp._id || idx}>
//                         <td className="border border-black p-1.5 text-center text-[16px] font-semibold">
//                           {globalIdx}.
//                         </td>
//                         <td className="border border-black p-1.5 break-words font-semibold text-[16px]">
//                           {emp.name}
//                         </td>
//                         <td className="border border-black p-1.5 whitespace-nowrap text-[15px]">
//                           {emp.month}
//                         </td>
//                         <td className="border border-black p-1.5 font-mono text-[15px] font-bold break-all">
//                           {emp.bankAccountNumber}
//                         </td>
//                         <td className="border border-black p-1.5 break-words text-[15px] font-semibold">
//                           {getBankShortName(emp.bankName)}
//                         </td>
//                         <td className="border border-black p-1.5 break-words text-[15px]">
//                           {emp.branch}
//                         </td>
//                         <td className="border border-black p-1.5 font-mono text-[14px] font-bold break-all">
//                           {emp.ifscCode}
//                         </td>
//                         <td className="border border-black p-1.5 text-right font-bold whitespace-nowrap text-[16px]">
//                           {Number(emp.amount || 0).toLocaleString('en-IN')}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   {isLastPage && chunk.length > 0 && (
//                     <tr className="bg-gray-50">
//                       <td colSpan="7" className="border border-black p-1.5 text-right font-bold text-[16px]">
//                         TOTAL
//                       </td>
//                       <td className="border border-black p-1.5 text-right font-bold text-[16px] whitespace-nowrap">
//                         {totalAmount.toLocaleString('en-IN')}.00
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {isLastPage && chunk.length > 0 && (
//                 <p className="text-[15px] mt-2 mb-0 font-semibold">
//                   Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//                   {formatAmountInWords(totalAmount)})
//                 </p>
//               )}
//             </div>
//           )}

//           {/* SPACER */}
//           {isLastPage && <div className="flex-1 min-h-[10mm]"></div>}

//           {/* SIGNATURE + THANKING YOU */}
//           {isLastPage && (
//             <div className="pb-10 shrink-0">
//               <div className="flex justify-between items-end">
//                 <div className="flex gap-6">
//                   <div className="text-center text-[15px] w-28">
//                     <div className="h-4"></div>
//                     <p className="border-t border-black pt-1 font-bold m-0">अध्यक्ष</p>
//                   </div>
//                   <div className="text-center text-[15px] w-28">
//                     <div className="h-4"></div>
//                     <p className="border-t border-black pt-1 font-bold m-0">सचिव</p>
//                   </div>
//                   <div className="text-center text-[15px] w-28">
//                     <div className="h-4"></div>
//                     <p className="border-t border-black pt-1 font-bold m-0">कोषाध्यक्ष</p>
//                   </div>
//                 </div>
//                 <div className="text-right text-[12px] leading-snug">
//                   <p className="font-bold m-0">Thanking You.</p>
//                   <p className="mt-1 m-0 font-bold">सतबरवा आजीविका महिला संकुल स्तरीय</p>
//                   <p className="m-0 font-bold">प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* FOOTER */}
//         <div className="w-full pt-1 pb-0 mt-auto shrink-0">
//           <div className="flex w-full h-[5px] mb-1.5">
//             <div className="w-[30%] bg-[#82c828]"></div>
//             <div className="w-[70%] bg-[#e05a10]"></div>
//           </div>
//           <div className="text-center text-[12px] leading-tight space-y-[1px] text-black">
//             <p className="m-0">
//               <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, राँची रोड, सतबरवा पलामू 822126
//             </p>
//             <p className="m-0">
//               <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना{' '}
//               <strong>DRDA</strong> कार्यालय भवन , पलामू , 822102
//             </p>
//             <p className="m-0">
//               <strong>राज्य कार्यालय :-</strong> द्वितीय तल, झारखण्ड राज्य कृषि विपणन पर्षद, ईटकी रोड, हेहल,राँची – 834005 झारखण्ड
//             </p>
//             <p className="m-0 pt-[1px]">
//               <strong>फोन नं0</strong> 0651 2360038 / 2360142
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* ===== PREVIEW ===== */}
//       <div className="bg-gray-300 p-4 rounded overflow-auto w-full" style={{ maxHeight: '70vh' }}>
//         <div className="flex flex-col items-center gap-8">
//           {employeeChunks.map((chunk, pageIndex) => (
//             <div
//               key={pageIndex}
//               style={{
//                 transform: 'scale(0.7)',
//                 transformOrigin: 'top center',
//                 marginBottom: '-85mm',
//               }}
//             >
//               {renderPageCard(chunk, pageIndex, false)}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===== PRINT PORTAL ===== */}
//       {mounted &&
//         createPortal(
//           <div style={{ position: 'fixed', left: '-10000px', top: 0, width: '210mm', zIndex: -1 }} aria-hidden="true">
//             <div ref={printRef} className="print-root bg-white">
//               {employeeChunks.map((chunk, pageIndex) => renderPageCard(chunk, pageIndex, true))}
//             </div>
//           </div>,
//           document.body
//         )}

//       {/* ===== PDF PORTAL ===== */}
//       {mounted &&
//         createPortal(
//           <div style={{ position: 'fixed', left: '-10000px', top: 0, width: '210mm', zIndex: -1 }} aria-hidden="true">
//             <div ref={pdfRef} className="bg-white">
//               {employeeChunks.map((chunk, pageIndex) => renderPageCard(chunk, pageIndex, true))}
//             </div>
//           </div>,
//           document.body
//         )}

//       {/* DOWNLOADING INDICATOR */}
//       {downloading && (
//         <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
//           <div className="bg-white rounded-lg px-6 py-4 shadow-2xl">
//             <p className="text-sm font-bold text-gray-800">PDF download ho raha hai... please wait</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdviceFormate;



import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useReactToPrint } from 'react-to-print';
import { getBankShortName, formatAmountInWords } from './AdviceUtils';
import toast from 'react-hot-toast';

const AdviceFormate = ({ advicePreview }) => {
  const printRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ✅ Print handler — browser ka native "Save as PDF" use hoga
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Bank-Advice-${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print {
        html, body {
          width: 210mm !important;
          margin: 0 !important;
          padding: 0 !important;
          background: #fff !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body * { visibility: hidden !important; }
        .print-root, .print-root * { visibility: visible !important; }
        .print-root {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 210mm !important;
          display: block !important;
        }
        .print-page-card {
          width: 210mm !important;
          height: 296mm !important;
          box-sizing: border-box !important;
          page-break-after: always !important;
          break-after: page !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 8mm 10mm !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
          background: #fff !important;
        }
        .print-page-card:last-child {
          page-break-after: auto !important;
          break-after: auto !important;
        }
      }
    `,
  });

  // ✅ Expose print function on window — "Download PDF" button isi ko call karega
  useEffect(() => {
    window.__adviceFormatePrint = handlePrint;
    // ✅ Download = same as print (user browser me "Save as PDF" chunega)
    window.__adviceFormateDownload = handlePrint;
    return () => {
      delete window.__adviceFormatePrint;
      delete window.__adviceFormateDownload;
    };
  }, [handlePrint]);

  if (!advicePreview || !advicePreview.employees || advicePreview.employees.length === 0) {
    return null;
  }

  const totalAmount = advicePreview.employees.reduce(
    (sum, emp) => sum + Number(emp.amount || 0),
    0
  );

  const PAGE_1_MAX = 5;
  const PAGE_NEXT_MAX = 11;
  const SIGNATURE_FITS_THRESHOLD = 4;

  const employees = advicePreview.employees;
  const employeeChunks = [];

  if (employees.length <= PAGE_1_MAX) {
    employeeChunks.push(employees);
  } else {
    employeeChunks.push(employees.slice(0, PAGE_1_MAX));
    let remaining = employees.slice(PAGE_1_MAX);
    while (remaining.length > 0) {
      employeeChunks.push(remaining.slice(0, PAGE_NEXT_MAX));
      remaining = remaining.slice(PAGE_NEXT_MAX);
    }
  }

  const lastChunk = employeeChunks[employeeChunks.length - 1];
  if (lastChunk.length > SIGNATURE_FITS_THRESHOLD) {
    employeeChunks.push([]);
  }

  // ============ SHARED PAGE RENDERER ============
  const renderPageCard = (chunk, pageIndex, isPrintMode) => {
    const isLastPage = pageIndex === employeeChunks.length - 1;
    const isSignatureOnlyPage = isLastPage && chunk.length === 0;

    return (
      <div
        key={pageIndex}
        className={`print-page-card w-[210mm] h-[296mm] box-border p-[8mm_10mm] font-sans leading-snug text-black bg-white flex flex-col overflow-hidden ${
          isPrintMode ? '' : 'shadow-lg'
        }`}
      >
        <div className="flex-1 min-h-0 flex flex-col">
          {/* HEADER TOP STRIP */}
          <div className="flex w-full h-[7px] mb-3 shrink-0">
            <div className="w-[30%] bg-[#82c828]"></div>
            <div className="w-[70%] bg-[#e05a10]"></div>
          </div>

          {/* HEADER LOGOS AND TITLE */}
          <div className="flex items-center justify-between gap-3 pb-3 shrink-0">
            <img
              src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
              alt="Left Logo"
              className="w-[100px] h-[100px] object-contain"
              crossOrigin="anonymous"
            />
            <div className="flex-1 text-center font-serif">
              <h1 className="text-[30px] font-extrabold leading-tight m-0 text-black">
                सतबरवा आजीविका महिला संकुल स्तरीय
              </h1>
              <h2 className="text-[24px] font-bold leading-tight mt-1 m-0 text-black">
                प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
              </h2>
              <p className="text-[15px] font-semibold mt-1.5 mb-0 text-black">
                ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
              </p>
              <p className="text-[15px] font-semibold mt-1 mb-0 text-black">
                निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
              </p>
            </div>
            <img
              src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
              alt="Right Logo"
              className="w-[100px] h-[100px] object-contain"
              crossOrigin="anonymous"
            />
          </div>

          {/* HEADER BOTTOM STRIP */}
          <div className="flex w-full h-[7px] mt-2 mb-3 shrink-0">
            <div className="w-[30%] bg-[#82c828]"></div>
            <div className="w-[70%] bg-[#e05a10]"></div>
          </div>

          {/* PATRANK AND DINANK */}
          <div className="flex justify-between text-[16px] font-semibold my-2 shrink-0">
            <p className="m-0">पत्रांक - SAT/CLF/2026/</p>
            <p className="m-0">
              दिनांक -{' '}
              {new Date(advicePreview.adviceDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* FIRST PAGE CONTENT */}
          {pageIndex === 0 && (
            <>
              <div className="text-[16px] mb-2 font-medium shrink-0">
                <p className="font-bold m-0">To</p>
                <p className="m-0">The Branch Manager</p>
                <p className="m-0">{advicePreview.bankName}</p>
                {advicePreview.branch && <p className="m-0">Branch: {advicePreview.branch}</p>}
              </div>

              <div className="text-[16px] mb-2 shrink-0">
                <p className="font-bold m-0 underline">Subject: Bank Advice for transfer</p>
              </div>

              <div className="text-[16px] mb-2 shrink-0">
                <p className="m-0">
                  <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल स्तरीय
                  प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
                  <strong> 265200010080538</strong>
                </p>
              </div>

              <p className="text-[16px] my-2 shrink-0">Dear Sir,</p>

              <p className="text-[16px] mb-3 text-justify indent-8 m-0 leading-relaxed shrink-0">
                Please debit a sum of Rs.{' '}
                <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
                {formatAmountInWords(totalAmount)}) From our saving bank account of सतबरवा
                आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.{' '}
                <strong>265200010080538</strong> by the fastest mode of remittance as per the
                details given below:
              </p>
            </>
          )}

          {/* TABLE SECTION */}
          {!isSignatureOnlyPage && (
            <div className="mb-2">
              {employeeChunks.length > 1 && (
                <p className="text-center font-bold text-[15px] my-2">
                  <span className="font-normal">
                    (Page {pageIndex + 1} of {employeeChunks.length})
                  </span>
                </p>
              )}

              <table className="w-full border-collapse border border-black table-fixed">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-black p-1.5 font-bold text-center text-[15px] w-[4%]">Sl.</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[18%]">Name</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[14%]">Month</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[16px] w-[20%]">Bank A/c</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[8%]">Bank</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[12%]">Branch</th>
                    <th className="border border-black p-1.5 font-bold text-left text-[15px] w-[14%]">IFSC</th>
                    <th className="border border-black p-1.5 font-bold text-right text-[15px] w-[15%]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {chunk.map((emp, idx) => {
                    const globalIdx =
                      pageIndex === 0
                        ? idx + 1
                        : PAGE_1_MAX + (pageIndex - 1) * PAGE_NEXT_MAX + idx + 1;
                    return (
                      <tr key={emp._id || idx}>
                        <td className="border border-black p-1.5 text-center text-[16px] font-semibold">
                          {globalIdx}.
                        </td>
                        <td className="border border-black p-1.5 break-words font-semibold text-[16px]">
                          {emp.name}
                        </td>
                        <td className="border border-black p-1.5 whitespace-nowrap text-[15px]">
                          {emp.month}
                        </td>
                        <td className="border border-black p-1.5 font-mono text-[15px] font-bold break-all">
                          {emp.bankAccountNumber}
                        </td>
                        <td className="border border-black p-1.5 break-words text-[15px] font-semibold">
                          {getBankShortName(emp.bankName)}
                        </td>
                        <td className="border border-black p-1.5 break-words text-[15px]">
                          {emp.branch}
                        </td>
                        <td className="border border-black p-1.5 font-mono text-[14px] font-bold break-all">
                          {emp.ifscCode}
                        </td>
                        <td className="border border-black p-1.5 text-right font-bold whitespace-nowrap text-[16px]">
                          {Number(emp.amount || 0).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    );
                  })}
                  {isLastPage && chunk.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan="7" className="border border-black p-1.5 text-right font-bold text-[16px]">
                        TOTAL
                      </td>
                      <td className="border border-black p-1.5 text-right font-bold text-[16px] whitespace-nowrap">
                        {totalAmount.toLocaleString('en-IN')}.00
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {isLastPage && chunk.length > 0 && (
                <p className="text-[15px] mt-2 mb-0 font-semibold">
                  Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
                  {formatAmountInWords(totalAmount)})
                </p>
              )}
            </div>
          )}

          {/* SPACER */}
          {isLastPage && <div className="flex-1 min-h-[10mm]"></div>}

          {/* SIGNATURE + THANKING YOU */}
          {isLastPage && (
            <div className="pb-10 shrink-0">
              <div className="flex justify-between items-end">
                <div className="flex gap-6">
                  <div className="text-center text-[15px] w-28">
                    <div className="h-4"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">अध्यक्ष</p>
                  </div>
                  <div className="text-center text-[15px] w-28">
                    <div className="h-4"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">सचिव</p>
                  </div>
                  <div className="text-center text-[15px] w-28">
                    <div className="h-4"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">कोषाध्यक्ष</p>
                  </div>
                </div>
                <div className="text-right text-[12px] leading-snug">
                  <p className="font-bold m-0">Thanking You.</p>
                  <p className="mt-1 m-0 font-bold">सतबरवा आजीविका महिला संकुल स्तरीय</p>
                  <p className="m-0 font-bold">प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="w-full pt-1 pb-0 mt-auto shrink-0">
          <div className="flex w-full h-[5px] mb-1.5">
            <div className="w-[30%] bg-[#82c828]"></div>
            <div className="w-[70%] bg-[#e05a10]"></div>
          </div>
          <div className="text-center text-[12px] leading-tight space-y-[1px] text-black">
            <p className="m-0">
              <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, राँची रोड, सतबरवा पलामू 822126
            </p>
            <p className="m-0">
              <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना{' '}
              <strong>DRDA</strong> कार्यालय भवन , पलामू , 822102
            </p>
            <p className="m-0">
              <strong>राज्य कार्यालय :-</strong> द्वितीय तल, झारखण्ड राज्य कृषि विपणन पर्षद, ईटकी रोड, हेहल,राँची – 834005 झारखण्ड
            </p>
            <p className="m-0 pt-[1px]">
              <strong>फोन नं0</strong> 0651 2360038 / 2360142
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ===== PREVIEW ===== */}
      <div className="bg-gray-300 p-4 rounded overflow-auto w-full" style={{ maxHeight: '70vh' }}>
        <div className="flex flex-col items-center gap-8">
          {employeeChunks.map((chunk, pageIndex) => (
            <div
              key={pageIndex}
              style={{
                transform: 'scale(0.7)',
                transformOrigin: 'top center',
                marginBottom: '-85mm',
              }}
            >
              {renderPageCard(chunk, pageIndex, false)}
            </div>
          ))}
        </div>
      </div>

      {/* ===== PRINT PORTAL (also used for Save-as-PDF) ===== */}
      {mounted &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              left: '-10000px',
              top: 0,
              width: '210mm',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <div ref={printRef} className="print-root bg-white">
              {employeeChunks.map((chunk, pageIndex) =>
                renderPageCard(chunk, pageIndex, true)
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default AdviceFormate;