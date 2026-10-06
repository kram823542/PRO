// import { useEffect, useState } from 'react';
// import PageHeader from '../components/common/PageHeader.jsx';
// import { theme } from '../config/theme.js';
// import * as api from '../features/clfs/clfs.api.js';

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

// export default function BpmDashboard() {
//   const [data, setData] = useState({ totalCLFs: '—', totalEmployees: '—', todayActionPlans: '—' });

//   useEffect(() => {
//     api.bpmDashboard().then(({ data }) => setData(data.data || {}));
//   }, []);

//   return (
//     <>
//       <PageHeader title="BPM Dashboard" subtitle="Block overview" />
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
//         <StatCard label="Total CLFs" value={data.totalCLFs} color={theme.colors.primary} />
//         <StatCard label="Total Employees" value={data.totalEmployees} color={theme.colors.info} />
//         <StatCard label="Today's Action Plans" value={data.todayActionPlans} color={theme.colors.success} />
//       </div>
//     </>
//   );
// }




// import { useEffect, useState } from 'react';
// import { theme } from '../config/theme.js';
// import * as api from '../features/clfs/clfs.api.js';

// // Helper function to get greeting based on time of day
// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return 'Good Morning';
//   if (hour < 17) return 'Good Afternoon';
//   return 'Good Evening';
// };

// const StatCard = ({ label, value, color, description }) => (
//   <div
//     style={{
//       background: theme.colors.surface,
//       borderRadius: theme.radius.md || '10px',
//       padding: '20px 24px',
//       boxShadow: theme.shadow.sm || '0 1px 2px rgba(0,0,0,0.05)',
//       border: `1px solid ${theme.colors.border || '#F8F0E5'}`,
//       borderLeft: `4px solid ${color}`,
//       display: 'flex',
//       flexDirection: 'column',
//       justify: 'space-between',
//       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//     }}
//   >
//     <div>
//       <span
//         style={{
//           fontSize: 12,
//           fontWeight: 600,
//           color: theme.colors.muted,
//           textTransform: 'uppercase',
//           letterSpacing: '0.5px',
//         }}
//       >
//         {label}
//       </span>
//       <div
//         style={{
//           fontSize: 32,
//           fontWeight: 700,
//           color: theme.colors.text,
//           marginTop: 6,
//           lineHeight: 1,
//         }}
//       >
//         {value}
//       </div>
//     </div>
//     {description && (
//       <span style={{ fontSize: 12, color: theme.colors.muted, marginTop: 12 }}>
//         {description}
//       </span>
//     )}
//   </div>
// );

// export default function BpmDashboard() {
//   const [data, setData] = useState({
//     totalCLFs: '—',
//     totalEmployees: '—',
//     todayActionPlans: '—',
//   });

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const userName = user.name || user.username || 'BPM Admin';
//   const greeting = getGreeting();

//   useEffect(() => {
//     api.bpmDashboard().then(({ data }) => setData(data.data || {}));
//   }, []);

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
//       {/* Top Banner with Wishing and Executive Heading */}
//       <div
//         style={{
//           background: theme.colors.surface,
//           padding: '24px 28px',
//           borderRadius: theme.radius.lg || '14px',
//           boxShadow: theme.shadow.sm,
//           border: `1px solid ${theme.colors.border || '#F8F0E5'}`,
//           marginBottom: 24,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: 16,
//         }}
//       >
//         <div>
//           <div
//             style={{
//               fontSize: 13,
//               fontWeight: 600,
//               color: theme.colors.secondary || '#004643',
//               marginBottom: 4,
//             }}
//           >
//             {greeting}, {userName} 👋
//           </div>
//           <h1
//             style={{
//               margin: 0,
//               fontSize: 24,
//               fontWeight: 700,
//               color: theme.colors.text || '#082052',
//             }}
//           >
//             BPM Executive Overview
//           </h1>
//           <p style={{ margin: '4px 0 0', fontSize: 13, color: theme.colors.muted }}>
//             Block level operational metrics and daily status report
//           </p>
//         </div>

//         <div
//           style={{
//             fontSize: 12,
//             color: theme.colors.muted,
//             background: theme.colors.background,
//             padding: '8px 14px',
//             borderRadius: theme.radius.sm || '6px',
//             border: `1px solid ${theme.colors.border || '#F8F0E5'}`,
//             fontWeight: 500,
//           }}
//         >
//           📅 {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
//           gap: 20,
//         }}
//       >
//         <StatCard
//           label="Total Registered CLFs"
//           value={data.totalCLFs}
//           color={theme.colors.primary || '#082052'}
//           description="Active Cluster Level Federations"
//         />
//         <StatCard
//           label="Total Active Employees"
//           value={data.totalEmployees}
//           color={theme.colors.info || '#082052'}
//           description="Staff assigned across block"
//         />
//         <StatCard
//           label="Today's Action Plans"
//           value={data.todayActionPlans}
//           color={theme.colors.secondary || '#004643'}
//           description="Tasks scheduled for today"
//         />
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader.jsx';
import { theme } from '../config/theme.js';
import * as api from '../features/clfs/clfs.api.js';

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

export default function BpmDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [data, setData] = useState({ totalCLFs: '...', totalEmployees: '...', todayActionPlans: '...' });

  useEffect(() => {
    api.bpmDashboard()
      .then(({ data }) => setData(data.data || {}))
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        title={`${greeting()}, ${user.name || 'BPM Admin'} 👋`}
        subtitle="Block overview — CLFs, employees & daily activity"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <Stat icon="🏢" label="Total CLFs" value={data.totalCLFs} color={theme.colors.primary} to="/bpm/clfs" />
        <Stat icon="👥" label="Active Employees" value={data.totalEmployees} color={theme.colors.info} to="/bpm/employees" />
        <Stat icon="📝" label="Today's Action Plans" value={data.todayActionPlans} color={theme.colors.secondary} to="/bpm/work" />
      </div>
    </>
  );
}