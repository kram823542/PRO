// // ==================================================
// // ExpenseAdviceFormate — A4 Size Company Expense Advice
// // Multi-Vendor Support
// // ==================================================

// const ExpenseAdviceFormate = ({ expensePreview, formatAmountInWords }) => {
//   if (
//     !expensePreview ||
//     !expensePreview.expenses ||
//     expensePreview.expenses.length === 0
//   ) {
//     return null;
//   }

//   const totalAmount = expensePreview.expenses.reduce(
//     (sum, exp) => sum + exp.amount,
//     0
//   );

//   return (
//     <div
//       id="print-area"
//       className="bg-white text-black shadow-2xl transition-all"
//       style={{
//         width: '210mm',
//         minHeight: '297mm',
//         padding: '15mm 15mm 10mm 15mm',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '11px',
//         lineHeight: '1.5',
//         color: '#000',
//         boxSizing: 'border-box',
//       }}
//     >
//       {/* HEADER with Logos */}
//       <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-black">
//         <img
//           src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
//           alt="Left Logo"
//           className="w-20 h-20 object-contain"
//           crossOrigin="anonymous"
//         />

//         <div className="flex-1 text-center" style={{ fontFamily: 'serif' }}>
//           <h1 className="text-[15px] font-bold leading-tight">
//             सतबरवा आजीविका महिला संकुल स्तरीय
//           </h1>
//           <h2 className="text-[16px] font-bold leading-tight mt-0.5">
//             प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
//           </h2>
//           <p className="text-[10px] font-semibold mt-1">
//             ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
//           </p>
//           <p className="text-[10px] font-semibold mt-0.5">
//             निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
//           </p>
//         </div>

//         <img
//           src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
//           alt="Right Logo"
//           className="w-20 h-20 object-contain"
//           crossOrigin="anonymous"
//         />
//       </div>

//       {/* PATRANK + DINANK */}
//       <div className="flex justify-between mt-4 mb-4" style={{ fontSize: '11px' }}>
//         <p>
//           <strong>पत्रांक -</strong> SAT/CLF/EXP/2026/
//         </p>
//         <p>
//           <strong>दिनांक -</strong>{' '}
//           {new Date(expensePreview.adviceDate).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//           })}
//         </p>
//       </div>

//       {/* TO */}
//       <div className="mb-4" style={{ fontSize: '11px' }}>
//         <p className="font-bold">To</p>
//         <p>The Branch Manager</p>
//         <p>{expensePreview.bankName}</p>
//         {expensePreview.branch && <p>Branch: {expensePreview.branch}</p>}
//       </div>

//       {/* SUBJECT */}
//       <div className="mb-3" style={{ fontSize: '11px' }}>
//         <p className="font-bold">
//           <u>Subject: Bank Advice for Company Expense Payment</u>
//         </p>
//       </div>

//       {/* REF */}
//       <div className="mb-3" style={{ fontSize: '11px' }}>
//         <p>
//           <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल
//           स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
//           <strong> 265200010080538</strong>
//         </p>
//       </div>

//       <p className="mb-2" style={{ fontSize: '11px' }}>
//         Dear Sir,
//       </p>

//       {/* MAIN PARAGRAPH */}
//       <p
//         className="mb-4 text-justify"
//         style={{ fontSize: '11px', textIndent: '30px' }}
//       >
//         Please debit a sum of Rs.{' '}
//         <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//         {formatAmountInWords(totalAmount)}) From our saving bank account of
//         सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB
//         A/c No. <strong>265200010080538</strong> by the fastest mode of
//         remittance as per the details given below:
//       </p>

