// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import NotificationList from './NotificationList.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Select from '../../components/ui/Select.jsx';
// import Button from '../../components/ui/Button.jsx';
// import { listClfs } from '../clfs/clfs.api.js';
// import * as api from './notifications.api.js';

// export default function NotificationsPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';
//   const isBPM = user.role === 'BPM';

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCompose, setOpenCompose] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       if (isEmployee) {
//         const { data } = await api.myMessages();
//         setItems(data.data || []);
//       } else if (isBPM) {
//         const { data } = await api.sentMessages();
//         setItems(data.data || []);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <>
//       <PageHeader
//         title="Notifications"
//         actions={isBPM && <Button onClick={() => setOpenCompose(true)}>+ New Message</Button>}
//       />
//       <NotificationList
//         items={items}
//         isEmployee={isEmployee}
//         loading={loading}
//         onMarkRead={async (id) => {
//           await api.markRead(id);
//           load();
//         }}
//         onIgnore={async (id) => {
//           await api.ignoreMessage(id);
//           load();
//         }}
//       />
//       <ComposeModal open={openCompose} onClose={() => setOpenCompose(false)} onSent={load} />
//     </>
//   );
// }

// function ComposeModal({ open, onClose, onSent }) {
//   const [form, setForm] = useState({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       listClfs().then(({ data }) =>
//         setClfs((data.data || []).map((c) => ({ value: c._id, label: `${c.name} (${c.code})` })))
//       );
//     }
//   }, [open]);

//   const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.sendMessage(form);
//       setForm({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//       onSent?.();
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Send Message to CLF">
//       <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//         <Select label="CLF" name="clfId" value={form.clfId} onChange={handle} options={clfs} required />
//         <Select
//           label="Type"
//           name="messageType"
//           value={form.messageType}
//           onChange={handle}
//           options={[
//             { value: 'NOTICE', label: 'Notice' },
//             { value: 'LETTER', label: 'Letter' },
//             { value: 'INFORMATION', label: 'Information' },
//           ]}
//         />
//         <Input label="Subject" name="subject" value={form.subject} onChange={handle} required />
//         <textarea
//           name="body"
//           value={form.body}
//           onChange={handle}
//           rows={6}
//           placeholder="Message body..."
//           style={{ padding: 12, borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit' }}
//           required
//         />
//         <Button type="submit" loading={loading}>
//           Send
//         </Button>
//       </form>
//     </Modal>
//   );
// }




// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import NotificationList from './NotificationList.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Select from '../../components/ui/Select.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import { listClfs } from '../clfs/clfs.api.js';
// import * as api from './notifications.api.js';

// export default function NotificationsPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';
//   const isBPM = user.role === 'BPM';

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCompose, setOpenCompose] = useState(false);

//   // Tracking modal state
//   const [trackingId, setTrackingId] = useState(null);
//   const [trackingData, setTrackingData] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       if (isEmployee) {
//         const { data } = await api.myMessages();
//         setItems(data.data || []);
//       } else if (isBPM) {
//         const { data } = await api.sentMessages();
//         setItems(data.data || []);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const openTracking = async (messageId) => {
//     setTrackingId(messageId);
//     setTrackingData(null);
//     setTrackingLoading(true);
//     try {
//       const { data } = await api.messageTracking(messageId);
//       setTrackingData(data.data);
//     } catch (err) {
//       console.error('Tracking error:', err);
//     } finally {
//       setTrackingLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageHeader
//         title="Notifications"
//         actions={isBPM && <Button onClick={() => setOpenCompose(true)}>+ New Message</Button>}
//       />
//       <NotificationList
//         items={items}
//         isEmployee={isEmployee}
//         loading={loading}
//         onMarkRead={async (id) => {
//           await api.markRead(id);
//           load();
//         }}
//         onIgnore={async (id) => {
//           await api.ignoreMessage(id);
//           load();
//         }}
//         onViewTracking={openTracking}
//       />

//       <ComposeModal open={openCompose} onClose={() => setOpenCompose(false)} onSent={load} />

