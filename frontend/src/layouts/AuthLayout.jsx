import { Outlet } from 'react-router-dom';
import { theme } from '../config/theme.js';

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        fontFamily: 'system-ui, sans-serif',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: 32,
          boxShadow: theme.shadow.lg,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}