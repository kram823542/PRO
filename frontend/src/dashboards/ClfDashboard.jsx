// import PageHeader from '../components/common/PageHeader.jsx';
// import { theme } from '../config/theme.js';

// const StatCard = ({ label, value, color }) => (
//   <div
//     style={{
//       background: theme.colors.surface,
//       borderRadius: theme.radius.md,
//       padding: 20,
//       boxShadow: theme.shadow.sm,
//       borderLeft: `4px solid ${color}`,
//     }}
//   >
//     <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: 4 }}>{label}</div>
//     <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
//   </div>
// );

// export default function ClfDashboard() {
//   return (
//     <>
//       <PageHeader title="CLF Dashboard" subtitle="CLF overview" />
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
//         <StatCard label="Employees" value="—" color={theme.colors.primary} />
//         <StatCard label="Today's Present" value="—" color={theme.colors.success} />
//         <StatCard label="Pending Approval" value="—" color={theme.colors.warning} />
//         <StatCard label="Approved Work" value="—" color={theme.colors.info} />
//       </div>
//     </>
//   );
// }



// import { useEffect, useState } from 'react';
// import PageHeader from '../components/common/PageHeader.jsx';
// import { theme } from '../config/theme.js';
// import { listEmployees } from '../features/employees/employees.api.js';
// import { listAttendance } from '../features/attendance/attendance.api.js';
// import { listWorkDone } from '../features/workDone/workDone.api.js';

// const StatCard = ({ label, value, color }) => (
//   <div
//     style={{
//       background: theme.colors.surface,
//       borderRadius: theme.radius.md,
//       padding: 20,
//       boxShadow: theme.shadow.sm,
//       borderLeft: `4px solid ${color}`,
//     }}
//   >
//     <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: 4 }}>{label}</div>
//     <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
//   </div>
// );

// export default function ClfDashboard() {
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     todayPresent: 0,
//     pendingApproval: 0,
//     approvedWork: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         // Today's date in IST (YYYY-MM-DD)
//         const today = new Date(
//           new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
//         )
//           .toISOString()
//           .slice(0, 10);

//         // Parallel API calls using existing endpoints
//         const [empRes, attRes, wdRes] = await Promise.all([
//           listEmployees({ page: 1, limit: 1000 }),
//           listAttendance({ from: today, to: today }),
//           listWorkDone({ page: 1, limit: 1000 }),
//         ]);

//         const employees = empRes.data?.data?.employees || [];
//         const attendance = attRes.data?.data?.attendance || [];
//         const workDone = wdRes.data?.data?.workDone || [];

//         // Calculate counts
//         const totalEmployees = employees.filter(
//           (e) => e.status === 'ACTIVE'
//         ).length;

//         const todayPresent = attendance.filter(
//           (a) => a.status === 'PRESENT' && a.date === today
//         ).length;

//         const pendingApproval = workDone.filter(
//           (w) => w.status === 'PENDING'
//         ).length;

//         const approvedWork = workDone.filter(
//           (w) => w.status === 'APPROVED'
//         ).length;

//         console.log('✅ CLF Dashboard Stats:', {
//           totalEmployees,
//           todayPresent,
//           pendingApproval,
//           approvedWork,
//         });

//         setStats({
//           totalEmployees,
//           todayPresent,
//           pendingApproval,
//           approvedWork,
//         });
//       } catch (err) {
//         console.error('❌ CLF Dashboard Error:', err);
//         setError(
//           err.response?.data?.message || err.message || 'Failed to load dashboard'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   return (
//     <>
//       <PageHeader title="CLF Dashboard" subtitle="CLF overview" />

//       {error && (
//         <div
//           style={{
//             padding: 12,
//             background: '#FEE2E2',
//             color: theme.colors.danger,
//             borderRadius: theme.radius.md,
//             marginBottom: 16,
//             fontSize: 13,
//           }}
//         >
//           {error}
//         </div>
//       )}

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
//           gap: 16,
//         }}
//       >
//         <StatCard
//           label="Employees"
//           value={loading ? '...' : stats.totalEmployees}
//           color={theme.colors.primary}
//         />
//         <StatCard
//           label="Today's Present"
//           value={loading ? '...' : stats.todayPresent}
//           color={theme.colors.success}
//         />
//         <StatCard
//           label="Pending Approval"
//           value={loading ? '...' : stats.pendingApproval}
//           color={theme.colors.warning}
//         />
//         <StatCard
//           label="Approved Work"
//           value={loading ? '...' : stats.approvedWork}
//           color={theme.colors.info}
//         />
//       </div>
//     </>
//   );
// }


// import { useEffect, useState } from 'react';
// import PageHeader from '../components/common/PageHeader.jsx';
// import { theme } from '../config/theme.js';
// import { listEmployees } from '../features/employees/employees.api.js';
// import { listWorkDone } from '../features/workDone/workDone.api.js';

