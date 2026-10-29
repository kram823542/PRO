import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import SalaryAdvice from './SalaryAdvice.jsx';
import ExpenseAdvice from './ExpenseAdvice.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import Button from '../../components/ui/Button.jsx';
import * as adviceApi from './advice.api.js';
import toast from 'react-hot-toast';
import { theme } from '../../config/theme.js';
import Badge from '../../components/ui/Badge.jsx'; // ✅ Ye line add karo

export default function Advice() {
  const [tab, setTab] = useState('salary');
  const tabs = [
    { key: 'salary', label: '👥 Employee Salary' },
    { key: 'expense', label: '📋 Company Expense' },
    { key: 'history', label: '📚 History' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader title="Advice" subtitle="Generate bank advice for employee salary or company expense" />
      <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: theme.colors.background, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.md, marginBottom: 16 }}>
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '8px 16px', borderRadius: theme.radius.sm, border: 'none', background: isActive ? theme.colors.primary : 'transparent', color: isActive ? '#FFFFFF' : theme.colors.muted, fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease' }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'salary' && <SalaryAdvice />}
      {tab === 'expense' && <ExpenseAdvice />}
      {tab === 'history' && <HistoryTab />}
    </div>
  );
}

// function HistoryTab() {
//   const [advices, setAdvices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('');
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//    const load = async () => {
//     setLoading(true);
//     try {
//       const params = { limit: 200 };
//       if (filter) params.adviceType = filter;
//       const { data } = await adviceApi.listAdvices(params);
      
//       // ✅ FIX: Safe extraction for all possible response structures
//       const list = data?.data?.advices || data?.advices || (Array.isArray(data?.data) ? data.data : []);
//       setAdvices(list);
//     } catch (err) {
//       console.error('History load error:', err);
//       toast.error('Failed to load history');
//       setAdvices([]); 
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => { load(); }, [filter]);

//   const handleDownload = async (id, adviceNumber) => {
//     try {
//       const { data } = await adviceApi.downloadAdvicePDF(id);
//       const blob = new Blob([data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       const safeNumber = adviceNumber && adviceNumber.trim() ? adviceNumber.replace(/\//g, '-') : `ADV-${id}`;
//       a.download = `Advice-${safeNumber}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//       toast.success('PDF downloaded');
//     } catch (err) {
//       toast.error('Failed to download PDF');
//     }
//   };

//   const handlePrint = async (id) => {
//     try {
//       const { data } = await adviceApi.getAdvicePDFForPrint(id);
//       const blob = new Blob([data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const win = window.open(url, '_blank');
//       if (!win) return toast.error('Please allow popups to print');
//       setTimeout(() => { try { win.print(); } catch (e) {} }, 900);
//     } catch (err) {
//       toast.error('Failed to open print view');
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await adviceApi.deleteAdvice(deleteTarget._id);
//       toast.success('Advice deleted');
//       setDeleteTarget(null);
//       load();
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const salaryTotal = advices.filter((a) => a.adviceType === 'SALARY').reduce((s, a) => s + (a.totalAmount || 0), 0);
//   const expenseTotal = advices.filter((a) => a.adviceType === 'EXPENSE').reduce((s, a) => s + (a.totalAmount || 0), 0);

