// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Table from '../../components/ui/Table.jsx';
// import ActionPlanForm from './ActionPlanForm.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './actionPlans.api.js';

// export default function ActionPlansPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(!isEmployee);
//   const [todayPlan, setTodayPlan] = useState(null);

//   useEffect(() => {
//     if (isEmployee) {
//       api.todayActionPlan()
//         .then(({ data }) => setTodayPlan(data.data))
//         .catch(() => {});
//     } else {
//       api.listActionPlans({})
//         .then(({ data }) => setPlans(data.data.actionPlans || []))
//         .finally(() => setLoading(false));
//     }
//   }, [isEmployee]);

//   if (isEmployee) {
//     return (
//       <>
//         <PageHeader title="Action Plan" subtitle="Window: 10:00 AM – 11:00 AM IST" />
//         {todayPlan ? (
//           <div
//             style={{
//               background: theme.colors.surface,
//               padding: 20,
//               borderRadius: theme.radius.md,
//               boxShadow: theme.shadow.sm,
//             }}
//           >
//             <h3 style={{ marginTop: 0 }}>Today's Action Plan</h3>
//             <p style={{ whiteSpace: 'pre-line' }}>{todayPlan.plan}</p>
//             <p style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 0 }}>
//               Submitted: {new Date(todayPlan.submittedAt).toLocaleString()}
//             </p>
//           </div>
//         ) : (
//           <ActionPlanForm onSubmitted={(plan) => setTodayPlan(plan)} />
//         )}
//       </>
//     );
//   }

//   const columns = [
//     {
//       header: 'Employee',
//       render: (r) => r.employeeId?.name || '—',
//     },
//     { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
//     { header: 'Date', key: 'date' },
//     { header: 'Plan', render: (r) => <div style={{ maxWidth: 400 }}>{r.plan}</div> },
//   ];

//   return (
//     <>
//       <PageHeader title="Action Plans" />
//       <Table columns={columns} data={plans} loading={loading} />
//     </>
//   );
// }



// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Table from '../../components/ui/Table.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import ActionPlanForm from './ActionPlanForm.jsx';
// import WorkDoneForm from '../workDone/WorkDoneForm.jsx';
// import { theme } from '../../config/theme.js';
// import * as actionApi from './actionPlans.api.js';
// import * as workApi from '../workDone/workDone.api.js';

// export default function ActionPlansPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   // ✅ Toggle — sirf employee ke liye
//   const [tab, setTab] = useState('action-plan');

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//       <PageHeader
//         title={isEmployee ? 'Daily Reports' : 'Action Plans'}
//         subtitle={
//           isEmployee
//             ? 'Morning action plan & evening work done'
//             : "All employees' action plans"
//         }
//       />

//       {/* ✅ Toggle Button — सिर्फ EMPLOYEE को दिखेगा */}
//       {isEmployee && (
//         <div
//           style={{
//             display: 'inline-flex',
//             gap: 4,
//             padding: 4,
//             background: theme.colors.background,
//             border: `1px solid ${theme.colors.border}`,
//             borderRadius: 12,
//             marginBottom: 20,
//           }}
//         >
//           <ToggleBtn
//             label="📝 Action Plan"
//             active={tab === 'action-plan'}
//             onClick={() => setTab('action-plan')}
//           />
//           <ToggleBtn
//             label="✅ Work Done"
//             active={tab === 'work-done'}
//             onClick={() => setTab('work-done')}
//           />
//         </div>
//       )}

//       {isEmployee ? (
//         tab === 'action-plan' ? (
//           <EmployeeActionPlan />
//         ) : (
//           <EmployeeWorkDone />
//         )
//       ) : (
//         <AdminActionPlanList />
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Toggle Button
//    ───────────────────────────────────────────── */
// function ToggleBtn({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         padding: '10px 20px',
//         border: 'none',
//         background: active ? theme.colors.primary : 'transparent',
//         color: active ? '#fff' : theme.colors.muted,
//         borderRadius: 8,
//         fontWeight: 700,
//         fontSize: 13,
//         cursor: 'pointer',
//         transition: 'all 0.25s ease',
//       }}
//     >
//       {label}
//     </button>
//   );
// }

// /* ─────────────────────────────────────────────
//    Employee — Action Plan
//    ───────────────────────────────────────────── */
// function EmployeeActionPlan() {
//   const [todayPlan, setTodayPlan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     actionApi
//       .todayActionPlan()
//       .then(({ data }) => setTodayPlan(data.data))
//       .catch(() => {})
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
//         Loading...
//       </div>
//     );
//   }

