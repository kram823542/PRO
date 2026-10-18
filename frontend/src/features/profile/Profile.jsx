// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './profile.api.js';
// import toast from 'react-hot-toast';

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [form, setForm] = useState({ name: '', email: '', mobile: '' });
//   const [pwd, setPwd] = useState({ oldPassword: '', newPassword: '', confirm: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPwd, setChangingPwd] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.getMyProfile();
//       setProfile(data.data);
//       setForm({
//         name: data.data.name || '',
//         email: data.data.email || '',
//         mobile: data.data.mobile || '',
//       });
//     } catch (err) {
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const { data } = await api.updateMyProfile(form);
//       setProfile(data.data);
//       // Update localStorage
//       const stored = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.setItem('user', JSON.stringify({ ...stored, ...data.data }));
//       toast.success('Profile updated ✅');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleChangePwd = async () => {
//     if (!pwd.oldPassword || !pwd.newPassword) {
//       return toast.error('All password fields required');
//     }
//     if (pwd.newPassword !== pwd.confirm) {
//       return toast.error('Passwords do not match');
//     }
//     if (pwd.newPassword.length < 8) {
//       return toast.error('New password must be 8+ characters');
//     }
//     setChangingPwd(true);
//     try {
//       await api.changeMyPassword({
//         oldPassword: pwd.oldPassword,
//         newPassword: pwd.newPassword,
//       });
//       toast.success('Password changed ✅');
//       setPwd({ oldPassword: '', newPassword: '', confirm: '' });
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to change password');
//     } finally {
//       setChangingPwd(false);
//     }
//   };

//   if (loading) return <Loader />;
//   if (!profile) return <p>Profile not found</p>;

//   const initial = (profile.name || profile.username || '?').charAt(0).toUpperCase();

//   return (
//     <>
//       <PageHeader title="My Profile" subtitle="View and update your account details" />

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
//         {/* ═════ PROFILE CARD ═════ */}
//         <div
//           style={{
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             border: `1px solid ${theme.colors.border}`,
//             boxShadow: theme.shadow.sm,
//             padding: 20,
//           }}
//         >
//           {/* Avatar + username + role */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
//             <div
//               style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: '50%',
//                 background: `${theme.colors.primary}15`,
//                 border: `2px solid ${theme.colors.primary}44`,
//                 color: theme.colors.primary,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: 26,
//                 fontWeight: 800,
//               }}
//             >
//               {initial}
//             </div>
//             <div style={{ minWidth: 0 }}>
//               <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>
//                 {profile.name}
//               </h3>
//               <p style={{ margin: '2px 0 6px', fontSize: 12, color: theme.colors.muted, fontFamily: 'monospace' }}>
//                 @{profile.username}
//               </p>
//               <Badge variant="info">{profile.role?.replace('_', ' ')}</Badge>
//             </div>
//           </div>

//           {/* Form */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             <Input
//               label="Full Name"
//               value={form.name}
//               onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//             />
//             <Input
//               label="Email"
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
//               placeholder="you@example.com"
//             />
//             <Input
//               label="Mobile"
//               value={form.mobile}
//               onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
//               placeholder="9876543210"
//             />
//             <Button onClick={handleSave} loading={saving}>
//               💾 Save Changes
//             </Button>
//           </div>
//         </div>

//         {/* ═════ PASSWORD CARD ═════ */}
//         <div
//           style={{
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             border: `1px solid ${theme.colors.border}`,
//             boxShadow: theme.shadow.sm,
//             padding: 20,
//           }}
//         >
//           <h3 style={{ margin: '0 0 4px', fontSize: 15, color: theme.colors.text }}>
//             🔒 Change Password
//           </h3>
//           <p style={{ margin: '0 0 16px', fontSize: 12, color: theme.colors.muted }}>
//             Password must be 8+ characters with letters and numbers.
//           </p>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//             <Input
//               label="Current Password"
//               type="password"
//               value={pwd.oldPassword}
//               onChange={(e) => setPwd((p) => ({ ...p, oldPassword: e.target.value }))}
//             />
//             <Input
//               label="New Password"
//               type="password"
//               value={pwd.newPassword}
//               onChange={(e) => setPwd((p) => ({ ...p, newPassword: e.target.value }))}
//             />
//             <Input
//               label="Confirm New Password"
//               type="password"
//               value={pwd.confirm}
//               onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
//             />
//             <Button variant="danger" onClick={handleChangePwd} loading={changingPwd}>
//               🔑 Change Password
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './profile.api.js';
// import { getEmployee } from '../employees/employees.api.js';
// import { getClf } from '../clfs/clfs.api.js';
// import toast from 'react-hot-toast';

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const role = user.role;

//   const [profile, setProfile] = useState(null);
//   const [extra, setExtra] = useState(null);
//   const [form, setForm] = useState({ email: '', mobile: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [emailEdit, setEmailEdit] = useState(false);

//   /* ═══════════ LOAD PROFILE ═══════════ */
//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.getMyProfile();
//       const me = data.data;
//       setProfile(me);

//       let empDetail = null;

//       if (me.role === 'EMPLOYEE' && me.employeeId) {
//         try {
//           const empRes = await getEmployee(me.employeeId);
//           empDetail = empRes.data.data;
//           setExtra(empDetail);
//         } catch (e) {
//           console.warn('Employee fetch failed:', e.message);
//         }
//       } else if (me.role === 'CLF' && me.clfId) {
//         try {
//           const clfRes = await getClf(me.clfId);
//           setExtra(clfRes.data.data);
//         } catch (e) {
//           console.warn('CLF fetch failed:', e.message);
//         }
//       }