//       <Modal
//         open={!!trackingId}
//         onClose={() => {
//           setTrackingId(null);
//           setTrackingData(null);
//         }}
//         title="Message Tracking"
//       >
//         {trackingLoading && <p style={{ fontSize: 13, color: theme.colors.muted }}>Loading...</p>}

//         {trackingData && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//             <div>
//               <h3 style={{ margin: '0 0 4px', fontSize: 15 }}>{trackingData.message?.subject}</h3>
//               <p style={{ margin: 0, fontSize: 12, color: theme.colors.muted }}>
//                 Sent: {new Date(trackingData.message?.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <div
//               style={{
//                 display: 'flex',
//                 gap: 16,
//                 padding: 12,
//                 background: theme.colors.background,
//                 borderRadius: theme.radius.sm,
//                 fontSize: 12,
//               }}
//             >
//               <div>
//                 <span style={{ color: theme.colors.muted }}>Total: </span>
//                 <b>{trackingData.stats?.total ?? 0}</b>
//               </div>
//               <div>
//                 <span style={{ color: theme.colors.muted }}>Read: </span>
//                 <b style={{ color: theme.colors.success }}>{trackingData.stats?.read ?? 0}</b>
//               </div>
//               <div>
//                 <span style={{ color: theme.colors.muted }}>Unread: </span>
//                 <b style={{ color: theme.colors.warning }}>{trackingData.stats?.unread ?? 0}</b>
//               </div>
//               <div>
//                 <span style={{ color: theme.colors.muted }}>Ignored: </span>
//                 <b style={{ color: theme.colors.danger }}>{trackingData.stats?.ignored ?? 0}</b>
//               </div>
//             </div>

//             <div style={{ maxHeight: 380, overflowY: 'auto' }}>
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
//                 <thead>
//                   <tr style={{ background: theme.colors.background }}>
//                     <th style={{ padding: '8px 10px', textAlign: 'left' }}>Code</th>
//                     <th style={{ padding: '8px 10px', textAlign: 'left' }}>Name</th>
//                     <th style={{ padding: '8px 10px', textAlign: 'left' }}>Status</th>
//                     <th style={{ padding: '8px 10px', textAlign: 'left' }}>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(trackingData.recipients || []).map((r) => (
//                     <tr
//                       key={r._id}
//                       style={{ borderBottom: `1px solid ${theme.colors.border}` }}
//                     >
//                       <td style={{ padding: '8px 10px' }}>{r.employeeId?.employeeCode || '—'}</td>
//                       <td style={{ padding: '8px 10px' }}>{r.employeeId?.name || '—'}</td>
//                       <td style={{ padding: '8px 10px' }}>
//                         <Badge
//                           variant={
//                             r.status === 'READ'
//                               ? 'success'
//                               : r.status === 'IGNORED'
//                               ? 'danger'
//                               : 'warning'
//                           }
//                         >
//                           {r.status}
//                         </Badge>
//                       </td>
//                       <td style={{ padding: '8px 10px', fontSize: 12, color: theme.colors.muted }}>
//                         {r.readAt
//                           ? new Date(r.readAt).toLocaleString()
//                           : r.ignoredAt
//                           ? new Date(r.ignoredAt).toLocaleString()
//                           : '—'}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }

// function ComposeModal({ open, onClose, onSent }) {
//   const [form, setForm] = useState({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       listClfs().then(({ data }) =>
//         setClfs((data.data || []).map((c) => ({ value: c._id, label: `${c.name} (${c.code})` })))
//       );
//     }
//   }, [open]);

