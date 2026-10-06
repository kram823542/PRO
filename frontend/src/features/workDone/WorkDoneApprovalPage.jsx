// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './workDone.api.js';

// export default function WorkDoneApprovalPage() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [rejectReason, setRejectReason] = useState('');
//   const [processing, setProcessing] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.pendingApprovals();
//       setItems(data.data || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleApprove = async () => {
//     setProcessing(true);
//     try {
//       await api.approveWorkDone(selected._id);
//       setSelected(null);
//       load();
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleReject = async () => {
//     if (!rejectReason.trim()) return;
//     setProcessing(true);
//     try {
//       await api.rejectWorkDone(selected._id, rejectReason);
//       setRejectReason('');
//       setSelected(null);
//       load();
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <>
//       <PageHeader title="Pending Approvals" subtitle={`${items.length} item(s) waiting`} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : items.length === 0 ? (
//         <div
//           style={{
//             padding: 40,
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             textAlign: 'center',
//             color: theme.colors.muted,
//           }}
//         >
//           No pending approvals 🎉
//         </div>
//       ) : (
//         items.map((item) => (
//           <div
//             key={item._id}
//             style={{
//               background: theme.colors.surface,
//               borderRadius: theme.radius.md,
//               padding: 18,
//               marginBottom: 12,
//               boxShadow: theme.shadow.sm,
//             }}
//           >
//             <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
//               <div>
//                 <h3 style={{ margin: 0, fontSize: 15 }}>
//                   {item.employeeId?.name} ({item.employeeId?.employeeCode})
//                 </h3>
//                 <p style={{ margin: '4px 0', fontSize: 13, color: theme.colors.muted }}>
//                   Date: {item.date} • Panchayat: {item.employeeId?.workLocation?.panchayat}
//                 </p>
//                 <p style={{ margin: '8px 0', fontSize: 14 }}>{item.description}</p>
//                 {item.imageUrl && (
//                   <img
//                     src={item.imageUrl}
//                     alt="work"
//                     style={{ maxWidth: 240, borderRadius: 10, marginTop: 8 }}
//                   />
//                 )}
//               </div>
//               <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start' }}>
//                 <Button variant="success" size="sm" onClick={() => setSelected(item)}>
//                   View / Action
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       <Modal
//         open={!!selected}
//         onClose={() => setSelected(null)}
//         title="Review Work Done"
//         footer={
//           <>
//             <Button variant="ghost" onClick={() => setSelected(null)} disabled={processing}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handleApprove} loading={processing}>
//               Approve
//             </Button>
//           </>
//         }
//       >
//         {selected && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//             <div>
//               <b>Employee:</b> {selected.employeeId?.name}
//             </div>
//             <div>
//               <b>Date:</b> {selected.date}
//             </div>
//             <div>
//               <b>Description:</b>
//               <p style={{ marginTop: 6 }}>{selected.description}</p>
//             </div>
//             {selected.imageUrl && (
//               <img src={selected.imageUrl} alt="work" style={{ maxWidth: '100%', borderRadius: 8 }} />
//             )}
//             <Input
//               label="Reject Reason (if rejecting)"
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               placeholder="Reason..."
//             />
//             <Button variant="danger" onClick={handleReject} loading={processing} disabled={!rejectReason.trim()}>
//               Reject
//             </Button>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader.jsx';
import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';
import WorkDoneForm from './WorkDoneForm.jsx';
import { theme } from '../../config/theme.js';
import * as api from './workDone.api.js';

export default function WorkDonePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmployee = user.role === 'EMPLOYEE';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(!isEmployee);
  const [showForm, setShowForm] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null); // For rejection reason expand

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.listWorkDone({});
      setItems(data.data.workDone || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ─────────────────────────────────────────────
     EMPLOYEE VIEW
     ───────────────────────────────────────────── */
  if (isEmployee) {
    const columns = [
      { header: 'Date', key: 'date' },
      {
        header: 'Description',
        render: (r) => (
          <div style={{ maxWidth: 400 }}>{r.description}</div>
        ),
      },
      {
        header: 'Status',
        render: (r) => (
          <Badge
            variant={
              r.status === 'APPROVED'
                ? 'success'
                : r.status === 'REJECTED'
                ? 'danger'
                : 'warning'
            }
          >
            {r.status}
          </Badge>
        ),
      },
      {
        header: 'Reason / Action',
        render: (r) => {
          if (r.status !== 'REJECTED') return <span style={{ color: theme.colors.muted }}>—</span>;
          return (
            <button
              onClick={() => setExpandedRow(expandedRow === r._id ? null : r._id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: theme.colors.danger,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
                padding: 0,
              }}
            >
              {expandedRow === r._id ? '▼ Hide Reason' : '▶ View Reason'}
            </button>
          );
        },
      },
    ];

    return (
      <>
        <PageHeader title="Work Done" subtitle="Window: 5:00 PM – 10:00 PM IST" />

        {showForm ? (
          <WorkDoneForm
            onSubmitted={() => {
              setShowForm(false);
              load();
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding: '12px 20px',
                background: 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              + Submit Work Done
            </button>

            {/* Custom table with rejection reason expansion */}
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
                Loading...
              </div>
            ) : items.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  background: theme.colors.surface,
                  borderRadius: theme.radius.md,
                  textAlign: 'center',
                  color: theme.colors.muted,
                }}
              >
                No work done submissions yet.
              </div>
            ) : (
              <div
                style={{
                  background: theme.colors.surface,
                  borderRadius: theme.radius.md,
                  boxShadow: theme.shadow.sm,
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: theme.colors.background }}>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Description</th>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Reason / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <>
                        <tr
                          key={item._id}
                          style={{ borderBottom: `1px solid ${theme.colors.border}` }}
                        >
                          <td style={{ padding: '12px 14px', fontWeight: 500 }}>{item.date}</td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ maxWidth: 400 }}>{item.description}</div>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <Badge
                              variant={
                                item.status === 'APPROVED'
                                  ? 'success'
                                  : item.status === 'REJECTED'
                                  ? 'danger'
                                  : 'warning'
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            {item.status === 'REJECTED' ? (
                              <button
                                onClick={() =>
                                  setExpandedRow(expandedRow === item._id ? null : item._id)
                                }
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: theme.colors.danger,
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  fontSize: 13,
                                  padding: 0,
                                }}
                              >
                                {expandedRow === item._id ? '▼ Hide Reason' : '▶ View Reason'}
                              </button>
                            ) : (
                              <span style={{ color: theme.colors.muted }}>—</span>
                            )}
                          </td>
                        </tr>

                        {/* Expanded row — rejection reason */}
                        {expandedRow === item._id && item.status === 'REJECTED' && (
                          <tr key={`${item._id}-reason`}>
                            <td
                              colSpan={4}
                              style={{
                                padding: '12px 14px',
                                background: '#FEF2F2',
                                borderBottom: `1px solid ${theme.colors.border}`,
                                borderLeft: `3px solid ${theme.colors.danger}`,
                              }}
                            >
                              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <div
                                  style={{
                                    fontSize: 18,
                                    color: theme.colors.danger,
                                    lineHeight: 1,
                                  }}
                                >
                                  ⚠️
                                </div>
                                <div>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 700,
                                      color: theme.colors.danger,
                                      marginBottom: 4,
                                      textTransform: 'uppercase',
                                      letterSpacing: 0.5,
                                    }}
                                  >
                                    Rejection Reason
                                  </div>
                                  <div style={{ fontSize: 13, color: theme.colors.text }}>
                                    {item.rejectionReason || 'No reason provided'}
                                  </div>
                                  {item.rejectedAt && (
                                    <div
                                      style={{
                                        fontSize: 11,
                                        color: theme.colors.muted,
                                        marginTop: 4,
                                      }}
                                    >
                                      Rejected on:{' '}
                                      {new Date(item.rejectedAt).toLocaleString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </>
    );
  }

  /* ─────────────────────────────────────────────
     BPM / CLF VIEW
     ───────────────────────────────────────────── */
  const columns = [
    { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
    { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
    { header: 'Date', key: 'date' },
    {
      header: 'Description',
      render: (r) => <div style={{ maxWidth: 300 }}>{r.description}</div>,
    },
    {
      header: 'Status',
      render: (r) => (
        <Badge
          variant={
            r.status === 'APPROVED' ? 'success' : r.status === 'REJECTED' ? 'danger' : 'warning'
          }
        >
          {r.status}
        </Badge>
      ),
    },
    {
      header: 'Rejection Reason',
      render: (r) =>
        r.status === 'REJECTED' ? (
          <div
            style={{
              maxWidth: 260,
              fontSize: 12,
              color: theme.colors.danger,
              padding: '4px 8px',
              background: '#FEF2F2',
              borderRadius: 6,
              borderLeft: `2px solid ${theme.colors.danger}`,
            }}
          >
            {r.rejectionReason || 'No reason'}
          </div>
        ) : (
          <span style={{ color: theme.colors.muted }}>—</span>
        ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Work Done"
        actions={
          user.role === 'CLF' && (
            <Link to="/clf/work-done/approval" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  padding: '10px 16px',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                Pending Approvals
              </span>
            </Link>
          )
        }
      />
      <Table columns={columns} data={items} loading={loading} />
    </>
  );
}