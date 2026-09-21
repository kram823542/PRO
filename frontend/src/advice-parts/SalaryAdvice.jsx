// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getEmployeesApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import Modal from '../components/Modal';
// import AdviceFormate from '../pages/AdviceFormate';
// import {
//   monthNames,
//   formatAmountInWords,
//   printStyles,
// } from './AdviceUtils';
// import toast from 'react-hot-toast';

// const SalaryAdvice = () => {
//   const { user } = useAuth();

//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [bankFilter, setBankFilter] = useState('');
//   const [designationFilter, setDesignationFilter] = useState('');
//   const [uniqueBanks, setUniqueBanks] = useState([]);
//   const [uniqueDesignations, setUniqueDesignations] = useState([]);

//   const [selectedIds, setSelectedIds] = useState([]);

//   const [showSalaryModal, setShowSalaryModal] = useState(false);
//   const [salaryEntries, setSalaryEntries] = useState([]);

//   const [showPreviewModal, setShowPreviewModal] = useState(false);
//   const [advicePreview, setAdvicePreview] = useState(null);

//   const [adviceDate, setAdviceDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     let filtered = employees;
//     if (bankFilter) filtered = filtered.filter((emp) => emp.bankName === bankFilter);
//     if (designationFilter)
//       filtered = filtered.filter((emp) => emp.designation === designationFilter);
//     setFilteredEmployees(filtered);
//     setSelectedIds([]);
//   }, [bankFilter, designationFilter, employees]);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const data = await getEmployeesApi({ clfId: user.clfId, status: 'ACTIVE' });
//       const emps = data.employees || [];
//       setEmployees(emps);
//       setFilteredEmployees(emps);

//       const banks = [...new Set(emps.map((e) => e.bankName).filter(Boolean))].sort();
//       setUniqueBanks(banks);

//       const desigs = [...new Set(emps.map((e) => e.designation).filter(Boolean))].sort();
//       setUniqueDesignations(desigs);
//     } catch (error) {
//       toast.error('Failed to load employees');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     const eligibleIds = filteredEmployees
//       .filter((e) => e.bankName && e.bankAccountNumber)
//       .map((e) => e._id);

//     if (selectedIds.length === eligibleIds.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(eligibleIds);
//     }
//   };

//   const handleContinue = () => {
//     if (selectedIds.length === 0) {
//       toast.error('Please select at least one employee');
//       return;
//     }

//     const selectedEmployees = employees.filter((e) => selectedIds.includes(e._id));

//     const entries = selectedEmployees.map((emp) => ({
//       employee: emp,
//       month: '',
//       amount: '',
//     }));

//     setSalaryEntries(entries);
//     setShowSalaryModal(true);
//   };

//   const handleEntryChange = (idx, field, value) => {
//     setSalaryEntries((prev) =>
//       prev.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
//     );
//   };

//   const handleGenerateAdvice = () => {
//     for (let i = 0; i < salaryEntries.length; i++) {
//       const e = salaryEntries[i];
//       if (!e.month) {
//         toast.error(`Please select month for ${e.employee.name}`);
//         return;
//       }
//       if (!e.amount || parseFloat(e.amount) <= 0) {
//         toast.error(`Please enter valid amount for ${e.employee.name}`);
//         return;
//       }
//     }

//     const first = salaryEntries[0].employee;

//     const adviceData = {
//       bankName: first.bankName,
//       branch: first.branch,
//       adviceDate: adviceDate,
//       employees: salaryEntries.map((entry) => ({
//         _id: entry.employee._id,
//         name: entry.employee.name,
//         userId: entry.employee.userId,
//         bankName: entry.employee.bankName,
//         bankAccountNumber: entry.employee.bankAccountNumber,
//         branch: entry.employee.branch,
//         ifscCode: entry.employee.ifscCode,
//         month: entry.month,
//         amount: parseFloat(entry.amount),
//       })),
//     };

//     setAdvicePreview(adviceData);
//     setShowSalaryModal(false);
//     setShowPreviewModal(true);
//   };

//   const handleClearFilters = () => {
//     setBankFilter('');
//     setDesignationFilter('');
//     setSelectedIds([]);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const eligibleFiltered = filteredEmployees.filter(
//     (e) => e.bankName && e.bankAccountNumber
//   );
//   const allSelected =
//     eligibleFiltered.length > 0 && selectedIds.length === eligibleFiltered.length;