//       {/* TABLE */}
//       <div className="mb-4">
//         <p className="text-center font-bold mb-2" style={{ fontSize: '11px' }}>
//           COMPANY EXPENSE — {new Date(expensePreview.adviceDate).getFullYear()}
//         </p>
//         <table
//           className="w-full border-collapse"
//           style={{ border: '1px solid #000', fontSize: '9.5px' }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f0f0f0' }}>
//               <th
//                 className="text-center font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Sl. NO.
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Vendor / Shop Name
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Purpose
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Bill No.
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Bank A/c
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Bank
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Branch
//               </th>
//               <th
//                 className="text-left font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 IFSC
//               </th>
//               <th
//                 className="text-right font-bold"
//                 style={{ border: '1px solid #000', padding: '4px' }}
//               >
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {expensePreview.expenses.map((exp, idx) => (
//               <tr key={idx}>
//                 <td
//                   className="text-center"
//                   style={{ border: '1px solid #000', padding: '4px' }}
//                 >
//                   {idx + 1}.
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '4px' }}>
//                   <div>{exp.vendorName}</div>
//                   {exp.vendorAddress && (
//                     <div style={{ fontSize: '8.5px', color: '#555' }}>
//                       {exp.vendorAddress}
//                     </div>
//                   )}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '4px' }}>
//                   {exp.purpose}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '4px', fontFamily: 'monospace' }}>
//                   {exp.billNumber || '-'}
//                 </td>
//                 <td
//                   style={{
//                     border: '1px solid #000',
//                     padding: '4px',
//                     fontFamily: 'monospace',
//                   }}
//                 >
//                   {exp.bankAccountNumber}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '4px' }}>
//                   {exp.bankName}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '4px' }}>
//                   {exp.branch}
//                 </td>
//                 <td
//                   style={{
//                     border: '1px solid #000',
//                     padding: '4px',
//                     fontFamily: 'monospace',
//                   }}
//                 >
//                   {exp.ifscCode}
//                 </td>
//                 <td
//                   className="text-right font-bold"
//                   style={{ border: '1px solid #000', padding: '4px' }}
//                 >
//                   {exp.amount.toLocaleString('en-IN')}
//                 </td>
//               </tr>
//             ))}
//             <tr style={{ backgroundColor: '#f9f9f9' }}>
//               <td
//                 colSpan="8"
//                 className="text-right font-bold"
//                 style={{ border: '1px solid #000', padding: '5px' }}
//               >
//                 TOTAL
//               </td>
//               <td
//                 className="text-right font-bold"
//                 style={{ border: '1px solid #000', padding: '5px' }}
//               >
//                 {totalAmount.toLocaleString('en-IN')}.00
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <p className="mt-2" style={{ fontSize: '11px' }}>
//           Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//           {formatAmountInWords(totalAmount)})
//         </p>
//       </div>

//       {/* SIGNATURE */}
//       <div className="flex justify-between mt-12 pt-6">
//         <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
//           <div style={{ height: '40px' }}></div>
//           <p className="border-t border-black pt-1 font-bold">अध्यक्ष</p>
//         </div>
//         <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
//           <div style={{ height: '40px' }}></div>
//           <p className="border-t border-black pt-1 font-bold">सचिव</p>
//         </div>
//       </div>

//       <div className="text-center mt-6" style={{ fontSize: '11px' }}>
//         <p className="font-bold">Thanking You.</p>
//         <p className="mt-1">सतबरवा आजीविका महिला संकुल स्तरीय</p>
//         <p>प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
//       </div>

//       {/* FOOTER */}
//       <div className="mt-6 pt-3 border-t border-black text-[10px] leading-tight space-y-0.5">
//         <p>
//           <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, सैंची रोड,
//           सतबरवा, पलामू, 822126
//         </p>
//         <p>
//           <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना DRDA
//           कार्यालय भवन, पलामू, 822102
//         </p>
//         <p>
//           <strong>राज्य कार्यालय :-</strong> त्रितीय तल, झारखण्ड राज्य कृषि विपणन
//           परिषद, इटकी रोड, हेहल, राँची - 834005 झारखण्ड
//         </p>
//         <p>फोन नं 0651-2360038/2360142</p>
//       </div>
//     </div>
//   );
// };

// export default ExpenseAdviceFormate;



import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useReactToPrint } from 'react-to-print';

