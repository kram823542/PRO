import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge.jsx';
import { theme } from '../../config/theme.js';

export default function EmployeeRow({
  employee,
  basePath,
  canReset,
  canDelete,
  onReset,
  onDelete,
  onToggleStatus,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = employee.status === 'ACTIVE';

  return (
    <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
      <td style={{ padding: '12px 14px', fontWeight: 500 }}>{employee.employeeCode}</td>
      <td style={{ padding: '12px 14px' }}>{employee.name}</td>
      <td style={{ padding: '12px 14px' }}>{employee.mobile}</td>
      <td style={{ padding: '12px 14px' }}>{employee.designation}</td>
      <td style={{ padding: '12px 14px', color: theme.colors.muted }}>
        {employee.workLocation?.panchayat || '—'}
      </td>
      <td style={{ padding: '12px 14px' }}>
        <Badge variant={isActive ? 'success' : 'danger'}>{employee.status}</Badge>
      </td>
      <td style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {basePath && (
            <Link
              to={`${basePath}/employees/${employee._id}`}
              style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: 13 }}
            >
              View
            </Link>
          )}

          {(canReset || canDelete) && (
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                onClick={() => setOpenMenu((v) => !v)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.sm,
                  width: 28,
                  height: 28,
                  cursor: 'pointer',
                  fontSize: 16,
                  lineHeight: 1,
                  color: theme.colors.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="More options"
              >
                ⋮
              </button>

              {openMenu && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: 4,
                    background: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.radius.sm,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    minWidth: 220,
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  {canReset && (
                    <MenuItem
                      icon="🔑"
                      label="Reset Password"
                      color={theme.colors.text}
                      onClick={() => {
                        setOpenMenu(false);
                        onReset?.(employee);
                      }}
                    />
                  )}

                  {/* ✅ Activate / Deactivate toggle */}
                  {canDelete && onToggleStatus && (
                    <MenuItem
                      icon={isActive ? '🚫' : '✅'}
                      label={isActive ? 'Deactivate' : 'Activate'}
                      color={theme.colors.warning}
                      onClick={() => {
                        setOpenMenu(false);
                        onToggleStatus?.(employee);
                      }}
                    />
                  )}

                  {/* ✅ Permanently Delete */}
                  {canDelete && (
                    <MenuItem
                      icon="🗑️"
                      label="Delete Permanently"
                      color={theme.colors.danger}
                      onClick={() => {
                        setOpenMenu(false);
                        onDelete?.(employee);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function MenuItem({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        textAlign: 'left',
        padding: '10px 14px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        color,
        fontWeight: 600,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.background)}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}