
// // ==================================================
// // AdviceFormate — A4 Size Bank Transfer Advice (Salary)
// // Multiple Employees Support
// // ==================================================

// const AdviceFormate = ({ advicePreview, formatAmountInWords }) => {
//   if (
//     !advicePreview ||
//     !advicePreview.employees ||
//     advicePreview.employees.length === 0
//   ) {
//     return null;
//   }

//   const totalAmount = advicePreview.employees.reduce(
//     (sum, emp) => sum + emp.amount,
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
//           <strong>पत्रांक -</strong> SAT/CLF/2026/
//         </p>
//         <p>
//           <strong>दिनांक -</strong>{' '}
//           {new Date(advicePreview.adviceDate).toLocaleDateString('en-IN', {
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
//         <p>{advicePreview.bankName}</p>
//         {advicePreview.branch && <p>Branch: {advicePreview.branch}</p>}
//       </div>

//       {/* SUBJECT */}
//       <div className="mb-3" style={{ fontSize: '11px' }}>
//         <p className="font-bold">
//           <u>Subject: Bank Advice for transfer</u>
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
//           FLCRP-{new Date(advicePreview.adviceDate).getFullYear()}
//         </p>
//         <table
//           className="w-full border-collapse"
//           style={{ border: '1px solid #000', fontSize: '10px' }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f0f0f0' }}>
//               <th className="text-center font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Sl. NO.
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Name
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Month
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Bank A/c
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Name of Bank
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Branch
//               </th>
//               <th className="text-left font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 IFSC Code
//               </th>
//               <th className="text-right font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {advicePreview.employees.map((emp, idx) => (
//               <tr key={emp._id || idx}>
//                 <td className="text-center" style={{ border: '1px solid #000', padding: '5px' }}>
//                   {idx + 1}.
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px' }}>
//                   {emp.name}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px' }}>
//                   {emp.month}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px', fontFamily: 'monospace' }}>
//                   {emp.bankAccountNumber}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px' }}>
//                   {emp.bankName}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px' }}>
//                   {emp.branch}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '5px', fontFamily: 'monospace' }}>
//                   {emp.ifscCode}
//                 </td>
//                 <td className="text-right font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                   {emp.amount.toLocaleString('en-IN')}
//                 </td>
//               </tr>
//             ))}
//             <tr style={{ backgroundColor: '#f9f9f9' }}>
//               <td colSpan="7" className="text-right font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
//                 TOTAL
//               </td>
//               <td className="text-right font-bold" style={{ border: '1px solid #000', padding: '5px' }}>
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

//       {/* SIGNATURE SECTION */}
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

// export default AdviceFormate;



// // ==================================================
// // AdviceFormate — A4 Size Bank Transfer Advice (Salary)
// // Single Page Fit
// // ==================================================

// const AdviceFormate = ({ advicePreview, formatAmountInWords }) => {
//   if (
//     !advicePreview ||
//     !advicePreview.employees ||
//     advicePreview.employees.length === 0
//   ) {
//     return null;
//   }

//   const totalAmount = advicePreview.employees.reduce(
//     (sum, emp) => sum + emp.amount,
//     0
//   );

//   return (
//     <div
//       id="print-area"
//       className="bg-white text-black"
//       style={{
//         width: '210mm',
//         minHeight: '297mm',
//         maxHeight: '297mm',
//         padding: '12mm 15mm 8mm 15mm',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '10px',
//         lineHeight: '1.35',
//         color: '#000',
//         boxSizing: 'border-box',
//         overflow: 'hidden',
//       }}
//     >
//       {/* HEADER with Logos */}
//       <div
//         className="flex items-center justify-between gap-2"
//         style={{ paddingBottom: '6px', borderBottom: '2px solid #000' }}
//       >
//         <img
//           src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
//           alt="Left Logo"
//           style={{ width: '60px', height: '60px', objectFit: 'contain' }}
//           crossOrigin="anonymous"
//         />