const ExpenseAdviceFormate = ({ expensePreview, formatAmountInWords }) => {
  const printRef = useRef(null);
  const pdfRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ---- PRINT handler ----
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Expense-Advice-${Date.now()}`,
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
          min-height: 296mm !important;
          max-height: 296mm !important;
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

  // ---- DOWNLOAD PDF handler ----
  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `Expense-Advice-${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            scrollY: 0,
            windowWidth: pdfRef.current.scrollWidth,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'], avoid: '.print-page-card' },
        })
        .from(pdfRef.current)
        .save();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  // Expose to parent
  useEffect(() => {
    window.__expenseAdviceFormatePrint = handlePrint;
    window.__expenseAdviceFormateDownload = handleDownloadPDF;
    return () => {
      delete window.__expenseAdviceFormatePrint;
      delete window.__expenseAdviceFormateDownload;
    };
  }, [handlePrint]);

  if (
    !expensePreview ||
    !expensePreview.expenses ||
    expensePreview.expenses.length === 0
  ) {
    return null;
  }

  const totalAmount = expensePreview.expenses.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  const PAGE_1_MAX = 5;
  const PAGE_NEXT_MAX = 11;

  const expenses = expensePreview.expenses;
  const expenseChunks = [];

  if (expenses.length <= PAGE_1_MAX) {
    expenseChunks.push(expenses);
  } else {
    expenseChunks.push(expenses.slice(0, PAGE_1_MAX));
    let remaining = expenses.slice(PAGE_1_MAX);
    while (remaining.length > 0) {
      expenseChunks.push(remaining.slice(0, PAGE_NEXT_MAX));
      remaining = remaining.slice(PAGE_NEXT_MAX);
    }
  }

  // ============ SHARED PAGE RENDERER ============
  const renderPageCard = (chunk, pageIndex, isPrintMode) => {
    const isLastPage = pageIndex === expenseChunks.length - 1;

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
            <p className="m-0">पत्रांक - SAT/CLF/EXP/2026/</p>
            <p className="m-0">
              दिनांक -{' '}
              {new Date(expensePreview.adviceDate).toLocaleDateString('en-IN', {
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
                <p className="m-0">{expensePreview.bankName}</p>
                {expensePreview.branch && (
                  <p className="m-0">Branch: {expensePreview.branch}</p>
                )}
              </div>

              <div className="text-[16px] mb-2 shrink-0">
                <p className="font-bold m-0 underline">
                  Subject: Bank Advice for Company Expense Payment
                </p>
              </div>

              <div className="text-[16px] mb-2 shrink-0">
                <p className="m-0">
                  <strong>Ref:</strong> SB Account number : सतबरवा आजीविका
                  महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड,
                  SB A/c No.
                  <strong> 265200010080538</strong>
                </p>
              </div>

              <p className="text-[16px] my-2 shrink-0">Dear Sir,</p>

              <p className="text-[16px] mb-3 text-justify indent-8 m-0 leading-relaxed shrink-0">
                Please debit a sum of Rs.{' '}
                <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
                {formatAmountInWords(totalAmount)}) From our saving bank account
                of सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी
                समिति लिमिटेड, SB A/c No.{' '}
                <strong>265200010080538</strong> by the fastest mode of
                remittance as per the details given below:
              </p>
            </>
          )}

          {/* TABLE SECTION */}
          <div className="mb-2">
            {expenseChunks.length > 1 && (
              <p className="text-center font-bold text-[15px] my-2">
                <span className="font-normal">
                  (Page {pageIndex + 1} of {expenseChunks.length})
                </span>
              </p>
            )}

            <table className="w-full border-collapse border border-black table-fixed">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-black p-1 font-bold text-center text-[13px] w-[5%]">
        Sl.
      </th>
      <th className="border border-black p-1 font-bold text-left text-[13px] w-[22%]">
        Shop / Vendor
      </th>
      <th className="border border-black p-1 font-bold text-left text-[13px] w-[14%]">
        Bank
      </th>
      <th className="border border-black p-1 font-bold text-left text-[13px] w-[13%]">
        Branch
      </th>
      <th className="border border-black p-1 font-bold text-left text-[13px] w-[18%]">
        Bank A/c
      </th>
      <th className="border border-black p-1 font-bold text-left text-[13px] w-[13%]">
        IFSC
      </th>
      <th className="border border-black p-1 font-bold text-right text-[13px] w-[15%]">
        Amount
      </th>
    </tr>
  </thead>
  <tbody>
    {chunk.map((exp, idx) => {
      const globalIdx =
        pageIndex === 0
          ? idx + 1
          : PAGE_1_MAX + (pageIndex - 1) * PAGE_NEXT_MAX + idx + 1;
      return (
        <tr key={exp._id || idx}>
          <td className="border border-black p-1 text-center text-[14px] font-semibold">
            {globalIdx}.
          </td>
          <td className="border border-black p-1 break-words text-[14px] font-semibold">
            {exp.vendorName}
          </td>
          <td className="border border-black p-1 break-words text-[13px]">
            {exp.bankName}
          </td>
          <td className="border border-black p-1 break-words text-[13px]">
            {exp.branch}
          </td>
          <td className="border border-black p-1 font-mono text-[13px] font-bold whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
            {exp.bankAccountNumber}
          </td>
          <td className="border border-black p-1 font-mono text-[12px] font-bold whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
            {exp.ifscCode}
          </td>
          <td className="border border-black p-1 text-right font-bold whitespace-nowrap text-[14px]">
            {Number(exp.amount || 0).toLocaleString('en-IN')}
          </td>
        </tr>
      );
    })}
    {isLastPage && (
      <tr className="bg-gray-50">
        <td
          colSpan="6"
          className="border border-black p-1.5 text-right font-bold text-[15px]"
        >
          TOTAL
        </td>
        <td className="border border-black p-1.5 text-right font-bold text-[15px] whitespace-nowrap">
          {totalAmount.toLocaleString('en-IN')}.00
        </td>
      </tr>
    )}
  </tbody>
</table>

            {isLastPage && (
              <p className="text-[15px] mt-2 mb-0 font-semibold">
                Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
                {formatAmountInWords(totalAmount)})
              </p>
            )}
          </div>

          {/* SIGNATURE + THANKING YOU — footer ke upar push karega */}
          {isLastPage && (
            <div className="mt-auto mb-8">
              <div className="flex justify-between items-end">
                {/* LEFT: Signatures */}
                <div className="flex gap-6">
                  <div className="text-center text-[15px] w-28">
                    <div className="h-10"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">
                      अध्यक्ष
                    </p>
                  </div>
                  <div className="text-center text-[15px] w-28">
                    <div className="h-10"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">
                      सचिव
                    </p>
                  </div>
                  <div className="text-center text-[15px] w-28">
                    <div className="h-10"></div>
                    <p className="border-t border-black pt-1 font-bold m-0">
                      कोषाध्यक्ष
                    </p>
                  </div>
                </div>

                {/* RIGHT: Thanking You block */}
                <div className="text-right text-[15px] leading-snug">
                  <p className="font-bold m-0">Thanking You.</p>
                  <p className="mt-1 m-0 font-bold">
                    सतबरवा आजीविका महिला संकुल स्तरीय
                  </p>
                  <p className="m-0 font-bold">
                    प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER - centered */}
        <div className="w-full pt-2 shrink-0">
          <div className="flex w-full h-[6px] mb-2">
            <div className="w-[30%] bg-[#82c828]"></div>
            <div className="w-[70%] bg-[#e05a10]"></div>
          </div>
          <div className="text-center text-[13px] leading-relaxed space-y-0.5 text-black">
            <p className="m-0">
              <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई,
              सैंची रोड, सतबरवा, पलामू, 822126
            </p>
            <p className="m-0">
              <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना{' '}
              <strong>DRDA</strong> कार्यालय भवन, पलामू, 822102
            </p>
            <p className="m-0">
              <strong>राज्य कार्यालय :-</strong> त्रितीय तल, झारखण्ड राज्य कृषि
              विपणन परिषद, इटकी रोड, हेहल, राँची - 834005 झारखण्ड
            </p>
            <p className="m-0 pt-0.5">
              <strong>फोन नं</strong> 0651-2360038/2360142
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ===== PREVIEW ===== */}
      <div
        className="bg-gray-300 p-4 rounded overflow-auto w-full"
        style={{ maxHeight: '70vh' }}
      >
        <div className="flex flex-col items-center gap-8">
          {expenseChunks.map((chunk, pageIndex) => (
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

      {/* ===== PORTAL: PRINT-ONLY ===== */}
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
              {expenseChunks.map((chunk, pageIndex) =>
                renderPageCard(chunk, pageIndex, true)
              )}
            </div>
          </div>,
          document.body
        )}

      {/* ===== PORTAL: PDF-ONLY ===== */}
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
            <div ref={pdfRef} className="bg-white">
              {expenseChunks.map((chunk, pageIndex) =>
                renderPageCard(chunk, pageIndex, true)
              )}
            </div>
          </div>,
          document.body
        )}

      {/* DOWNLOADING INDICATOR */}
      {downloading && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
          <div className="bg-white rounded-lg px-6 py-4 shadow-2xl">
            <p className="text-sm font-bold text-gray-800">
              PDF download ho raha hai... please wait
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseAdviceFormate;