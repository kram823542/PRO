import { Outlet } from 'react-router-dom';
import { theme } from '../config/theme.js';

export default function AuthLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: theme.colors.background || '#f1f5f9',
        fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* LEFT SIDE: Image & Branding (Desktop Only) */}
      <div
        className="auth-left-panel"
        style={{
          flex: '1.2',
          display: 'none',
          position: 'relative',
          background: theme.colors.primary || '#0f172a',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        {/* ✅ WATERCOLOR IMAGE PRESERVED: /SHG.jpeg */}
        <img
          src="/SHG.jpeg"
          alt="SHG Background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
            transition: 'transform 0.8s ease-in-out',
          }}
        />

        {/* Gradient Overlay for Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${theme.colors.primary || '#0f172a'}D9 0%, ${theme.colors.primary || '#0f172a'}66 50%, rgba(0, 0, 0, 0.75) 100%)`,
          }}
        />

        {/* Glassmorphic Branding Card */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 520 }}>
          <div
            className="brand-glass-card"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '44px 36px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
              textAlign: 'left',
              color: theme.colors.surface || '#ffffff',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.18)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
              Official Portal
            </div>

            <h1
              style={{
                color: theme.colors.surface || '#ffffff',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800,
                margin: '0 0 16px 0',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Satbarwa CLF
            </h1>

            <p
              style={{
                color: `${theme.colors.surface || '#ffffff'}EE`,
                fontSize: '15px',
                lineHeight: 1.65,
                margin: 0,
                fontWeight: 400,
              }}
            >
              Community Level Federation Management System. Streamline workforce operations, employee attendance, leaves tracking, and analytics reports all in one unified platform.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form / Outlet Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 20px',
          background: theme.colors.surface || '#ffffff',
          position: 'relative',
        }}
      >
        {/* Mobile Header */}
        <div className="mobile-brand-header">
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: theme.colors.primary || '#0f172a' }}>
            Satbarwa CLF
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.7 }}>
            Federation Management System
          </p>
        </div>

        {/* Form Container */}
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            background: theme.colors.surface || '#ffffff',
            padding: '20px 8px',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .auth-left-panel {
            display: flex !important;
          }
          .mobile-brand-header {
            display: none !important;
          }
        }

        @media (max-width: 899px) {
          .mobile-brand-header {
            display: block;
            text-align: center;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}