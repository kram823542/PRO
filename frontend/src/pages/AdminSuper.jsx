// import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import AdminSuperDashboard from '../admin/AdminSuperDashboard';
// import AdminSuperClfs from '../admin/AdminSuperClfs';
// import AdminSuperEmployees from '../admin/AdminSuperEmployees';
// import AdminSuperSubmissions from '../admin/AdminSuperSubmissions';
// import AdminSuperAttendance from '../admin/AdminSuperAttendance';
// import AdminSuperReports from '../admin/AdminSuperReports';

// const menuItems = [
//   { path: '/admin-super/dashboard', label: 'Dashboard', icon: '📊' },
//   { path: '/admin-super/clfs', label: 'CLFs', icon: '🏢' },
//   { path: '/admin-super/employees', label: 'Employees', icon: '👥' },
//   { path: '/admin-super/submissions', label: 'Approvals', icon: '✅' },
//   { path: '/admin-super/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/admin-super/reports', label: 'Reports', icon: '📈' },
// ];

// const AdminSuperLayout = ({ children }) => (
//   <div className="min-h-screen bg-gray-100">
//     <Sidebar menuItems={menuItems} title="Super Admin Panel" />
//     <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// const AdminSuper = () => (
//   <AdminSuperLayout>
//     <Routes>
//       <Route path="dashboard" element={<AdminSuperDashboard />} />
//       <Route path="clfs" element={<AdminSuperClfs />} />
//       <Route path="employees" element={<AdminSuperEmployees />} />
//       <Route path="submissions" element={<AdminSuperSubmissions />} />
//       <Route path="attendance" element={<AdminSuperAttendance />} />
//       <Route path="reports" element={<AdminSuperReports />} />
//       <Route path="*" element={<Navigate to="dashboard" replace />} />
//     </Routes>
//   </AdminSuperLayout>
// );

// export default AdminSuper;


import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import AdminSuperDashboard from '../admin/AdminSuperDashboard';
import AdminSuperClfs from '../admin/AdminSuperClfs';
import AdminSuperEmployees from '../admin/AdminSuperEmployees';
import AdminSuperSubmissions from '../admin/AdminSuperSubmissions';
import AdminSuperAttendance from '../admin/AdminSuperAttendance';
import AdminSuperReports from '../admin/AdminSuperReports';

const menuItems = [
  { path: '/admin-super/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin-super/clfs', label: 'CLFs', icon: '🏢' },
  { path: '/admin-super/employees', label: 'Employees', icon: '👥' },
  { path: '/admin-super/submissions', label: 'Approvals', icon: '✅' },
  { path: '/admin-super/attendance', label: 'Attendance', icon: '📅' },
  { path: '/admin-super/reports', label: 'Reports', icon: '📈' },
];

const AdminSuperLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-950">
    <Sidebar menuItems={menuItems} title="Super Admin Panel" />
    <main className="md:ml-20 pb-20 md:pb-0 min-h-screen bg-slate-950">
      {children}
    </main>
    <BottomNavbar menuItems={menuItems} />
  </div>
);

const AdminSuper = () => (
  <AdminSuperLayout>
    <Routes>
      <Route path="dashboard" element={<AdminSuperDashboard />} />
      <Route path="clfs" element={<AdminSuperClfs />} />
      <Route path="employees" element={<AdminSuperEmployees />} />
      <Route path="submissions" element={<AdminSuperSubmissions />} />
      <Route path="attendance" element={<AdminSuperAttendance />} />
      <Route path="reports" element={<AdminSuperReports />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  </AdminSuperLayout>
);

export default AdminSuper;