import { theme } from '../../config/theme.js';

const colors = {
  success: { bg: '#DCFCE7', color: theme.colors.success },
  warning: { bg: '#FEF3C7', color: theme.colors.warning },
  danger: { bg: '#FEE2E2', color: theme.colors.danger },
  info: { bg: '#DBEAFE', color: theme.colors.info },
  default: { bg: '#F1F5F9', color: theme.colors.muted },
};

export default function Badge({ children, variant = 'default' }) {
  const c = colors[variant] || colors.default;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: c.bg,
        color: c.color,
      }}
    >
      {children}
    </span>
  );
}