//   const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.sendMessage(form);
//       setForm({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//       onSent?.();
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Send Message to CLF">
//       <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//         <Select label="CLF" name="clfId" value={form.clfId} onChange={handle} options={clfs} required />
//         <Select
//           label="Type"
//           name="messageType"
//           value={form.messageType}
//           onChange={handle}
//           options={[
//             { value: 'NOTICE', label: 'Notice' },
//             { value: 'LETTER', label: 'Letter' },
//             { value: 'INFORMATION', label: 'Information' },
//           ]}
//         />
//         <Input label="Subject" name="subject" value={form.subject} onChange={handle} required />
//         <textarea
//           name="body"
//           value={form.body}
//           onChange={handle}
//           rows={6}
//           placeholder="Message body..."
//           style={{
//             padding: 12,
//             borderRadius: 8,
//             border: '1px solid #E2E8F0',
//             fontSize: 14,
//             fontFamily: 'inherit',
//           }}
//           required
//         />
//         <Button type="submit" loading={loading}>
//           Send
//         </Button>
//       </form>
//     </Modal>
//   );
// }









// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import NotificationList from './NotificationList.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Select from '../../components/ui/Select.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import { listClfs } from '../clfs/clfs.api.js';
// import * as api from './notifications.api.js';

// export default function NotificationsPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';
//   const isBPM = user.role === 'BPM';

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCompose, setOpenCompose] = useState(false);

//   // Tracking modal state
//   const [trackingId, setTrackingId] = useState(null);
//   const [trackingData, setTrackingData] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       if (isEmployee) {
//         const { data } = await api.myMessages();
//         setItems(data.data || []);
//       } else if (isBPM) {
//         const { data } = await api.sentMessages();
//         setItems(data.data || []);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const openTracking = async (messageId) => {
//     setTrackingId(messageId);
//     setTrackingData(null);
//     setTrackingLoading(true);
//     try {
//       const { data } = await api.messageTracking(messageId);
//       setTrackingData(data.data);
//     } catch (err) {
//       console.error('Tracking error:', err);
//     } finally {
//       setTrackingLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
//       <PageHeader
//         title="Notifications"
//         actions={isBPM && <Button onClick={() => setOpenCompose(true)}>+ New Message</Button>}
//       />
      
//       <div style={{ marginTop: 20 }}>
//         <NotificationList
//           items={items}
//           isEmployee={isEmployee}
//           loading={loading}
//           onMarkRead={async (id) => {
//             await api.markRead(id);
//             load();
//           }}
//           onIgnore={async (id) => {
//             await api.ignoreMessage(id);
//             load();
//           }}
//           onViewTracking={openTracking}
//         />
//       </div>

//       <ComposeModal open={openCompose} onClose={() => setOpenCompose(false)} onSent={load} />

//       <Modal
//         open={!!trackingId}
//         onClose={() => {
//           setTrackingId(null);
//           setTrackingData(null);
//         }}
//         title="Message Tracking"
//       >
//         {trackingLoading && (
//           <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 14, color: theme.colors.muted }}>
//             Loading tracking data...
//           </div>
//         )}

//         {trackingData && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
//             {/* Subject & Date Banner */}
//             <div
//               style={{
//                 padding: '12px 16px',
//                 background: theme.colors.background,
//                 borderRadius: theme.radius.sm || 8,
//                 border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//               }}
//             >
//               <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600 }}>
//                 {trackingData.message?.subject}
//               </h3>
//               <p style={{ margin: 0, fontSize: 12, color: theme.colors.muted }}>
//                 Sent on: {new Date(trackingData.message?.createdAt).toLocaleString()}
//               </p>
//             </div>

//             {/* Metrics Dashboard Cards Grid */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, 1fr)',
//                 gap: 12,
//               }}
//             >
//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Total Recipients
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700 }}>{trackingData.stats?.total ?? 0}</div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Read
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.success }}>
//                   {trackingData.stats?.read ?? 0}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Unread
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.warning }}>
//                   {trackingData.stats?.unread ?? 0}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Ignored
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.danger }}>
//                   {trackingData.stats?.ignored ?? 0}
//                 </div>
//               </div>
//             </div>

