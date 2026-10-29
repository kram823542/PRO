import { theme } from '../../config/theme.js';
import Select from '../../components/ui/Select.jsx';
import Input from '../../components/ui/Input.jsx';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AttendanceFilter({ filters, onChange, showEmployeeFilter = false, employees = [] }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', background: theme.colors.surface, padding: 14, borderRadius: theme.radius.md, boxShadow: theme.shadow.sm, alignItems: 'flex-end' }}>
      <div style={{ minWidth: 140 }}>
        <Select label="Month" name="month" value={String(filters.month)} onChange={handle} options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))} />
      </div>
      <div style={{ minWidth: 100 }}>
        <Input label="Year" type="number" name="year" value={filters.year} onChange={handle} min="2020" max="2100" />
      </div>
      {showEmployeeFilter && (
        <div style={{ minWidth: 200 }}>
          <Select label="Employee" name="employeeId" value={filters.employeeId || ''} onChange={handle} options={employees.map(e => ({ value: e._id, label: `${e.employeeCode} — ${e.name}` }))} placeholder="All Employees" />
        </div>
      )}
    </div>
  );
}