// const StatCard = ({ label, value, color }) => (
//   <div
//     style={{
//       background: theme.colors.surface,
//       borderRadius: theme.radius.md,
//       padding: 20,
//       boxShadow: theme.shadow.sm,
//       borderLeft: `4px solid ${color}`,
//     }}
//   >
//     <div style={{ fontSize: 13, color: theme.colors.muted, marginBottom: 4 }}>{label}</div>
//     <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
//   </div>
// );

// export default function ClfDashboard() {
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     todayPresent: 0,
//     pendingApproval: 0,
//     approvedWork: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         // Today's date in IST (YYYY-MM-DD)
//         const today = new Date(
//           new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
//         )
//           .toISOString()
//           .slice(0, 10);

//         // ✅ सिर्फ 2 API calls — attendance skip (heavy था, hata diya)
//         const [empRes, wdRes] = await Promise.all([
//           listEmployees({ page: 1, limit: 100 }),   // 1000 → 100
//           listWorkDone({ page: 1, limit: 100 }),    // 1000 → 100
//         ]);

//         const employees = empRes.data?.data?.employees || [];
//         const workDone = wdRes.data?.data?.workDone || [];

//         // Counts
//         const totalEmployees = employees.filter((e) => e.status === 'ACTIVE').length;
//         const pendingApproval = workDone.filter((w) => w.status === 'PENDING').length;
//         const approvedWork = workDone.filter((w) => w.status === 'APPROVED').length;

//         // ✅ Today's Present — workDone में से गिन लो (जो आज approved हुए)
//         const todayPresent = workDone.filter(
//           (w) => w.status === 'APPROVED' && w.date === today
//         ).length;

//         console.log('✅ CLF Dashboard Stats:', {
//           totalEmployees,
//           todayPresent,
//           pendingApproval,
//           approvedWork,
//         });

//         setStats({ totalEmployees, todayPresent, pendingApproval, approvedWork });
//       } catch (err) {
//         console.error('❌ CLF Dashboard Error:', err);
//         setError(
//           err.response?.data?.message || err.message || 'Failed to load dashboard'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   return (
//     <>
//       <PageHeader title="CLF Dashboard" subtitle="CLF overview" />

//       {error && (
//         <div
//           style={{
//             padding: 12,
//             background: '#FEE2E2',
//             color: theme.colors.danger,
//             borderRadius: theme.radius.md,
//             marginBottom: 16,
//             fontSize: 13,
//           }}
//         >
//           {error}
//         </div>
//       )}

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
//           gap: 16,
//         }}
//       >
//         <StatCard
//           label="Employees"
//           value={loading ? '...' : stats.totalEmployees}
//           color={theme.colors.primary}
//         />
//         <StatCard
//           label="Today's Present"
//           value={loading ? '...' : stats.todayPresent}
//           color={theme.colors.success}
//         />
//         <StatCard
//           label="Pending Approval"
//           value={loading ? '...' : stats.pendingApproval}
//           color={theme.colors.warning}
//         />
//         <StatCard
//           label="Approved Work"
//           value={loading ? '...' : stats.approvedWork}
//           color={theme.colors.info}
//         />
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import { theme } from '../config/theme.js';
import { listEmployees } from '../features/employees/employees.api.js';
import { listWorkDone } from '../features/workDone/workDone.api.js';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
};

const Stat = ({ icon, label, value, color, to }) => {
  const inner = (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: 16,
        boxShadow: theme.shadow.sm,
        border: `1px solid ${theme.colors.border}`,
        borderLeft: `4px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        textDecoration: 'none',
        color: theme.colors.text,
        transition: 'transform 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: `${color}15`,
          color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: theme.colors.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>
          {label}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.1 }}>{value}</div>
      </div>
    </div>
  );
  return to ? <Link to={to} style={{ textDecoration: 'none' }}>{inner}</Link> : inner;
};

export default function ClfDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState({ emp: 0, today: 0, pending: 0, approved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
          .toISOString().slice(0, 10);

        const [eRes, wRes] = await Promise.all([
          listEmployees({ page: 1, limit: 100 }),
          listWorkDone({ page: 1, limit: 100 }),
        ]);

        const emps = eRes.data?.data?.employees || [];
        const wd = wRes.data?.data?.workDone || [];

        setStats({
          emp: emps.filter((e) => e.status === 'ACTIVE').length,
          today: wd.filter((w) => w.status === 'APPROVED' && w.date === today).length,
          pending: wd.filter((w) => w.status === 'PENDING').length,
          approved: wd.filter((w) => w.status === 'APPROVED').length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const v = (n) => (loading ? '...' : n);

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${user.name || 'CLF Admin'} 👋`}
        subtitle="Here's your CLF overview for today"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <Stat icon="👥" label="Employees" value={v(stats.emp)} color={theme.colors.primary} to="/clf/employees" />
        <Stat icon="✅" label="Today's Present" value={v(stats.today)} color={theme.colors.success} to="/clf/attendance" />
        <Stat icon="⏳" label="Pending Approval" value={v(stats.pending)} color={theme.colors.warning} to="/clf/work" />
        <Stat icon="📊" label="Approved Work" value={v(stats.approved)} color={theme.colors.info} to="/clf/reports" />
      </div>
    </>
  );
}