//   return (
//     <div className="space-y-6">
//       {/* FILTER SECTION */}
//       <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-2xl shadow-lg">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
//             Step 1: Apply Filters
//           </h2>
//           {(bankFilter || designationFilter) && (
//             <button
//               onClick={handleClearFilters}
//               className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 uppercase tracking-wider"
//             >
//               Clear ×
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//               Bank
//             </label>
//             <select
//               value={bankFilter}
//               onChange={(e) => setBankFilter(e.target.value)}
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none transition-colors"
//             >
//               <option value="">All Banks</option>
//               {uniqueBanks.map((bank) => (
//                 <option key={bank} value={bank}>
//                   {bank} ({employees.filter((e) => e.bankName === bank).length})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//               Designation
//             </label>
//             <select
//               value={designationFilter}
//               onChange={(e) => setDesignationFilter(e.target.value)}
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none transition-colors"
//             >
//               <option value="">All Designations</option>
//               {uniqueDesignations.map((desig) => (
//                 <option key={desig} value={desig}>
//                   {desig} ({employees.filter((e) => e.designation === desig).length})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//               Selected
//             </label>
//             <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
//               <span className="text-xs text-zinc-400">Employees</span>
//               <span className="text-sm font-bold text-white font-mono">
//                 {selectedIds.length} / {eligibleFiltered.length}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-end">
//             <button
//               onClick={handleContinue}
//               disabled={selectedIds.length === 0}
//               className="w-full bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
//             >
//               Continue ({selectedIds.length})
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* EMPLOYEE LIST */}
//       {loading ? (
//         <div className="py-20 flex justify-center items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl">
//           <Loader />
//         </div>
//       ) : filteredEmployees.length === 0 ? (
//         <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl text-center py-16 px-4 shadow-xl">
//           <p className="text-zinc-300 font-semibold text-base">
//             {bankFilter || designationFilter
//               ? 'No employees match your filters'
//               : 'No active employees found'}
//           </p>
//           {(bankFilter || designationFilter) && (
//             <button
//               onClick={handleClearFilters}
//               className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg border border-zinc-700 uppercase tracking-wider"
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-4 md:p-5 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between">
//             <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 flex-wrap">
//               <span>Step 2: Select Employees</span>
//               <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-[11px] font-mono border border-zinc-700">
//                 {filteredEmployees.length}
//               </span>
//               {bankFilter && (
//                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-400 border border-amber-800/60">
//                   {bankFilter}
//                 </span>
//               )}
//               {designationFilter && (
//                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/40 text-blue-400 border border-blue-800/60">
//                   {designationFilter}
//                 </span>
//               )}
//             </h2>
//             {eligibleFiltered.length > 0 && (
//               <button
//                 onClick={handleSelectAll}
//                 className="text-[11px] font-bold text-zinc-300 hover:text-white uppercase tracking-wider px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors"
//               >
//                 {allSelected ? 'Deselect All' : 'Select All'}
//               </button>
//             )}
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[750px] border-collapse text-left">
//               <thead>
//                 <tr className="bg-zinc-950/80 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider">
//                   <th className="p-4 w-12 text-center">
//                     <input
//                       type="checkbox"
//                       checked={allSelected}
//                       onChange={handleSelectAll}
//                       disabled={eligibleFiltered.length === 0}
//                       className="w-4 h-4 accent-zinc-100 cursor-pointer"
//                     />
//                   </th>
//                   <th className="p-4 w-16 text-center">Photo</th>
//                   <th className="p-4">Name</th>
//                   <th className="p-4">User ID</th>
//                   <th className="p-4">Designation</th>
//                   <th className="p-4">Bank Details</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800/60 text-xs">
//                 {filteredEmployees.map((emp) => {
//                   const eligible = emp.bankName && emp.bankAccountNumber;
//                   const checked = selectedIds.includes(emp._id);

