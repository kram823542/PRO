import { theme } from '../../config/theme.js';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style = {},
}) {
  const variants = {
    primary: { bg: theme.colors.primary, color: '#fff', border: 'none' },
    secondary: { bg: theme.colors.secondary, color: '#fff', border: 'none' },
    outline: { bg: 'transparent', color: theme.colors.primary, border: `1px solid ${theme.colors.primary}` },
    danger: { bg: theme.colors.danger, color: '#fff', border: 'none' },
    success: { bg: theme.colors.success, color: '#fff', border: 'none' },
    ghost: { bg: 'transparent', color: theme.colors.text, border: `1px solid ${theme.colors.border}` },
  };
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 13 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '14px 22px', fontSize: 15 },
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        background: v.bg,
        color: v.color,
        border: v.border,
        borderRadius: theme.radius.md,
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'all 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...s,
        ...style,
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}