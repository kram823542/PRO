// // import { useEffect, useMemo, useState } from 'react';
// // import PageHeader from '../../components/common/PageHeader.jsx';
// // import Badge from '../../components/ui/Badge.jsx';
// // import Loader from '../../components/ui/Loader.jsx';
// // import ExpenseAdvice from './ExpenseAdvice.jsx';
// // import SalaryAdvice from './SalaryAdvice.jsx';
// // import { theme } from '../../config/theme.js';
// // import { listEmployees, getEmployee } from '../employees/employees.api.js';

// // export default function Advice() {
// //   const [employees, setEmployees] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [selectedEmp, setSelectedEmp] = useState(null);
// //   const [tab, setTab] = useState('expense'); // 'expense' | 'salary'

// //   // ✅ Fetch all employees
// //   useEffect(() => {
// //     const load = async () => {
// //       setLoading(true);
// //       try {
// //         const { data } = await listEmployees({ page: 1, limit: 500 });
// //         setEmployees(data.data.employees || []);
// //       } catch (err) {
// //         console.error('Employees load error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     load();
// //   }, []);

// //   // ✅ Select employee — fetch full details (unmasked bank, aadhaar)
// //   const handleSelect = async (emp) => {
// //     setSelectedEmp(emp); // instant feedback
// //     try {
// //       const { data } = await getEmployee(emp._id);
// //       setSelectedEmp(data.data); // full data with unmasked bank details
// //     } catch (err) {
// //       console.error('Fetch full employee error:', err);
// //       // keep list data as fallback
// //     }
// //   };

// //   // ✅ Filter by search
// //   const filtered = useMemo(() => {
// //     if (!search.trim()) return employees;
// //     const s = search.toLowerCase();
// //     return employees.filter(
// //       (e) =>
// //         (e.name || '').toLowerCase().includes(s) ||
// //         (e.employeeCode || '').toLowerCase().includes(s) ||
// //         (e.mobile || '').includes(s)
// //     );
// //   }, [employees, search]);

// //   return (
// //     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
// //       <PageHeader
// //         title="Advice"
// //         subtitle="Employees के लिए सलाह और मार्गदर्शन"
// //       />

// //       {/* Layout: Left = Employee List, Right = Advice */}
// //       <div
// //         style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'minmax(240px, 1fr) 2fr',
// //           gap: 16,
// //           alignItems: 'flex-start',
// //         }}
// //       >
// //         {/* ─── Left: Employee List ─── */}
// //         <div
// //           style={{
// //             background: theme.colors.surface,
// //             borderRadius: theme.radius.md,
// //             boxShadow: theme.shadow.sm,
// //             border: `1px solid ${theme.colors.border}`,
// //             overflow: 'hidden',
// //             position: 'sticky',
// //             top: 16,
// //             maxHeight: '80vh',
// //             display: 'flex',
// //             flexDirection: 'column',
// //           }}
// //         >
// //           {/* Search */}
// //           <div style={{ padding: 12, borderBottom: `1px solid ${theme.colors.border}` }}>
// //             <input
// //               placeholder="Search by name, code, mobile..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               style={{
// //                 width: '100%',
// //                 padding: '8px 12px',
// //                 borderRadius: 8,
// //                 border: `1px solid ${theme.colors.border}`,
// //                 fontSize: 13,
// //                 outline: 'none',
// //                 boxSizing: 'border-box',
// //               }}
// //             />
// //           </div>

