import PageHeader from '../components/common/PageHeader.jsx';
import { theme } from '../config/theme.js';

const StatCard = ({ label, value, color }) => (
  <div
    style={{
      background: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: 20,
      boxShadow: theme.shadow.sm,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: theme.colors.text }}>{value}</div>
  </div>
);

export default function SuperAdminDashboard() {
  return (
    <>
      <PageHeader title="Super Admin Dashboard" subtitle="System overview" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        <StatCard label="Total Blocks" value="—" color={theme.colors.primary} />
        <StatCard label="Total BPMs" value="—" color={theme.colors.info} />
        <StatCard label="Total Users" value="—" color={theme.colors.success} />
        <StatCard label="Audit Events" value="—" color={theme.colors.accent} />
      </div>
      <p style={{ marginTop: 24, color: theme.colors.muted, fontSize: 13 }}>
        Use the sidebar to manage blocks, BPM admins, and view audit logs.
      </p>
    </>
  );
}