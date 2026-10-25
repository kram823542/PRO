import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar.jsx';
import BottomBar from '../components/navigation/BottomBar.jsx';
import Breadcrumb from '../components/navigation/Breadcrumb.jsx';
import NotificationPopup from '../features/notifications/NotificationPopup.jsx';
import { theme } from '../config/theme.js';

const menu = [
  { label: 'Dashboard', path: '/employee' },
  { label: 'Work', path: '/employee/work' },
  { label: 'Attendance', path: '/employee/attendance' },
  { label: 'Leaves', path: '/employee/leaves' }, // ✅ NAYA: Employee ke liye Leaves add kiya
  { label: 'Notifications', path: '/employee/notifications' },
  { label: 'Reports', path: '/employee/reports' },
  { label: 'Profile', path: '/employee/profile' },
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