// //           {/* List */}
// //           <div style={{ overflowY: 'auto', flex: 1 }}>
// //             {loading ? (
// //               <Loader />
// //             ) : filtered.length === 0 ? (
// //               <div
// //                 style={{
// //                   padding: 20,
// //                   textAlign: 'center',
// //                   color: theme.colors.muted,
// //                   fontSize: 13,
// //                 }}
// //               >
// //                 No employees found
// //               </div>
// //             ) : (
// //               filtered.map((emp) => {
// //                 const isSelected = selectedEmp?._id === emp._id;
// //                 return (
// //                   <button
// //                     key={emp._id}
// //                     onClick={() => handleSelect(emp)}
// //                     style={{
// //                       width: '100%',
// //                       textAlign: 'left',
// //                       padding: '12px 14px',
// //                       background: isSelected ? theme.colors.background : 'transparent',
// //                       border: 'none',
// //                       borderLeft: isSelected
// //                         ? `3px solid ${theme.colors.primary}`
// //                         : '3px solid transparent',
// //                       borderBottom: `1px solid ${theme.colors.border}`,
// //                       cursor: 'pointer',
// //                       transition: 'background 0.15s',
// //                     }}
// //                   >
// //                     <div
// //                       style={{
// //                         fontSize: 13,
// //                         fontWeight: 700,
// //                         color: theme.colors.text,
// //                         marginBottom: 2,
// //                       }}
// //                     >
// //                       {emp.name}
// //                     </div>
// //                     <div
// //                       style={{
// //                         fontSize: 11,
// //                         color: theme.colors.muted,
// //                         display: 'flex',
// //                         gap: 6,
// //                         alignItems: 'center',
// //                       }}
// //                     >
// //                       <span>{emp.employeeCode}</span>
// //                       <span>•</span>
// //                       <span>{emp.designation || '—'}</span>
// //                     </div>
// //                   </button>
// //                 );
// //               })
// //             )}
// //           </div>
// //         </div>

// //         {/* ─── Right: Advice Content ─── */}
// //         <div>
// //           {!selectedEmp ? (
// //             <div
// //               style={{
// //                 background: theme.colors.surface,
// //                 padding: 40,
// //                 borderRadius: theme.radius.md,
// //                 boxShadow: theme.shadow.sm,
// //                 border: `1px solid ${theme.colors.border}`,
// //                 textAlign: 'center',
// //                 color: theme.colors.muted,
// //                 fontSize: 13,
// //               }}
// //             >
// //               👈 किसी employee को select करें — उसकी advice देखने के लिए
// //             </div>
// //           ) : (
// //             <>
// //               {/* Employee Header Card */}
// //               <div
// //                 style={{
// //                   background: theme.colors.surface,
// //                   borderRadius: theme.radius.md,
// //                   boxShadow: theme.shadow.sm,
// //                   border: `1px solid ${theme.colors.border}`,
// //                   padding: 16,
// //                   marginBottom: 16,
// //                 }}
// //               >
// //                 {/* Top: Avatar + Name + Status */}
// //                 <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
// //                   <div
// //                     style={{
// //                       width: 48,
// //                       height: 48,
// //                       borderRadius: '50%',
// //                       background: theme.colors.background,
// //                       border: `2px solid ${theme.colors.primary}33`,
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center',
// //                       fontWeight: 800,
// //                       fontSize: 18,
// //                       color: theme.colors.primary,
// //                       flexShrink: 0,
// //                     }}
// //                   >
// //                     {String(selectedEmp.name || '?').charAt(0).toUpperCase()}
// //                   </div>
// //                   <div style={{ flex: 1 }}>
// //                     <h2
// //                       style={{
// //                         margin: 0,
// //                         fontSize: 17,
// //                         fontWeight: 800,
// //                         color: theme.colors.text,
// //                       }}
// //                     >
// //                       {selectedEmp.name}
// //                     </h2>
// //                     <div
// //                       style={{
// //                         fontSize: 12,
// //                         color: theme.colors.muted,
// //                         marginTop: 2,
// //                       }}
// //                     >
// //                       {selectedEmp.employeeCode} • {selectedEmp.designation || '—'}
// //                       {selectedEmp.workLocation?.panchayat &&
// //                         ` • ${selectedEmp.workLocation.panchayat}`}
// //                     </div>
// //                   </div>
// //                   <Badge variant={selectedEmp.status === 'ACTIVE' ? 'success' : 'danger'}>
// //                     {selectedEmp.status}
// //                   </Badge>
// //                 </div>