//             {/* Recipient Tracking Table */}
//             <div
//               style={{
//                 maxHeight: 360,
//                 overflowY: 'auto',
//                 border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 borderRadius: theme.radius.sm || 8,
//               }}
//             >
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
//                 <thead>
//                   <tr
//                     style={{
//                       background: theme.colors.background,
//                       borderBottom: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                       position: 'sticky',
//                       top: 0,
//                       zIndex: 1,
//                     }}
//                   >
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Code</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Name</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(trackingData.recipients || []).map((r, idx) => (
//                     <tr
//                       key={r._id}
//                       style={{
//                         borderBottom: idx === trackingData.recipients.length - 1 ? 'none' : `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                       }}
//                     >
//                       <td style={{ padding: '10px 14px', fontWeight: 500 }}>
//                         {r.employeeId?.employeeCode || '—'}
//                       </td>
//                       <td style={{ padding: '10px 14px' }}>{r.employeeId?.name || '—'}</td>
//                       <td style={{ padding: '10px 14px' }}>
//                         <Badge
//                           variant={
//                             r.status === 'READ'
//                               ? 'success'
//                               : r.status === 'IGNORED'
//                               ? 'danger'
//                               : 'warning'
//                           }
//                         >
//                           {r.status}
//                         </Badge>
//                       </td>
//                       <td style={{ padding: '10px 14px', fontSize: 12, color: theme.colors.muted }}>
//                         {r.readAt
//                           ? new Date(r.readAt).toLocaleString()
//                           : r.ignoredAt
//                           ? new Date(r.ignoredAt).toLocaleString()
//                           : '—'}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// function ComposeModal({ open, onClose, onSent }) {
//   const [form, setForm] = useState({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       listClfs().then(({ data }) =>
//         setClfs((data.data || []).map((c) => ({ value: c._id, label: `${c.name} (${c.code})` })))
//       );
//     }
//   }, [open]);

//   const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.sendMessage(form);
//       setForm({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//       onSent?.();
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Send Message to CLF">
//       <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
//           <Select label="CLF" name="clfId" value={form.clfId} onChange={handle} options={clfs} required />
//           <Select
//             label="Type"
//             name="messageType"
//             value={form.messageType}
//             onChange={handle}
//             options={[
//               { value: 'NOTICE', label: 'Notice' },
//               { value: 'LETTER', label: 'Letter' },
//               { value: 'INFORMATION', label: 'Information' },
//             ]}
//           />
//         </div>

//         <Input label="Subject" name="subject" value={form.subject} onChange={handle} required />

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//           <label style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Message Body</label>
//           <textarea
//             name="body"
//             value={form.body}
//             onChange={handle}
//             rows={5}
//             placeholder="Write your message here..."
//             style={{
//               padding: '10px 12px',
//               borderRadius: theme.radius.sm || 6,
//               border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//               fontSize: 14,
//               fontFamily: 'inherit',
//               outline: 'none',
//               resize: 'vertical',
//             }}
//             required
//           />
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
//           <Button type="submit" loading={loading}>
//             Send Message
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// }





// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import NotificationList from './NotificationList.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Select from '../../components/ui/Select.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import { listClfs } from '../clfs/clfs.api.js';
// import * as api from './notifications.api.js';

// export default function NotificationsPage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';
//   const isBPM = user.role === 'BPM';
//   const isCLF = user.role === 'CLF'; // ✅ CLF admin flag

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openCompose, setOpenCompose] = useState(false);

//   // Tracking modal state
//   const [trackingId, setTrackingId] = useState(null);
//   const [trackingData, setTrackingData] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       // ✅ CLF admin ke liye bhi myMessages fetch
//       if (isEmployee || isCLF) {
//         const { data } = await api.myMessages();
//         setItems(data.data || []);
//       } else if (isBPM) {
//         const { data } = await api.sentMessages();
//         setItems(data.data || []);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const openTracking = async (messageId) => {
//     setTrackingId(messageId);
//     setTrackingData(null);
//     setTrackingLoading(true);
//     try {
//       const { data } = await api.messageTracking(messageId);
//       setTrackingData(data.data);
//     } catch (err) {
//       console.error('Tracking error:', err);
//     } finally {
//       setTrackingLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
//       <PageHeader
//         title="Notifications"
//         actions={isBPM && <Button onClick={() => setOpenCompose(true)}>+ New Message</Button>}
//       />

//       <div style={{ marginTop: 20 }}>
//         <NotificationList
//           items={items}
//           // ✅ CLF admin ko bhi Read/Ignore buttons
//           isEmployee={isEmployee || isCLF}
//           loading={loading}
//           onMarkRead={async (id) => {
//             await api.markRead(id);
//             load();
//           }}
//           onIgnore={async (id) => {
//             await api.ignoreMessage(id);
//             load();
//           }}
//           onViewTracking={openTracking}
//         />
//       </div>

//       <ComposeModal open={openCompose} onClose={() => setOpenCompose(false)} onSent={load} />

//       <Modal
//         open={!!trackingId}
//         onClose={() => {
//           setTrackingId(null);
//           setTrackingData(null);
//         }}
//         title="Message Tracking"
//       >
//         {trackingLoading && (
//           <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 14, color: theme.colors.muted }}>
//             Loading tracking data...
//           </div>
//         )}

//         {trackingData && (
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
//             {/* Subject & Date Banner */}
//             <div
//               style={{
//                 padding: '12px 16px',
//                 background: theme.colors.background,
//                 borderRadius: theme.radius.sm || 8,
//                 border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//               }}
//             >
//               <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600 }}>
//                 {trackingData.message?.subject}
//               </h3>
//               <p style={{ margin: 0, fontSize: 12, color: theme.colors.muted }}>
//                 Sent on: {new Date(trackingData.message?.createdAt).toLocaleString()}
//               </p>
//             </div>

//             {/* Metrics Dashboard Cards Grid */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(4, 1fr)',
//                 gap: 12,
//               }}
//             >
//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Total Recipients
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700 }}>{trackingData.stats?.total ?? 0}</div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Read
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.success }}>
//                   {trackingData.stats?.read ?? 0}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Unread
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.warning }}>
//                   {trackingData.stats?.unread ?? 0}
//                 </div>
//               </div>

