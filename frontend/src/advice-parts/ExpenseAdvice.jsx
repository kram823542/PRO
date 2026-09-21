// import { useState } from 'react';
// import Modal from '../components/Modal';
// import ExpenseAdviceFormate from '../pages/ExpenseAdviceFormate';
// import { formatAmountInWords, printStyles } from './AdviceUtils';
// import toast from 'react-hot-toast';

// const EXPENSE_EMPTY_ROW = {
//   vendorName: '',
//   vendorAddress: '',
//   purpose: '',
//   billNumber: '',
//   bankName: '',
//   bankAccountNumber: '',
//   branch: '',
//   ifscCode: '',
//   amount: '',
// };

// const ExpenseAdvice = () => {
//   const [showExpenseForm, setShowExpenseForm] = useState(false);
//   const [expenseEntries, setExpenseEntries] = useState([{ ...EXPENSE_EMPTY_ROW }]);
//   const [showExpensePreview, setShowExpensePreview] = useState(false);
//   const [expensePreview, setExpensePreview] = useState(null);
//   const [adviceDate, setAdviceDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );

//   const handleAddExpenseRow = () => {
//     setExpenseEntries([...expenseEntries, { ...EXPENSE_EMPTY_ROW }]);
//   };

//   const handleRemoveExpenseRow = (idx) => {
//     if (expenseEntries.length === 1) {
//       toast.error('At least one expense entry required');
//       return;
//     }
//     setExpenseEntries(expenseEntries.filter((_, i) => i !== idx));
//   };

//   const handleExpenseChange = (idx, field, value) => {
//     setExpenseEntries((prev) =>
//       prev.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
//     );
//   };

//   const handleGenerateExpenseAdvice = () => {
//     for (let i = 0; i < expenseEntries.length; i++) {
//       const e = expenseEntries[i];
//       if (!e.vendorName) {
//         toast.error(`Please enter vendor name for entry ${i + 1}`);
//         return;
//       }
//       if (!e.purpose) {
//         toast.error(`Please enter purpose for ${e.vendorName}`);
//         return;
//       }
//       if (!e.bankName || !e.bankAccountNumber) {
//         toast.error(`Please enter bank details for ${e.vendorName}`);
//         return;
//       }
//       if (!e.ifscCode) {
//         toast.error(`Please enter IFSC code for ${e.vendorName}`);
//         return;
//       }
//       if (!e.amount || parseFloat(e.amount) <= 0) {
//         toast.error(`Please enter valid amount for ${e.vendorName}`);
//         return;
//       }
//     }

//     const first = expenseEntries[0];

//     const expenseData = {
//       bankName: first.bankName,
//       branch: first.branch,
//       adviceDate: adviceDate,
//       expenses: expenseEntries.map((e) => ({
//         vendorName: e.vendorName,
//         vendorAddress: e.vendorAddress,
//         purpose: e.purpose,
//         billNumber: e.billNumber,
//         bankName: e.bankName,
//         bankAccountNumber: e.bankAccountNumber,
//         branch: e.branch,
//         ifscCode: e.ifscCode,
//         amount: parseFloat(e.amount),
//       })),
//     };

//     setExpensePreview(expenseData);
//     setShowExpenseForm(false);
//     setShowExpensePreview(true);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleOpenForm = () => {
//     setExpenseEntries([{ ...EXPENSE_EMPTY_ROW }]);
//     setShowExpenseForm(true);
//   };

//   const totalExpense = expenseEntries.reduce(
//     (sum, e) => sum + (parseFloat(e.amount) || 0),
//     0
//   );

//   return (
//     <div className="space-y-6">
//       {/* Info Card */}
//       <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-2xl shadow-lg">
//         <div className="flex items-start gap-3">
//           <div className="p-2 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-400">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <div className="flex-1">
//             <h3 className="text-sm font-bold text-white mb-1">Company Expense Advice</h3>
//             <p className="text-xs text-zinc-400 leading-relaxed">
//               Create bank transfer advice for company expenses — payments to vendors,
//               shops, or any other business expense. Multiple expenses can be combined
//               into a single advice.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Add Expense Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleOpenForm}
//           className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-3 px-8 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2 active:scale-[0.98]"
//         >
//           <span className="text-base">+</span>
//           <span>Add New Expense Advice</span>
//         </button>
//       </div>