// //                 {/* Personal Details */}
// //                 <SectionTitle>👤 Personal Details</SectionTitle>
// //                 <div
// //                   style={{
// //                     display: 'grid',
// //                     gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
// //                     gap: 10,
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   <DetailItem label="Mobile" value={selectedEmp.mobile} />
// //                   <DetailItem
// //                     label="Joining Date"
// //                     value={
// //                       selectedEmp.joiningDate
// //                         ? new Date(selectedEmp.joiningDate).toLocaleDateString()
// //                         : '—'
// //                     }
// //                   />
// //                   <DetailItem
// //                     label="Panchayat"
// //                     value={selectedEmp.workLocation?.panchayat}
// //                   />
// //                   <DetailItem
// //                     label="Aadhaar Number"
// //                     value={selectedEmp.aadhaarNumber}
// //                   />
// //                 </div>

// //                 {/* Bank Details */}
// //                 <SectionTitle>🏦 Bank Details</SectionTitle>
// //                 <div
// //                   style={{
// //                     display: 'grid',
// //                     gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
// //                     gap: 10,
// //                     fontSize: 12,
// //                   }}
// //                 >
// //                   <DetailItem
// //                     label="Bank Name"
// //                     value={selectedEmp.bankDetails?.bankName}
// //                   />
// //                   <DetailItem
// //                     label="Account Number"
// //                     value={selectedEmp.bankDetails?.accountNumber}
// //                   />
// //                   <DetailItem
// //                     label="Branch"
// //                     value={selectedEmp.bankDetails?.branch}
// //                   />
// //                   <DetailItem
// //                     label="IFSC Code"
// //                     value={selectedEmp.bankDetails?.ifsc}
// //                   />
// //                 </div>
// //               </div>

// //               {/* Advice Tabs */}
// //               <div
// //                 style={{
// //                   display: 'flex',
// //                   gap: 8,
// //                   marginBottom: 16,
// //                   borderBottom: `1px solid ${theme.colors.border}`,
// //                 }}
// //               >
// //                 <TabBtn
// //                   label="💰 Expense"
// //                   active={tab === 'expense'}
// //                   onClick={() => setTab('expense')}
// //                 />
// //                 <TabBtn
// //                   label="💵 Salary"
// //                   active={tab === 'salary'}
// //                   onClick={() => setTab('salary')}
// //                 />
// //               </div>

// //               {/* Tab Content */}
// //               {tab === 'expense' && <ExpenseAdvice employee={selectedEmp} />}
// //               {tab === 'salary' && <SalaryAdvice employee={selectedEmp} />}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─────────────────────────────────────────────
// //    Sub-components
// //    ───────────────────────────────────────────── */
// // function SectionTitle({ children }) {
// //   return (
// //     <div
// //       style={{
// //         marginTop: 16,
// //         marginBottom: 10,
// //         paddingTop: 14,
// //         borderTop: `1px solid ${theme.colors.border}`,
// //         fontSize: 12,
// //         fontWeight: 800,
// //         color: theme.colors.primary,
// //         textTransform: 'uppercase',
// //         letterSpacing: 0.5,
// //       }}
// //     >
// //       {children}
// //     </div>
// //   );
// // }

// // function DetailItem({ label, value }) {
// //   return (
// //     <div>
// //       <div
// //         style={{
// //           fontSize: 10,
// //           textTransform: 'uppercase',
// //           color: theme.colors.muted,
// //           fontWeight: 700,
// //           letterSpacing: 0.3,
// //           marginBottom: 2,
// //         }}
// //       >
// //         {label}
// //       </div>
// //       <div style={{ fontSize: 12, color: theme.colors.text, fontWeight: 600 }}>
// //         {value || '—'}
// //       </div>
// //     </div>
// //   );
// // }

