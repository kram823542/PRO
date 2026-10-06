import { theme } from '../../config/theme.js';

export default function Loader({ fullScreen = false, text = 'Loading...' }) {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 40,
          height: 40,
          border: `4px solid ${theme.colors.border}`,
          borderTop: `4px solid ${theme.colors.primary}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: 13, color: theme.colors.muted }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.colors.background,
        }}
      >
        {content}
      </div>
    );
  }
  return <div style={{ padding: 40, textAlign: 'center' }}>{content}</div>;
}