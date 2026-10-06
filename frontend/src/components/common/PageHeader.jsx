import { theme } from '../../config/theme.js';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 22, color: theme.colors.text }}>{title}</h1>
        {subtitle && (
          <p style={{ margin: '4px 0 0', fontSize: 13, color: theme.colors.muted }}>{subtitle}</p>
        )}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10 }}>{actions}</div>}
    </div>
  );
}