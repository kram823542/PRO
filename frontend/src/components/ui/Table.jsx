import { theme } from '../../config/theme.js';

export default function Table({ columns = [], data = [], loading = false, emptyMessage = 'No data found' }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: theme.colors.background }}>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  padding: '12px 14px',
                  textAlign: 'left',
                  fontWeight: 600,
                  color: theme.colors.text,
                  borderBottom: `1px solid ${theme.colors.border}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 30, textAlign: 'center', color: theme.colors.muted }}>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 30, textAlign: 'center', color: theme.colors.muted }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                {columns.map((c, ci) => (
                  <td key={ci} style={{ padding: '12px 14px', color: theme.colors.text }}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}