//   if (todayPlan) {
//     return (
//       <div
//         style={{
//           background: theme.colors.surface,
//           padding: 20,
//           borderRadius: theme.radius.md,
//           boxShadow: theme.shadow.sm,
//         }}
//       >
//         <h3 style={{ marginTop: 0, color: theme.colors.primary }}>
//           ✅ Today's Action Plan Submitted
//         </h3>
//         <p style={{ whiteSpace: 'pre-line', fontSize: 14 }}>{todayPlan.plan}</p>
//         <p style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 0 }}>
//           Submitted: {new Date(todayPlan.submittedAt).toLocaleString()}
//         </p>
//       </div>
//     );
//   }

//   return <ActionPlanForm onSubmitted={(plan) => setTodayPlan(plan)} />;
// }

// /* ─────────────────────────────────────────────
//    Employee — Work Done
//    ───────────────────────────────────────────── */
// function EmployeeWorkDone() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [previewImg, setPreviewImg] = useState(null);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await workApi.listWorkDone({});
//       setItems(data.data.workDone || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   if (showForm) {
//     return (
//       <WorkDoneForm
//         onSubmitted={() => {
//           setShowForm(false);
//           load();
//         }}
//         onCancel={() => setShowForm(false)}
//       />
//     );
//   }

//   const columns = [
//     { header: 'Date', key: 'date' },
//     {
//       header: 'Image',
//       render: (r) =>
//         r.imageUrl ? (
//           <img
//             src={r.imageUrl}
//             alt="work"
//             onClick={() => setPreviewImg(r.imageUrl)}
//             style={{
//               width: 44,
//               height: 44,
//               objectFit: 'cover',
//               borderRadius: 6,
//               cursor: 'pointer',
//               border: `1px solid ${theme.colors.border}`,
//             }}
//             title="Click to view full image"
//           />
//         ) : (
//           <span style={{ color: theme.colors.muted }}>—</span>
//         ),
//     },
//     {
//       header: 'Description',
//       render: (r) => <div style={{ maxWidth: 400 }}>{r.description}</div>,
//     },
//     {
//       header: 'Status',
//       render: (r) => (
//         <Badge
//           variant={
//             r.status === 'APPROVED'
//               ? 'success'
//               : r.status === 'REJECTED'
//               ? 'danger'
//               : 'warning'
//           }
//         >
//           {r.status}
//         </Badge>
//       ),
//     },
//     {
//       header: 'Rejection Reason',
//       render: (r) =>
//         r.status === 'REJECTED' ? (
//           <div
//             style={{
//               maxWidth: 220,
//               fontSize: 12,
//               color: theme.colors.danger,
//               padding: '6px 10px',
//               background: '#FEF2F2',
//               borderRadius: 6,
//               borderLeft: `3px solid ${theme.colors.danger}`,
//             }}
//           >
//             {r.rejectionReason || 'No reason'}
//           </div>
//         ) : (
//           <span style={{ color: theme.colors.muted }}>—</span>
//         ),
//     },
//   ];

//   return (
//     <>
//       <button
//         onClick={() => setShowForm(true)}
//         style={{
//           padding: '12px 20px',
//           background: theme.colors.primary,
//           color: '#fff',
//           border: 'none',
//           borderRadius: 10,
//           fontWeight: 600,
//           cursor: 'pointer',
//           marginBottom: 20,
//         }}
//       >
//         + Submit Work Done
//       </button>

//       <Table columns={columns} data={items} loading={loading} />

//       <Modal open={!!previewImg} onClose={() => setPreviewImg(null)} title="Work Image">
//         {previewImg && (
//           <img src={previewImg} alt="work" style={{ maxWidth: '100%', borderRadius: 8 }} />
//         )}
//       </Modal>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Admin (BPM/CLF) — Action Plans List
//    ───────────────────────────────────────────── */
// function AdminActionPlanList() {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     actionApi
//       .listActionPlans({})
//       .then(({ data }) => setPlans(data.data.actionPlans || []))
//       .finally(() => setLoading(false));
//   }, []);

//   const columns = [
//     { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
//     { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
//     { header: 'Date', key: 'date' },
//     { header: 'Plan', render: (r) => <div style={{ maxWidth: 500 }}>{r.plan}</div> },
//   ];

//   return <Table columns={columns} data={plans} loading={loading} />;
// }






// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Table from '../../components/ui/Table.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import ActionPlanForm from './ActionPlanForm.jsx';
// import WorkDoneForm from '../workDone/WorkDoneForm.jsx';
// import { theme } from '../../config/theme.js';
// import * as actionApi from './actionPlans.api.js';
// import * as workApi from '../workDone/workDone.api.js';

// export default function ActionPlansPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   // ✅ Toggle — sirf employee ke liye
//   const [tab, setTab] = useState('action-plan');

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//       <PageHeader
//         title={isEmployee ? 'Daily Reports' : 'Action Plans'}
//         subtitle={
//           isEmployee
//             ? 'Morning action plan & evening work done'
//             : "All employees' action plans"
//         }
//       />

//       {/* ✅ Toggle Button — Modern Fully Rounded Capsule Pill Style */}
//       {isEmployee && (
//         <div
//           style={{
//             display: 'inline-flex',
//             gap: 6,
//             padding: 5,
//             background: theme.colors.background || '#f1f5f9',
//             border: `1px solid ${theme.colors.border || '#e2e8f0'}`,
//             borderRadius: 999, // ✅ Pure Circle Pill Shape
//             marginBottom: 20,
//             boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
//           }}
//         >
//           <ToggleBtn
//             label="📝 Action Plan"
//             active={tab === 'action-plan'}
//             onClick={() => setTab('action-plan')}
//           />
//           <ToggleBtn
//             label="✅ Work Done"
//             active={tab === 'work-done'}
//             onClick={() => setTab('work-done')}
//           />
//         </div>
//       )}

//       {isEmployee ? (
//         tab === 'action-plan' ? (
//           <EmployeeActionPlan />
//         ) : (
//           <EmployeeWorkDone />
//         )
//       ) : (
//         <AdminActionPlanList />
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Toggle Button (Modern Fully Rounded Pill)
//    ───────────────────────────────────────────── */
// function ToggleBtn({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         padding: '10px 22px',
//         border: 'none',
//         background: active ? theme.colors.primary : 'transparent',
//         color: active ? '#fff' : theme.colors.muted,
//         borderRadius: 999, // ✅ Circle shape button
//         fontWeight: active ? 700 : 600,
//         fontSize: 13,
//         cursor: 'pointer',
//         boxShadow: active ? '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none',
//         transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//         outline: 'none',
//       }}
//     >
//       {label}
//     </button>
//   );
// }

// /* ─────────────────────────────────────────────
//    Employee — Action Plan (Unchanged)
//    ───────────────────────────────────────────── */
// /* ─────────────────────────────────────────────
//    Employee — Action Plan (History + Today Form)
//    ───────────────────────────────────────────── */
// function EmployeeActionPlan() {
//   const [todayPlan, setTodayPlan] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       // ✅ Aaj ka plan
//       const todayRes = await actionApi.todayActionPlan().catch(() => ({ data: { data: null } }));
//       setTodayPlan(todayRes.data.data);

//       // ✅ Poori history
//       const histRes = await actionApi.listActionPlans({});
//       setHistory(histRes.data.data.actionPlans || []);
//     } catch (err) {
//       console.error('Action plan load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
//         Loading...
//       </div>
//     );
//   }

//   // Form dikhana hai
//   if (showForm) {
//     return (
//       <ActionPlanForm
//         onSubmitted={() => {
//           setShowForm(false);
//           load();
//         }}
//       />
//     );
//   }

//   return (
//     <>
//       {/* ─── Today's Plan / Submit Button ─── */}
//       {todayPlan ? (
//         <div
//           style={{
//             background: theme.colors.surface,
//             padding: 20,
//             borderRadius: theme.radius.md,
//             boxShadow: theme.shadow.sm,
//             marginBottom: 20,
//             borderLeft: `4px solid ${theme.colors.success}`,
//           }}
//         >
//           <h3 style={{ marginTop: 0, color: theme.colors.primary }}>
//             ✅ Today's Action Plan Submitted
//           </h3>
//           <p style={{ whiteSpace: 'pre-line', fontSize: 14, marginBottom: 8 }}>
//             {todayPlan.plan}
//           </p>
//           <p style={{ fontSize: 12, color: theme.colors.muted, marginBottom: 0 }}>
//             Submitted: {new Date(todayPlan.submittedAt).toLocaleString()}
//           </p>
//         </div>
//       ) : (
//         <button
//           onClick={() => setShowForm(true)}
//           style={{
//             padding: '12px 24px',
//             background: theme.colors.primary,
//             color: '#fff',
//             border: 'none',
//             borderRadius: 999,
//             fontWeight: 700,
//             fontSize: 13,
//             cursor: 'pointer',
//             marginBottom: 20,
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
//             transition: 'all 0.25s ease',
//           }}
//         >
//           + Submit Today's Action Plan
//         </button>
//       )}

//       {/* ─── History Table ─── */}
//       <h3
//         style={{
//           marginTop: 8,
//           marginBottom: 12,
//           fontSize: 15,
//           fontWeight: 700,
//           color: theme.colors.text,
//         }}
//       >
//         📋 My Action Plan History ({history.length})
//       </h3>

//       <Table
//         columns={[
//           { header: 'Date', key: 'date' },
//           {
//             header: 'Action Plan',
//             render: (r) => (
//               <div style={{ maxWidth: 600, whiteSpace: 'pre-line' }}>
//                 {r.plan}
//               </div>
//             ),
//           },
//           {
//             header: 'Submitted At',
//             render: (r) =>
//               r.submittedAt
//                 ? new Date(r.submittedAt).toLocaleString()
//                 : '—',
//           },
//         ]}
//         data={history}
//         loading={loading}
//         emptyMessage="अभी तक कोई Action Plan submit नहीं किया।"
//       />
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Employee — Work Done (Submit Button is now Capsule)
//    ───────────────────────────────────────────── */
// function EmployeeWorkDone() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [previewImg, setPreviewImg] = useState(null);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await workApi.listWorkDone({});
//       setItems(data.data.workDone || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   if (showForm) {
//     return (
//       <WorkDoneForm
//         onSubmitted={() => {
//           setShowForm(false);
//           load();
//         }}
//         onCancel={() => setShowForm(false)}
//       />
//     );
//   }

//   const columns = [
//     { header: 'Date', key: 'date' },
//     {
//       header: 'Image',
//       render: (r) =>
//         r.imageUrl ? (
//           <img
//             src={r.imageUrl}
//             alt="work"
//             onClick={() => setPreviewImg(r.imageUrl)}
//             style={{
//               width: 44,
//               height: 44,
//               objectFit: 'cover',
//               borderRadius: 6,
//               cursor: 'pointer',
//               border: `1px solid ${theme.colors.border}`,
//             }}
//             title="Click to view full image"
//           />
//         ) : (
//           <span style={{ color: theme.colors.muted }}>—</span>
//         ),
//     },
//     {
//       header: 'Description',
//       render: (r) => <div style={{ maxWidth: 400 }}>{r.description}</div>,
//     },
//     {
//       header: 'Status',
//       render: (r) => (
//         <Badge
//           variant={
//             r.status === 'APPROVED'
//               ? 'success'
//               : r.status === 'REJECTED'
//               ? 'danger'
//               : 'warning'
//           }
//         >
//           {r.status}
//         </Badge>
//       ),
//     },
//     {
//       header: 'Rejection Reason',
//       render: (r) =>
//         r.status === 'REJECTED' ? (
//           <div
//             style={{
//               maxWidth: 220,
//               fontSize: 12,
//               color: theme.colors.danger,
//               padding: '6px 10px',
//               background: '#FEF2F2',
//               borderRadius: 6,
//               borderLeft: `3px solid ${theme.colors.danger}`,
//             }}
//           >
//             {r.rejectionReason || 'No reason'}
//           </div>
//         ) : (
//           <span style={{ color: theme.colors.muted }}>—</span>
//         ),
//     },
//   ];

//   return (
//     <>
//       {/* ✅ Modern Capsule/Pill Style Submit Work Done Button */}
//       <button
//         onClick={() => setShowForm(true)}
//         style={{
//           padding: '10px 24px',
//           background: theme.colors.primary,
//           color: '#fff',
//           border: 'none',
//           borderRadius: 999, // ✅ Pure Capsule Shape
//           fontWeight: 700,
//           fontSize: 13,
//           cursor: 'pointer',
//           marginBottom: 20,
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
//           transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//           outline: 'none',
//         }}
//       >
//         + Submit Work Done
//       </button>

//       <Table columns={columns} data={items} loading={loading} />

