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
//   <div className="min-h-screen bg-slate-950">
//     <Sidebar menuItems={menuItems} title="Super Admin Panel" />
//     <main className="md:ml-20 pb-20 md:pb-0 min-h-screen bg-slate-950">
//       {children}
//     </main>
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
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import AdminSuperDashboard from '../admin/AdminSuperDashboard';
import AdminSuperClfs from '../admin/AdminSuperClfs';
import AdminSuperEmployees from '../admin/AdminSuperEmployees';
import AdminSuperSubmissions from '../admin/AdminSuperSubmissions';
import AdminSuperAttendance from '../admin/AdminSuperAttendance';
import AdminSuperReports from '../admin/AdminSuperReports';
import { useAuth } from '../context/AuthContext';
import { uploadProfilePictureApi, removeProfilePictureApi } from '../api/authApi';
import toast from 'react-hot-toast';

const menuItems = [
  { path: '/admin-super/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin-super/clfs', label: 'CLFs', icon: '🏢' },
  { path: '/admin-super/employees', label: 'Employees', icon: '👥' },
  { path: '/admin-super/submissions', label: 'Approvals', icon: '✅' },
  { path: '/admin-super/attendance', label: 'Attendance', icon: '📅' },
  { path: '/admin-super/reports', label: 'Reports', icon: '📈' },
  { path: '/admin-super/profile', label: 'My Profile', icon: '👤' },  // ✅ NEW
];

const AdminSuperLayout = ({ children }) => (
  <div className="min-h-screen bg-zinc-950 text-zinc-100">
    <Sidebar menuItems={menuItems} title="Super Admin Panel" />
    <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
    <BottomNavbar menuItems={menuItems} />
  </div>
);

// ============ Super Admin Profile (NEW) ============
const AdminSuperProfile = () => {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePicture || null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Photo must be less than 2MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files allowed');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const result = await uploadProfilePictureApi(formData);

      if (result.success) {
        setProfilePic(result.profilePicture);
        toast.success('Profile picture updated!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm('Remove profile picture?')) return;

    setUploading(true);
    try {
      const result = await removeProfilePictureApi();
      if (result.success) {
        setProfilePic(null);
        toast.success('Profile picture removed');
      }
    } catch (error) {
      toast.error('Remove failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Profile</h1>

      <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col items-center mb-6 border-b border-zinc-800 pb-6">
          <div className="relative group">
            <div className="w-32 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt={user?.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0)
              )}
            </div>

            <label
              className={`absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-opacity ${
                uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {uploading ? (
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-2xl">📷</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-1">Change</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {profilePic && !uploading && (
            <button
              onClick={handleRemovePhoto}
              className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
            >
              Remove Photo
            </button>
          )}

          <h2 className="text-xl font-bold text-zinc-100 mt-4">{user?.name}</h2>
          <span className="mt-2 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-semibold">
            {user?.role}
          </span>
        </div>

        <div className="space-y-4">
          {[
            { label: 'User ID', value: user?.userId },
            { label: 'Role', value: user?.role },
            { label: 'Status', value: user?.status },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {item.label}
              </span>
              <span className="text-sm font-bold text-zinc-200 text-right">
                {item.value || 'N/A'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <button
            onClick={logout}
            className="w-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span className="text-base">🚪</span> Logout Account
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminSuper = () => (
  <AdminSuperLayout>
    <Routes>
      <Route path="dashboard" element={<AdminSuperDashboard />} />
      <Route path="clfs" element={<AdminSuperClfs />} />
      <Route path="employees" element={<AdminSuperEmployees />} />
      <Route path="submissions" element={<AdminSuperSubmissions />} />
      <Route path="attendance" element={<AdminSuperAttendance />} />
      <Route path="reports" element={<AdminSuperReports />} />
      <Route path="profile" element={<AdminSuperProfile />} />  {/* ✅ NEW */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  </AdminSuperLayout>
);

export default AdminSuper;