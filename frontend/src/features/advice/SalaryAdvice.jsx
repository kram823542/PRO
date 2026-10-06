

import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Button from '../../components/ui/Button.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import { monthNames } from './AdviceUtils';
import { listEmployees } from '../employees/employees.api.js';
import * as adviceApi from './advice.api.js';
import toast from 'react-hot-toast';
import { theme } from '../../config/theme.js';

export default function SalaryAdvice() {
  /* ─────────── State ─────────── */
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bankFilter, setBankFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const [showEntryModal, setShowEntryModal] = useState(false);
  const [salaryEntries, setSalaryEntries] = useState([]);
  const [adviceDate, setAdviceDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // ✅ Advice list + save
  const [advices, setAdvices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loadingAdvices, setLoadingAdvices] = useState(false);

  /* ─────────── Load employees ─────────── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await listEmployees({ page: 1, limit: 500 });
        setEmployees(data?.data?.employees || []);
      } catch (err) {
        console.error('Load employees error:', err);
        toast.error('Failed to load employees');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ─────────── Load existing advices ─────────── */
  const loadAdvices = async () => {
    setLoadingAdvices(true);
    try {
      const { data } = await adviceApi.listAdvices({ adviceType: 'SALARY', limit: 50 });
      setAdvices(data?.data?.advices || []);
    } catch (err) {
      console.error('Load advices error:', err);
    } finally {
      setLoadingAdvices(false);
    }
  };

  useEffect(() => {
    loadAdvices();
  }, []);

  /* ─────────── Derived data ─────────── */
  const filteredEmployees = useMemo(() => {
    let list = employees;
    if (bankFilter) list = list.filter((e) => e.bankDetails?.bankName === bankFilter);
    if (designationFilter) list = list.filter((e) => e.designation === designationFilter);
    return list;
  }, [employees, bankFilter, designationFilter]);

  const uniqueBanks = useMemo(
    () => [...new Set(employees.map((e) => e.bankDetails?.bankName).filter(Boolean))].sort(),
    [employees]
  );

  const uniqueDesignations = useMemo(
    () => [...new Set(employees.map((e) => e.designation).filter(Boolean))].sort(),
    [employees]
  );

  const eligibleFiltered = filteredEmployees.filter(
    (e) => e.bankDetails?.bankName && e.bankDetails?.accountNumber
  );

  const allSelected =
    eligibleFiltered.length > 0 && selectedIds.length === eligibleFiltered.length;

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds([]);
    else setSelectedIds(eligibleFiltered.map((e) => e._id));
  };

  /* ─────────── Open entry modal ─────────── */
  const handleContinue = () => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one employee');
      return;
    }
    const selectedEmps = employees.filter((e) => selectedIds.includes(e._id));
    setSalaryEntries(selectedEmps.map((emp) => ({ employee: emp, month: '', amount: '' })));
    setShowEntryModal(true);
  };

  const handleEntryChange = (idx, field, value) => {
    setSalaryEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e))
    );
  };

  /* ─────────── Save advice to backend ─────────── */
  const handleSaveAdvice = async () => {
    // Validate
    for (let i = 0; i < salaryEntries.length; i++) {
      const e = salaryEntries[i];
      if (!e.month) return toast.error(`Select month for ${e.employee.name}`);
      if (!e.amount || parseFloat(e.amount) <= 0)
        return toast.error(`Enter valid amount for ${e.employee.name}`);
    }

    const first = salaryEntries[0]?.employee || {};

    const payload = {
      adviceType: 'SALARY',
      adviceDate,
      bankName: first.bankDetails?.bankName || '',
      branch: first.bankDetails?.branch || '',
      employees: salaryEntries.map((entry) => ({
        name: entry.employee.name,
        month: entry.month,
        bankName: entry.employee.bankDetails?.bankName || '',
        bankAccountNumber: entry.employee.bankDetails?.accountNumber || '',
        branch: entry.employee.bankDetails?.branch || '',
        ifscCode: entry.employee.bankDetails?.ifsc || '',
        amount: parseFloat(entry.amount),
      })),
    };

    setSaving(true);
    try {
      const { data } = await adviceApi.createAdvice(payload);
      const saved = data.data;

      toast.success(`✅ Advice saved — ${saved.adviceNumber}`);

      // ✅ Auto download PDF
      await downloadPDFFor(saved._id, saved.adviceNumber);

      // Reset
      setShowEntryModal(false);
      setSalaryEntries([]);
      setSelectedIds([]);
      loadAdvices();
    } catch (err) {
      console.error('Save advice error:', err);
      toast.error(err.response?.data?.message || 'Failed to save advice');
    } finally {
      setSaving(false);
    }
  };

  /* ─────────── Download PDF ─────────── */
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
      console.error('PDF download error:', err);
      toast.error('Failed to download PDF');
    }
  };

  /* ─────────── Delete advice ─────────── */
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adviceApi.deleteAdvice(deleteTarget._id);
      toast.success('Advice deleted');
      setDeleteTarget(null);
      loadAdvices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  const totalAmount = salaryEntries.reduce(
    (s, e) => s + (parseFloat(e.amount) || 0),
    0
  );

  const inputStyle = {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    borderRadius: theme.radius.sm,
  };

  /* ─────────── Render ─────────── */
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
            Employee Salary Advice
          </h2>
          <p className="text-xs mt-0.5" style={{ color: theme.colors.muted }}>
            Select employees, enter month & amount — PDF auto download hogi.
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

      {/* ═════ HISTORY SECTION ═════ */}
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
            className="px-4 py-3 border-b flex items-center justify-between"
            style={{ borderColor: theme.colors.border }}
          >
            <h3
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: theme.colors.muted }}
            >
              Saved Salary Advices
            </h3>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.primary,
              }}
            >
              {advices.length}
            </span>
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

      {/* ═════ STEP 1: FILTERS ═════ */}
      <div
        className="p-4 border"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        }}
      >
        <h2
          className="text-[10px] font-bold tracking-widest uppercase mb-3"
          style={{ color: theme.colors.muted }}
        >
          Step 1 : Apply Filters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-4">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: theme.colors.muted }}
            >
              Bank
            </label>
            <select
              value={bankFilter}
              onChange={(e) => {
                setBankFilter(e.target.value);
                setSelectedIds([]);
              }}
              style={inputStyle}
              className="w-full border px-3 py-2 text-xs cursor-pointer"
            >
              <option value="">All Banks</option>
              {uniqueBanks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: theme.colors.muted }}
            >
              Designation
            </label>
            <select
              value={designationFilter}
              onChange={(e) => {
                setDesignationFilter(e.target.value);
                setSelectedIds([]);
              }}
              style={inputStyle}
              className="w-full border px-3 py-2 text-xs cursor-pointer"
            >
              <option value="">All Designations</option>
              {uniqueDesignations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: theme.colors.muted }}
            >
              Selected
            </label>
            <div
              className="border px-3 py-2 text-xs font-semibold flex items-center justify-between"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.sm,
                color: theme.colors.text,
              }}
            >
              <span>Employees</span>
              <span className="font-mono font-bold text-[13px]" style={{ color: theme.colors.primary }}>
                {selectedIds.length} / {eligibleFiltered.length}
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleContinue}
              disabled={selectedIds.length === 0}
              style={{
                backgroundColor: selectedIds.length === 0 ? '#E5E7EB' : theme.colors.primary,
                color: selectedIds.length === 0 ? '#9CA3AF' : '#FFFFFF',
                borderRadius: theme.radius.sm,
              }}
              className="w-full font-bold uppercase tracking-wider py-2 text-[11px] disabled:cursor-not-allowed hover:opacity-90"
            >
              Continue ({selectedIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* ═════ STEP 2: EMPLOYEE LIST ═════ */}
      <div
        className="border overflow-hidden"
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        }}
      >
        <div
          className="px-4 py-3 border-b flex items-center justify-between"
          style={{ borderColor: theme.colors.border }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: theme.colors.muted }}
            >
              Step 2 : Select Employees
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.primary,
              }}
            >
              {filteredEmployees.length}
            </span>
          </div>

          {eligibleFiltered.length > 0 && (
            <button
              onClick={handleSelectAll}
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                borderRadius: theme.radius.sm,
              }}
              className="text-[10px] font-bold uppercase tracking-widest border px-2.5 py-1 hover:opacity-80"
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Loader />
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-12 text-xs" style={{ color: theme.colors.muted }}>
            No employees found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-[10px] font-bold uppercase tracking-widest border-b"
                  style={{ borderColor: theme.colors.border, color: theme.colors.muted }}
                >
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      disabled={eligibleFiltered.length === 0}
                      className="w-3.5 h-3.5 rounded cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3">Photo</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">User ID</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3">Bank Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => {
                  const eligible = emp.bankDetails?.bankName && emp.bankDetails?.accountNumber;
                  const checked = selectedIds.includes(emp._id);
                  const initial = emp.name ? emp.name.charAt(0).toUpperCase() : 'E';

                  return (
                    <tr
                      key={emp._id}
                      onClick={() => eligible && toggleSelect(emp._id)}
                      style={{
                        borderColor: theme.colors.border,
                        backgroundColor: checked ? `${theme.colors.secondary}15` : 'transparent',
                      }}
                      className={`border-b text-xs ${
                        eligible ? 'hover:bg-black/5 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSelect(emp._id)}
                          disabled={!eligible}
                          className="w-3.5 h-3.5 rounded cursor-pointer disabled:cursor-not-allowed"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="w-7 h-7 rounded-full border flex items-center justify-center font-bold text-[11px]"
                          style={{
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.primary,
                          }}
                        >
                          {initial}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold" style={{ color: theme.colors.text }}>
                        {emp.name}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px]" style={{ color: theme.colors.muted }}>
                        {emp.employeeCode}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block border px-2 py-0.5 rounded text-[10px]"
                          style={{
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.muted,
                          }}
                        >
                          {emp.designation || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {emp.bankDetails?.bankName ? (
                          <div className="leading-tight">
                            <p className="font-bold uppercase text-[11px]" style={{ color: theme.colors.text }}>
                              {emp.bankDetails.bankName}
                            </p>
                            <p className="text-[10px] font-mono" style={{ color: theme.colors.muted }}>
                              {emp.bankDetails.accountNumber}
                            </p>
                          </div>
                        ) : (
                          <span className="italic text-[11px]" style={{ color: theme.colors.muted }}>
                            No Bank
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═════ ENTRY MODAL ═════ */}
      <Modal
        isOpen={showEntryModal}
        onClose={() => setShowEntryModal(false)}
        title={`Enter Month & Amount (${salaryEntries.length} Selected)`}
        size="lg"
      >
        <div className="space-y-4">
          <div
            className="border rounded-lg p-3 flex justify-between items-center"
            style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}
          >
            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: theme.colors.muted }}
              >
                Advice Date
              </label>
              <input
                type="date"
                value={adviceDate}
                onChange={(e) => setAdviceDate(e.target.value)}
                style={inputStyle}
                className="border px-3 py-1.5 text-xs"
              />
            </div>
            <div className="text-right">
              <span
                className="block text-[10px] font-bold uppercase tracking-widest"
                style={{ color: theme.colors.muted }}
              >
                Total
              </span>
              <span className="text-base font-bold font-mono" style={{ color: theme.colors.secondary }}>
                ₹ {totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {salaryEntries.map((entry, idx) => (
              <div
                key={entry.employee._id}
                className="border rounded-lg p-3"
                style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: theme.colors.text }}>
                  {idx + 1}. {entry.employee.name}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-[10px] mb-1 uppercase font-bold tracking-widest"
                      style={{ color: theme.colors.muted }}
                    >
                      Month *
                    </label>
                    <select
                      value={entry.month}
                      onChange={(e) => handleEntryChange(idx, 'month', e.target.value)}
                      style={inputStyle}
                      className="w-full border px-3 py-1.5 text-xs"
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
                    <label
                      className="block text-[10px] mb-1 uppercase font-bold tracking-widest"
                      style={{ color: theme.colors.muted }}
                    >
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      value={entry.amount}
                      onChange={(e) => handleEntryChange(idx, 'amount', e.target.value)}
                      style={inputStyle}
                      className="w-full border px-3 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-3 border-t" style={{ borderColor: theme.colors.border }}>
            <Button onClick={handleSaveAdvice} loading={saving} style={{ flex: 1 }}>
              💾 Save & Download PDF
            </Button>
            <Button variant="ghost" onClick={() => setShowEntryModal(false)}>
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
        message={`Are you sure you want to delete "${deleteTarget?.adviceNumber}"? This cannot be undone.`}
        confirmText="Delete"
        loading={deleting}
        variant="danger"
      />
    </div>
  );
}