// // function TabBtn({ label, active, onClick }) {
// //   return (
// //     <button
// //       onClick={onClick}
// //       style={{
// //         padding: '10px 16px',
// //         border: 'none',
// //         background: 'transparent',
// //         cursor: 'pointer',
// //         fontSize: 13,
// //         fontWeight: 600,
// //         color: active ? theme.colors.primary : theme.colors.muted,
// //         borderBottom: active
// //           ? `2px solid ${theme.colors.primary}`
// //           : '2px solid transparent',
// //         marginBottom: -1,
// //         transition: 'color 0.2s',
// //       }}
// //     >
// //       {label}
// //     </button>
// //   );
// // }


// import { useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import SalaryAdvice from './SalaryAdvice.jsx';
// import ExpenseAdvice from './ExpenseAdvice.jsx';

// export default function Advice() {
//   const [tab, setTab] = useState('salary');

//   return (
//     <div className="space-y-6 text-white p-4 min-h-screen bg-zinc-950">
//       <PageHeader
//         title="Advice"
//         subtitle="Generate bank transfer advice for employee salary or company expenses"
//       />

//       {/* Toggle Tabs */}
//       <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 shadow-lg">
//         <button
//           onClick={() => setTab('salary')}
//           className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
//             tab === 'salary'
//               ? 'bg-zinc-100 text-zinc-900 shadow'
//               : 'text-zinc-400 hover:text-zinc-200'
//           }`}
//         >
//           🏦 Employee Salary
//         </button>
//         <button
//           onClick={() => setTab('expense')}
//           className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
//             tab === 'expense'
//               ? 'bg-zinc-100 text-zinc-900 shadow'
//               : 'text-zinc-400 hover:text-zinc-200'
//           }`}
//         >
//           🧾 Company Expense
//         </button>
//       </div>

//       {/* Tab content */}
//       {tab === 'salary' ? <SalaryAdvice /> : <ExpenseAdvice />}
//     </div>
//   );
// }


// import { useState } from 'react';
// import SalaryAdvice from './SalaryAdvice.jsx';
// import ExpenseAdvice from './ExpenseAdvice.jsx';

// export default function Advice() {
//   const [tab, setTab] = useState('salary');

//   return (
//     <div className="space-y-4">
//       {/* Tabs */}
//       <div className="inline-flex bg-zinc-900/80 border border-zinc-800 rounded-lg p-1 gap-1">
//         <button
//           onClick={() => setTab('salary')}
//           className={`flex items-center gap-1.5 px-4 py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${
//             tab === 'salary'
//               ? 'bg-white text-black'
//               : 'text-zinc-400 hover:text-white'
//           }`}
//         >
//           👥 Employee Salary
//         </button>
//         <button
//           onClick={() => setTab('expense')}
//           className={`flex items-center gap-1.5 px-4 py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${
//             tab === 'expense'
//               ? 'bg-white text-black'
//               : 'text-zinc-400 hover:text-white'
//           }`}
//         >
//           📋 Company Expense
//         </button>
//       </div>

//       {tab === 'salary' ? <SalaryAdvice /> : <ExpenseAdvice />}
//     </div>
//   );
// }


// import { useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import SalaryAdvice from './SalaryAdvice.jsx';
// import ExpenseAdvice from './ExpenseAdvice.jsx';
// import { theme } from '../../config/theme.js';

// export default function Advice() {
//   const [tab, setTab] = useState('salary');

//   const tabs = [
//     { key: 'salary', label: '👥 Employee Salary' },
//     { key: 'expense', label: '📋 Company Expense' },
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//       <PageHeader
//         title="Advice"
//         subtitle="Generate bank advice for employee salary or company expense"
//       />