//       <Modal open={!!previewImg} onClose={() => setPreviewImg(null)} title="Work Image">
//         {previewImg && (
//           <img src={previewImg} alt="work" style={{ maxWidth: '100%', borderRadius: 8 }} />
//         )}
//       </Modal>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Admin (BPM/CLF) — Action Plans List (Unchanged)
//    ───────────────────────────────────────────── */
// function AdminActionPlanList() {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     actionApi
//       .listActionPlans({})
//       .then(({ data }) => setPlans(data.data.actionPlans || []))
//       .finally(() => setLoading(false));
//   }, []);

//   const columns = [
//     { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
//     { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
//     { header: 'Date', key: 'date' },
//     { header: 'Plan', render: (r) => <div style={{ maxWidth: 500 }}>{r.plan}</div> },
//   ];

//   return <Table columns={columns} data={plans} loading={loading} />;
// }



import { useEffect, useState } from 'react';
import Table from '../../components/ui/Table.jsx';
import ActionPlanForm from './ActionPlanForm.jsx';
import { theme } from '../../config/theme.js';
import * as actionApi from './actionPlans.api.js';

export default function ActionPlansPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmployee = user.role === 'EMPLOYEE';

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(!isEmployee);
  const [todayPlan, setTodayPlan] = useState(null);
  const [history, setHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  /* ─── Load data ─── */
  const load = async () => {
    if (isEmployee) {
      // Employee: today plan + own history
      try {
        const todayRes = await actionApi
          .todayActionPlan()
          .catch(() => ({ data: { data: null } }));
        setTodayPlan(todayRes.data.data);

        const histRes = await actionApi.listActionPlans({});
        setHistory(histRes.data.data.actionPlans || []);
      } catch (err) {
        console.error('Action plan load error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      // Admin: all employees' plans
      try {
        const { data } = await actionApi.listActionPlans({});
        setPlans(data.data.actionPlans || []);
      } catch (err) {
        console.error('Load plans error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    load();
  }, [isEmployee]);

  /* ═══════════ EMPLOYEE VIEW ═══════════ */
  if (isEmployee) {
    if (showForm) {
      return (
        <ActionPlanForm
          onSubmitted={() => {
            setShowForm(false);
            load();
          }}
        />
      );
    }

    if (loading) {
      return (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            color: theme.colors.muted,
          }}
        >
          Loading...
        </div>
      );
    }

    return (
      <>
        {/* Today's Plan / Submit Button */}
        {todayPlan ? (
          <div
            style={{
              background: theme.colors.surface,
              padding: 20,
              borderRadius: theme.radius.md,
              boxShadow: theme.shadow.sm,
              marginBottom: 20,
              borderLeft: `4px solid ${theme.colors.success}`,
            }}
          >
            <h3 style={{ marginTop: 0, color: theme.colors.primary }}>
              ✅ Today's Action Plan Submitted
            </h3>
            <p style={{ whiteSpace: 'pre-line', fontSize: 14, marginBottom: 8 }}>
              {todayPlan.plan}
            </p>
            <p
              style={{
                fontSize: 12,
                color: theme.colors.muted,
                marginBottom: 0,
              }}
            >
              Submitted: {new Date(todayPlan.submittedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '12px 24px',
              background: theme.colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              marginBottom: 20,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
              transition: 'all 0.25s ease',
            }}
          >
            + Submit Today's Action Plan
          </button>
        )}

        {/* History Table */}
        <h3
          style={{
            marginTop: 8,
            marginBottom: 12,
            fontSize: 15,
            fontWeight: 700,
            color: theme.colors.text,
          }}
        >
          📋 My Action Plan History ({history.length})
        </h3>

        <Table
          columns={[
            { header: 'Date', key: 'date' },
            {
              header: 'Action Plan',
              render: (r) => (
                <div style={{ maxWidth: 600, whiteSpace: 'pre-line' }}>
                  {r.plan}
                </div>
              ),
            },
            {
              header: 'Submitted At',
              render: (r) =>
                r.submittedAt
                  ? new Date(r.submittedAt).toLocaleString()
                  : '—',
            },
          ]}
          data={history}
          loading={loading}
          emptyMessage="अभी तक कोई Action Plan submit नहीं किया।"
        />
      </>
    );
  }

  /* ═══════════ ADMIN (BPM/CLF) VIEW ═══════════ */
  const columns = [
    { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
    { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
    { header: 'Date', key: 'date' },
    {
      header: 'Plan',
      render: (r) => <div style={{ maxWidth: 500 }}>{r.plan}</div>,
    },
  ];

  return <Table columns={columns} data={plans} loading={loading} />;
}