//   return (
//     <div className="space-y-4">
//       {/* Filter bar */}
//       <div className="p-3 border flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }}>
//         <div className="flex items-center gap-2">
//           <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: theme.colors.muted }}>Filter:</span>
//           {[{ key: '', label: 'All' }, { key: 'SALARY', label: 'Salary' }, { key: 'EXPENSE', label: 'Expense' }].map((f) => (
//             <Button key={f.key} size="sm" variant={filter === f.key ? 'primary' : 'ghost'} onClick={() => setFilter(f.key)}>{f.label}</Button>
//           ))}
//         </div>
//         <div className="flex gap-4 text-[11px]">
//           <span style={{ color: theme.colors.muted }}>Total: <b style={{ color: theme.colors.text }}>{advices.length}</b></span>
//           <span style={{ color: theme.colors.muted }}>Salary: <b style={{ color: theme.colors.primary }}>₹ {salaryTotal.toLocaleString('en-IN')}</b></span>
//           <span style={{ color: theme.colors.muted }}>Expense: <b style={{ color: theme.colors.secondary }}>₹ {expenseTotal.toLocaleString('en-IN')}</b></span>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border overflow-hidden" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }}>
//         {loading ? (
//           <div className="py-16 flex justify-center"><Loader /></div>
//         ) : advices.length === 0 ? (
//           <div className="py-12 text-center text-xs" style={{ color: theme.colors.muted }}>No advices found.</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="text-[10px] font-bold uppercase tracking-widest border-b" style={{ borderColor: theme.colors.border, color: theme.colors.muted }}>
//                   <th className="px-4 py-2">Advice No.</th>
//                   <th className="px-4 py-2">Type</th>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Bank</th>
//                   <th className="px-4 py-2 text-right">Rows</th>
//                   <th className="px-4 py-2 text-right">Total ₹</th>
//                   <th className="px-4 py-2 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {advices.map((a) => (
//                   <tr key={a._id} className="border-b text-xs" style={{ borderColor: theme.colors.border }}>
//                     <td className="px-4 py-2 font-mono font-semibold" style={{ color: theme.colors.text }}>
//                       {/* ✅ FIXED: Dynamic format */}
//                       {(() => {
//                         const prefix = `SAT/CLF/${new Date(a.adviceDate).getFullYear()}/`;
//                         if (a.adviceNumber && a.adviceNumber.trim()) return a.adviceNumber.startsWith('SAT/') ? a.adviceNumber : prefix + a.adviceNumber.split('/').pop();
//                         return prefix + '...';
//                       })()}
//                     </td>
//                     <td className="px-4 py-2"><span className="inline-block border px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ borderColor: a.adviceType === 'SALARY' ? `${theme.colors.primary}55` : `${theme.colors.secondary}55`, color: a.adviceType === 'SALARY' ? theme.colors.primary : theme.colors.secondary, backgroundColor: theme.colors.background }}>{a.adviceType}</span></td>
//                     <td className="px-4 py-2" style={{ color: theme.colors.muted }}>{new Date(a.adviceDate).toLocaleDateString('en-IN')}</td>
//                     <td className="px-4 py-2" style={{ color: theme.colors.text }}>{a.bankName || '-'}</td>
//                     <td className="px-4 py-2 text-right font-mono" style={{ color: theme.colors.text }}>{a.totalRows}</td>
//                     <td className="px-4 py-2 text-right font-mono font-bold" style={{ color: theme.colors.secondary }}>₹ {a.totalAmount.toLocaleString('en-IN')}</td>
//                     <td className="px-4 py-2 text-center">
//                       <div className="flex justify-center gap-2">
//                         <Button size="sm" variant="outline" onClick={() => handlePrint(a._id)}>🖨️ Print</Button>
//                         <Button size="sm" variant="outline" onClick={() => handleDownload(a._id, a.adviceNumber)}>⬇️ PDF</Button>
//                         <Button size="sm" variant="danger" onClick={() => setDeleteTarget(a)}>🗑️</Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//       <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Advice?" message={`Are you sure you want to delete "${deleteTarget?.adviceNumber || 'this advice'}"?`} confirmText="Delete" loading={deleting} variant="danger" />
//     </div>
//   );
// }


