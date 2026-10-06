import { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal.jsx';
import Button from '../../../components/ui/Button.jsx';
import Input from '../../../components/ui/Input.jsx';
import Select from '../../../components/ui/Select.jsx';
import { theme } from '../../../config/theme.js';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function ReportDownloadModal({
  open,
  onClose,
  employee,
  type,
  onDownload,
  bulkCount = 0,
}) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setYear(now.getFullYear());
      setMonth(now.getMonth() + 1);
      setLoading(false);
    }
  }, [open]);

  const isBulk = bulkCount > 0;
  const title = isBulk
    ? `Download ${bulkCount} Reports`
    : type === 'action-plan'
    ? 'Download Action Plan Report'
    : 'Download Work Done Report';

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload?.({ year: Number(year), month: Number(month) });
      onClose();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Info Banner */}
        {isBulk ? (
          <div
            style={{
              background: theme.colors.background,
              padding: 12,
              borderRadius: theme.radius.sm,
              fontSize: 13,
            }}
          >
            <b>{bulkCount} employees selected</b>
            <div style={{ color: theme.colors.muted, marginTop: 2 }}>
              {type === 'action-plan' ? 'Action Plan' : 'Work Done'} report — सभी की PDF download होंगी
            </div>
          </div>
        ) : (
          employee && (
            <div
              style={{
                background: theme.colors.background,
                padding: 12,
                borderRadius: theme.radius.sm,
                fontSize: 13,
              }}
            >
              <div>
                <b>{employee.name}</b>
                {employee.employeeCode && employee.employeeCode !== 'BULK' && (
                  <> ({employee.employeeCode})</>
                )}
              </div>
              {employee.designation && employee.designation !== '—' && (
                <div style={{ color: theme.colors.muted, marginTop: 2 }}>
                  {employee.designation}
                  {employee.workLocation?.panchayat && ` • ${employee.workLocation.panchayat}`}
                </div>
              )}
            </div>
          )
        )}

        {/* Year */}
        <Input
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2020"
          max="2100"
        />

        {/* Month */}
        <Select
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          options={MONTHS.map((m, i) => ({ value: i + 1, label: m }))}
        />

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDownload} loading={loading}>
            Download PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
}