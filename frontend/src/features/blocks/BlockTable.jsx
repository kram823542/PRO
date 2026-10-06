import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function BlockTable({ blocks = [], loading = false }) {
  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Code', key: 'code' },
    { header: 'District', key: 'district' },
    { header: 'State', key: 'state' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'ACTIVE' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
  ];
  return <Table columns={columns} data={blocks} loading={loading} />;
}