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