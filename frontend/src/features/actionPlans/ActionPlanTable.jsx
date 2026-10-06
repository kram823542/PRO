import Table from '../../components/ui/Table.jsx';

export default function ActionPlanTable({ plans = [], loading = false }) {
  const columns = [
    { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
    { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
    { header: 'Date', key: 'date' },
    { header: 'Plan', render: (r) => <div style={{ maxWidth: 400 }}>{r.plan}</div> },
  ];
  return <Table columns={columns} data={plans} loading={loading} />;
}