//       {/* Tabs */}
//       <div
//         style={{
//           display: 'inline-flex',
//           gap: 4,
//           padding: 4,
//           background: theme.colors.background,
//           border: `1px solid ${theme.colors.border}`,
//           borderRadius: theme.radius.md,
//           marginBottom: 16,
//         }}
//       >
//         {tabs.map((t) => {
//           const isActive = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: theme.radius.sm,
//                 border: 'none',
//                 background: isActive ? theme.colors.primary : 'transparent',
//                 color: isActive ? '#FFFFFF' : theme.colors.muted,
//                 fontWeight: 700,
//                 fontSize: 11,
//                 letterSpacing: 1,
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//                 transition: 'all 0.25s ease',
//               }}
//             >
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Tab content */}
//       {tab === 'salary' ? <SalaryAdvice /> : <ExpenseAdvice />}
//     </div>
//   );
// }





import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import SalaryAdvice from './SalaryAdvice.jsx';
import ExpenseAdvice from './ExpenseAdvice.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import * as adviceApi from './advice.api.js';
import toast from 'react-hot-toast';
import { theme } from '../../config/theme.js';

export default function Advice() {
  const [tab, setTab] = useState('salary');

  const tabs = [
    { key: 'salary', label: '👥 Employee Salary' },
    { key: 'expense', label: '📋 Company Expense' },
    { key: 'history', label: '📚 History' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader
        title="Advice"
        subtitle="Generate bank advice for employee salary or company expense"
      />

      {/* Tabs */}
      <div
        style={{
          display: 'inline-flex',
          gap: 4,
          padding: 4,
          background: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.md,
          marginBottom: 16,
        }}
      >
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '8px 16px',
                borderRadius: theme.radius.sm,
                border: 'none',
                background: isActive ? theme.colors.primary : 'transparent',
                color: isActive ? '#FFFFFF' : theme.colors.muted,
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 'salary' && <SalaryAdvice />}
      {tab === 'expense' && <ExpenseAdvice />}
      {tab === 'history' && <HistoryTab />}
    </div>
  );
}

/* ══════════════════════════════════════════════
   HISTORY TAB — sabhi advices (Salary + Expense)
   ══════════════════════════════════════════════ */
