import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function UserTable({ users = [], loading = false }) {
  const columns = [
    { header: 'Username', key: 'username' },
    { header: 'Name', key: 'name' },
    { header: 'Role', render: (r) => <Badge variant="info">{r.role}</Badge> },
    { header: 'Block', render: (r) => r.blockId?.name || '—' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'ACTIVE' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
  ];
  return <Table columns={columns} data={users} loading={loading} />;
}