//                   return (
//                     <tr
//                       key={emp._id}
//                       className={`transition-colors ${
//                         eligible
//                           ? checked
//                             ? 'bg-zinc-800/60'
//                             : 'hover:bg-zinc-800/30'
//                           : 'opacity-50'
//                       }`}
//                     >
//                       <td className="p-4 text-center">
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={() => handleToggleSelect(emp._id)}
//                           disabled={!eligible}
//                           className="w-4 h-4 accent-zinc-100 cursor-pointer disabled:cursor-not-allowed"
//                         />
//                       </td>
//                       <td className="p-4 text-center">
//                         <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-white font-bold text-sm overflow-hidden mx-auto shadow-inner">
//                           {emp.profilePicture ? (
//                             <img
//                               src={emp.profilePicture}
//                               alt={emp.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-zinc-300">
//                               {emp.name?.charAt(0).toUpperCase()}
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="p-4 font-medium text-zinc-100">{emp.name}</td>
//                       <td className="p-4 text-zinc-400 font-mono">{emp.userId}</td>
//                       <td className="p-4 text-zinc-300">
//                         <span className="inline-block px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/50 rounded-md text-[11px]">
//                           {emp.designation || 'N/A'}
//                         </span>
//                       </td>
//                       <td className="p-4 text-zinc-300">
//                         {emp.bankName ? (
//                           <div className="space-y-0.5">
//                             <p className="font-semibold text-zinc-200">{emp.bankName}</p>
//                             <p className="text-[11px] text-zinc-400 font-mono">
//                               {emp.bankAccountNumber
//                                 ? `•••• ${emp.bankAccountNumber.slice(-4)}`
//                                 : 'N/A'}
//                             </p>
//                           </div>
//                         ) : (
//                           <span className="text-zinc-500 italic text-[11px] bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-800">
//                             No bank
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* SALARY ENTRY MODAL */}
//       <Modal
//         isOpen={showSalaryModal}
//         onClose={() => setShowSalaryModal(false)}
//         title={`Step 3: Enter Month & Salary (${salaryEntries.length} Employees)`}
//         size="xl"
//       >
//         <div className="space-y-5 text-zinc-100">
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

//           <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
//             {salaryEntries.map((entry, idx) => (
//               <div
//                 key={entry.employee._id}
//                 className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4"
//               >
//                 <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800/60">
//                   <div className="flex items-center gap-2">
//                     <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
//                       {idx + 1}
//                     </span>
//                     <div>
//                       <p className="text-sm font-bold text-white">
//                         {entry.employee.name}
//                       </p>
//                       <p className="text-[10px] text-zinc-500 font-mono">
//                         {entry.employee.userId} • {entry.employee.bankName}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                       Month *
//                     </label>
//                     <select
//                       value={entry.month}
//                       onChange={(e) => handleEntryChange(idx, 'month', e.target.value)}
//                       className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                     >
//                       <option value="">Select Month</option>
//                       {monthNames.map((m) => (
//                         <option key={m} value={m}>
//                           {m}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
//                       Amount (₹) *
//                     </label>
//                     <input
//                       type="number"
//                       value={entry.amount}
//                       onChange={(e) => handleEntryChange(idx, 'amount', e.target.value)}
//                       className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
//                       placeholder="e.g. 18600"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
//             <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
//               Total Amount
//             </span>
//             <span className="text-lg font-bold text-white font-mono">
//               ₹{' '}
//               {salaryEntries
//                 .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0)
//                 .toLocaleString('en-IN')}
//             </span>
//           </div>

//           <div className="flex gap-3 pt-3 border-t border-zinc-800">
//             <button
//               onClick={handleGenerateAdvice}
//               className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 flex-1 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider active:scale-[0.98]"
//             >
//               Generate Advice
//             </button>
//             <button
//               onClick={() => setShowSalaryModal(false)}
//               className="px-5 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold rounded-xl border border-rose-800/60 transition-colors text-xs uppercase tracking-wider"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* PREVIEW MODAL */}
//       <Modal
//         isOpen={showPreviewModal}
//         onClose={() => setShowPreviewModal(false)}
//         title="Employee Salary Advice Preview"
//         size="xl"
//       >
//         {advicePreview && (
//           <div className="space-y-4">
//             <div className="overflow-x-auto bg-zinc-800/80 p-4 md:p-6 rounded-xl border border-zinc-700/60 flex justify-center">
//               <AdviceFormate
//                 advicePreview={advicePreview}
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
//                 onClick={() => setShowPreviewModal(false)}
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

// export default SalaryAdvice;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEmployeesApi } from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import AdviceFormate from '../pages/AdviceFormate';
import {
  monthNames,
  formatAmountInWords,
  printStyles,
} from './AdviceUtils';
import toast from 'react-hot-toast';