//         <div className="flex-1 text-center" style={{ fontFamily: 'serif' }}>
//           <h1 style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.2' }}>
//             सतबरवा आजीविका महिला संकुल स्तरीय
//           </h1>
//           <h2 style={{ fontSize: '15px', fontWeight: 'bold', lineHeight: '1.2', marginTop: '1px' }}>
//             प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
//           </h2>
//           <p style={{ fontSize: '9px', fontWeight: '600', marginTop: '3px' }}>
//             ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
//           </p>
//           <p style={{ fontSize: '9px', fontWeight: '600', marginTop: '1px' }}>
//             निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
//           </p>
//         </div>

//         <img
//           src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
//           alt="Right Logo"
//           style={{ width: '60px', height: '60px', objectFit: 'contain' }}
//           crossOrigin="anonymous"
//         />
//       </div>

//       {/* PATRANK + DINANK */}
//       <div
//         className="flex justify-between"
//         style={{ fontSize: '10px', marginTop: '8px', marginBottom: '8px' }}
//       >
//         <p>
//           <strong>पत्रांक -</strong> SAT/CLF/2026/
//         </p>
//         <p>
//           <strong>दिनांक -</strong>{' '}
//           {new Date(advicePreview.adviceDate).toLocaleDateString('en-IN', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//           })}
//         </p>
//       </div>

//       {/* TO */}
//       <div style={{ fontSize: '10px', marginBottom: '8px' }}>
//         <p style={{ fontWeight: 'bold' }}>To</p>
//         <p>The Branch Manager</p>
//         <p>{advicePreview.bankName}</p>
//         {advicePreview.branch && <p>Branch: {advicePreview.branch}</p>}
//       </div>

//       {/* SUBJECT */}
//       <div style={{ fontSize: '10px', marginBottom: '6px' }}>
//         <p style={{ fontWeight: 'bold' }}>
//           <u>Subject: Bank Advice for transfer</u>
//         </p>
//       </div>

//       {/* REF */}
//       <div style={{ fontSize: '10px', marginBottom: '6px' }}>
//         <p>
//           <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल
//           स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
//           <strong> 265200010080538</strong>
//         </p>
//       </div>

//       <p style={{ fontSize: '10px', marginBottom: '5px' }}>Dear Sir,</p>

//       {/* MAIN PARAGRAPH */}
//       <p
//         style={{
//           fontSize: '10px',
//           marginBottom: '8px',
//           textAlign: 'justify',
//           textIndent: '25px',
//         }}
//       >
//         Please debit a sum of Rs.{' '}
//         <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//         {formatAmountInWords(totalAmount)}) From our saving bank account of
//         सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB
//         A/c No. <strong>265200010080538</strong> by the fastest mode of
//         remittance as per the details given below:
//       </p>