//               <div
//                 style={{
//                   padding: '12px 14px',
//                   background: theme.colors.background,
//                   borderRadius: theme.radius.sm || 8,
//                   border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 }}
//               >
//                 <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
//                   Ignored
//                 </div>
//                 <div style={{ fontSize: 20, fontWeight: 700, color: theme.colors.danger }}>
//                   {trackingData.stats?.ignored ?? 0}
//                 </div>
//               </div>
//             </div>

//             {/* Recipient Tracking Table */}
//             <div
//               style={{
//                 maxHeight: 360,
//                 overflowY: 'auto',
//                 border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                 borderRadius: theme.radius.sm || 8,
//               }}
//             >
//               <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
//                 <thead>
//                   <tr
//                     style={{
//                       background: theme.colors.background,
//                       borderBottom: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                       position: 'sticky',
//                       top: 0,
//                       zIndex: 1,
//                     }}
//                   >
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Code</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Name</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
//                     <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {(trackingData.recipients || []).map((r, idx) => {
//                     const isClfAdmin = !r.employeeId && r.userId;
//                     return (
//                       <tr
//                         key={r._id}
//                         style={{
//                           borderBottom: idx === trackingData.recipients.length - 1 ? 'none' : `1px solid ${theme.colors.border || '#E2E8F0'}`,
//                           background: isClfAdmin ? '#EFF6FF' : 'transparent',
//                         }}
//                       >
//                         <td style={{ padding: '10px 14px', fontWeight: 500 }}>
//                           {r.employeeId?.employeeCode || (isClfAdmin ? 'CLF-ADMIN' : '—')}
//                         </td>
//                         <td style={{ padding: '10px 14px' }}>
//                           {r.employeeId?.name || (isClfAdmin ? 'CLF Admin' : '—')}
//                         </td>
//                         <td style={{ padding: '10px 14px' }}>
//                           <Badge
//                             variant={
//                               r.status === 'READ'
//                                 ? 'success'
//                                 : r.status === 'IGNORED'
//                                 ? 'danger'
//                                 : 'warning'
//                             }
//                           >
//                             {r.status}
//                           </Badge>
//                         </td>
//                         <td style={{ padding: '10px 14px', fontSize: 12, color: theme.colors.muted }}>
//                           {r.readAt
//                             ? new Date(r.readAt).toLocaleString()
//                             : r.ignoredAt
//                             ? new Date(r.ignoredAt).toLocaleString()
//                             : '—'}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// function ComposeModal({ open, onClose, onSent }) {
//   const [form, setForm] = useState({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       listClfs().then(({ data }) =>
//         setClfs((data.data || []).map((c) => ({ value: c._id, label: `${c.name} (${c.code})` })))
//       );
//     }
//   }, [open]);