function HistoryTab() {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = { limit: 200 };
      if (filter) params.adviceType = filter;
      const { data } = await adviceApi.listAdvices(params);
      
      const list = data?.data?.advices || data?.advices || (Array.isArray(data?.data) ? data.data : []);
      setAdvices(list);
    } catch (err) {
      console.error('History load error:', err);
      toast.error('Failed to load history');
      setAdvices([]); 
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { load(); }, [filter]);

  const handleDownload = async (id, adviceNumber) => {
    try {
      const { data } = await adviceApi.downloadAdvicePDF(id);
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeNumber = adviceNumber && adviceNumber.trim() ? adviceNumber.replace(/\//g, '-') : `ADV-${id}`;
      a.download = `Advice-${safeNumber}.pdf`;
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
      if (!win) return toast.error('Please allow popups to print');
      setTimeout(() => { try { win.print(); } catch (e) {} }, 900);
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

  const salaryTotal = advices.filter((a) => a.adviceType === 'SALARY').reduce((s, a) => s + (a.totalAmount || 0), 0);
  const expenseTotal = advices.filter((a) => a.adviceType === 'EXPENSE').reduce((s, a) => s + (a.totalAmount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="p-3 border flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }}>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: theme.colors.muted }}>Filter:</span>
          
          {/* ✅ UI COMPONENTS (Button) */}
          {[{ key: '', label: 'All' }, { key: 'SALARY', label: 'Salary' }, { key: 'EXPENSE', label: 'Expense' }].map((f) => (
            <Button 
              key={f.key} 
              size="sm" 
              variant={filter === f.key ? 'primary' : 'ghost'} 
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <div className="flex gap-4 text-[11px]">
          <span style={{ color: theme.colors.muted }}>Total: <b style={{ color: theme.colors.text }}>{advices.length}</b></span>
          <span style={{ color: theme.colors.muted }}>Salary: <b style={{ color: theme.colors.primary }}>₹ {salaryTotal.toLocaleString('en-IN')}</b></span>
          <span style={{ color: theme.colors.muted }}>Expense: <b style={{ color: theme.colors.secondary }}>₹ {expenseTotal.toLocaleString('en-IN')}</b></span>
        </div>
      </div>

      {/* Table */}
      <div className="border overflow-hidden" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md }}>
        {loading ? (
          <div className="py-16 flex justify-center"><Loader /></div>
        ) : advices.length === 0 ? (
          <div className="py-12 text-center text-xs" style={{ color: theme.colors.muted }}>No advices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest border-b" style={{ borderColor: theme.colors.border, color: theme.colors.muted }}>
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
                  <tr key={a._id} className="border-b text-xs" style={{ borderColor: theme.colors.border }}>
                    <td className="px-4 py-2 font-mono font-semibold" style={{ color: theme.colors.text }}>
                      {(() => {
                        const prefix = `SAT/CLF/${new Date(a.adviceDate).getFullYear()}/`;
                        if (a.adviceNumber && a.adviceNumber.trim()) return a.adviceNumber.startsWith('SAT/') ? a.adviceNumber : prefix + a.adviceNumber.split('/').pop();
                        return prefix + '...';
                      })()}
                    </td>
                    <td className="px-4 py-2">
                      {/* ✅ UI COMPONENTS (Badge) - with fallback in case variant fails */}
                      <Badge variant={a.adviceType === 'SALARY' ? 'info' : 'warning'}>
                        {a.adviceType}
                      </Badge>
                    </td>
                    <td className="px-4 py-2" style={{ color: theme.colors.muted }}>{new Date(a.adviceDate).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-2" style={{ color: theme.colors.text }}>{a.bankName || '-'}</td>
                    <td className="px-4 py-2 text-right font-mono" style={{ color: theme.colors.text }}>{a.totalRows}</td>
                    <td className="px-4 py-2 text-right font-mono font-bold" style={{ color: theme.colors.secondary }}>₹ {a.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        {/* ✅ UI COMPONENTS (Button) */}
                        <Button size="sm" variant="outline" onClick={() => handlePrint(a._id)}>🖨️ Print</Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownload(a._id, a.adviceNumber)}>⬇️ PDF</Button>
                        <Button size="sm" variant="danger" onClick={() => setDeleteTarget(a)}>🗑️</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Advice?" message={`Are you sure you want to delete "${deleteTarget?.adviceNumber || 'this advice'}"?`} confirmText="Delete" loading={deleting} variant="danger" />
    </div>
  );
}