function HistoryTab() {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(''); // '' | 'SALARY' | 'EXPENSE'
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = { limit: 200 };
      if (filter) params.adviceType = filter;
      const response = await adviceApi.listAdvices(params);

      let list = [];
      if (Array.isArray(response?.data?.data?.advices)) {
        list = response.data.data.advices;
      } else if (Array.isArray(response?.data?.advices)) {
        list = response.data.advices;
      } else if (Array.isArray(response?.data)) {
        list = response.data;
      }

      setAdvices(list);
    } catch (err) {
      console.error('History load error:', err);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleDownload = async (id, adviceNumber) => {
    try {
      const { data } = await adviceApi.downloadAdvicePDF(id);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Advice-${adviceNumber.replace(/\//g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('PDF downloaded');
    } catch (err) {
      toast.error('Failed to download PDF');
    }
  };

  const handlePrint = async (id) => {
    try {
      const { data } = await adviceApi.getAdvicePDFForPrint(id);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const win = window.open(url, '_blank');
      if (!win) {
        toast.error('Please allow popups to print');
        return;
      }
      setTimeout(() => {
        try {
          win.print();
        } catch (e) {
          console.warn('Auto print failed');
        }
      }, 900);
    } catch (err) {
      toast.error('Failed to open print view');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adviceApi.deleteAdvice(deleteTarget._id);
      toast.success('Advice deleted');
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  /* Totals */
  const salaryTotal = advices
    .filter((a) => a.adviceType === 'SALARY')
    .reduce((s, a) => s + (a.totalAmount || 0), 0);
  const expenseTotal = advices
    .filter((a) => a.adviceType === 'EXPENSE')
    .reduce((s, a) => s + (a.totalAmount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div
        className="p-3 border flex items-center justify-between flex-wrap gap-3"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: theme.colors.muted }}
          >
            Filter:
          </span>
          {[
            { key: '', label: 'All' },
            { key: 'SALARY', label: 'Salary' },
            { key: 'EXPENSE', label: 'Expense' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
              style={{
                border: `1px solid ${
                  filter === f.key ? theme.colors.primary : theme.colors.border
                }`,
                background:
                  filter === f.key ? theme.colors.primary : theme.colors.background,
                color:
                  filter === f.key ? '#FFFFFF' : theme.colors.muted,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-[11px]">
          <span style={{ color: theme.colors.muted }}>
            Total:{' '}
            <b style={{ color: theme.colors.text }}>{advices.length}</b>
          </span>
          <span style={{ color: theme.colors.muted }}>
            Salary:{' '}
            <b style={{ color: theme.colors.primary }}>
              ₹ {salaryTotal.toLocaleString('en-IN')}
            </b>
          </span>
          <span style={{ color: theme.colors.muted }}>
            Expense:{' '}
            <b style={{ color: theme.colors.secondary }}>
              ₹ {expenseTotal.toLocaleString('en-IN')}
            </b>
          </span>
        </div>
      </div>

      {/* Table */}
      <div
        className="border overflow-hidden"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        }}
      >
        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader />
          </div>
        ) : advices.length === 0 ? (
          <div
            className="py-12 text-center text-xs"
            style={{ color: theme.colors.muted }}
          >
            No advices found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-[10px] font-bold uppercase tracking-widest border-b"
                  style={{
                    borderColor: theme.colors.border,
                    color: theme.colors.muted,
                  }}
                >
                  <th className="px-4 py-2">Advice No.</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Bank</th>
                  <th className="px-4 py-2 text-right">Rows</th>
                  <th className="px-4 py-2 text-right">Total ₹</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {advices.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b text-xs"
                    style={{ borderColor: theme.colors.border }}
                  >
                    <td
                      className="px-4 py-2 font-mono font-semibold"
                      style={{ color: theme.colors.text }}
                    >
                      {a.adviceNumber}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className="inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                        style={{
                          borderColor:
                            a.adviceType === 'SALARY'
                              ? `${theme.colors.primary}55`
                              : `${theme.colors.secondary}55`,
                          color:
                            a.adviceType === 'SALARY'
                              ? theme.colors.primary
                              : theme.colors.secondary,
                          backgroundColor: theme.colors.background,
                        }}
                      >
                        {a.adviceType}
                      </span>
                    </td>
                    <td className="px-4 py-2" style={{ color: theme.colors.muted }}>
                      {new Date(a.adviceDate).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-2" style={{ color: theme.colors.text }}>
                      {a.bankName || '-'}
                    </td>
                    <td
                      className="px-4 py-2 text-right font-mono"
                      style={{ color: theme.colors.text }}
                    >
                      {a.totalRows}
                    </td>
                    <td
                      className="px-4 py-2 text-right font-mono font-bold"
                      style={{ color: theme.colors.secondary }}
                    >
                      ₹ {a.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handlePrint(a._id)}
                          className="text-[10px] font-bold uppercase px-2 py-1 rounded"
                          style={{
                            border: `1px solid ${theme.colors.primary}55`,
                            color: theme.colors.primary,
                          }}
                        >
                          🖨️ Print
                        </button>
                        <button
                          onClick={() => handleDownload(a._id, a.adviceNumber)}
                          className="text-[10px] font-bold uppercase px-2 py-1 rounded"
                          style={{
                            border: `1px solid ${theme.colors.secondary}55`,
                            color: theme.colors.secondary,
                          }}
                        >
                          ⬇️ PDF
                        </button>
                        <button
                          onClick={() => setDeleteTarget(a)}
                          className="text-[10px] font-bold uppercase px-2 py-1 rounded"
                          style={{
                            border: `1px solid ${theme.colors.danger}55`,
                            color: theme.colors.danger,
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Advice?"
        message={`Are you sure you want to delete "${deleteTarget?.adviceNumber}"?`}
        confirmText="Delete"
        loading={deleting}
        variant="danger"
      />
    </div>
  );
}