//       {/* EXPENSE FORM MODAL */}
//       <Modal
//         isOpen={showExpenseForm}
//         onClose={() => setShowExpenseForm(false)}
//         title="Add Company Expenses"
//         size="xl"
//       >
//         <div className="space-y-5 text-zinc-100">
//           {/* Global Date */}
//           <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
//             <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//               Advice Date (applies to all)
//             </label>
//             <input
//               type="date"
//               value={adviceDate}
//               onChange={(e) => setAdviceDate(e.target.value)}
//               className="w-full md:w-64 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none"
//             />
//           </div>

//           {/* Expense Entries */}
//           <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
//             {expenseEntries.map((entry, idx) => (
//               <div
//                 key={idx}
//                 className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4"
//               >
//                 <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800/60">
//                   <div className="flex items-center gap-2">
//                     <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
//                       {idx + 1}
//                     </span>
//                     <p className="text-sm font-bold text-white">
//                       {entry.vendorName || `Expense #${idx + 1}`}
//                     </p>
//                   </div>
//                   {expenseEntries.length > 1 && (
//                     <button
//                       onClick={() => handleRemoveExpenseRow(idx)}
//                       className="text-[11px] font-bold text-rose-400 hover:text-rose-300 uppercase tracking-wider px-2 py-1 rounded border border-rose-800/60 hover:bg-rose-950/40"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>

//                 {/* Vendor Details */}
//                 <div className="mb-3">
//                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
//                     Vendor / Shop Details
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Vendor / Shop Name *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.vendorName}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'vendorName', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. Sharma General Store"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Vendor Address
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.vendorAddress}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'vendorAddress', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. Main Road, Satbarwa"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Purpose + Bill */}
//                 <div className="mb-3">
//                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
//                     Purpose & Bill
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Purpose / Description *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.purpose}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'purpose', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. Office Stationery Purchase"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Bill / Invoice Number
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.billNumber}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'billNumber', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. BILL-2026-001"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bank Details */}
//                 <div className="mb-3">
//                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
//                     Vendor Bank Details
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Bank Name *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.bankName}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'bankName', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. State Bank of India"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Account Number *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.bankAccountNumber}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'bankAccountNumber', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. 1234567890"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         Branch *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.branch}
//                         onChange={(e) =>
//                           handleExpenseChange(idx, 'branch', e.target.value)
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                         placeholder="e.g. Satbarwa Branch"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                         IFSC Code *
//                       </label>
//                       <input
//                         type="text"
//                         value={entry.ifscCode}
//                         onChange={(e) =>
//                           handleExpenseChange(
//                             idx,
//                             'ifscCode',
//                             e.target.value.toUpperCase()
//                           )
//                         }
//                         className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none font-mono uppercase"
//                         placeholder="e.g. SBIN0001234"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Amount */}
//                 <div>
//                   <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                     Amount (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     value={entry.amount}
//                     onChange={(e) =>
//                       handleExpenseChange(idx, 'amount', e.target.value)
//                     }
//                     className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                     placeholder="e.g. 5000"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Add Row Button */}
//           <button
//             onClick={handleAddExpenseRow}
//             className="w-full bg-zinc-900 hover:bg-zinc-800 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl py-3 text-xs font-bold text-zinc-300 hover:text-white uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
//           >
//             <span>+</span>
//             <span>Add Another Expense</span>
//           </button>

//           {/* Total */}
//           <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
//             <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
//               Total Amount
//             </span>
//             <span className="text-lg font-bold text-white font-mono">
//               ₹ {totalExpense.toLocaleString('en-IN')}
//             </span>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pt-3 border-t border-zinc-800">
//             <button
//               onClick={handleGenerateExpenseAdvice}
//               className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 flex-1 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider active:scale-[0.98]"
//             >
//               Generate Advice
//             </button>
//             <button
//               onClick={() => setShowExpenseForm(false)}
//               className="px-5 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold rounded-xl border border-rose-800/60 transition-colors text-xs uppercase tracking-wider"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* EXPENSE PREVIEW MODAL */}
//       <Modal
//         isOpen={showExpensePreview}
//         onClose={() => setShowExpensePreview(false)}
//         title="Company Expense Advice Preview"
//         size="xl"
//       >
//         {expensePreview && (
//           <div className="space-y-4">
//             <div className="overflow-x-auto bg-zinc-800/80 p-4 md:p-6 rounded-xl border border-zinc-700/60 flex justify-center">
//               <ExpenseAdviceFormate
//                 expensePreview={expensePreview}
//                 formatAmountInWords={formatAmountInWords}
//               />
//             </div>

