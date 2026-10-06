import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';
import * as api from './auditLogs.api.js';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listAuditLogs({ page: 1, limit: 100 })
      .then(({ data }) => setLogs(data.data.logs || []))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      header: 'User',
      render: (r) => r.userId?.name || r.userName || '—',
    },
    { header: 'Role', key: 'userRole' },
    { header: 'Action', key: 'action' },
    { header: 'Target', render: (r) => r.targetType || '—' },
    {
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'SUCCESS' ? 'success' : 'danger'}>{r.status}</Badge>
      ),
    },
    {
      header: 'When',
      render: (r) => new Date(r.createdAt).toLocaleString(),
    },
  ];

  return (
    <>
      <PageHeader title="Audit Logs" subtitle="System activity" />
      <Table columns={columns} data={logs} loading={loading} />
    </>
  );
}