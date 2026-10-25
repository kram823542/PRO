import { theme } from '../../config/theme.js';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  disabled = false,
  style = {},
}) {
  const primaryColor = theme.colors.primary || '#0f172a';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text || '#334155', paddingLeft: 14 }}>
          {label} {required && <span style={{ color: theme.colors.danger }}>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="clf-pill-input"
        style={{
          padding: '13px 20px',
          borderRadius: '9999px',
          border: `1.5px solid ${error ? theme.colors.danger : (theme.colors.border || '#cbd5e1')}`,
          fontSize: 14,
          outline: 'none',
          background: disabled ? '#F1F5F9' : (theme.colors.surface || '#f8fafc'),
          color: theme.colors.text || '#0f172a',
          transition: 'all 0.2s ease-in-out',
          boxSizing: 'border-box',
          width: '100%',
        }}
      />
      {error && (
        <span style={{ fontSize: 12, color: theme.colors.danger, paddingLeft: 14 }}>
          {error}
        </span>
      )}

      {/* Scoped Focus Glow Styling for Pill Input */}
      <style>{`
        .clf-pill-input:focus {
          background: #ffffff !important;
          border-color: ${primaryColor} !important;
          box-shadow: 0 0 0 4px ${primaryColor}1A !important;
        }
      `}</style>
    </div>
  );
}