// import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import AdminClfDashboard from '../admin/AdminClfDashboard';
// import AdminClfEmployees from '../admin/AdminClfEmployees';
// import AdminClfSubmissions from '../admin/AdminClfSubmissions';
// import AdminClfAttendance from '../admin/AdminClfAttendance';
// import AdminClfReports from '../admin/AdminClfReports';

// const menuItems = [
//   { path: '/admin-clf/dashboard', label: 'Dashboard', icon: '📊' },
//   { path: '/admin-clf/employees', label: 'Employees', icon: '👥' },
//   { path: '/admin-clf/submissions', label: 'Approvals', icon: '✅' },
//   { path: '/admin-clf/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/admin-clf/reports', label: 'Reports', icon: '📈' },
// ];

// const AdminClfLayout = ({ children }) => (
//   <div className="min-h-screen bg-gray-100">
//     <Sidebar menuItems={menuItems} title="CLF Admin Panel" />
//     <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// const AdminClf = () => (
//   <AdminClfLayout>
//     <Routes>
//       <Route path="dashboard" element={<AdminClfDashboard />} />
//       <Route path="employees" element={<AdminClfEmployees />} />
//       <Route path="submissions" element={<AdminClfSubmissions />} />
//       <Route path="attendance" element={<AdminClfAttendance />} />
//       <Route path="reports" element={<AdminClfReports />} />
//       <Route path="*" element={<Navigate to="dashboard" replace />} />
//     </Routes>
//   </AdminClfLayout>
// );

// export default AdminClf;




// import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import AdminClfDashboard from '../admin/AdminClfDashboard';
// import AdminClfEmployees from '../admin/AdminClfEmployees';
// import AdminClfSubmissions from '../admin/AdminClfSubmissions';
// import AdminClfAttendance from '../admin/AdminClfAttendance';
// import AdminClfReports from '../admin/AdminClfReports';

// const menuItems = [
//   { path: '/admin-clf/dashboard', label: 'Dashboard', icon: '📊' },
//   { path: '/admin-clf/employees', label: 'Employees', icon: '👥' },
//   { path: '/admin-clf/submissions', label: 'Approvals', icon: '✅' },
//   { path: '/admin-clf/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/admin-clf/reports', label: 'Reports', icon: '📈' },
// ];

// const AdminClfLayout = ({ children }) => (
//   <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
//     <Sidebar menuItems={menuItems} title="CLF Admin Panel" />

//     {/* Main Content — Sidebar collapsed w-16 hai, isliye ml-16 */}
//     <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {children}
//       </div>
//     </main>

//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// const AdminClf = () => (
//   <AdminClfLayout>
//     <Routes>
//       <Route path="dashboard" element={<AdminClfDashboard />} />
//       <Route path="employees" element={<AdminClfEmployees />} />
//       <Route path="submissions" element={<AdminClfSubmissions />} />
//       <Route path="attendance" element={<AdminClfAttendance />} />
//       <Route path="reports" element={<AdminClfReports />} />
//       <Route path="*" element={<Navigate to="dashboard" replace />} />
//     </Routes>
//   </AdminClfLayout>
// );

// export default AdminClf;
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import AdminClfDashboard from '../admin/AdminClfDashboard';
import AdminClfEmployees from '../admin/AdminClfEmployees';
import AdminClfSubmissions from '../admin/AdminClfSubmissions';
import AdminClfAttendance from '../admin/AdminClfAttendance';
import AdminClfReports from '../admin/AdminClfReports';

const menuItems = [
  { path: '/admin-clf/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin-clf/employees', label: 'Employees', icon: '👥' },
  { path: '/admin-clf/submissions', label: 'Approvals', icon: '✅' },
  { path: '/admin-clf/attendance', label: 'Attendance', icon: '📅' },
  { path: '/admin-clf/reports', label: 'Reports', icon: '📈' },
];

const AdminClfLayout = ({ children }) => (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
    <Sidebar menuItems={menuItems} title="CLF Admin Panel" />

    {/* Main Content — Sidebar collapsed w-16 hai, isliye ml-16 */}
    <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>

    <BottomNavbar menuItems={menuItems} />
  </div>
);

const AdminClf = () => (
  <AdminClfLayout>
    <Routes>
      <Route path="dashboard" element={<AdminClfDashboard />} />
      <Route path="employees" element={<AdminClfEmployees />} />
      <Route path="submissions" element={<AdminClfSubmissions />} />
      <Route path="attendance" element={<AdminClfAttendance />} />
      <Route path="reports" element={<AdminClfReports />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  </AdminClfLayout>
);

export default AdminClf;