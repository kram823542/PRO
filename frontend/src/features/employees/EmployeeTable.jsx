import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

export default function EmployeeTable({ employees = [], loading = false }) {
  const columns = [
    { header: 'Code', key: 'employeeCode' },
    { header: 'Name', key: 'name' },
    { header: 'Mobile', key: 'mobile' },
    { header: 'Designation', key: 'designation' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'ACTIVE' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
  ];
  return <Table columns={columns} data={employees} loading={loading} />;
}