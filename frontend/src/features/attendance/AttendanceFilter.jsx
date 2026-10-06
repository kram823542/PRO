// import { theme } from '../../config/theme.js';

// export default function AttendanceFilter({ filters, onChange }) {
//   const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

//   return (
//     <div
//       style={{
//         display: 'flex',
//         gap: 12,
//         marginBottom: 16,
//         flexWrap: 'wrap',
//         background: theme.colors.surface,
//         padding: 14,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//       }}
//     >
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//         <label style={{ fontSize: 12, color: theme.colors.muted }}>From</label>
//         <input
//           type="date"
//           name="from"
//           value={filters.from}
//           onChange={handle}
//           style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${theme.colors.border}` }}
//         />
//       </div>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//         <label style={{ fontSize: 12, color: theme.colors.muted }}>To</label>
//         <input
//           type="date"
//           name="to"
//           value={filters.to}
//           onChange={handle}
//           style={{ padding: '8px 12px', borderRadius: 8, border: `1px solid ${theme.colors.border}` }}
//         />
//       </div>
//     </div>
//   );
// }

import { theme } from '../../config/theme.js';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function AttendanceFilter({
  filters,
  onChange,
  showEmployeeFilter = false,
  employees = [],
}) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 16,
        flexWrap: 'wrap',
        background: theme.colors.surface,
        padding: 14,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
        alignItems: 'flex-end',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 140 }}>
        <label style={{ fontSize: 12, color: theme.colors.muted, fontWeight: 600 }}>
          Month
        </label>
        <select
          name="month"
          value={String(filters.month)}
          onChange={handle}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 14,
            outline: 'none',
            background: theme.colors.surface,
          }}
        >
          {MONTHS.map((m, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 100 }}>
        <label style={{ fontSize: 12, color: theme.colors.muted, fontWeight: 600 }}>
          Year
        </label>
        <input
          type="number"
          name="year"
          value={filters.year}
          onChange={handle}
          min="2020"
          max="2100"
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      {showEmployeeFilter && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 200 }}>
          <label style={{ fontSize: 12, color: theme.colors.muted, fontWeight: 600 }}>
            Employee
          </label>
          <select
            name="employeeId"
            value={filters.employeeId || ''}
            onChange={handle}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              fontSize: 14,
              outline: 'none',
              background: theme.colors.surface,
            }}
          >
            <option value="">All Employees</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.employeeCode} — {e.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}