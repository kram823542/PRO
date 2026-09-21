// // ==================================================
// // AdviceUtils — Shared helpers for Advice components
// // ==================================================

// export const monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

// // ✅ Convert amount to words (Indian system — Lakh, Crore)
// export const formatAmountInWords = (amount) => {
//   const ones = [
//     '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
//     'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
//   ];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   const numToWords = (num) => {
//     if (num < 20) return ones[num];
//     if (num < 100)
//       return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
//     if (num < 1000)
//       return (
//         ones[Math.floor(num / 100)] +
//         ' Hundred' +
//         (num % 100 ? ' ' + numToWords(num % 100) : '')
//       );
//     if (num < 100000)
//       return (
//         numToWords(Math.floor(num / 1000)) +
//         ' Thousand' +
//         (num % 1000 ? ' ' + numToWords(num % 1000) : '')
//       );
//     if (num < 10000000)
//       return (
//         numToWords(Math.floor(num / 100000)) +
//         ' Lakh' +
//         (num % 100000 ? ' ' + numToWords(num % 100000) : '')
//       );
//     return (
//       numToWords(Math.floor(num / 10000000)) +
//       ' Crore' +
//       (num % 10000000 ? ' ' + numToWords(num % 10000000) : '')
//     );
//   };

//   return numToWords(Math.floor(amount)) + ' Rupees Only';
// };

// // ✅ Print styles — sirf print-area visible karein
// export const printStyles = `
//   @media print {
//     @page {
//       size: A4;
//       margin: 0;
//     }
//     body * {
//       visibility: hidden;
//     }
//     #print-area, #print-area * {
//       visibility: visible;
//     }
//     #print-area {
//       position: absolute;
//       left: 0;
//       top: 0;
//       width: 210mm;
//       min-height: 297mm;
//       box-shadow: none !important;
//       padding: 15mm 15mm 10mm 15mm !important;
//     }
//   }
// `;



// ==================================================
// AdviceUtils — Shared helpers for Advice components
// ==================================================

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// ✅ Convert amount to words (Indian system — Lakh, Crore)
export const formatAmountInWords = (amount) => {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const numToWords = (num) => {
    if (num < 20) return ones[num];
    if (num < 100)
      return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        ' Hundred' +
        (num % 100 ? ' ' + numToWords(num % 100) : '')
      );
    if (num < 100000)
      return (
        numToWords(Math.floor(num / 1000)) +
        ' Thousand' +
        (num % 1000 ? ' ' + numToWords(num % 1000) : '')
      );
    if (num < 10000000)
      return (
        numToWords(Math.floor(num / 100000)) +
        ' Lakh' +
        (num % 100000 ? ' ' + numToWords(num % 100000) : '')
      );
    return (
      numToWords(Math.floor(num / 10000000)) +
      ' Crore' +
      (num % 10000000 ? ' ' + numToWords(num % 10000000) : '')
    );
  };

  return numToWords(Math.floor(amount)) + ' Rupees Only';
};

// ✅ Print styles — strict single-page layout fix
export const printStyles = `
  @media print {
    @page {
      size: A4 portrait;
      margin: 0mm;
    }

    html, body {
      width: 210mm !important;
      height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Hide everything on page */
    body * {
      visibility: hidden !important;
    }

    /* Show only print area and its elements */
    #print-area, #print-area * {
      visibility: visible !important;
    }

    #print-area {
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 8mm 10mm 6mm 10mm !important;
      background: #ffffff !important;
      overflow: hidden !important;
      page-break-after: avoid !important;
      page-break-before: avoid !important;
      page-break-inside: avoid !important;
    }

    /* Hide modals, overlays, toasts */
    .Toastify,
    .react-hot-toast,
    [class*="Modal"],
    button {
      display: none !important;
    }
  }
`;