

import { useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import * as adviceApi from './advice.api.js';
import toast from 'react-hot-toast';
import { theme } from '../../config/theme.js';

const EMPTY_ROW = {
  vendorName: '',
  bankName: '',
  branch: '',
  bankAccountNumber: '',
  ifscCode: '',
  reason: '',
  amount: '',
};

export default function ExpenseAdvice() {
  const [showForm, setShowForm] = useState(false);
  const [entries, setEntries] = useState([{ ...EMPTY_ROW }]);
  const [adviceDate, setAdviceDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [advices, setAdvices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingAdvices, setLoadingAdvices] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* ─── Load existing expense advices ─── */
  const loadAdvices = async () => {
    setLoadingAdvices(true);
    try {
      const { data } = await adviceApi.listAdvices({ adviceType: 'EXPENSE', limit: 50 });
      setAdvices(data?.data?.advices || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdvices(false);
    }
  };

  useEffect(() => {
    loadAdvices();
  }, []);

  const handleOpenForm = () => {
    setEntries([{ ...EMPTY_ROW }]);
    setShowForm(true);
  };

  const handleAddRow = () => setEntries([...entries, { ...EMPTY_ROW }]);

  const handleRemoveRow = (idx) => {
    if (entries.length === 1) {
      toast.error('At least one entry required');
      return;
    }
    setEntries(entries.filter((_, i) => i !== idx));
  };

  const handleChange = (idx, field, value) => {
    setEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e))
    );
  };

  /* ─── Save advice ─── */
  const handleSaveAdvice = async () => {
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.vendorName.trim()) return toast.error(`Enter shop name for entry ${i + 1}`);
      if (!e.bankName.trim()) return toast.error(`Enter bank for ${e.vendorName}`);
      if (!e.bankAccountNumber.trim()) return toast.error(`Enter account for ${e.vendorName}`);
      if (!e.reason.trim()) return toast.error(`Enter reason for ${e.vendorName}`);
      if (!e.amount || parseFloat(e.amount) <= 0) return toast.error(`Enter valid amount for ${e.vendorName}`);
    }

    const first = entries[0];
    const payload = {
      adviceType: 'EXPENSE',
      adviceDate,
      bankName: first.bankName || '',
      branch: first.branch || '',
      employees: entries.map((e) => ({
        name: e.vendorName.trim(),
        month: e.reason.trim(),
        bankName: e.bankName.trim(),
        bankAccountNumber: e.bankAccountNumber.trim(),
        branch: e.branch.trim(),
        ifscCode: e.ifscCode.trim().toUpperCase(),
        amount: parseFloat(e.amount),
      })),
    };

    setSaving(true);
    try {
      const { data } = await adviceApi.createAdvice(payload);
      const saved = data.data;
      toast.success(`✅ Advice saved — ${saved.adviceNumber}`);
      await downloadPDFFor(saved._id, saved.adviceNumber);
      setShowForm(false);
      setEntries([{ ...EMPTY_ROW }]);
      loadAdvices();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  /* ─── Download PDF ─── */
  const downloadPDFFor = async (id, adviceNumber) => {
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
    } catch (err) {
      console.error(err);
      toast.error('Failed to download PDF');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adviceApi.deleteAdvice(deleteTarget._id);
      toast.success('Advice deleted');
      setDeleteTarget(null);
      loadAdvices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setDeleting(false);
    }
  };

  const total = entries.reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);

  const inputStyle = {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    borderRadius: theme.radius.sm,
  };

  return (
    <div className="space-y-4">
      {/* Info + History toggle */}
      <div
        className="p-3 border flex items-center justify-between"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        }}
      >
        <div>
          <h2
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: theme.colors.muted }}
          >
            Company Expense Advice
          </h2>
          <p className="text-xs mt-0.5" style={{ color: theme.colors.muted }}>
            Dukaan / Hotel / Vendor का bank advice generate करें।
          </p>
        </div>
        <button
          onClick={() => {
            setShowHistory((v) => !v);
            if (!showHistory) loadAdvices();
          }}
          className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded"
          style={{
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.primary,
            backgroundColor: theme.colors.background,
          }}
        >
          {showHistory ? '✕ Close History' : `📚 History (${advices.length})`}
        </button>
      </div>

      {/* ═════ HISTORY ═════ */}
      {showHistory && (
        <div
          className="border overflow-hidden"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
          }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: theme.colors.border }}
          >
            <h3
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: theme.colors.muted }}
            >
              Saved Expense Advices
            </h3>
          </div>

          {loadingAdvices ? (
            <div className="py-12 flex justify-center">
              <Loader />
            </div>
          ) : advices.length === 0 ? (
            <div className="py-10 text-center text-xs" style={{ color: theme.colors.muted }}>
              No advices yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="text-[10px] font-bold uppercase tracking-widest border-b"
                    style={{ borderColor: theme.colors.border, color: theme.colors.muted }}
                  >
                    <th className="px-4 py-2">Advice No.</th>
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
                      <td className="px-4 py-2 font-mono font-semibold" style={{ color: theme.colors.text }}>
                        {a.adviceNumber}
                      </td>
                      <td className="px-4 py-2" style={{ color: theme.colors.muted }}>
                        {new Date(a.adviceDate).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-2" style={{ color: theme.colors.text }}>
                        {a.bankName || '-'}
                      </td>
                      <td className="px-4 py-2 text-right font-mono" style={{ color: theme.colors.text }}>
                        {a.totalRows}
                      </td>
                      <td className="px-4 py-2 text-right font-mono font-bold" style={{ color: theme.colors.secondary }}>
                        ₹ {a.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => downloadPDFFor(a._id, a.adviceNumber)}
                            className="text-[10px] font-bold uppercase px-2 py-1 rounded"
                            style={{
                              border: `1px solid ${theme.colors.primary}55`,
                              color: theme.colors.primary,
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
      )}

      {/* Add Button */}
      <div className="flex justify-center">
        <button
          onClick={handleOpenForm}
          style={{
            backgroundColor: theme.colors.primary,
            color: '#FFFFFF',
            borderRadius: theme.radius.sm,
          }}
          className="font-bold py-3 px-8 text-xs uppercase tracking-wider hover:opacity-90"
        >
          + Add New Expense Advice
        </button>
      </div>

      {/* ═════ FORM MODAL ═════ */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Expense Entries"
        size="xl"
      >
        <div className="space-y-5">
          <div
            className="border p-3"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.sm,
            }}
          >
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: theme.colors.muted }}
            >
              Advice Date
            </label>
            <input
              type="date"
              value={adviceDate}
              onChange={(e) => setAdviceDate(e.target.value)}
              style={inputStyle}
              className="border px-3 py-2 text-xs"
            />
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {entries.map((entry, idx) => (
              <div
                key={idx}
                className="border p-3"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderRadius: theme.radius.sm,
                }}
              >
                <div
                  className="flex items-center justify-between mb-3 pb-2 border-b"
                  style={{ borderColor: theme.colors.border }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.primary,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <p className="text-sm font-bold" style={{ color: theme.colors.text }}>
                      {entry.vendorName || `Entry #${idx + 1}`}
                    </p>
                  </div>
                  {entries.length > 1 && (
                    <button
                      onClick={() => handleRemoveRow(idx)}
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                      style={{
                        color: theme.colors.danger,
                        border: `1px solid ${theme.colors.danger}44`,
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: theme.colors.muted }}
                  >
                    Dukaan / Hotel / Vendor Name *
                  </label>
                  <input
                    type="text"
                    value={entry.vendorName}
                    onChange={(e) => handleChange(idx, 'vendorName', e.target.value)}
                    placeholder="e.g. Sharma General Store"
                    style={inputStyle}
                    className="w-full border px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                  {[
                    { key: 'bankName', label: 'Bank Name *', ph: 'e.g. SBI' },
                    { key: 'bankAccountNumber', label: 'Account No *', ph: 'e.g. 1234567890', mono: true },
                    { key: 'branch', label: 'Branch *', ph: 'e.g. Satbarwa' },
                    { key: 'ifscCode', label: 'IFSC *', ph: 'e.g. SBIN0001234', mono: true, upper: true },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: theme.colors.muted }}
                      >
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={entry[f.key]}
                        onChange={(e) =>
                          handleChange(idx, f.key, f.upper ? e.target.value.toUpperCase() : e.target.value)
                        }
                        placeholder={f.ph}
                        style={inputStyle}
                        className={`w-full border px-3 py-2 text-xs ${f.mono ? 'font-mono' : ''}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: theme.colors.muted }}
                    >
                      Expense Reason *
                    </label>
                    <input
                      type="text"
                      value={entry.reason}
                      onChange={(e) => handleChange(idx, 'reason', e.target.value)}
                      placeholder="e.g. Travel / Food / Office"
                      style={inputStyle}
                      className="w-full border px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: theme.colors.muted }}
                    >
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={entry.amount}
                      onChange={(e) => handleChange(idx, 'amount', e.target.value)}
                      placeholder="e.g. 5000"
                      style={inputStyle}
                      className="w-full border px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddRow}
            className="w-full border-dashed border-2 py-3 text-xs font-bold uppercase tracking-wider"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.primary,
              borderRadius: theme.radius.sm,
            }}
          >
            + Add Another Entry
          </button>

          <div
            className="border p-4 flex items-center justify-between"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.sm,
            }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: theme.colors.muted }}
            >
              Total Amount
            </span>
            <span className="text-lg font-bold font-mono" style={{ color: theme.colors.secondary }}>
              ₹ {total.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex gap-3 pt-3 border-t" style={{ borderColor: theme.colors.border }}>
            <Button onClick={handleSaveAdvice} loading={saving} style={{ flex: 1 }}>
              💾 Save & Download PDF
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* ═════ DELETE CONFIRM ═════ */}
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