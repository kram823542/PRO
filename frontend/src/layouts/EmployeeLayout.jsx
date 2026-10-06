// // import { Outlet } from 'react-router-dom';
// // import Sidebar from '../components/navigation/Sidebar.jsx';
// // import BottomBar from '../components/navigation/BottomBar.jsx';
// // import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// // import { theme } from '../config/theme.js';

// // const menu = [
// //   { label: 'Dashboard', path: '/employee' },
// //   { label: 'Action Plans', path: '/employee/action-plans' },
// //   { label: 'Work Done', path: '/employee/work-done' },
// //   { label: 'Attendance', path: '/employee/attendance' },
// //   { label: 'Notifications', path: '/employee/notifications' },
// //   { label: 'Reports', path: '/employee/reports' },
// // ];

// // export default function EmployeeLayout() {
// //   return (
// //     <div style={{ display: 'flex', minHeight: '100vh', background: theme.colors.background }}>
// //       <Sidebar title="Employee" menu={menu} />
// //       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 70 }}>
// //         <Breadcrumb />
// //         <main style={{ padding: 24 }}>
// //           <Outlet />
// //         </main>
// //       </div>
// //       <BottomBar menu={menu} />
// //     </div>
// //   );
// // }


// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/employee' },
//   { label: 'Action Plans', path: '/employee/action-plans' },
//   { label: 'Work Done', path: '/employee/work-done' },
//   { label: 'Attendance', path: '/employee/attendance' },
//   { label: 'Notifications', path: '/employee/notifications' },
//   { label: 'Reports', path: '/employee/reports' },
// ];

// export default function EmployeeLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="Employee" menu={menu} />

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


// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/navigation/Sidebar.jsx';
// import BottomBar from '../components/navigation/BottomBar.jsx';
// import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
// import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
// import { theme } from '../config/theme.js';

// const menu = [
//   { label: 'Dashboard', path: '/employee' },
//   { label: 'Action Plans', path: '/employee/action-plans' },
//   { label: 'Work Done', path: '/employee/work-done' },
//   { label: 'Attendance', path: '/employee/attendance' },
//   { label: 'Notifications', path: '/employee/notifications' },
//   { label: 'Reports', path: '/employee/reports' },
// ];

// export default function EmployeeLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="Employee" menu={menu} />

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

//       {/* ✅ Blocking notification popup */}
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
//   { label: 'Dashboard', path: '/employee' },
//   { label: 'Action Plans', path: '/employee/action-plans' },
//   // ❌ 'Work Done' हटाया — ab Action Plans page ke andar tab hai
//   { label: 'Attendance', path: '/employee/attendance' },
//   { label: 'Notifications', path: '/employee/notifications' },
//   { label: 'Reports', path: '/employee/reports' },
// ];

// export default function EmployeeLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="Employee" menu={menu} />

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
//   { label: 'Dashboard', path: '/employee' },
//   { label: 'Action Plans', path: '/employee/action-plans' },
//   { label: 'Attendance', path: '/employee/attendance' },
//   { label: 'Notifications', path: '/employee/notifications' },
//   { label: 'Reports', path: '/employee/reports' },
// ];

// export default function EmployeeLayout() {
//   return (
//     <div style={{ minHeight: '100vh', background: theme.colors.background }}>
//       <Sidebar title="Employee" menu={menu} />

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
  { label: 'Dashboard', path: '/employee' },
  { label: 'Work', path: '/employee/work' },              // ✅ नया — Action Plans + Work Done की जगह
  { label: 'Attendance', path: '/employee/attendance' },
  { label: 'Notifications', path: '/employee/notifications' },
  { label: 'Reports', path: '/employee/reports' },
    { label: 'Profile', path: '/employee/profile' },   // ✅ नया
];

export default function EmployeeLayout() {
  return (
    <div style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Sidebar title="Employee" menu={menu} />

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