//             <div className="flex gap-3 pt-3 border-t border-zinc-800">
//               <button
//                 onClick={handlePrint}
//                 className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 px-6 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95"
//               >
//                 <span>🖨️</span>
//                 <span>Print Advice</span>
//               </button>
//               <button
//                 onClick={() => setShowExpensePreview(false)}
//                 className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-bold py-2.5 px-6 rounded-xl transition-colors text-xs uppercase tracking-wider"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Print Styles */}
//       <style>{printStyles}</style>
//     </div>
//   );
// };

// export default ExpenseAdvice;


import { useState } from 'react';
import Modal from '../components/Modal';
import ExpenseAdviceFormate from '../pages/ExpenseAdviceFormate';
import { formatAmountInWords, printStyles } from './AdviceUtils';
import toast from 'react-hot-toast';

const EXPENSE_EMPTY_ROW = {
  vendorName: '',
  vendorAddress: '',
  purpose: '',
  billNumber: '',
  bankName: '',
  bankAccountNumber: '',
  branch: '',
  ifscCode: '',
  amount: '',
};

const ExpenseAdvice = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseEntries, setExpenseEntries] = useState([{ ...EXPENSE_EMPTY_ROW }]);
  const [showExpensePreview, setShowExpensePreview] = useState(false);
  const [expensePreview, setExpensePreview] = useState(null);
  const [adviceDate, setAdviceDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleAddExpenseRow = () => {
    setExpenseEntries([...expenseEntries, { ...EXPENSE_EMPTY_ROW }]);
  };

  const handleRemoveExpenseRow = (idx) => {
    if (expenseEntries.length === 1) {
      toast.error('At least one expense entry required');
      return;
    }
    setExpenseEntries(expenseEntries.filter((_, i) => i !== idx));
  };

  const handleExpenseChange = (idx, field, value) => {
    setExpenseEntries((prev) =>
      prev.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
    );
  };

  const handleGenerateExpenseAdvice = () => {
    for (let i = 0; i < expenseEntries.length; i++) {
      const e = expenseEntries[i];
      if (!e.vendorName) {
        toast.error(`Please enter vendor name for entry ${i + 1}`);
        return;
      }
      if (!e.purpose) {
        toast.error(`Please enter purpose for ${e.vendorName}`);
        return;
      }
      if (!e.bankName || !e.bankAccountNumber) {
        toast.error(`Please enter bank details for ${e.vendorName}`);
        return;
      }
      if (!e.ifscCode) {
        toast.error(`Please enter IFSC code for ${e.vendorName}`);
        return;
      }
      if (!e.amount || parseFloat(e.amount) <= 0) {
        toast.error(`Please enter valid amount for ${e.vendorName}`);
        return;
      }
    }

    const first = expenseEntries[0];

    const expenseData = {
      bankName: first.bankName,
      branch: first.branch,
      adviceDate: adviceDate,
      expenses: expenseEntries.map((e) => ({
        vendorName: e.vendorName,
        vendorAddress: e.vendorAddress,
        purpose: e.purpose,
        billNumber: e.billNumber,
        bankName: e.bankName,
        bankAccountNumber: e.bankAccountNumber,
        branch: e.branch,
        ifscCode: e.ifscCode,
        amount: parseFloat(e.amount),
      })),
    };

    setExpensePreview(expenseData);
    setShowExpenseForm(false);
    setShowExpensePreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenForm = () => {
    setExpenseEntries([{ ...EXPENSE_EMPTY_ROW }]);
    setShowExpenseForm(true);
  };

  const totalExpense = expenseEntries.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0
  );

  return (
    <div className="space-y-6 text-white p-4 min-h-screen">
      {/* Info Card */}
      <div className="bg-[#1e293b]/50 border border-white/10 p-5 md:p-6 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/5 border border-white/20 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-white mb-1">Company Expense Advice</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Create bank transfer advice for company expenses — payments to vendors,
              shops, or any other business expense. Multiple expenses can be combined
              into a single advice.
            </p>
          </div>
        </div>
      </div>

      {/* Add Expense Button */}
      <div className="flex justify-center">
        <button
          onClick={handleOpenForm}
          className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl border border-white/20 transition-all text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <span className="text-base">+</span>
          <span>Add New Expense Advice</span>
        </button>
      </div>

      {/* EXPENSE FORM MODAL */}
      <Modal
        isOpen={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        title="Add Company Expenses"
        size="xl"
      >
        <div className="space-y-5 text-white">
          {/* Global Date */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 shadow-inner">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Advice Date (applies to all)
            </label>
            <input
              type="date"
              value={adviceDate}
              onChange={(e) => setAdviceDate(e.target.value)}
              className="w-full md:w-64 bg-black/60 border border-white/20 focus:border-white/60 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Expense Entries */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {expenseEntries.map((entry, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/10 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-bold text-white">
                      {entry.vendorName || `Expense #${idx + 1}`}
                    </p>
                  </div>
                  {expenseEntries.length > 1 && (
                    <button
                      onClick={() => handleRemoveExpenseRow(idx)}
                      className="text-[11px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 uppercase tracking-wider px-2.5 py-1 rounded-lg border border-red-500/20 transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Vendor Details */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Vendor / Shop Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Vendor / Shop Name *
                      </label>
                      <input
                        type="text"
                        value={entry.vendorName}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'vendorName', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. Sharma General Store"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Vendor Address
                      </label>
                      <input
                        type="text"
                        value={entry.vendorAddress}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'vendorAddress', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. Main Road, Satbarwa"
                      />
                    </div>
                  </div>
                </div>

                {/* Purpose + Bill */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Purpose & Bill
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Purpose / Description *
                      </label>
                      <input
                        type="text"
                        value={entry.purpose}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'purpose', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. Office Stationery Purchase"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Bill / Invoice Number
                      </label>
                      <input
                        type="text"
                        value={entry.billNumber}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'billNumber', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. BILL-2026-001"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                    Vendor Bank Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        value={entry.bankName}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'bankName', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. State Bank of India"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        value={entry.bankAccountNumber}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'bankAccountNumber', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. 1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        Branch *
                      </label>
                      <input
                        type="text"
                        value={entry.branch}
                        onChange={(e) =>
                          handleExpenseChange(idx, 'branch', e.target.value)
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        placeholder="e.g. Satbarwa Branch"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        value={entry.ifscCode}
                        onChange={(e) =>
                          handleExpenseChange(
                            idx,
                            'ifscCode',
                            e.target.value.toUpperCase()
                          )
                        }
                        className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono uppercase"
                        placeholder="e.g. SBIN0001234"
                      />
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={entry.amount}
                    onChange={(e) =>
                      handleExpenseChange(idx, 'amount', e.target.value)
                    }
                    className="w-full bg-black/50 border border-white/15 focus:border-white/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    placeholder="e.g. 5000"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Row Button */}
          <button
            onClick={handleAddExpenseRow}
            className="w-full bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-white/40 rounded-xl py-3 text-xs font-bold text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>+</span>
            <span>Add Another Expense</span>
          </button>

          {/* Total */}
          <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-inner">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Total Amount
            </span>
            <span className="text-lg font-bold text-white font-mono">
              ₹ {totalExpense.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3 border-t border-white/10">
            <button
              onClick={handleGenerateExpenseAdvice}
              className="bg-white text-black hover:bg-zinc-200 font-bold py-2.5 flex-1 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider active:scale-[0.98]"
            >
              Generate Advice
            </button>
            <button
              onClick={() => setShowExpenseForm(false)}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 transition-all text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* EXPENSE PREVIEW MODAL */}
      <Modal
        isOpen={showExpensePreview}
        onClose={() => setShowExpensePreview(false)}
        title="Company Expense Advice Preview"
        size="xl"
      >
        {expensePreview && (
          <div className="space-y-4">
            <div className="overflow-x-auto bg-black/40 p-4 md:p-6 rounded-xl border border-white/10 flex justify-center shadow-lg">
              <ExpenseAdviceFormate
                expensePreview={expensePreview}
                formatAmountInWords={formatAmountInWords}
              />
            </div>

            <div className="flex gap-3 pt-3 border-t border-white/10">
              <button
                onClick={handlePrint}
                className="bg-white text-black hover:bg-zinc-200 font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95"
              >
                <span>🖨️</span>
                <span>Print Advice</span>
              </button>
              <button
                onClick={() => setShowExpensePreview(false)}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 font-bold py-2.5 px-6 rounded-xl transition-all text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Print Styles */}
      <style>{printStyles}</style>
    </div>
  );
};

export default ExpenseAdvice;