const SalaryAdvice = () => {
  const { user } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bankFilter, setBankFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [uniqueBanks, setUniqueBanks] = useState([]);
  const [uniqueDesignations, setUniqueDesignations] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);

  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [salaryEntries, setSalaryEntries] = useState([]);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [advicePreview, setAdvicePreview] = useState(null);

  const [adviceDate, setAdviceDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;
    if (bankFilter) filtered = filtered.filter((emp) => emp.bankName === bankFilter);
    if (designationFilter)
      filtered = filtered.filter((emp) => emp.designation === designationFilter);
    setFilteredEmployees(filtered);
    setSelectedIds([]);
  }, [bankFilter, designationFilter, employees]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployeesApi({ clfId: user.clfId, status: 'ACTIVE' });
      const emps = data.employees || [];
      setEmployees(emps);
      setFilteredEmployees(emps);

      const banks = [...new Set(emps.map((e) => e.bankName).filter(Boolean))].sort();
      setUniqueBanks(banks);

      const desigs = [...new Set(emps.map((e) => e.designation).filter(Boolean))].sort();
      setUniqueDesignations(desigs);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const eligibleIds = filteredEmployees
      .filter((e) => e.bankName && e.bankAccountNumber)
      .map((e) => e._id);

    if (selectedIds.length === eligibleIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleIds);
    }
  };

  const handleContinue = () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one employee');
      return;
    }

    const selectedEmployees = employees.filter((e) => selectedIds.includes(e._id));

    const entries = selectedEmployees.map((emp) => ({
      employee: emp,
      month: '',
      amount: '',
    }));

    setSalaryEntries(entries);
    setShowSalaryModal(true);
  };

  const handleEntryChange = (idx, field, value) => {
    setSalaryEntries((prev) =>
      prev.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
    );
  };

  const handleGenerateAdvice = () => {
    for (let i = 0; i < salaryEntries.length; i++) {
      const e = salaryEntries[i];
      if (!e.month) {
        toast.error(`Please select month for ${e.employee.name}`);
        return;
      }
      if (!e.amount || parseFloat(e.amount) <= 0) {
        toast.error(`Please enter valid amount for ${e.employee.name}`);
        return;
      }
    }

    const first = salaryEntries[0].employee;

    const adviceData = {
      bankName: first.bankName,
      branch: first.branch,
      adviceDate: adviceDate,
      employees: salaryEntries.map((entry) => ({
        _id: entry.employee._id,
        name: entry.employee.name,
        userId: entry.employee.userId,
        bankName: entry.employee.bankName,
        bankAccountNumber: entry.employee.bankAccountNumber,
        branch: entry.employee.branch,
        ifscCode: entry.employee.ifscCode,
        month: entry.month,
        amount: parseFloat(entry.amount),
      })),
    };

    setAdvicePreview(adviceData);
    setShowSalaryModal(false);
    setShowPreviewModal(true);
  };

  const handleClearFilters = () => {
    setBankFilter('');
    setDesignationFilter('');
    setSelectedIds([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const eligibleFiltered = filteredEmployees.filter(
    (e) => e.bankName && e.bankAccountNumber
  );
  const allSelected =
    eligibleFiltered.length > 0 && selectedIds.length === eligibleFiltered.length;

  return (
    <div className="space-y-6">
      {/* FILTER SECTION */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 md:p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Step 1: Apply Filters
          </h2>
          {(bankFilter || designationFilter) && (
            <button
              onClick={handleClearFilters}
              className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 uppercase tracking-wider"
            >
              Clear ×
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Bank
            </label>
            <select
              value={bankFilter}
              onChange={(e) => setBankFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="">All Banks</option>
              {uniqueBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank} ({employees.filter((e) => e.bankName === bank).length})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Designation
            </label>
            <select
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="">All Designations</option>
              {uniqueDesignations.map((desig) => (
                <option key={desig} value={desig}>
                  {desig} ({employees.filter((e) => e.designation === desig).length})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Selected
            </label>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Employees</span>
              <span className="text-sm font-bold text-white font-mono">
                {selectedIds.length} / {eligibleFiltered.length}
              </span>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleContinue}
              disabled={selectedIds.length === 0}
              className="w-full bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Continue ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* EMPLOYEE LIST */}
      {loading ? (
        <div className="py-20 flex justify-center items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <Loader />
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl text-center py-16 px-4 shadow-xl">
          <p className="text-zinc-300 font-semibold text-base">
            {bankFilter || designationFilter
              ? 'No employees match your filters'
              : 'No active employees found'}
          </p>
          {(bankFilter || designationFilter) && (
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg border border-zinc-700 uppercase tracking-wider"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 md:p-5 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 flex-wrap">
              <span>Step 2: Select Employees</span>
              <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full text-[11px] font-mono border border-zinc-700">
                {filteredEmployees.length}
              </span>
              {bankFilter && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-400 border border-amber-800/60">
                  {bankFilter}
                </span>
              )}
              {designationFilter && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/40 text-blue-400 border border-blue-800/60">
                  {designationFilter}
                </span>
              )}
            </h2>
            {eligibleFiltered.length > 0 && (
              <button
                onClick={handleSelectAll}
                className="text-[11px] font-bold text-zinc-300 hover:text-white uppercase tracking-wider px-3 py-1 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition-colors"
              >
                {allSelected ? 'Deselect All' : 'Select All'}
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] border-collapse text-left">
              <thead>
                <tr className="bg-zinc-950/80 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      disabled={eligibleFiltered.length === 0}
                      className="w-4 h-4 accent-zinc-100 cursor-pointer"
                    />
                  </th>
                  <th className="p-4 w-16 text-center">Photo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">User ID</th>
                  <th className="p-4">Designation</th>
                  <th className="p-4">Bank Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {filteredEmployees.map((emp) => {
                  const eligible = emp.bankName && emp.bankAccountNumber;
                  const checked = selectedIds.includes(emp._id);

                  return (
                    <tr
                      key={emp._id}
                      className={`transition-colors ${
                        eligible
                          ? checked
                            ? 'bg-zinc-800/60'
                            : 'hover:bg-zinc-800/30'
                          : 'opacity-50'
                      }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggleSelect(emp._id)}
                          disabled={!eligible}
                          className="w-4 h-4 accent-zinc-100 cursor-pointer disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-white font-bold text-sm overflow-hidden mx-auto shadow-inner">
                          {emp.profilePicture ? (
                            <img
                              src={emp.profilePicture}
                              alt={emp.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-zinc-300">
                              {emp.name?.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-zinc-100">{emp.name}</td>
                      <td className="p-4 text-zinc-400 font-mono">{emp.userId}</td>
                      <td className="p-4 text-zinc-300">
                        <span className="inline-block px-2.5 py-1 bg-zinc-800/70 border border-zinc-700/50 rounded-md text-[11px]">
                          {emp.designation || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-300">
                        {emp.bankName ? (
                          <div className="space-y-0.5">
                            <p className="font-semibold text-zinc-200">{emp.bankName}</p>
                            <p className="text-[11px] text-zinc-400 font-mono">
                              {emp.bankAccountNumber
                                ? `•••• ${emp.bankAccountNumber.slice(-4)}`
                                : 'N/A'}
                            </p>
                          </div>
                        ) : (
                          <span className="text-zinc-500 italic text-[11px] bg-zinc-950/40 px-2 py-0.5 rounded border border-zinc-800">
                            No bank
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SALARY ENTRY MODAL */}
      <Modal
        isOpen={showSalaryModal}
        onClose={() => setShowSalaryModal(false)}
        title={`Step 3: Enter Month & Salary (${salaryEntries.length} Employees)`}
        size="xl"
      >
        <div className="space-y-5 text-zinc-100">
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4">
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Advice Date (applies to all)
            </label>
            <input
              type="date"
              value={adviceDate}
              onChange={(e) => setAdviceDate(e.target.value)}
              className="w-full md:w-64 bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none"
            />
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {salaryEntries.map((entry, idx) => (
              <div
                key={entry.employee._id}
                className="bg-zinc-950/60 border border-zinc-800 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {entry.employee.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        {entry.employee.userId} • {entry.employee.bankName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                      Month *
                    </label>
                    <select
                      value={entry.month}
                      onChange={(e) => handleEntryChange(idx, 'month', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                    >
                      <option value="">Select Month</option>
                      {monthNames.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={entry.amount}
                      onChange={(e) => handleEntryChange(idx, 'amount', e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none"
                      placeholder="e.g. 18600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Total Amount
            </span>
            <span className="text-lg font-bold text-white font-mono">
              ₹{' '}
              {salaryEntries
                .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0)
                .toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex gap-3 pt-3 border-t border-zinc-800">
            <button
              onClick={handleGenerateAdvice}
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 flex-1 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider active:scale-[0.98]"
            >
              Generate Advice
            </button>
            <button
              onClick={() => setShowSalaryModal(false)}
              className="px-5 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold rounded-xl border border-rose-800/60 transition-colors text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Employee Salary Advice Preview"
        size="xl"
      >
        {advicePreview && (
          <div className="space-y-4">
            <div className="overflow-x-auto bg-zinc-800/80 p-4 md:p-6 rounded-xl border border-zinc-700/60 flex justify-center">
              <AdviceFormate
                advicePreview={advicePreview}
                formatAmountInWords={formatAmountInWords}
              />
            </div>

            <div className="flex gap-3 pt-3 border-t border-zinc-800">
              <button
                onClick={handlePrint}
                className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 px-6 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95"
              >
                <span>🖨️</span>
                <span>Print Advice</span>
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-bold py-2.5 px-6 rounded-xl transition-colors text-xs uppercase tracking-wider"
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

export default SalaryAdvice;