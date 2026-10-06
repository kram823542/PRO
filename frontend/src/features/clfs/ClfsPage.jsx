// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Table from '../../components/ui/Table.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import ClfForm from './ClfForm.jsx';
// import * as api from './clfs.api.js';

// export default function ClfsPage() {
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [tempCred, setTempCred] = useState(null);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.listClfs();
//       setClfs(data.data || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const columns = [
//     { header: 'Name', key: 'name' },
//     { header: 'Code', key: 'code' },
//     { header: 'Block', render: (r) => r.blockId?.name || '—' },
//     { header: 'Village', key: 'village' },
//     { header: 'President', key: 'president' },
//     { header: 'Status', render: (r) => <Badge variant={r.status === 'ACTIVE' ? 'success' : 'danger'}>{r.status}</Badge> },
//   ];

//   return (
//     <>
//       <PageHeader
//         title="CLFs"
//         subtitle="Community Level Federations"
//         actions={<Button onClick={() => setOpenForm(true)}>+ Create CLF</Button>}
//       />
//       <Table columns={columns} data={clfs} loading={loading} />

//       <Modal open={openForm} onClose={() => setOpenForm(false)} title="Create CLF">
//         <ClfForm
//           onCreated={(login) => {
//             setTempCred(login);
//             setOpenForm(false);
//             load();
//           }}
//         />
//       </Modal>

//       <Modal open={!!tempCred} onClose={() => setTempCred(null)} title="CLF Login Credentials">
//         <p style={{ fontSize: 14 }}>ये credentials सिर्फ एक बार दिखेंगे:</p>
//         <div style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 14 }}>
//           <div><b>Username:</b> {tempCred?.username}</div>
//           <div><b>Password:</b> {tempCred?.tempPassword}</div>
//         </div>
//       </Modal>
//     </>
//   );
// }


// import { useEffect, useRef, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import ClfForm from './ClfForm.jsx';
// import ResetPasswordModal from '../../components/common/ResetPasswordModal.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './clfs.api.js';

// /* ─────────────────────────────────────────────
//    Row with 3-dot menu
//    ───────────────────────────────────────────── */
// function ClfRow({ clf, canReset, onReset }) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenu(false);
//       }
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   return (
//     <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
//       <td style={{ padding: '12px 14px', fontWeight: 500 }}>{clf.name}</td>
//       <td style={{ padding: '12px 14px' }}>{clf.code}</td>
//       <td style={{ padding: '12px 14px', color: theme.colors.muted }}>
//         {clf.blockId?.name || '—'}
//       </td>
//       <td style={{ padding: '12px 14px' }}>{clf.village || '—'}</td>
//       <td style={{ padding: '12px 14px' }}>{clf.president || '—'}</td>
//       <td style={{ padding: '12px 14px' }}>
//         <Badge variant={clf.status === 'ACTIVE' ? 'success' : 'danger'}>
//           {clf.status}
//         </Badge>
//       </td>
//       <td style={{ padding: '12px 14px' }}>
//         {canReset && (
//           <div style={{ position: 'relative' }} ref={menuRef}>
//             <button
//               onClick={() => setOpenMenu((v) => !v)}
//               style={{
//                 background: 'transparent',
//                 border: `1px solid ${theme.colors.border}`,
//                 borderRadius: theme.radius.sm,
//                 width: 28,
//                 height: 28,
//                 cursor: 'pointer',
//                 fontSize: 16,
//                 lineHeight: 1,
//                 color: theme.colors.text,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//               title="More options"
//             >
//               ⋮
//             </button>

//             {openMenu && (
//               <div
//                 style={{
//                   position: 'absolute',
//                   right: 0,
//                   top: '100%',
//                   marginTop: 4,
//                   background: theme.colors.surface,
//                   border: `1px solid ${theme.colors.border}`,
//                   borderRadius: theme.radius.sm,
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
//                   minWidth: 180,
//                   zIndex: 100,
//                   overflow: 'hidden',
//                 }}
//               >
//                 <button
//                   onClick={() => {
//                     setOpenMenu(false);
//                     onReset?.(clf);
//                   }}
//                   style={{
//                     display: 'block',
//                     width: '100%',
//                     textAlign: 'left',
//                     padding: '10px 14px',
//                     background: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: 13,
//                     color: theme.colors.danger,
//                     fontWeight: 600,
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.background)}
//                   onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
//                 >
//                   🔑 Reset Password
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </td>
//     </tr>
//   );
// }

// /* ─────────────────────────────────────────────
//    Main page
//    ───────────────────────────────────────────── */
// export default function ClfsPage() {
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openForm, setOpenForm] = useState(false);
//   const [tempCred, setTempCred] = useState(null);

//   // ✅ Reset password modal state
//   const [resetTarget, setResetTarget] = useState(null);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const canReset = ['BPM', 'SUPER_ADMIN'].includes(user.role);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.listClfs();
//       setClfs(data.data || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//  const handleResetConfirm = async (newPassword) => {
//   const { data } = await api.resetClfPassword(resetTarget._id, newPassword);
//   return data.data;
// };

//   return (
//     <>
//       <PageHeader
//         title="CLFs"
//         subtitle="Community Level Federations"
//         actions={<Button onClick={() => setOpenForm(true)}>+ Create CLF</Button>}
//       />

