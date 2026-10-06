import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function ClfTable({ clfs = [], loading = false }) {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Code', key: 'code' },
    { header: 'Block', render: (r) => r.blockId?.name || '—' },
    { header: 'Village', key: 'village' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'ACTIVE' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
  ];
  return <Table columns={columns} data={clfs} loading={loading} />;
}