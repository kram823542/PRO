import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function AuditLogTable({ logs = [], loading = false }) {
  const columns = [
    { header: 'User', render: (r) => r.userId?.name || r.userName || '—' },
    { header: 'Role', key: 'userRole' },
    { header: 'Action', key: 'action' },
    { header: 'Target', render: (r) => r.targetType || '—' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'SUCCESS' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
    { header: 'When', render: (r) => new Date(r.createdAt).toLocaleString() },
  ];
  return <Table columns={columns} data={logs} loading={loading} />;
}