//   const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.sendMessage(form);
//       setForm({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
//       onSent?.();
//       onClose();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Send Message to CLF">
//       <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
//           <Select label="CLF" name="clfId" value={form.clfId} onChange={handle} options={clfs} required />
//           <Select
//             label="Type"
//             name="messageType"
//             value={form.messageType}
//             onChange={handle}
//             options={[
//               { value: 'NOTICE', label: 'Notice' },
//               { value: 'LETTER', label: 'Letter' },
//               { value: 'INFORMATION', label: 'Information' },
//             ]}
//           />
//         </div>

//         <Input label="Subject" name="subject" value={form.subject} onChange={handle} required />

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//           <label style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Message Body</label>
//           <textarea
//             name="body"
//             value={form.body}
//             onChange={handle}
//             rows={5}
//             placeholder="Write your message here..."
//             style={{
//               padding: '10px 12px',
//               borderRadius: theme.radius.sm || 6,
//               border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
//               fontSize: 14,
//               fontFamily: 'inherit',
//               outline: 'none',
//               resize: 'vertical',
//             }}
//             required
//           />
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
//           <Button type="submit" loading={loading}>
//             Send Message
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import NotificationList from './NotificationList.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Input from '../../components/ui/Input.jsx';
import Select from '../../components/ui/Select.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { theme } from '../../config/theme.js';
import { listClfs } from '../clfs/clfs.api.js';
import * as api from './notifications.api.js';

