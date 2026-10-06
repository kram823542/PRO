// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/clf' },
//   { label: 'Employees', path: '/clf/employees' },
//   { label: 'Action Plans', path: '/clf/action-plans' },
//   { label: 'Work Done', path: '/clf/work-done' },
//   { label: 'Approvals', path: '/clf/work-done/approval' },
//   { label: 'Attendance', path: '/clf/attendance' },
//   { label: 'Notifications', path: '/clf/notifications' },
//   { label: 'Reports', path: '/clf/reports' },
// ];

// export default function ClfLayout() {
//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="CLF Admin" menu={menu} />
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
// import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/clf' },
//   { label: 'Employees', path: '/clf/employees' },
//   { label: 'Action Plans', path: '/clf/action-plans' },
//   { label: 'Work Done', path: '/clf/work-done' },
//   { label: 'Approvals', path: '/clf/work-done/approval' },
//   { label: 'Attendance', path: '/clf/attendance' },
//   { label: 'Notifications', path: '/clf/notifications' },
//   { label: 'Reports', path: '/clf/reports' },
// ];

// export default function ClfLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="CLF Admin" menu={menu} />

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

//       <NotificationPopup />
//     </div>
//   );
// }



// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/clf' },
//   { label: 'Employees', path: '/clf/employees' },
//   { label: 'Action Plans', path: '/clf/action-plans' },
//   { label: 'Work Done', path: '/clf/work-done' },
//   { label: 'Approvals', path: '/clf/work-done/approval' },
//   { label: 'Attendance', path: '/clf/attendance' },
//   { label: 'Notifications', path: '/clf/notifications' },
//   { label: 'Reports', path: '/clf/reports' },
// ];

// export default function ClfLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="CLF Admin" menu={menu} />

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

//       {/* ✅ Blocking popup for CLF admin */}
//       <NotificationPopup />
//     </div>
//   );
// }



// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/clf' },
//   { label: 'Employees', path: '/clf/employees' },
//   { label: 'Action Plans', path: '/clf/action-plans' },
//   { label: 'Work Done', path: '/clf/work-done' },
//   { label: 'Advice', path: '/clf/advice' },           // ✅ Approvals हटाया, Advice जोड़ा
//   { label: 'Attendance', path: '/clf/attendance' },
//   { label: 'Notifications', path: '/clf/notifications' },
//   { label: 'Reports', path: '/clf/reports' },
// ];

// export default function ClfLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="CLF Admin" menu={menu} />

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
//       <NotificationPopup />
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
  { label: 'Dashboard', path: '/clf' },
  { label: 'Employees', path: '/clf/employees' },
  { label: 'Work', path: '/clf/work' },          // ✅ नया
  { label: 'Advice', path: '/clf/advice' },
  { label: 'Attendance', path: '/clf/attendance' },
  { label: 'Notifications', path: '/clf/notifications' },
  { label: 'Reports', path: '/clf/reports' },
    { label: 'Profile', path: '/clf/profile' },   // 
];

export default function ClfLayout() {
  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Sidebar title="CLF Admin" menu={menu} />

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