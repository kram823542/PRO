// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/bpm' },
//   { label: 'CLFs', path: '/bpm/clfs' },
//   { label: 'Employees', path: '/bpm/employees' },
//   { label: 'Action Plans', path: '/bpm/action-plans' },
//   { label: 'Work Done', path: '/bpm/work-done' },
//   { label: 'Attendance', path: '/bpm/attendance' },
//   { label: 'Notifications', path: '/bpm/notifications' },
//   { label: 'Reports', path: '/bpm/reports' },
// ];

// export default function BpmLayout() {
//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="BPM Admin" menu={menu} />
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 70 }}>
//         <Breadcrumb />
//         <main style={{ padding: 24 }}>
//           <Outlet />
//         </main>
//       </div>
//       <BottomBar menu={menu} />
//     </div>
//   );
// }


// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/bpm' },
//   { label: 'CLFs', path: '/bpm/clfs' },
//   { label: 'Employees', path: '/bpm/employees' },
//   { label: 'Action Plans', path: '/bpm/action-plans' },
//   { label: 'Work Done', path: '/bpm/work-done' },
//   { label: 'Attendance', path: '/bpm/attendance' },
//   { label: 'Notifications', path: '/bpm/notifications' },
//   { label: 'Reports', path: '/bpm/reports' },
// ];

// export default function BpmLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="BPM Admin" menu={menu} />

//       <div
//         className="clf-content"
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           minHeight: '100vh',
//           paddingBottom: 70,
//         }}
//       >
//         <Breadcrumb />
//         <main style={{ padding: 24, flex: 1 }}>
//           <Outlet />
//         </main>
//       </div>

//       <BottomBar menu={menu} />
//     </div>
//   );
// }




import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar.jsx';
import BottomBar from '../components/navigation/BottomBar.jsx';
import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
import { theme } from '../config/theme.js';

const menu = [
  { label: 'Dashboard', path: '/bpm' },
  { label: 'CLFs', path: '/bpm/clfs' },
  { label: 'Employees', path: '/bpm/employees' },
  { label: 'Work', path: '/bpm/work' },           // ✅ नया
  { label: 'Attendance', path: '/bpm/attendance' },
  { label: 'Notifications', path: '/bpm/notifications' },
  { label: 'Reports', path: '/bpm/reports' },
    { label: 'Profile', path: '/bpm/profile' },   // ✅ नया
];

export default function BpmLayout() {
  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Sidebar title="BPM Admin" menu={menu} />

      <div
        className="clf-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          paddingBottom: 70,
        }}
      >
        <Breadcrumb />
        <main style={{ padding: 24, flex: 1 }}>
          <Outlet />
        </main>
      </div>

      <BottomBar menu={menu} />
      <NotificationPopup />
    </div>
  );
}