export default function NotificationsPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmployee = user.role === 'EMPLOYEE';
  const isBPM = user.role === 'BPM';
  const isCLF = user.role === 'CLF';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCompose, setOpenCompose] = useState(false);

  // Tracking modal state
  const [trackingId, setTrackingId] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      if (isEmployee || isCLF) {
        const { data } = await api.myMessages();
        setItems(data.data || []);
      } else if (isBPM) {
        const { data } = await api.sentMessages();
        setItems(data.data || []);
      }
    } catch (err) {
      if (err.response?.status !== 429) {
        console.error('Notifications load failed:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Single fetch on mount
  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      if (cancelled) return;
      await load();
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const openTracking = async (messageId) => {
    setTrackingId(messageId);
    setTrackingData(null);
    setTrackingLoading(true);
    try {
      const { data } = await api.messageTracking(messageId);
      setTrackingData(data.data);
    } catch (err) {
      console.error('Tracking error:', err);
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
      <PageHeader
        title="Notifications"
        actions={isBPM && <Button onClick={() => setOpenCompose(true)}>+ New Message</Button>}
      />

      <div style={{ marginTop: 20 }}>
        <NotificationList
          items={items}
          isEmployee={isEmployee || isCLF}
          loading={loading}
          onMarkRead={async (id) => {
            await api.markRead(id);
            load();
          }}
          onIgnore={async (id) => {
            await api.ignoreMessage(id);
            load();
          }}
          onViewTracking={openTracking}
        />
      </div>

      <ComposeModal open={openCompose} onClose={() => setOpenCompose(false)} onSent={load} />

      <Modal
        open={!!trackingId}
        onClose={() => {
          setTrackingId(null);
          setTrackingData(null);
        }}
        title="Message Tracking"
      >
        {trackingLoading && (
          <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 14, color: theme.colors.muted }}>
            Loading tracking data...
          </div>
        )}

        {trackingData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
            {/* Subject & Date Banner */}
            <div
              style={{
                padding: '12px 16px',
                background: theme.colors.background,
                borderRadius: theme.radius.sm || 8,
                border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
              }}
            >
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600 }}>
                {trackingData.message?.subject}
              </h3>
              <p style={{ margin: 0, fontSize: 12, color: theme.colors.muted }}>
                Sent on: {new Date(trackingData.message?.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Metrics Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
              }}
            >
              {[
                { label: 'Total Recipients', value: trackingData.stats?.total ?? 0, color: theme.colors.text },
                { label: 'Read', value: trackingData.stats?.read ?? 0, color: theme.colors.success },
                { label: 'Unread', value: trackingData.stats?.unread ?? 0, color: theme.colors.warning },
                { label: 'Ignored', value: trackingData.stats?.ignored ?? 0, color: theme.colors.danger },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: '12px 14px',
                    background: theme.colors.background,
                    borderRadius: theme.radius.sm || 8,
                    border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
                  }}
                >
                  <div style={{ fontSize: 11, color: theme.colors.muted, marginBottom: 4, textTransform: 'uppercase', fontWeight: 600 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Recipient Tracking Table */}
            <div
              style={{
                maxHeight: 360,
                overflowY: 'auto',
                border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
                borderRadius: theme.radius.sm || 8,
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      background: theme.colors.background,
                      borderBottom: `1px solid ${theme.colors.border || '#E2E8F0'}`,
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Code</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Name</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {(trackingData.recipients || []).map((r, idx) => {
                    const isClfAdmin = !r.employeeId && r.userId;
                    return (
                      <tr
                        key={r._id}
                        style={{
                          borderBottom: idx === trackingData.recipients.length - 1 ? 'none' : `1px solid ${theme.colors.border || '#E2E8F0'}`,
                          background: isClfAdmin ? '#EFF6FF' : 'transparent',
                        }}
                      >
                        <td style={{ padding: '10px 14px', fontWeight: 500 }}>
                          {r.employeeId?.employeeCode || (isClfAdmin ? 'CLF-ADMIN' : '—')}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          {r.employeeId?.name || (isClfAdmin ? 'CLF Admin' : '—')}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <Badge
                            variant={
                              r.status === 'READ'
                                ? 'success'
                                : r.status === 'IGNORED'
                                ? 'danger'
                                : 'warning'
                            }
                          >
                            {r.status}
                          </Badge>
                        </td>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: theme.colors.muted }}>
                          {r.readAt
                            ? new Date(r.readAt).toLocaleString()
                            : r.ignoredAt
                            ? new Date(r.ignoredAt).toLocaleString()
                            : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function ComposeModal({ open, onClose, onSent }) {
  const [form, setForm] = useState({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
  const [clfs, setClfs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      listClfs().then(({ data }) =>
        setClfs((data.data || []).map((c) => ({ value: c._id, label: `${c.name} (${c.code})` })))
      );
    }
  }, [open]);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.sendMessage(form);
      setForm({ clfId: '', messageType: 'NOTICE', subject: '', body: '' });
      onSent?.();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Send Message to CLF">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Select label="CLF" name="clfId" value={form.clfId} onChange={handle} options={clfs} required />
          <Select
            label="Type"
            name="messageType"
            value={form.messageType}
            onChange={handle}
            options={[
              { value: 'NOTICE', label: 'Notice' },
              { value: 'LETTER', label: 'Letter' },
              { value: 'INFORMATION', label: 'Information' },
            ]}
          />
        </div>

        <Input label="Subject" name="subject" value={form.subject} onChange={handle} required />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: '#334155' }}>Message Body</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handle}
            rows={5}
            placeholder="Write your message here..."
            style={{
              padding: '10px 12px',
              borderRadius: theme.radius.sm || 6,
              border: `1px solid ${theme.colors.border || '#E2E8F0'}`,
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
            }}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <Button type="submit" loading={loading}>
            Send Message
          </Button>
        </div>
      </form>
    </Modal>
  );
}