//       // ✅ Form: mobile priority — profile → employee
//       setForm({
//         email: me.email || '',
//         mobile: me.mobile || empDetail?.mobile || '',
//       });

//       setEmailEdit(!me.email);
//     } catch (err) {
//       console.error('Profile load error:', err);
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   /* ═══════════ SAVE ═══════════ */
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const { data } = await api.updateMyProfile({
//         email: form.email,
//         mobile: form.mobile,
//       });
//       const updated = data.data;
//       setProfile(updated);

//       const stored = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.setItem('user', JSON.stringify({ ...stored, ...updated }));

//       // ✅ Employee detail refresh karo (mobile sync dikhne ke liye)
//       if (updated.role === 'EMPLOYEE' && updated.employeeId) {
//         try {
//           const empRes = await getEmployee(updated.employeeId);
//           setExtra(empRes.data.data);
//         } catch (e) {}
//       }

//       toast.success('Profile updated ✅');
//       setEmailEdit(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <Loader />;
//   if (!profile) return <p>Profile not found</p>;

//   const initial = (profile.name || profile.username || '?')
//     .charAt(0)
//     .toUpperCase();

//   return (
//     <>
//       <PageHeader
//         title="My Profile"
//         subtitle="View and update your account details"
//       />

//       {/* ══════════ PROFILE CARD ══════════ */}
//       <div style={cardStyle}>
//         {/* Avatar + username + role */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 14,
//             marginBottom: 18,
//           }}
//         >
//           <div
//             style={{
//               width: 64,
//               height: 64,
//               borderRadius: '50%',
//               background: `${theme.colors.primary}15`,
//               border: `2px solid ${theme.colors.primary}44`,
//               color: theme.colors.primary,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: 26,
//               fontWeight: 800,
//             }}
//           >
//             {initial}
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>
//               {profile.name}
//             </h3>
//             <p
//               style={{
//                 margin: '2px 0 6px',
//                 fontSize: 12,
//                 color: theme.colors.muted,
//                 fontFamily: 'monospace',
//               }}
//             >
//               @{profile.username}
//             </p>
//             <Badge variant="info">{profile.role?.replace('_', ' ')}</Badge>
//           </div>
//         </div>

//         {/* Editable form — sirf mobile + email */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: 12,
//             marginBottom: 14,
//           }}
//         >
//           <Input
//             label="Mobile"
//             value={form.mobile}
//             onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
//             placeholder="9876543210"
//           />

//           {!emailEdit && form.email ? (
//             <div>
//               <label
//                 style={{
//                   display: 'block',
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: theme.colors.text,
//                   marginBottom: 6,
//                 }}
//               >
//                 Email
//               </label>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 8,
//                   padding: '10px 12px',
//                   border: `1px solid ${theme.colors.border}`,
//                   borderRadius: theme.radius.md,
//                   background: theme.colors.background,
//                   fontSize: 14,
//                   minHeight: 41,
//                 }}
//               >
//                 <span
//                   style={{
//                     flex: 1,
//                     color: theme.colors.text,
//                     wordBreak: 'break-all',
//                   }}
//                 >
//                   {form.email}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setEmailEdit(true)}
//                   style={{
//                     background: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: 12,
//                     color: theme.colors.primary,
//                     fontWeight: 700,
//                     padding: 0,
//                   }}
//                 >
//                   ✏️ Edit
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <Input
//               label="Email"
//               type="email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, email: e.target.value }))
//               }
//               placeholder="you@example.com"
//             />
//           )}
//         </div>

//         <Button onClick={handleSave} loading={saving}>
//           💾 Save Changes
//         </Button>
//       </div>

//       {/* ══════════ EMPLOYEE EXTRA ══════════ */}
//       {role === 'EMPLOYEE' && extra && (
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//             gap: 20,
//             marginTop: 20,
//           }}
//         >
//           <div style={cardStyle}>
//             <SectionTitle>👤 Personal & Work Info</SectionTitle>
//             <InfoRow label="Employee Code" value={extra.employeeCode} mono />
//             <InfoRow label="Designation" value={extra.designation} />
//             <InfoRow
//               label="Joining Date"
//               value={
//                 extra.joiningDate
//                   ? new Date(extra.joiningDate).toLocaleDateString('en-IN')
//                   : '—'
//               }
//             />
//             <InfoRow label="Panchayat" value={extra.workLocation?.panchayat} />
//             <InfoRow label="Aadhaar Number" value={extra.aadhaarNumber} mono />
//             <InfoRow label="Mobile" value={extra.mobile} mono />
//             <InfoRow
//               label="Status"
//               value={
//                 <Badge
//                   variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                 >
//                   {extra.status}
//                 </Badge>
//               }
//             />
//           </div>

//           <div style={cardStyle}>
//             <SectionTitle>🏦 Bank Details</SectionTitle>
//             <InfoRow label="Bank Name" value={extra.bankDetails?.bankName} />
//             <InfoRow
//               label="Account Number"
//               value={extra.bankDetails?.accountNumber}
//               mono
//             />
//             <InfoRow label="Branch" value={extra.bankDetails?.branch} />
//             <InfoRow label="IFSC Code" value={extra.bankDetails?.ifsc} mono />
//           </div>
//         </div>
//       )}

//       {/* ══════════ CLF EXTRA ══════════ */}
//       {role === 'CLF' && extra && (
//         <div style={{ marginTop: 20 }}>
//           <div style={cardStyle}>
//             <SectionTitle>🏛️ CLF Information</SectionTitle>
//             <InfoRow label="CLF Name" value={extra.name} />
//             <InfoRow label="CLF Code" value={extra.code} mono />
//             <InfoRow label="Block" value={extra.blockId?.name || '—'} />
//             <InfoRow label="Village" value={extra.village} />
//             <InfoRow label="President" value={extra.president} />
//             <InfoRow label="Secretary" value={extra.secretary} />
//             <InfoRow label="Contact" value={extra.contact} mono />
//             <InfoRow
//               label="Status"
//               value={
//                 <Badge
//                   variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                 >
//                   {extra.status}
//                 </Badge>
//               }
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /* ═══════════════════════════════════════════
//    Styles & helpers
//    ═══════════════════════════════════════════ */
// const cardStyle = {
//   background: theme.colors.surface,
//   borderRadius: theme.radius.md,
//   border: `1px solid ${theme.colors.border}`,
//   boxShadow: theme.shadow.sm,
//   padding: 20,
// };

// function SectionTitle({ children }) {
//   return (
//     <h3
//       style={{
//         margin: '0 0 14px',
//         fontSize: 14,
//         fontWeight: 800,
//         color: theme.colors.primary,
//         textTransform: 'uppercase',
//         letterSpacing: 0.5,
//         paddingBottom: 8,
//         borderBottom: `1px solid ${theme.colors.border}`,
//       }}
//     >
//       {children}
//     </h3>
//   );
// }

// function InfoRow({ label, value, mono }) {
//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '140px 1fr',
//         gap: 10,
//         padding: '9px 0',
//         borderBottom: `1px solid ${theme.colors.border}`,
//         fontSize: 13,
//         alignItems: 'center',
//       }}
//     >
//       <span
//         style={{
//           color: theme.colors.muted,
//           fontWeight: 600,
//           fontSize: 12,
//         }}
//       >
//         {label}
//       </span>
//       <span
//         style={{
//           color: theme.colors.text,
//           fontFamily: mono ? 'monospace' : 'inherit',
//           fontWeight: 600,
//           wordBreak: 'break-all',
//         }}
//       >
//         {value || '—'}
//       </span>
//     </div>
//   );
// }









// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './profile.api.js';
// import { getEmployee } from '../employees/employees.api.js';
// import { getClf } from '../clfs/clfs.api.js';
// import toast from 'react-hot-toast';

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const role = user.role;
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [extra, setExtra] = useState(null);
//   const [form, setForm] = useState({ email: '', mobile: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [emailEdit, setEmailEdit] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* ═══════════ LOAD PROFILE ═══════════ */
//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.getMyProfile();
//       const me = data.data;
//       setProfile(me);

//       let empDetail = null;

//       if (me.role === 'EMPLOYEE' && me.employeeId) {
//         try {
//           const empRes = await getEmployee(me.employeeId);
//           empDetail = empRes.data.data;
//           setExtra(empDetail);
//         } catch (e) {
//           console.warn('Employee fetch failed:', e.message);
//         }
//       } else if (me.role === 'CLF' && me.clfId) {
//         try {
//           const clfRes = await getClf(me.clfId);
//           setExtra(clfRes.data.data);
//         } catch (e) {
//           console.warn('CLF fetch failed:', e.message);
//         }
//       }

//       setForm({
//         email: me.email || '',
//         mobile: me.mobile || empDetail?.mobile || '',
//       });

//       setEmailEdit(!me.email);
//     } catch (err) {
//       console.error('Profile load error:', err);
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   /* ═══════════ SAVE ═══════════ */
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const { data } = await api.updateMyProfile({
//         email: form.email,
//         mobile: form.mobile,
//       });
//       const updated = data.data;
//       setProfile(updated);

//       const stored = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.setItem('user', JSON.stringify({ ...stored, ...updated }));

//       if (updated.role === 'EMPLOYEE' && updated.employeeId) {
//         try {
//           const empRes = await getEmployee(updated.employeeId);
//           setExtra(empRes.data.data);
//         } catch (e) {}
//       }

//       toast.success('Profile updated ✅');
//       setEmailEdit(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update');
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ═══════════ LOGOUT ═══════════ */
//   const handleLogout = async () => {
//     setLoggingOut(true);
//     try {
//       await api.logout?.(); // backend logout (optional)
//     } catch (e) {
//       // ignore
//     }
//     // Clear storage
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     toast.success('Logged out');
//     navigate('/login');
//   };

//   if (loading) return <Loader />;
//   if (!profile) return <p>Profile not found</p>;

//   const initial = (profile.name || profile.username || '?')
//     .charAt(0)
//     .toUpperCase();

//   return (
//     <>
//       <PageHeader
//         title="My Profile"
//         subtitle="View and update your account details"
//       />

//       {/* ══════════ PROFILE CARD ══════════ */}
//       <div style={cardStyle}>
//         {/* Avatar + username + role */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 14,
//             marginBottom: 18,
//           }}
//         >
//           <div
//             style={{
//               width: 64,
//               height: 64,
//               borderRadius: '50%',
//               background: `${theme.colors.primary}15`,
//               border: `2px solid ${theme.colors.primary}44`,
//               color: theme.colors.primary,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: 26,
//               fontWeight: 800,
//             }}
//           >
//             {initial}
//           </div>
//           <div style={{ minWidth: 0 }}>
//             <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>
//               {profile.name}
//             </h3>
//             <p
//               style={{
//                 margin: '2px 0 6px',
//                 fontSize: 12,
//                 color: theme.colors.muted,
//                 fontFamily: 'monospace',
//               }}
//             >
//               @{profile.username}
//             </p>
//             <Badge variant="info">{profile.role?.replace('_', ' ')}</Badge>
//           </div>
//         </div>

//         {/* Editable form — sirf mobile + email */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//             gap: 12,
//             marginBottom: 14,
//           }}
//         >
//           <Input
//             label="Mobile"
//             value={form.mobile}
//             onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
//             placeholder="9876543210"
//           />

//           {!emailEdit && form.email ? (
//             <div>
//               <label
//                 style={{
//                   display: 'block',
//                   fontSize: 13,
//                   fontWeight: 600,
//                   color: theme.colors.text,
//                   marginBottom: 6,
//                 }}
//               >
//                 Email
//               </label>
//               <div
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 8,
//                   padding: '10px 12px',
//                   border: `1px solid ${theme.colors.border}`,
//                   borderRadius: theme.radius.md,
//                   background: theme.colors.background,
//                   fontSize: 14,
//                   minHeight: 41,
//                 }}
//               >
//                 <span
//                   style={{
//                     flex: 1,
//                     color: theme.colors.text,
//                     wordBreak: 'break-all',
//                   }}
//                 >
//                   {form.email}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setEmailEdit(true)}
//                   style={{
//                     background: 'transparent',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: 12,
//                     color: theme.colors.primary,
//                     fontWeight: 700,
//                     padding: 0,
//                   }}
//                 >
//                   ✏️ Edit
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <Input
//               label="Email"
//               type="email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm((f) => ({ ...f, email: e.target.value }))
//               }
//               placeholder="you@example.com"
//             />
//           )}
//         </div>

//         <Button onClick={handleSave} loading={saving}>
//           💾 Save Changes
//         </Button>
//       </div>

//       {/* ══════════ EMPLOYEE EXTRA ══════════ */}
//       {role === 'EMPLOYEE' && extra && (
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//             gap: 20,
//             marginTop: 20,
//           }}
//         >
//           <div style={cardStyle}>
//             <SectionTitle>👤 Personal & Work Info</SectionTitle>
//             <InfoRow label="Employee Code" value={extra.employeeCode} mono />
//             <InfoRow label="Designation" value={extra.designation} />
//             <InfoRow
//               label="Joining Date"
//               value={
//                 extra.joiningDate
//                   ? new Date(extra.joiningDate).toLocaleDateString('en-IN')
//                   : '—'
//               }
//             />
//             <InfoRow label="Panchayat" value={extra.workLocation?.panchayat} />
//             <InfoRow label="Aadhaar Number" value={extra.aadhaarNumber} mono />
//             <InfoRow label="Mobile" value={extra.mobile} mono />
//             <InfoRow
//               label="Status"
//               value={
//                 <Badge
//                   variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                 >
//                   {extra.status}
//                 </Badge>
//               }
//             />
//           </div>

//           <div style={cardStyle}>
//             <SectionTitle>🏦 Bank Details</SectionTitle>
//             <InfoRow label="Bank Name" value={extra.bankDetails?.bankName} />
//             <InfoRow
//               label="Account Number"
//               value={extra.bankDetails?.accountNumber}
//               mono
//             />
//             <InfoRow label="Branch" value={extra.bankDetails?.branch} />
//             <InfoRow label="IFSC Code" value={extra.bankDetails?.ifsc} mono />
//           </div>
//         </div>
//       )}

//       {/* ══════════ CLF EXTRA ══════════ */}
//       {role === 'CLF' && extra && (
//         <div style={{ marginTop: 20 }}>
//           <div style={cardStyle}>
//             <SectionTitle>🏛️ CLF Information</SectionTitle>
//             <InfoRow label="CLF Name" value={extra.name} />
//             <InfoRow label="CLF Code" value={extra.code} mono />
//             <InfoRow label="Block" value={extra.blockId?.name || '—'} />
//             <InfoRow label="Village" value={extra.village} />
//             <InfoRow label="President" value={extra.president} />
//             <InfoRow label="Secretary" value={extra.secretary} />
//             <InfoRow label="Contact" value={extra.contact} mono />
//             <InfoRow
//               label="Status"
//               value={
//                 <Badge
//                   variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                 >
//                   {extra.status}
//                 </Badge>
//               }
//             />
//           </div>
//         </div>
//       )}

//       {/* ══════════ LOGOUT ══════════ */}
//       <div
//         style={{
//           marginTop: 24,
//           background: theme.colors.surface,
//           borderRadius: theme.radius.md,
//           border: `1px solid ${theme.colors.border}`,
//           boxShadow: theme.shadow.sm,
//           padding: 20,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexWrap: 'wrap',
//           gap: 12,
//         }}
//       >
//         <div>
//           <h3
//             style={{
//               margin: 0,
//               fontSize: 14,
//               fontWeight: 800,
//               color: theme.colors.text,
//             }}
//           >
//             🚪 Logout
//           </h3>
//           <p
//             style={{
//               margin: '4px 0 0',
//               fontSize: 12,
//               color: theme.colors.muted,
//             }}
//           >
//             Sign out of your account on this device
//           </p>
//         </div>
//         <Button
//           variant="danger"
//           onClick={handleLogout}
//           loading={loggingOut}
//         >
//           Logout
//         </Button>
//       </div>
//     </>
//   );
// }

// /* ═══════════════════════════════════════════
//    Styles & helpers
//    ═══════════════════════════════════════════ */
// const cardStyle = {
//   background: theme.colors.surface,
//   borderRadius: theme.radius.md,
//   border: `1px solid ${theme.colors.border}`,
//   boxShadow: theme.shadow.sm,
//   padding: 20,
// };

// function SectionTitle({ children }) {
//   return (
//     <h3
//       style={{
//         margin: '0 0 14px',
//         fontSize: 14,
//         fontWeight: 800,
//         color: theme.colors.primary,
//         textTransform: 'uppercase',
//         letterSpacing: 0.5,
//         paddingBottom: 8,
//         borderBottom: `1px solid ${theme.colors.border}`,
//       }}
//     >
//       {children}
//     </h3>
//   );
// }

// function InfoRow({ label, value, mono }) {
//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '140px 1fr',
//         gap: 10,
//         padding: '9px 0',
//         borderBottom: `1px solid ${theme.colors.border}`,
//         fontSize: 13,
//         alignItems: 'center',
//       }}
//     >
//       <span
//         style={{
//           color: theme.colors.muted,
//           fontWeight: 600,
//           fontSize: 12,
//         }}
//       >
//         {label}
//       </span>
//       <span
//         style={{
//           color: theme.colors.text,
//           fontFamily: mono ? 'monospace' : 'inherit',
//           fontWeight: 600,
//           wordBreak: 'break-all',
//         }}
//       >
//         {value || '—'}
//       </span>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Input from '../../components/ui/Input.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './profile.api.js';
// import { getEmployee } from '../employees/employees.api.js';
// import { getClf } from '../clfs/clfs.api.js';
// import ReportsPage from '../reports/ReportsPage.jsx';
// import toast from 'react-hot-toast';

// export default function Profile() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const role = user.role;
//   const navigate = useNavigate();

//   // ✅ Toggle state
//   const [tab, setTab] = useState('profile');

//   const [profile, setProfile] = useState(null);
//   const [extra, setExtra] = useState(null);
//   const [form, setForm] = useState({ email: '', mobile: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [emailEdit, setEmailEdit] = useState(false);
//   const [loggingOut, setLoggingOut] = useState(false);

//   /* ═══════════ LOAD PROFILE ═══════════ */
//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.getMyProfile();
//       const me = data.data;
//       setProfile(me);

//       let empDetail = null;

//       if (me.role === 'EMPLOYEE' && me.employeeId) {
//         try {
//           const empRes = await getEmployee(me.employeeId);
//           empDetail = empRes.data.data;
//           setExtra(empDetail);
//         } catch (e) {
//           console.warn('Employee fetch failed:', e.message);
//         }
//       } else if (me.role === 'CLF' && me.clfId) {
//         try {
//           const clfRes = await getClf(me.clfId);
//           setExtra(clfRes.data.data);
//         } catch (e) {
//           console.warn('CLF fetch failed:', e.message);
//         }
//       }

//       setForm({
//         email: me.email || '',
//         mobile: me.mobile || empDetail?.mobile || '',
//       });

//       setEmailEdit(!me.email);
//     } catch (err) {
//       console.error('Profile load error:', err);
//       toast.error('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   /* ═══════════ SAVE ═══════════ */
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const { data } = await api.updateMyProfile({
//         email: form.email,
//         mobile: form.mobile,
//       });
//       const updated = data.data;
//       setProfile(updated);

//       const stored = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.setItem('user', JSON.stringify({ ...stored, ...updated }));

//       if (updated.role === 'EMPLOYEE' && updated.employeeId) {
//         try {
//           const empRes = await getEmployee(updated.employeeId);
//           setExtra(empRes.data.data);
//         } catch (e) {}
//       }

//       toast.success('Profile updated ✅');
//       setEmailEdit(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to update');
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ═══════════ LOGOUT ═══════════ */
//   const handleLogout = async () => {
//     setLoggingOut(true);
//     try {
//       await api.logout?.();
//     } catch (e) {
//       // ignore
//     }
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     toast.success('Logged out');
//     navigate('/login');
//   };

//   if (loading) return <Loader />;
//   if (!profile) return <p>Profile not found</p>;

//   const initial = (profile.name || profile.username || '?')
//     .charAt(0)
//     .toUpperCase();

//   const tabs = [
//     { key: 'profile', label: '👤 Profile' },
//     { key: 'reports', label: '📄 Reports' },
//   ];

//   return (
//     <>
//       <PageHeader
//         title="My Account"
//         subtitle="View profile and reports"
//       />

//       {/* ══════════ TOGGLE ══════════ */}
//       <div
//         style={{
//           display: 'inline-flex',
//           gap: 4,
//           padding: 4,
//           background: theme.colors.background,
//           border: `1px solid ${theme.colors.border}`,
//           borderRadius: theme.radius.md,
//           marginBottom: 16,
//         }}
//       >
//         {tabs.map((t) => {
//           const isActive = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: theme.radius.sm,
//                 border: 'none',
//                 background: isActive ? theme.colors.primary : 'transparent',
//                 color: isActive ? '#FFFFFF' : theme.colors.muted,
//                 fontWeight: 700,
//                 fontSize: 11,
//                 letterSpacing: 1,
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//                 transition: 'all 0.25s ease',
//               }}
//             >
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* ══════════ PROFILE TAB ══════════ */}
//       {tab === 'profile' && (
//         <>
//           {/* PROFILE CARD */}
//           <div style={cardStyle}>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 14,
//                 marginBottom: 18,
//               }}
//             >
//               <div
//                 style={{
//                   width: 64,
//                   height: 64,
//                   borderRadius: '50%',
//                   background: `${theme.colors.primary}15`,
//                   border: `2px solid ${theme.colors.primary}44`,
//                   color: theme.colors.primary,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: 26,
//                   fontWeight: 800,
//                 }}
//               >
//                 {initial}
//               </div>
//               <div style={{ minWidth: 0 }}>
//                 <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>
//                   {profile.name}
//                 </h3>
//                 <p
//                   style={{
//                     margin: '2px 0 6px',
//                     fontSize: 12,
//                     color: theme.colors.muted,
//                     fontFamily: 'monospace',
//                   }}
//                 >
//                   @{profile.username}
//                 </p>
//                 <Badge variant="info">{profile.role?.replace('_', ' ')}</Badge>
//               </div>
//             </div>

//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//                 gap: 12,
//                 marginBottom: 14,
//               }}
//             >
//               <Input
//                 label="Mobile"
//                 value={form.mobile}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, mobile: e.target.value }))
//                 }
//                 placeholder="9876543210"
//               />

//               {!emailEdit && form.email ? (
//                 <div>
//                   <label
//                     style={{
//                       display: 'block',
//                       fontSize: 13,
//                       fontWeight: 600,
//                       color: theme.colors.text,
//                       marginBottom: 6,
//                     }}
//                   >
//                     Email
//                   </label>
//                   <div
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 8,
//                       padding: '10px 12px',
//                       border: `1px solid ${theme.colors.border}`,
//                       borderRadius: theme.radius.md,
//                       background: theme.colors.background,
//                       fontSize: 14,
//                       minHeight: 41,
//                     }}
//                   >
//                     <span
//                       style={{
//                         flex: 1,
//                         color: theme.colors.text,
//                         wordBreak: 'break-all',
//                       }}
//                     >
//                       {form.email}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => setEmailEdit(true)}
//                       style={{
//                         background: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         fontSize: 12,
//                         color: theme.colors.primary,
//                         fontWeight: 700,
//                         padding: 0,
//                       }}
//                     >
//                       ✏️ Edit
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <Input
//                   label="Email"
//                   type="email"
//                   value={form.email}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, email: e.target.value }))
//                   }
//                   placeholder="you@example.com"
//                 />
//               )}
//             </div>

//             <Button onClick={handleSave} loading={saving}>
//               💾 Save Changes
//             </Button>
//           </div>

//           {/* EMPLOYEE EXTRA */}
//           {role === 'EMPLOYEE' && extra && (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
//                 gap: 20,
//                 marginTop: 20,
//               }}
//             >
//               <div style={cardStyle}>
//                 <SectionTitle>👤 Personal & Work Info</SectionTitle>
//                 <InfoRow label="Employee Code" value={extra.employeeCode} mono />
//                 <InfoRow label="Designation" value={extra.designation} />
//                 <InfoRow
//                   label="Joining Date"
//                   value={
//                     extra.joiningDate
//                       ? new Date(extra.joiningDate).toLocaleDateString('en-IN')
//                       : '—'
//                   }
//                 />
//                 <InfoRow
//                   label="Panchayat"
//                   value={extra.workLocation?.panchayat}
//                 />
//                 <InfoRow
//                   label="Aadhaar Number"
//                   value={extra.aadhaarNumber}
//                   mono
//                 />
//                 <InfoRow label="Mobile" value={extra.mobile} mono />
//                 <InfoRow
//                   label="Status"
//                   value={
//                     <Badge
//                       variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                     >
//                       {extra.status}
//                     </Badge>
//                   }
//                 />
//               </div>

//               <div style={cardStyle}>
//                 <SectionTitle>🏦 Bank Details</SectionTitle>
//                 <InfoRow
//                   label="Bank Name"
//                   value={extra.bankDetails?.bankName}
//                 />
//                 <InfoRow
//                   label="Account Number"
//                   value={extra.bankDetails?.accountNumber}
//                   mono
//                 />
//                 <InfoRow label="Branch" value={extra.bankDetails?.branch} />
//                 <InfoRow
//                   label="IFSC Code"
//                   value={extra.bankDetails?.ifsc}
//                   mono
//                 />
//               </div>
//             </div>
//           )}

//           {/* CLF EXTRA */}
//           {role === 'CLF' && extra && (
//             <div style={{ marginTop: 20 }}>
//               <div style={cardStyle}>
//                 <SectionTitle>🏛️ CLF Information</SectionTitle>
//                 <InfoRow label="CLF Name" value={extra.name} />
//                 <InfoRow label="CLF Code" value={extra.code} mono />
//                 <InfoRow label="Block" value={extra.blockId?.name || '—'} />
//                 <InfoRow label="Village" value={extra.village} />
//                 <InfoRow label="President" value={extra.president} />
//                 <InfoRow label="Secretary" value={extra.secretary} />
//                 <InfoRow label="Contact" value={extra.contact} mono />
//                 <InfoRow
//                   label="Status"
//                   value={
//                     <Badge
//                       variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}
//                     >
//                       {extra.status}
//                     </Badge>
//                   }
//                 />
//               </div>
//             </div>
//           )}

//           {/* LOGOUT */}
//           <div
//             style={{
//               marginTop: 24,
//               background: theme.colors.surface,
//               borderRadius: theme.radius.md,
//               border: `1px solid ${theme.colors.border}`,
//               boxShadow: theme.shadow.sm,
//               padding: 20,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexWrap: 'wrap',
//               gap: 12,
//             }}
//           >
//             <div>
//               <h3
//                 style={{
//                   margin: 0,
//                   fontSize: 14,
//                   fontWeight: 800,
//                   color: theme.colors.text,
//                 }}
//               >
//                 🚪 Logout
//               </h3>
//               <p
//                 style={{
//                   margin: '4px 0 0',
//                   fontSize: 12,
//                   color: theme.colors.muted,
//                 }}
//               >
//                 Sign out of your account on this device
//               </p>
//             </div>
//             <Button
//               variant="danger"
//               onClick={handleLogout}
//               loading={loggingOut}
//             >
//               Logout
//             </Button>
//           </div>
//         </>
//       )}

//       {/* ══════════ REPORTS TAB ══════════ */}
//       {tab === 'reports' && (
//         <div style={{ marginTop: 8 }}>
//           <ReportsPage />
//         </div>
//       )}
//     </>
//   );
// }

// /* ═══════════════════════════════════════════
//    Styles & helpers
//    ═══════════════════════════════════════════ */
// const cardStyle = {
//   background: theme.colors.surface,
//   borderRadius: theme.radius.md,
//   border: `1px solid ${theme.colors.border}`,
//   boxShadow: theme.shadow.sm,
//   padding: 20,
// };

// function SectionTitle({ children }) {
//   return (
//     <h3
//       style={{
//         margin: '0 0 14px',
//         fontSize: 14,
//         fontWeight: 800,
//         color: theme.colors.primary,
//         textTransform: 'uppercase',
//         letterSpacing: 0.5,
//         paddingBottom: 8,
//         borderBottom: `1px solid ${theme.colors.border}`,
//       }}
//     >
//       {children}
//     </h3>
//   );
// }

// function InfoRow({ label, value, mono }) {
//   return (
//     <div
//       style={{
//         display: 'grid',
//         gridTemplateColumns: '140px 1fr',
//         gap: 10,
//         padding: '9px 0',
//         borderBottom: `1px solid ${theme.colors.border}`,
//         fontSize: 13,
//         alignItems: 'center',
//       }}
//     >
//       <span
//         style={{
//           color: theme.colors.muted,
//           fontWeight: 600,
//           fontSize: 12,
//         }}
//       >
//         {label}
//       </span>
//       <span
//         style={{
//           color: theme.colors.text,
//           fontFamily: mono ? 'monospace' : 'inherit',
//           fontWeight: 600,
//           wordBreak: 'break-all',
//         }}
//       >
//         {value || '—'}
//       </span>
//     </div>
//   );
// }






import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Loader from '../../components/ui/Loader.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { theme } from '../../config/theme.js';
import * as api from './profile.api.js';
import { getEmployee } from '../employees/employees.api.js';
import { getClf } from '../clfs/clfs.api.js';
import ReportsPage from '../reports/ReportsPage.jsx';
import toast from 'react-hot-toast';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [extra, setExtra] = useState(null);
  const [form, setForm] = useState({ email: '', mobile: '' });
  
  const [selectedFile, setSelectedFile] = useState(null); 
  const [previewImage, setPreviewImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.getMyProfile();
      const me = data.data;
      setProfile(me);

      let empDetail = null;
      if (me.role === 'EMPLOYEE' && me.employeeId) {
        try {
          const empRes = await getEmployee(me.employeeId);
          empDetail = empRes.data.data;
          setExtra(empDetail);
        } catch (e) {}
      } else if (me.role === 'CLF' && me.clfId) {
        try {
          const clfRes = await getClf(me.clfId);
          setExtra(clfRes.data.data);
        } catch (e) {}
      }

      setForm({
        email: me.email || '',
        mobile: me.mobile || empDetail?.mobile || '',
      });
      setEmailEdit(!me.email);
    } catch (err) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Image must be less than 5MB');
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('email', form.email);
      formData.append('mobile', form.mobile);
      
      if (selectedFile) {
        formData.append('profilePhoto', selectedFile); // ✅ File bhejenge
      }

      const { data } = await api.updateMyProfile(formData);
      const updated = data.data;
      setProfile(updated);

      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, ...updated }));

      toast.success('Profile updated ✅');
      setEmailEdit(false);
      setSelectedFile(null);
      setPreviewImage(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await api.logout?.(); } catch (e) {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    toast.success('Logged out');
    navigate('/login');
  };

  if (loading) return <Loader />;
  if (!profile) return <p>Profile not found</p>;

  const initial = (profile.name || profile.username || '?').charAt(0).toUpperCase();

  const tabs = [
    { key: 'profile', label: '👤 Profile' },
    { key: 'reports', label: '📄 Reports' },
  ];

  return (
    <>
      <PageHeader title="My Account" subtitle="View profile and reports" />

      <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: theme.colors.background, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.md, marginBottom: 16 }}>
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '8px 16px', borderRadius: theme.radius.sm, border: 'none', background: isActive ? theme.colors.primary : 'transparent', color: isActive ? '#FFFFFF' : theme.colors.muted, fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease' }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'profile' && (
        <>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              
              <div className="relative group" style={{ flexShrink: 0 }}>
                <div 
                  style={{ 
                    width: 72, height: 72, borderRadius: '50%', 
                    background: `${theme.colors.primary}15`, 
                    border: `2px solid ${theme.colors.primary}44`, 
                    color: theme.colors.primary, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: 28, fontWeight: 800, overflow: 'hidden', position: 'relative'
                  }}
                >
                  {previewImage || profile.profilePhoto ? (
                    <img src={previewImage || profile.profilePhoto} alt="DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    initial
                  )}

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: 0, cursor: 'pointer', transition: 'opacity 0.2s', color: '#fff'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
              </div>

              <div style={{ minWidth: 0 }}>
                <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>{profile.name}</h3>
                <p style={{ margin: '2px 0 6px', fontSize: 12, color: theme.colors.muted, fontFamily: 'monospace' }}>@{profile.username}</p>
                <Badge variant="info">{profile.role?.replace('_', ' ')}</Badge>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 14 }}>
              <Input label="Mobile" value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} placeholder="9876543210" />

              {!emailEdit && form.email ? (
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: theme.colors.text, marginBottom: 6 }}>Email</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.md, background: theme.colors.background, fontSize: 14, minHeight: 41 }}>
                    <span style={{ flex: 1, color: theme.colors.text, wordBreak: 'break-all' }}>{form.email}</span>
                    <button type="button" onClick={() => setEmailEdit(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: theme.colors.primary, fontWeight: 700, padding: 0 }}>✏️ Edit</button>
                  </div>
                </div>
              ) : (
                <Input label="Email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
              )}
            </div>

            <Button onClick={handleSave} loading={saving}>💾 Save Changes</Button>
          </div>

          {role === 'EMPLOYEE' && extra && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 20 }}>
              <div style={cardStyle}>
                <SectionTitle>👤 Personal & Work Info</SectionTitle>
                <InfoRow label="Employee Code" value={extra.employeeCode} mono />
                <InfoRow label="Designation" value={extra.designation} />
                <InfoRow label="Joining Date" value={extra.joiningDate ? new Date(extra.joiningDate).toLocaleDateString('en-IN') : '—'} />
                <InfoRow label="Panchayat" value={extra.workLocation?.panchayat} />
                <InfoRow label="Aadhaar Number" value={extra.aadhaarNumber} mono />
                <InfoRow label="Mobile" value={extra.mobile} mono />
                <InfoRow label="Status" value={<Badge variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}>{extra.status}</Badge>} />
              </div>

              <div style={cardStyle}>
                <SectionTitle>🏦 Bank Details</SectionTitle>
                <InfoRow label="Bank Name" value={extra.bankDetails?.bankName} />
                <InfoRow label="Account Number" value={extra.bankDetails?.accountNumber} mono />
                <InfoRow label="Branch" value={extra.bankDetails?.branch} />
                <InfoRow label="IFSC Code" value={extra.bankDetails?.ifsc} mono />
              </div>
            </div>
          )}

          {role === 'CLF' && extra && (
            <div style={{ marginTop: 20 }}>
              <div style={cardStyle}>
                <SectionTitle>🏛️ CLF Information</SectionTitle>
                <InfoRow label="CLF Name" value={extra.name} />
                <InfoRow label="CLF Code" value={extra.code} mono />
                <InfoRow label="Block" value={extra.blockId?.name || '—'} />
                <InfoRow label="Village" value={extra.village} />
                <InfoRow label="President" value={extra.president} />
                <InfoRow label="Secretary" value={extra.secretary} />
                <InfoRow label="Contact" value={extra.contact} mono />
                <InfoRow label="Status" value={<Badge variant={extra.status === 'ACTIVE' ? 'success' : 'danger'}>{extra.status}</Badge>} />
              </div>
            </div>
          )}

          <div style={{ marginTop: 24, background: theme.colors.surface, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border}`, boxShadow: theme.shadow.sm, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: theme.colors.text }}>🚪 Logout</h3>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: theme.colors.muted }}>Sign out of your account on this device</p>
            </div>
            <Button variant="danger" onClick={handleLogout} loading={loggingOut}>Logout</Button>
          </div>
        </>
      )}

      {tab === 'reports' && (
        <div style={{ marginTop: 8 }}>
          <ReportsPage />
        </div>
      )}
    </>
  );
}

const cardStyle = {
  background: theme.colors.surface,
  borderRadius: theme.radius.md,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: theme.shadow.sm,
  padding: 20,
};

function SectionTitle({ children }) {
  return (
    <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 800, color: theme.colors.primary, textTransform: 'uppercase', letterSpacing: 0.5, paddingBottom: 8, borderBottom: `1px solid ${theme.colors.border}` }}>
      {children}
    </h3>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, padding: '9px 0', borderBottom: `1px solid ${theme.colors.border}`, fontSize: 13, alignItems: 'center' }}>
      <span style={{ color: theme.colors.muted, fontWeight: 600, fontSize: 12 }}>{label}</span>
      <span style={{ color: theme.colors.text, fontFamily: mono ? 'monospace' : 'inherit', fontWeight: 600, wordBreak: 'break-all' }}>{value || '—'}</span>
    </div>
  );
}