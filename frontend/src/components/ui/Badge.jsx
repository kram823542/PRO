import { theme } from '../../config/theme.js';

const variants = {
  success: { bg: `${theme.colors.success}12`, color: theme.colors.success, border: `${theme.colors.success}30`, dot: theme.colors.success },
  warning: { bg: `${theme.colors.warning}12`, color: theme.colors.warning, border: `${theme.colors.warning}30`, dot: theme.colors.warning },
  danger: { bg: `${theme.colors.danger}12`, color: theme.colors.danger, border: `${theme.colors.danger}30`, dot: theme.colors.danger },
  info: { bg: `${theme.colors.info}12`, color: theme.colors.info, border: `${theme.colors.info}30`, dot: theme.colors.info },
  default: { bg: `${theme.colors.muted}12`, color: theme.colors.muted, border: `${theme.colors.muted}30`, dot: theme.colors.muted },
};

export default function Badge({ children, variant = 'default', showDot = true }) {
  const c = variants[variant] || variants.default;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {showDot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: c.dot,
            flexShrink: 0,
          }}
        />
      )}
      <span>{children}</span>
    </span>
  );
}