//       {/* TABLE */}
//       <div style={{ marginBottom: '8px' }}>
//         <p
//           className="text-center"
//           style={{ fontWeight: 'bold', fontSize: '10px', marginBottom: '4px' }}
//         >
//           FLCRP-{new Date(advicePreview.adviceDate).getFullYear()}
//         </p>
//         <table
//           className="w-full border-collapse"
//           style={{ border: '1px solid #000', fontSize: '9px' }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: '#f0f0f0' }}>
//               <th
//                 className="text-center"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '5%' }}
//               >
//                 Sl.
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '18%' }}
//               >
//                 Name
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '12%' }}
//               >
//                 Month
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '15%' }}
//               >
//                 Bank A/c
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '14%' }}
//               >
//                 Bank
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '12%' }}
//               >
//                 Branch
//               </th>
//               <th
//                 className="text-left"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '14%' }}
//               >
//                 IFSC
//               </th>
//               <th
//                 className="text-right"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold', width: '10%' }}
//               >
//                 Amount
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {advicePreview.employees.map((emp, idx) => (
//               <tr key={emp._id || idx}>
//                 <td
//                   className="text-center"
//                   style={{ border: '1px solid #000', padding: '3px' }}
//                 >
//                   {idx + 1}.
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '3px' }}>
//                   {emp.name}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '3px' }}>
//                   {emp.month}
//                 </td>
//                 <td
//                   style={{
//                     border: '1px solid #000',
//                     padding: '3px',
//                     fontFamily: 'monospace',
//                     fontSize: '8px',
//                   }}
//                 >
//                   {emp.bankAccountNumber}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '3px' }}>
//                   {emp.bankName}
//                 </td>
//                 <td style={{ border: '1px solid #000', padding: '3px' }}>
//                   {emp.branch}
//                 </td>
//                 <td
//                   style={{
//                     border: '1px solid #000',
//                     padding: '3px',
//                     fontFamily: 'monospace',
//                     fontSize: '8px',
//                   }}
//                 >
//                   {emp.ifscCode}
//                 </td>
//                 <td
//                   className="text-right"
//                   style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold' }}
//                 >
//                   {emp.amount.toLocaleString('en-IN')}
//                 </td>
//               </tr>
//             ))}
//             <tr style={{ backgroundColor: '#f9f9f9' }}>
//               <td
//                 colSpan="7"
//                 className="text-right"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold' }}
//               >
//                 TOTAL
//               </td>
//               <td
//                 className="text-right"
//                 style={{ border: '1px solid #000', padding: '3px', fontWeight: 'bold' }}
//               >
//                 {totalAmount.toLocaleString('en-IN')}.00
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <p style={{ fontSize: '10px', marginTop: '4px' }}>
//           Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
//           {formatAmountInWords(totalAmount)})
//         </p>
//       </div>

//       {/* SIGNATURE SECTION */}
//       <div className="flex justify-between" style={{ marginTop: '30px' }}>
//         <div className="text-center" style={{ fontSize: '10px', width: '150px' }}>
//           <div style={{ height: '30px' }}></div>
//           <p style={{ borderTop: '1px solid #000', paddingTop: '3px', fontWeight: 'bold' }}>
//             अध्यक्ष
//           </p>
//         </div>
//         <div className="text-center" style={{ fontSize: '10px', width: '150px' }}>
//           <div style={{ height: '30px' }}></div>
//           <p style={{ borderTop: '1px solid #000', paddingTop: '3px', fontWeight: 'bold' }}>
//             सचिव
//           </p>
//         </div>
//       </div>

//       <div className="text-center" style={{ fontSize: '10px', marginTop: '15px' }}>
//         <p style={{ fontWeight: 'bold' }}>Thanking You.</p>
//         <p style={{ marginTop: '3px' }}>सतबरवा आजीविका महिला संकुल स्तरीय</p>
//         <p>प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
//       </div>

//       {/* FOOTER */}
//       <div
//         style={{
//           marginTop: '12px',
//           paddingTop: '8px',
//           borderTop: '1px solid #000',
//           fontSize: '9px',
//           lineHeight: '1.3',
//         }}
//       >
//         <p>
//           <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, सैंची रोड,
//           सतबरवा, पलामू, 822126
//         </p>
//         <p style={{ marginTop: '2px' }}>
//           <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना DRDA
//           कार्यालय भवन, पलामू, 822102
//         </p>
//         <p style={{ marginTop: '2px' }}>
//           <strong>राज्य कार्यालय :-</strong> त्रितीय तल, झारखण्ड राज्य कृषि विपणन
//           परिषद, इटकी रोड, हेहल, राँची - 834005 झारखण्ड
//         </p>
//         <p style={{ marginTop: '2px' }}>फोन नं 0651-2360038/2360142</p>
//       </div>
//     </div>
//   );
// };

// export default AdviceFormate;

import React from 'react';

const AdviceFormate = ({ advicePreview, formatAmountInWords }) => {
  if (
    !advicePreview ||
    !advicePreview.employees ||
    advicePreview.employees.length === 0
  ) {
    return null;
  }

  const totalAmount = advicePreview.employees.reduce(
    (sum, emp) => sum + emp.amount,
    0
  );

  return (
    <div
      id="print-area"
      className="bg-white text-black"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '8mm 10mm 6mm 10mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
        lineHeight: '1.3',
        color: '#000',
        margin: '0 auto',
      }}
    >
      {/* ============ HEADER with Logos ============ */}
      <div
        className="flex items-center justify-between gap-2"
        style={{ paddingBottom: '5px', borderBottom: '2px solid #000' }}
      >
        <img
          src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
          alt="Left Logo"
          style={{ width: '55px', height: '55px', objectFit: 'contain' }}
          crossOrigin="anonymous"
        />

        <div className="flex-1 text-center" style={{ fontFamily: 'serif' }}>
          <h1
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              lineHeight: '1.15',
              margin: 0,
            }}
          >
            सतबरवा आजीविका महिला संकुल स्तरीय
          </h1>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '1.15',
              marginTop: '1px',
              margin: 0,
            }}
          >
            प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
          </h2>
          <p
            style={{
              fontSize: '10px',
              fontWeight: '600',
              marginTop: '2px',
              marginBottom: 0,
            }}
          >
            ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
          </p>
          <p
            style={{
              fontSize: '10px',
              fontWeight: '600',
              marginTop: '1px',
              marginBottom: 0,
            }}
          >
            निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
          </p>
        </div>

        <img
          src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
          alt="Right Logo"
          style={{ width: '55px', height: '55px', objectFit: 'contain' }}
          crossOrigin="anonymous"
        />
      </div>

      {/* ============ PATRANK + DINANK ============ */}
      <div
        className="flex justify-between"
        style={{ fontSize: '11px', marginTop: '6px', marginBottom: '6px' }}
      >
        <p style={{ margin: 0 }}>
          <strong>पत्रांक -</strong> SAT/CLF/2026/
        </p>
        <p style={{ margin: 0 }}>
          <strong>दिनांक -</strong>{' '}
          {new Date(advicePreview.adviceDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* ============ TO ============ */}
      <div style={{ fontSize: '11px', marginBottom: '6px' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>To</p>
        <p style={{ margin: 0 }}>The Branch Manager</p>
        <p style={{ margin: 0 }}>{advicePreview.bankName}</p>
        {advicePreview.branch && <p style={{ margin: 0 }}>Branch: {advicePreview.branch}</p>}
      </div>

      {/* ============ SUBJECT ============ */}
      <div style={{ fontSize: '11px', marginBottom: '5px' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>
          <u>Subject: Bank Advice for transfer</u>
        </p>
      </div>

      {/* ============ REF ============ */}
      <div style={{ fontSize: '11px', marginBottom: '5px' }}>
        <p style={{ margin: 0 }}>
          <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल
          स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
          <strong> 265200010080538</strong>
        </p>
      </div>

      <p style={{ fontSize: '11px', marginBottom: '5px', marginTop: '5px' }}>
        Dear Sir,
      </p>

      {/* ============ MAIN PARAGRAPH ============ */}
      <p
        style={{
          fontSize: '11px',
          marginBottom: '6px',
          textAlign: 'justify',
          textIndent: '25px',
          margin: '0 0 6px 0',
        }}
      >
        Please debit a sum of Rs.{' '}
        <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
        {formatAmountInWords(totalAmount)}) From our saving bank account of
        सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB
        A/c No. <strong>265200010080538</strong> by the fastest mode of
        remittance as per the details given below:
      </p>

      {/* ============ TABLE ============ */}
      <div style={{ marginBottom: '6px' }}>
        <p
          className="text-center"
          style={{
            fontWeight: 'bold',
            fontSize: '11px',
            marginBottom: '3px',
            marginTop: '3px',
            margin: '3px 0',
          }}
        >
          FLCRP-{new Date(advicePreview.adviceDate).getFullYear()}
        </p>
        <table
          className="w-full border-collapse"
          style={{
            border: '1px solid #000',
            fontSize: '10px',
            tableLayout: 'fixed',
            width: '100%',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th
                className="text-center"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '5%',
                }}
              >
                Sl.
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '17%',
                }}
              >
                Name
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '11%',
                }}
              >
                Month
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '16%',
                }}
              >
                Bank A/c
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '14%',
                }}
              >
                Bank
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '12%',
                }}
              >
                Branch
              </th>
              <th
                className="text-left"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '15%',
                }}
              >
                IFSC
              </th>
              <th
                className="text-right"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                  width: '10%',
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {advicePreview.employees.map((emp, idx) => (
              <tr key={emp._id || idx}>
                <td
                  className="text-center"
                  style={{ border: '1px solid #000', padding: '3px 2px' }}
                >
                  {idx + 1}.
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    wordBreak: 'break-word',
                  }}
                >
                  {emp.name}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px 2px' }}>
                  {emp.month}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    wordBreak: 'break-all',
                  }}
                >
                  {emp.bankAccountNumber}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    wordBreak: 'break-word',
                  }}
                >
                  {emp.bankName}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    wordBreak: 'break-word',
                  }}
                >
                  {emp.branch}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    fontFamily: 'monospace',
                    fontSize: '9px',
                  }}
                >
                  {emp.ifscCode}
                </td>
                <td
                  className="text-right"
                  style={{
                    border: '1px solid #000',
                    padding: '3px 2px',
                    fontWeight: 'bold',
                  }}
                >
                  {emp.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <td
                colSpan="7"
                className="text-right"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                }}
              >
                TOTAL
              </td>
              <td
                className="text-right"
                style={{
                  border: '1px solid #000',
                  padding: '3px 2px',
                  fontWeight: 'bold',
                }}
              >
                {totalAmount.toLocaleString('en-IN')}.00
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '11px', marginTop: '3px', marginBottom: 0 }}>
          Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
          {formatAmountInWords(totalAmount)})
        </p>
      </div>

      {/* ============ SIGNATURE SECTION ============ */}
      <div className="flex justify-between" style={{ marginTop: '20px' }}>
        <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
          <div style={{ height: '20px' }}></div>
          <p
            style={{
              borderTop: '1px solid #000',
              paddingTop: '3px',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            अध्यक्ष
          </p>
        </div>
        <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
          <div style={{ height: '20px' }}></div>
          <p
            style={{
              borderTop: '1px solid #000',
              paddingTop: '3px',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            सचिव
          </p>
        </div>
      </div>

      <div className="text-center" style={{ fontSize: '11px', marginTop: '10px' }}>
        <p style={{ fontWeight: 'bold', margin: 0 }}>Thanking You.</p>
        <p style={{ marginTop: '2px', margin: 0 }}>
          सतबरवा आजीविका महिला संकुल स्तरीय
        </p>
        <p style={{ margin: 0 }}>प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
      </div>

      {/* ============ FOOTER ============ */}
      <div
        style={{
          marginTop: '8px',
          paddingTop: '5px',
          borderTop: '1px solid #000',
          fontSize: '10px',
          lineHeight: '1.2',
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, सैंची रोड,
          सतबरवा, पलामू, 822126
        </p>
        <p style={{ marginTop: '1px', margin: 0 }}>
          <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना DRDA
          कार्यालय भवन, पलामू, 822102
        </p>
        <p style={{ marginTop: '1px', margin: 0 }}>
          <strong>राज्य कार्यालय :-</strong> त्रितीय तल, झारखण्ड राज्य कृषि विपणन
          परिषद, इटकी रोड, हेहल, राँची - 834005 झारखण्ड
        </p>
        <p style={{ marginTop: '1px', margin: 0 }}>फोन नं 0651-2360038/2360142</p>
      </div>
    </div>
  );
};

export default AdviceFormate;