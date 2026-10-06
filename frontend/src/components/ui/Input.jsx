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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>
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
        style={{
          padding: '10px 12px',
          borderRadius: theme.radius.md,
          border: `1px solid ${error ? theme.colors.danger : theme.colors.border}`,
          fontSize: 14,
          outline: 'none',
          background: disabled ? '#F1F5F9' : theme.colors.surface,
          color: theme.colors.text,
        }}
      />
      {error && <span style={{ fontSize: 12, color: theme.colors.danger }}>{error}</span>}
    </div>
  );
}