//       {loading ? (
//         <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
//           Loading...
//         </div>
//       ) : clfs.length === 0 ? (
//         <div
//           style={{
//             padding: 40,
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             textAlign: 'center',
//             color: theme.colors.muted,
//           }}
//         >
//           No CLFs found
//         </div>
//       ) : (
//         <div
//           style={{
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             boxShadow: theme.shadow.sm,
//             overflow: 'hidden',
//           }}
//         >
//           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
//             <thead>
//               <tr style={{ background: theme.colors.background }}>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Name</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Code</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Block</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Village</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>President</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clfs.map((clf) => (
//                 <ClfRow
//                   key={clf._id}
//                   clf={clf}
//                   canReset={canReset}
//                   onReset={(clf) => setResetTarget(clf)}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Create CLF modal */}
//       <Modal open={openForm} onClose={() => setOpenForm(false)} title="Create CLF">
//         <ClfForm
//           onCreated={(login) => {
//             setTempCred(login);
//             setOpenForm(false);
//             load();
//           }}
//         />
//       </Modal>

//       {/* New credential modal */}
//       <Modal open={!!tempCred} onClose={() => setTempCred(null)} title="CLF Login Credentials">
//         <p style={{ fontSize: 14 }}>ये credentials सिर्फ एक बार दिखेंगे:</p>
//         <div style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 14 }}>
//           <div>
//             <b>Username:</b> {tempCred?.username}
//           </div>
//           <div>
//             <b>Password:</b> {tempCred?.tempPassword}
//           </div>
//         </div>
//       </Modal>

//       {/* ✅ Reset password modal */}
//       <ResetPasswordModal
//         open={!!resetTarget}
//         onClose={() => setResetTarget(null)}
//         entityName={resetTarget?.name}
//         entityLabel="CLF"
//         onConfirm={handleResetConfirm}
//       />
//     </>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import ClfForm from './ClfForm.jsx';
import ResetPasswordModal from '../../components/common/ResetPasswordModal.jsx';
import { theme } from '../../config/theme.js';
import * as api from './clfs.api.js';

/* ─────────────────────────────────────────────
   Row with 3-dot menu
   ───────────────────────────────────────────── */
function ClfRow({ clf, canReset, onReset }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <tr style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
      <td style={{ padding: '12px 14px', fontWeight: 500 }}>{clf.name}</td>
      <td style={{ padding: '12px 14px' }}>{clf.code}</td>
      <td style={{ padding: '12px 14px', color: theme.colors.muted }}>
        {clf.blockId?.name || '—'}
      </td>
      <td style={{ padding: '12px 14px' }}>{clf.village || '—'}</td>
      <td style={{ padding: '12px 14px' }}>{clf.president || '—'}</td>
      <td style={{ padding: '12px 14px' }}>
        <Badge variant={clf.status === 'ACTIVE' ? 'success' : 'danger'}>
          {clf.status}
        </Badge>
      </td>
      <td style={{ padding: '12px 14px' }}>
        {canReset && (
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button
              onClick={() => setOpenMenu((v) => !v)}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.sm,
                width: 28,
                height: 28,
                cursor: 'pointer',
                fontSize: 16,
                lineHeight: 1,
                color: theme.colors.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="More options"
            >
              ⋮
            </button>

            {openMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: 4,
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.sm,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  minWidth: 180,
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    onReset?.(clf);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 14px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: theme.colors.danger,
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = theme.colors.background)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  🔑 Reset Password
                </button>
              </div>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}

/* ─────────────────────────────────────────────
   Main page
   ───────────────────────────────────────────── */
export default function ClfsPage() {
  const [clfs, setClfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [tempCred, setTempCred] = useState(null);

  const [resetTarget, setResetTarget] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const canReset = ['BPM', 'SUPER_ADMIN'].includes(user.role);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.listClfs();
      setClfs(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleResetConfirm = async (newPassword) => {
    const { data } = await api.resetClfPassword(resetTarget._id, newPassword);
    return data.data;
  };

  return (
    <>
      <PageHeader
        title="CLFs"
        subtitle="Community Level Federations"
        actions={<Button onClick={() => setOpenForm(true)}>+ Create CLF</Button>}
      />

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
          Loading...
        </div>
      ) : clfs.length === 0 ? (
        <div
          style={{
            padding: 40,
            background: theme.colors.surface,
            borderRadius: theme.radius.md,
            textAlign: 'center',
            color: theme.colors.muted,
          }}
        >
          No CLFs found
        </div>
      ) : (
        <div
          style={{
            background: theme.colors.surface,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.sm,
            // ✅ overflow hidden → x-auto (mobile par scroll)
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
              // ✅ mobile par minimum width — scroll karegi cut nahi hogi
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={{ background: theme.colors.background }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Name</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Code</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Block</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Village</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>President</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clfs.map((clf) => (
                <ClfRow
                  key={clf._id}
                  clf={clf}
                  canReset={canReset}
                  onReset={(clf) => setResetTarget(clf)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={openForm} onClose={() => setOpenForm(false)} title="Create CLF">
        <ClfForm
          onCreated={(login) => {
            setTempCred(login);
            setOpenForm(false);
            load();
          }}
        />
      </Modal>

      <Modal open={!!tempCred} onClose={() => setTempCred(null)} title="CLF Login Credentials">
        <p style={{ fontSize: 14 }}>ये credentials सिर्फ एक बार दिखेंगे:</p>
        <div style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 14 }}>
          <div>
            <b>Username:</b> {tempCred?.username}
          </div>
          <div>
            <b>Password:</b> {tempCred?.tempPassword}
          </div>
        </div>
      </Modal>

      <ResetPasswordModal
        open={!!resetTarget}
        onClose={() => setResetTarget(null)}
        entityName={resetTarget?.name}
        entityLabel="CLF"
        onConfirm={handleResetConfirm}
      />
    </>
  );
}