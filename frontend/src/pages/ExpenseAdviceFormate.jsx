// ==================================================
// ExpenseAdviceFormate — A4 Size Company Expense Advice
// Multi-Vendor Support
// ==================================================

const ExpenseAdviceFormate = ({ expensePreview, formatAmountInWords }) => {
  if (
    !expensePreview ||
    !expensePreview.expenses ||
    expensePreview.expenses.length === 0
  ) {
    return null;
  }

  const totalAmount = expensePreview.expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  return (
    <div
      id="print-area"
      className="bg-white text-black shadow-2xl transition-all"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm 15mm 10mm 15mm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11px',
        lineHeight: '1.5',
        color: '#000',
        boxSizing: 'border-box',
      }}
    >
      {/* HEADER with Logos */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b-2 border-black">
        <img
          src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380290/WhatsApp_Image_2026-09-14_at_1.07.08_PM_nbbmda.jpg"
          alt="Left Logo"
          className="w-20 h-20 object-contain"
          crossOrigin="anonymous"
        />

        <div className="flex-1 text-center" style={{ fontFamily: 'serif' }}>
          <h1 className="text-[15px] font-bold leading-tight">
            सतबरवा आजीविका महिला संकुल स्तरीय
          </h1>
          <h2 className="text-[16px] font-bold leading-tight mt-0.5">
            प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड
          </h2>
          <p className="text-[10px] font-semibold mt-1">
            ग्राम- सतबरवा, कलस्टर- सतबरवा, प्रखंड- सतबरवा, जिला- पलामू (झा0)
          </p>
          <p className="text-[10px] font-semibold mt-0.5">
            निबंधन संख्या :- 02-JKD-01-04-01-0TH-001-2023
          </p>
        </div>

        <img
          src="https://res.cloudinary.com/dsjnikk42/image/upload/v1789380471/WhatsApp_Image_2026-09-14_at_1.07.10_PM_owpahi.jpg"
          alt="Right Logo"
          className="w-20 h-20 object-contain"
          crossOrigin="anonymous"
        />
      </div>

      {/* PATRANK + DINANK */}
      <div className="flex justify-between mt-4 mb-4" style={{ fontSize: '11px' }}>
        <p>
          <strong>पत्रांक -</strong> SAT/CLF/EXP/2026/
        </p>
        <p>
          <strong>दिनांक -</strong>{' '}
          {new Date(expensePreview.adviceDate).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* TO */}
      <div className="mb-4" style={{ fontSize: '11px' }}>
        <p className="font-bold">To</p>
        <p>The Branch Manager</p>
        <p>{expensePreview.bankName}</p>
        {expensePreview.branch && <p>Branch: {expensePreview.branch}</p>}
      </div>

      {/* SUBJECT */}
      <div className="mb-3" style={{ fontSize: '11px' }}>
        <p className="font-bold">
          <u>Subject: Bank Advice for Company Expense Payment</u>
        </p>
      </div>

      {/* REF */}
      <div className="mb-3" style={{ fontSize: '11px' }}>
        <p>
          <strong>Ref:</strong> SB Account number : सतबरवा आजीविका महिला संकुल
          स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB A/c No.
          <strong> 265200010080538</strong>
        </p>
      </div>

      <p className="mb-2" style={{ fontSize: '11px' }}>
        Dear Sir,
      </p>

      {/* MAIN PARAGRAPH */}
      <p
        className="mb-4 text-justify"
        style={{ fontSize: '11px', textIndent: '30px' }}
      >
        Please debit a sum of Rs.{' '}
        <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
        {formatAmountInWords(totalAmount)}) From our saving bank account of
        सतबरवा आजीविका महिला संकुल स्तरीय प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड, SB
        A/c No. <strong>265200010080538</strong> by the fastest mode of
        remittance as per the details given below:
      </p>

      {/* TABLE */}
      <div className="mb-4">
        <p className="text-center font-bold mb-2" style={{ fontSize: '11px' }}>
          COMPANY EXPENSE — {new Date(expensePreview.adviceDate).getFullYear()}
        </p>
        <table
          className="w-full border-collapse"
          style={{ border: '1px solid #000', fontSize: '9.5px' }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th
                className="text-center font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Sl. NO.
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Vendor / Shop Name
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Purpose
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Bill No.
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Bank A/c
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Bank
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Branch
              </th>
              <th
                className="text-left font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                IFSC
              </th>
              <th
                className="text-right font-bold"
                style={{ border: '1px solid #000', padding: '4px' }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {expensePreview.expenses.map((exp, idx) => (
              <tr key={idx}>
                <td
                  className="text-center"
                  style={{ border: '1px solid #000', padding: '4px' }}
                >
                  {idx + 1}.
                </td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>
                  <div>{exp.vendorName}</div>
                  {exp.vendorAddress && (
                    <div style={{ fontSize: '8.5px', color: '#555' }}>
                      {exp.vendorAddress}
                    </div>
                  )}
                </td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>
                  {exp.purpose}
                </td>
                <td style={{ border: '1px solid #000', padding: '4px', fontFamily: 'monospace' }}>
                  {exp.billNumber || '-'}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  {exp.bankAccountNumber}
                </td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>
                  {exp.bankName}
                </td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>
                  {exp.branch}
                </td>
                <td
                  style={{
                    border: '1px solid #000',
                    padding: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  {exp.ifscCode}
                </td>
                <td
                  className="text-right font-bold"
                  style={{ border: '1px solid #000', padding: '4px' }}
                >
                  {exp.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <td
                colSpan="8"
                className="text-right font-bold"
                style={{ border: '1px solid #000', padding: '5px' }}
              >
                TOTAL
              </td>
              <td
                className="text-right font-bold"
                style={{ border: '1px solid #000', padding: '5px' }}
              >
                {totalAmount.toLocaleString('en-IN')}.00
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2" style={{ fontSize: '11px' }}>
          Rs. <strong>{totalAmount.toLocaleString('en-IN')}/-</strong> (
          {formatAmountInWords(totalAmount)})
        </p>
      </div>

      {/* SIGNATURE */}
      <div className="flex justify-between mt-12 pt-6">
        <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
          <div style={{ height: '40px' }}></div>
          <p className="border-t border-black pt-1 font-bold">अध्यक्ष</p>
        </div>
        <div className="text-center" style={{ fontSize: '11px', width: '150px' }}>
          <div style={{ height: '40px' }}></div>
          <p className="border-t border-black pt-1 font-bold">सचिव</p>
        </div>
      </div>

      <div className="text-center mt-6" style={{ fontSize: '11px' }}>
        <p className="font-bold">Thanking You.</p>
        <p className="mt-1">सतबरवा आजीविका महिला संकुल स्तरीय</p>
        <p>प्राथमिक स्वावलम्बी सहकारी समिति लिमिटेड</p>
      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-3 border-t border-black text-[10px] leading-tight space-y-0.5">
        <p>
          <strong>प्रखंड कार्यालय :-</strong> प्रखंड मिशन प्रबंधन इकाई, सैंची रोड,
          सतबरवा, पलामू, 822126
        </p>
        <p>
          <strong>जिला कार्यालय :-</strong> जिला मिशन प्रबंधन इकाई, पुराना DRDA
          कार्यालय भवन, पलामू, 822102
        </p>
        <p>
          <strong>राज्य कार्यालय :-</strong> त्रितीय तल, झारखण्ड राज्य कृषि विपणन
          परिषद, इटकी रोड, हेहल, राँची - 834005 झारखण्ड
        </p>
        <p>फोन नं 0651-2360038/2360142</p>
      </div>
    </div>
  );
};

export default ExpenseAdviceFormate;