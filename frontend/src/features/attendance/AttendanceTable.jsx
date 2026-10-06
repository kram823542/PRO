import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function AttendanceTable({ attendance = [], loading = false }) {
  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
    { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
    {
      header: 'Status',
      render: (r) => (
        <Badge
          variant={
            r.status === 'PRESENT' ? 'success' : r.status === 'ABSENT' ? 'danger' : 'warning'
          }
        >
          {r.status}
        </Badge>
      ),
    },
    { header: 'Source', key: 'source' },
  ];
  return <Table columns={columns} data={attendance} loading={loading} />;
}