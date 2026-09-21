// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import Loader from '../components/Loader';
// import { useAuth } from '../context/AuthContext';
// import { getMyProfileApi, getMyWorkHistoryApi, submitWorkApi } from '../api/employeeApi';
// import { getMyAttendanceApi } from '../api/employeeApi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const menuItems = [
//   { path: '/employee/dashboard', label: 'Dashboard', icon: '🏠' },
//   { path: '/employee/submit', label: 'Submit Work', icon: '📝' },
//   { path: '/employee/history', label: 'History', icon: '📋' },
//   { path: '/employee/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/employee/profile', label: 'Profile', icon: '👤' },
// ];

// const EmployeeLayout = ({ children }) => (
//   <div className="min-h-screen bg-gray-100">
//     <Sidebar menuItems={menuItems} title="Employee Panel" />
//     <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">{children}</main>
//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// // ============ Dashboard ============
// const EmployeeDashboard = () => {
//   const { user } = useAuth();
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getMyProfileApi();
//         setSummary(data.user);
//       } catch (error) {
//         // Ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Loader />;

//   const greeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <div className="bg-primary text-white rounded-2xl p-6 shadow-lg mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold">
//           {greeting()}, {user?.name}! 👋
//         </h1>
//         <p className="text-white/70 mt-1">
//           {user?.employeeType} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="card border-l-4 border-secondary">
//           <p className="text-sm text-gray-500 font-medium">Today's Attendance</p>
//           <p className="text-2xl font-bold text-primary mt-1">Pending</p>
//         </div>
//         <div className="card border-l-4 border-green-500">
//           <p className="text-sm text-gray-500 font-medium">Employee Type</p>
//           <p className="text-2xl font-bold text-primary mt-1">{user?.employeeType || 'N/A'}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a href="/employee/submit" className="card hover:scale-105 transition-transform cursor-pointer text-center">
//           <div className="text-4xl mb-2">📝</div>
//           <h3 className="font-bold text-primary">Submit Work</h3>
//           <p className="text-sm text-gray-500 mt-1">Upload today's work</p>
//         </a>
//         <a href="/employee/history" className="card hover:scale-105 transition-transform cursor-pointer text-center">
//           <div className="text-4xl mb-2">📋</div>
//           <h3 className="font-bold text-primary">Work History</h3>
//           <p className="text-sm text-gray-500 mt-1">View past submissions</p>
//         </a>
//         <a href="/employee/attendance" className="card hover:scale-105 transition-transform cursor-pointer text-center">
//           <div className="text-4xl mb-2">📅</div>
//           <h3 className="font-bold text-primary">Attendance</h3>
//           <p className="text-sm text-gray-500 mt-1">View monthly attendance</p>
//         </a>
//       </div>
//     </div>
//   );
// };

// // ============ Submit Work ============
// const SubmitWork = () => {
//   const [formData, setFormData] = useState({
//     description: '',
//     workType: 'SHG Meeting',
//     photo: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [todaySubmission, setTodaySubmission] = useState(null);

//   useEffect(() => {
//     checkTodaySubmission();
//   }, []);

//   const checkTodaySubmission = async () => {
//     try {
//       const data = await getMyWorkHistoryApi({ limit: 5 });
//       const today = new Date().toDateString();
//       const todaySub = data.submissions?.find(
//         (s) => new Date(s.date).toDateString() === today
//       );
//       setTodaySubmission(todaySub);
//     } catch (error) {
//       // Ignore
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Photo size must be less than 5MB');
//         return;
//       }
//       setFormData({ ...formData, photo: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.description.length < 10) {
//       toast.error('Description must be at least 10 characters');
//       return;
//     }

//     if (!formData.photo) {
//       toast.error('Please upload a photo');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const data = new FormData();
//       data.append('description', formData.description);
//       data.append('workType', formData.workType);
//       data.append('photo', formData.photo);

//       const result = await submitWorkApi(data);

//       if (result.success) {
//         toast.success('Work submitted successfully!');
//         setFormData({ description: '', workType: 'SHG Meeting', photo: null });
//         setPreview(null);
//         checkTodaySubmission();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submission failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 max-w-3xl mx-auto">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Submit Today's Work</h1>

//       {todaySubmission && (
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
//           <p className="text-sm font-semibold text-yellow-800">
//             ⚠️ You have already submitted work today
//           </p>
//           <p className="text-xs text-yellow-700 mt-1">
//             Status: <span className="font-bold">{todaySubmission.status}</span>
//           </p>
//         </div>
//       )}

//       <div className="card">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="label">Date</label>
//             <input
//               type="text"
//               value={format(new Date(), 'dd-MM-yyyy')}
//               disabled
//               className="input-field bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="label">Work Type</label>
//             <select
//               value={formData.workType}
//               onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
//               className="input-field"
//             >
//               <option>SHG Meeting</option>
//               <option>Training</option>
//               <option>Field Visit</option>
//               <option>Documentation</option>
//               <option>Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="label">Work Description *</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows="5"
//               placeholder="Describe your work in detail (minimum 10 characters)..."
//               className="input-field resize-none"
//               required
//               minLength={10}
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               {formData.description.length}/10 characters
//             </p>
//           </div>

//           <div>
//             <label className="label">Work Photo *</label>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-secondary transition-colors">
//               {preview ? (
//                 <div>
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="max-h-60 mx-auto rounded-lg shadow-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setFormData({ ...formData, photo: null });
//                       setPreview(null);
//                     }}
//                     className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
//                   >
//                     Remove Photo
//                   </button>
//                 </div>
//               ) : (
//                 <label className="cursor-pointer">
//                   <div className="text-4xl mb-2">📷</div>
//                   <p className="text-sm font-medium text-primary">
//                     Click to upload photo
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={submitting || !!todaySubmission}
//             className="btn-primary w-full flex items-center justify-center gap-2"
//           >
//             {submitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Submitting...
//               </>
//             ) : todaySubmission ? (
//               'Already Submitted Today'
//             ) : (
//               'Submit Work'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ============ Work History ============
// const WorkHistory = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchHistory();
//   }, [page, filter]);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit: 10 };
//       if (filter) params.status = filter;
//       const data = await getMyWorkHistoryApi(params);
//       setSubmissions(data.submissions || []);
//       setTotalPages(data.totalPages || 1);
//     } catch (error) {
//       toast.error('Failed to load history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     APPROVED: 'bg-green-100 text-green-800 border-green-300',
//     REJECTED: 'bg-red-100 text-red-800 border-red-300',
//     PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-primary">Work History</h1>
//         <select
//           value={filter}
//           onChange={(e) => {
//             setFilter(e.target.value);
//             setPage(1);
//           }}
//           className="input-field md:w-48"
//         >
//           <option value="">All Status</option>
//           <option value="PENDING">Pending</option>
//           <option value="APPROVED">Approved</option>
//           <option value="REJECTED">Rejected</option>
//         </select>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : submissions.length === 0 ? (
//         <div className="card text-center py-12">
//           <div className="text-4xl mb-3">📭</div>
//           <p className="text-gray-500">No submissions found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {submissions.map((sub) => (
//             <div key={sub._id} className="card">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <img
//                   src={sub.photoUrl}
//                   alt="Work"
//                   className="w-full md:w-32 h-32 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold text-primary">
//                         {format(new Date(sub.date), 'dd MMM yyyy')}
//                       </p>
//                       <p className="text-xs text-gray-500">{sub.workType}</p>
//                     </div>
//                     <span
//                       className={`text-xs font-bold px-3 py-1 rounded-full border ${
//                         statusColor[sub.status]
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-700 mt-2">{sub.description}</p>

//                   {sub.status === 'REJECTED' && sub.rejectionReason && (
//                     <div className="mt-3 bg-red-50 border-l-4 border-red-400 p-2 rounded">
//                       <p className="text-xs font-semibold text-red-800">
//                         Rejection Reason:
//                       </p>
//                       <p className="text-xs text-red-700">{sub.rejectionReason}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50"
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
//             {page} / {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 font-medium hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Attendance ============
// const EmployeeAttendance = () => {
//   const { user } = useAuth();
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year]);

//   const fetchAttendance = async () => {
//     if (!user?.employeeId) return;
//     setLoading(true);
//     try {
//       const data = await getMyAttendanceApi(user.employeeId, { month, year });
//       setAttendance(data.attendance || []);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     PRESENT: 'bg-green-500',
//     ABSENT: 'bg-red-500',
//     PENDING: 'bg-yellow-500',
//     HOLIDAY: 'bg-gray-400',
//   };

//   const present = attendance.filter((a) => a.status === 'PRESENT').length;
//   const absent = attendance.filter((a) => a.status === 'ABSENT').length;
//   const pending = attendance.filter((a) => a.status === 'PENDING').length;

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December',
//   ];

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">My Attendance</h1>

//       <div className="card mb-6">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <label className="label">Month</label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(parseInt(e.target.value))}
//               className="input-field"
//             >
//               {months.map((m, i) => (
//                 <option key={i} value={i + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="label">Year</label>
//             <select
//               value={year}
//               onChange={(e) => setYear(parseInt(e.target.value))}
//               className="input-field"
//             >
//               {[2024, 2025, 2026, 2027].map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="card bg-green-50 !p-3 border-l-4 border-green-500">
//             <p className="text-xs text-gray-600">Present</p>
//             <p className="text-2xl font-bold text-green-600">{present}</p>
//           </div>
//           <div className="card bg-red-50 !p-3 border-l-4 border-red-500">
//             <p className="text-xs text-gray-600">Absent</p>
//             <p className="text-2xl font-bold text-red-600">{absent}</p>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="card">
//           <div className="grid grid-cols-7 gap-2">
//             {attendance.map((record) => (
//               <div
//                 key={record._id}
//                 className={`aspect-square rounded-lg flex flex-col items-center justify-center text-white font-bold ${
//                   statusColor[record.status] || 'bg-gray-300'
//                 }`}
//               >
//                 <span className="text-xs">
//                   {new Date(record.date).getDate()}
//                 </span>
//                 <span className="text-[10px]">{record.status?.charAt(0)}</span>
//               </div>
//             ))}
//           </div>
//           {attendance.length === 0 && (
//             <p className="text-center text-gray-500 py-8">No records for this month</p>
//           )}
//           <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t">
//             <div className="flex items-center gap-2 text-xs">
//               <div className="w-3 h-3 bg-green-500 rounded" /> Present
//             </div>
//             <div className="flex items-center gap-2 text-xs">
//               <div className="w-3 h-3 bg-red-500 rounded" /> Absent
//             </div>
//             <div className="flex items-center gap-2 text-xs">
//               <div className="w-3 h-3 bg-yellow-500 rounded" /> Pending
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Profile ============
// const EmployeeProfile = () => {
//   const { user } = useAuth();

//   return (
//     <div className="p-4 md:p-8 max-w-2xl mx-auto">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">My Profile</h1>

//       <div className="card">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
//             {user?.name?.charAt(0)}
//           </div>
//           <h2 className="text-xl font-bold text-primary mt-3">{user?.name}</h2>
//           <span className="mt-2 text-xs bg-secondary text-white px-3 py-1 rounded-full font-semibold">
//             {user?.role}
//           </span>
//         </div>

//         <div className="space-y-4">
//           {[
//             { label: 'User ID', value: user?.userId },
//             { label: 'Employee Type', value: user?.employeeType },
//             { label: 'Designation', value: user?.designation },
//             { label: 'Mobile', value: user?.mobile },
//             {
//               label: 'Joining Date',
//               value: user?.joiningDate
//                 ? format(new Date(user.joiningDate), 'dd MMM yyyy')
//                 : 'N/A',
//             },
//             { label: 'CLF', value: user?.clfName || 'N/A' },
//             { label: 'Status', value: user?.status },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
//               <span className="text-sm font-semibold text-gray-500">
//                 {item.label}
//               </span>
//               <span className="text-sm font-bold text-primary text-right">
//                 {item.value || 'N/A'}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============ Main Routes ============
// const Employee = () => {
//   return (
//     <EmployeeLayout>
//       <Routes>
//         <Route path="dashboard" element={<EmployeeDashboard />} />
//         <Route path="submit" element={<SubmitWork />} />
//         <Route path="history" element={<WorkHistory />} />
//         <Route path="attendance" element={<EmployeeAttendance />} />
//         <Route path="profile" element={<EmployeeProfile />} />
//         <Route path="*" element={<Navigate to="dashboard" replace />} />
//       </Routes>
//     </EmployeeLayout>
//   );
// };

// export default Employee;






















// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import Loader from '../components/Loader';
// import { useAuth } from '../context/AuthContext';
// import { getMyProfileApi, getMyWorkHistoryApi, submitWorkApi } from '../api/employeeApi';
// import { getMyAttendanceApi } from '../api/employeeApi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const menuItems = [
//   { path: '/employee/dashboard', label: 'Dashboard', icon: '🏠' },
//   { path: '/employee/submit', label: 'Submit Work', icon: '📝' },
//   { path: '/employee/history', label: 'History', icon: '📋' },
//   { path: '/employee/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/employee/profile', label: 'Profile', icon: '👤' },
// ];

// const EmployeeLayout = ({ children }) => (
//   <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
//     <Sidebar menuItems={menuItems} title="Employee Panel" />
//     <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">{children}</div>
//     </main>
//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// // ============ Dashboard ============
// const EmployeeDashboard = () => {
//   const { user } = useAuth();
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getMyProfileApi();
//         setSummary(data.user);
//       } catch (error) {
//         // Ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Loader />;

//   const greeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
//         <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-zinc-700/20 rounded-full blur-2xl pointer-events-none" />
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//           {greeting()}, {user?.name}! 👋
//         </h1>
//         <p className="text-zinc-400 text-sm mt-2 font-medium">
//           {user?.employeeType} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Today's Attendance</p>
//           <p className="text-2xl font-bold text-amber-400 mt-1">Pending</p>
//         </div>
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-emerald-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Employee Type</p>
//           <p className="text-2xl font-bold text-emerald-400 mt-1">{user?.employeeType || 'N/A'}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a href="/employee/submit" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📝</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Submit Work</h3>
//           <p className="text-xs text-zinc-400 mt-1">Upload today's work</p>
//         </a>
//         <a href="/employee/history" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Work History</h3>
//           <p className="text-xs text-zinc-400 mt-1">View past submissions</p>
//         </a>
//         <a href="/employee/attendance" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Attendance</h3>
//           <p className="text-xs text-zinc-400 mt-1">View monthly attendance</p>
//         </a>
//       </div>
//     </div>
//   );
// };

// // ============ Submit Work ============
// const SubmitWork = () => {
//   const [formData, setFormData] = useState({
//     description: '',
//     workType: 'SHG Meeting',
//     photo: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [todaySubmission, setTodaySubmission] = useState(null);

//   useEffect(() => {
//     checkTodaySubmission();
//   }, []);

//   const checkTodaySubmission = async () => {
//     try {
//       const data = await getMyWorkHistoryApi({ limit: 5 });
//       const today = new Date().toDateString();
//       const todaySub = data.submissions?.find(
//         (s) => new Date(s.date).toDateString() === today
//       );
//       setTodaySubmission(todaySub);
//     } catch (error) {
//       // Ignore
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Photo size must be less than 5MB');
//         return;
//       }
//       setFormData({ ...formData, photo: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.description.length < 10) {
//       toast.error('Description must be at least 10 characters');
//       return;
//     }

//     if (!formData.photo) {
//       toast.error('Please upload a photo');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const data = new FormData();
//       data.append('description', formData.description);
//       data.append('workType', formData.workType);
//       data.append('photo', formData.photo);

//       const result = await submitWorkApi(data);

//       if (result.success) {
//         toast.success('Work submitted successfully!');
//         setFormData({ description: '', workType: 'SHG Meeting', photo: null });
//         setPreview(null);
//         checkTodaySubmission();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submission failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Submit Today's Work</h1>

//       {todaySubmission && (
//         <div className="bg-amber-950/40 border border-amber-800/80 p-4 rounded-2xl text-amber-200">
//           <p className="text-sm font-semibold flex items-center gap-2">
//             ⚠️ You have already submitted work today
//           </p>
//           <p className="text-xs text-amber-300/80 mt-1">
//             Status: <span className="font-bold uppercase tracking-wider">{todaySubmission.status}</span>
//           </p>
//         </div>
//       )}

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Date</label>
//             <input
//               type="text"
//               value={format(new Date(), 'dd-MM-yyyy')}
//               disabled
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed font-mono text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Type</label>
//             <select
//               value={formData.workType}
//               onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
//             >
//               <option className="bg-zinc-900 text-zinc-200">SHG Meeting</option>
//               <option className="bg-zinc-900 text-zinc-200">Training</option>
//               <option className="bg-zinc-900 text-zinc-200">Field Visit</option>
//               <option className="bg-zinc-900 text-zinc-200">Documentation</option>
//               <option className="bg-zinc-900 text-zinc-200">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Description *</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows="5"
//               placeholder="Describe your work in detail (minimum 10 characters)..."
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none text-sm"
//               required
//               minLength={10}
//             />
//             <p className="text-xs text-zinc-500 mt-1">
//               {formData.description.length}/10 characters
//             </p>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Photo *</label>
//             <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 text-center transition-colors bg-zinc-950/50">
//               {preview ? (
//                 <div>
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="max-h-60 mx-auto rounded-xl shadow-lg border border-zinc-800 object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setFormData({ ...formData, photo: null });
//                       setPreview(null);
//                     }}
//                     className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
//                   >
//                     Remove Photo
//                   </button>
//                 </div>
//               ) : (
//                 <label className="cursor-pointer block">
//                   <div className="text-4xl mb-2">📷</div>
//                   <p className="text-sm font-semibold text-zinc-200">
//                     Click to upload photo
//                   </p>
//                   <p className="text-xs text-zinc-500 mt-1">
//                     JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={submitting || !!todaySubmission}
//             className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
//           >
//             {submitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Submitting...
//               </>
//             ) : todaySubmission ? (
//               'Already Submitted Today'
//             ) : (
//               'Submit Work'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ============ Work History ============
// const WorkHistory = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchHistory();
//   }, [page, filter]);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit: 10 };
//       if (filter) params.status = filter;
//       const data = await getMyWorkHistoryApi(params);
//       setSubmissions(data.submissions || []);
//       setTotalPages(data.totalPages || 1);
//     } catch (error) {
//       toast.error('Failed to load history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     APPROVED: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
//     REJECTED: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
//     PENDING: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Work History</h1>
//         <select
//           value={filter}
//           onChange={(e) => {
//             setFilter(e.target.value);
//             setPage(1);
//           }}
//           className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 md:w-48"
//         >
//           <option value="" className="bg-zinc-900">All Status</option>
//           <option value="PENDING" className="bg-zinc-900">Pending</option>
//           <option value="APPROVED" className="bg-zinc-900">Approved</option>
//           <option value="REJECTED" className="bg-zinc-900">Rejected</option>
//         </select>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : submissions.length === 0 ? (
//         <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl text-center py-12">
//           <div className="text-4xl mb-3">📭</div>
//           <p className="text-zinc-400 font-medium">No submissions found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {submissions.map((sub) => (
//             <div key={sub._id} className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl shadow-md">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <img
//                   src={sub.photoUrl}
//                   alt="Work"
//                   className="w-full md:w-32 h-32 object-cover rounded-xl border border-zinc-800"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold text-zinc-200">
//                         {format(new Date(sub.date), 'dd MMM yyyy')}
//                       </p>
//                       <p className="text-xs text-zinc-400">{sub.workType}</p>
//                     </div>
//                     <span
//                       className={`text-xs font-bold px-3 py-1 rounded-full border ${
//                         statusColor[sub.status]
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-zinc-300 mt-2">{sub.description}</p>

//                   {sub.status === 'REJECTED' && sub.rejectionReason && (
//                     <div className="mt-3 bg-rose-950/40 border border-rose-800/80 p-3 rounded-xl">
//                       <p className="text-xs font-semibold text-rose-400">
//                         Rejection Reason:
//                       </p>
//                       <p className="text-xs text-rose-300/80 mt-1">{sub.rejectionReason}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2 bg-zinc-800 text-white rounded-xl font-medium text-sm border border-zinc-700">
//             {page} / {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Attendance ============
// const EmployeeAttendance = () => {
//   const { user } = useAuth();
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year]);

//   const fetchAttendance = async () => {
//     if (!user?.employeeId) return;
//     setLoading(true);
//     try {
//       const data = await getMyAttendanceApi(user.employeeId, { month, year });
//       setAttendance(data.attendance || []);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     PRESENT: 'bg-emerald-600',
//     ABSENT: 'bg-rose-600',
//     PENDING: 'bg-amber-600',
//     HOLIDAY: 'bg-zinc-700',
//   };

//   const present = attendance.filter((a) => a.status === 'PRESENT').length;
//   const absent = attendance.filter((a) => a.status === 'ABSENT').length;

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December',
//   ];

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Attendance</h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Month</label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(parseInt(e.target.value))}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
//             >
//               {months.map((m, i) => (
//                 <option key={i} value={i + 1} className="bg-zinc-900">
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Year</label>
//             <select
//               value={year}
//               onChange={(e) => setYear(parseInt(e.target.value))}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
//             >
//               {[2024, 2025, 2026, 2027].map((y) => (
//                 <option key={y} value={y} className="bg-zinc-900">
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="bg-zinc-950 border-l-4 border-l-emerald-500 p-3 rounded-xl border border-zinc-800/80">
//             <p className="text-xs text-zinc-400">Present</p>
//             <p className="text-2xl font-bold text-emerald-400">{present}</p>
//           </div>
//           <div className="bg-zinc-950 border-l-4 border-l-rose-500 p-3 rounded-xl border border-zinc-800/80">
//             <p className="text-xs text-zinc-400">Absent</p>
//             <p className="text-2xl font-bold text-rose-400">{absent}</p>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
//           <div className="grid grid-cols-7 gap-2">
//             {attendance.map((record) => (
//               <div
//                 key={record._id}
//                 className={`aspect-square rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-sm ${
//                   statusColor[record.status] || 'bg-zinc-800'
//                 }`}
//               >
//                 <span className="text-xs">
//                   {new Date(record.date).getDate()}
//                 </span>
//                 <span className="text-[10px] opacity-80">{record.status?.charAt(0)}</span>
//               </div>
//             ))}
//           </div>
//           {attendance.length === 0 && (
//             <p className="text-center text-zinc-500 py-8 text-sm">No records for this month</p>
//           )}
//           <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-zinc-800">
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-emerald-500 rounded" /> Present
//             </div>
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-rose-500 rounded" /> Absent
//             </div>
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-amber-500 rounded" /> Pending
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Profile ============
// const EmployeeProfile = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Profile</h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         <div className="flex flex-col items-center mb-6 border-b border-zinc-800 pb-6">
//           <div className="w-24 h-24 bg-zinc-800 border border-zinc-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
//             {user?.name?.charAt(0)}
//           </div>
//           <h2 className="text-xl font-bold text-zinc-100 mt-4">{user?.name}</h2>
//           <span className="mt-2 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-semibold">
//             {user?.role}
//           </span>
//         </div>

//         <div className="space-y-4">
//           {[
//             { label: 'User ID', value: user?.userId },
//             { label: 'Employee Type', value: user?.employeeType },
//             { label: 'Designation', value: user?.designation },
//             { label: 'Mobile', value: user?.mobile },
//             {
//               label: 'Joining Date',
//               value: user?.joiningDate
//                 ? format(new Date(user.joiningDate), 'dd MMM yyyy')
//                 : 'N/A',
//             },
//             { label: 'CLF', value: user?.clfName || 'N/A' },
//             { label: 'Status', value: user?.status },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
//               <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
//                 {item.label}
//               </span>
//               <span className="text-sm font-bold text-zinc-200 text-right">
//                 {item.value || 'N/A'}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 pt-6 border-t border-zinc-800">
//           <button
//             onClick={logout}
//             className="w-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
//           >
//             <span className="text-base">🚪</span> Logout Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============ Main Routes ============
// const Employee = () => {
//   return (
//     <EmployeeLayout>
//       <Routes>
//         <Route path="dashboard" element={<EmployeeDashboard />} />
//         <Route path="submit" element={<SubmitWork />} />
//         <Route path="history" element={<WorkHistory />} />
//         <Route path="attendance" element={<EmployeeAttendance />} />
//         <Route path="profile" element={<EmployeeProfile />} />
//         <Route path="*" element={<Navigate to="dashboard" replace />} />
//       </Routes>
//     </EmployeeLayout>
//   );
// };

// export default Employee;



// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Sidebar from '../components/Sidebar';
// import BottomNavbar from '../components/BottomNavbar';
// import Loader from '../components/Loader';
// import { useAuth } from '../context/AuthContext';
// import { getMyProfileApi, getMyWorkHistoryApi, submitWorkApi } from '../api/employeeApi';
// import { getMyAttendanceApi } from '../api/employeeApi';
// import { uploadProfilePictureApi, removeProfilePictureApi } from '../api/authApi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const menuItems = [
//   { path: '/employee/dashboard', label: 'Dashboard', icon: '🏠' },
//   { path: '/employee/submit', label: 'Submit Work', icon: '📝' },
//   { path: '/employee/history', label: 'History', icon: '📋' },
//   { path: '/employee/attendance', label: 'Attendance', icon: '📅' },
//   { path: '/employee/profile', label: 'Profile', icon: '👤' },
// ];

// const EmployeeLayout = ({ children }) => (
//   <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
//     <Sidebar menuItems={menuItems} title="Employee Panel" />
//     <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">{children}</div>
//     </main>
//     <BottomNavbar menuItems={menuItems} />
//   </div>
// );

// // ============ Dashboard ============
// const EmployeeDashboard = () => {
//   const { user } = useAuth();
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getMyProfileApi();
//         setSummary(data.user);
//       } catch (error) {
//         // Ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <Loader />;

//   const greeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
//         <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-zinc-700/20 rounded-full blur-2xl pointer-events-none" />
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
//           {greeting()}, {user?.name}! 👋
//         </h1>
//         <p className="text-zinc-400 text-sm mt-2 font-medium">
//           {user?.employeeType} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Today's Attendance</p>
//           <p className="text-2xl font-bold text-amber-400 mt-1">Pending</p>
//         </div>
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-emerald-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Employee Type</p>
//           <p className="text-2xl font-bold text-emerald-400 mt-1">{user?.employeeType || 'N/A'}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a href="/employee/submit" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📝</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Submit Work</h3>
//           <p className="text-xs text-zinc-400 mt-1">Upload today's work</p>
//         </a>
//         <a href="/employee/history" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Work History</h3>
//           <p className="text-xs text-zinc-400 mt-1">View past submissions</p>
//         </a>
//         <a href="/employee/attendance" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Attendance</h3>
//           <p className="text-xs text-zinc-400 mt-1">View monthly attendance</p>
//         </a>
//       </div>
//     </div>
//   );
// };

// // ============ Submit Work ============
// const SubmitWork = () => {
//   const [formData, setFormData] = useState({
//     description: '',
//     workType: 'SHG Meeting',
//     photo: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [todaySubmission, setTodaySubmission] = useState(null);

//   useEffect(() => {
//     checkTodaySubmission();
//   }, []);

//   const checkTodaySubmission = async () => {
//     try {
//       const data = await getMyWorkHistoryApi({ limit: 5 });
//       const today = new Date().toDateString();
//       const todaySub = data.submissions?.find(
//         (s) => new Date(s.date).toDateString() === today
//       );
//       setTodaySubmission(todaySub);
//     } catch (error) {
//       // Ignore
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Photo size must be less than 5MB');
//         return;
//       }
//       setFormData({ ...formData, photo: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.description.length < 10) {
//       toast.error('Description must be at least 10 characters');
//       return;
//     }

//     if (!formData.photo) {
//       toast.error('Please upload a photo');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const data = new FormData();
//       data.append('description', formData.description);
//       data.append('workType', formData.workType);
//       data.append('photo', formData.photo);

//       const result = await submitWorkApi(data);

//       if (result.success) {
//         toast.success('Work submitted successfully!');
//         setFormData({ description: '', workType: 'SHG Meeting', photo: null });
//         setPreview(null);
//         checkTodaySubmission();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submission failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Submit Today's Work</h1>

//       {todaySubmission && (
//         <div className="bg-amber-950/40 border border-amber-800/80 p-4 rounded-2xl text-amber-200">
//           <p className="text-sm font-semibold flex items-center gap-2">
//             ⚠️ You have already submitted work today
//           </p>
//           <p className="text-xs text-amber-300/80 mt-1">
//             Status: <span className="font-bold uppercase tracking-wider">{todaySubmission.status}</span>
//           </p>
//         </div>
//       )}

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Date</label>
//             <input
//               type="text"
//               value={format(new Date(), 'dd-MM-yyyy')}
//               disabled
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed font-mono text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Type</label>
//             <select
//               value={formData.workType}
//               onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
//             >
//               <option className="bg-zinc-900 text-zinc-200">SHG Meeting</option>
//               <option className="bg-zinc-900 text-zinc-200">Training</option>
//               <option className="bg-zinc-900 text-zinc-200">Field Visit</option>
//               <option className="bg-zinc-900 text-zinc-200">Documentation</option>
//               <option className="bg-zinc-900 text-zinc-200">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Description *</label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows="5"
//               placeholder="Describe your work in detail (minimum 10 characters)..."
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none text-sm"
//               required
//               minLength={10}
//             />
//             <p className="text-xs text-zinc-500 mt-1">
//               {formData.description.length}/10 characters
//             </p>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Photo *</label>
//             <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 text-center transition-colors bg-zinc-950/50">
//               {preview ? (
//                 <div>
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="max-h-60 mx-auto rounded-xl shadow-lg border border-zinc-800 object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setFormData({ ...formData, photo: null });
//                       setPreview(null);
//                     }}
//                     className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
//                   >
//                     Remove Photo
//                   </button>
//                 </div>
//               ) : (
//                 <label className="cursor-pointer block">
//                   <div className="text-4xl mb-2">📷</div>
//                   <p className="text-sm font-semibold text-zinc-200">
//                     Click to upload photo
//                   </p>
//                   <p className="text-xs text-zinc-500 mt-1">
//                     JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={submitting || !!todaySubmission}
//             className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
//           >
//             {submitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Submitting...
//               </>
//             ) : todaySubmission ? (
//               'Already Submitted Today'
//             ) : (
//               'Submit Work'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // ============ Work History ============
// const WorkHistory = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchHistory();
//   }, [page, filter]);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit: 10 };
//       if (filter) params.status = filter;
//       const data = await getMyWorkHistoryApi(params);
//       setSubmissions(data.submissions || []);
//       setTotalPages(data.totalPages || 1);
//     } catch (error) {
//       toast.error('Failed to load history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     APPROVED: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
//     REJECTED: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
//     PENDING: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Work History</h1>
//         <select
//           value={filter}
//           onChange={(e) => {
//             setFilter(e.target.value);
//             setPage(1);
//           }}
//           className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 md:w-48"
//         >
//           <option value="" className="bg-zinc-900">All Status</option>
//           <option value="PENDING" className="bg-zinc-900">Pending</option>
//           <option value="APPROVED" className="bg-zinc-900">Approved</option>
//           <option value="REJECTED" className="bg-zinc-900">Rejected</option>
//         </select>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : submissions.length === 0 ? (
//         <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl text-center py-12">
//           <div className="text-4xl mb-3">📭</div>
//           <p className="text-zinc-400 font-medium">No submissions found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {submissions.map((sub) => (
//             <div key={sub._id} className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl shadow-md">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <img
//                   src={sub.photoUrl}
//                   alt="Work"
//                   className="w-full md:w-32 h-32 object-cover rounded-xl border border-zinc-800"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold text-zinc-200">
//                         {format(new Date(sub.date), 'dd MMM yyyy')}
//                       </p>
//                       <p className="text-xs text-zinc-400">{sub.workType}</p>
//                     </div>
//                     <span
//                       className={`text-xs font-bold px-3 py-1 rounded-full border ${
//                         statusColor[sub.status]
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-zinc-300 mt-2">{sub.description}</p>

//                   {sub.status === 'REJECTED' && sub.rejectionReason && (
//                     <div className="mt-3 bg-rose-950/40 border border-rose-800/80 p-3 rounded-xl">
//                       <p className="text-xs font-semibold text-rose-400">
//                         Rejection Reason:
//                       </p>
//                       <p className="text-xs text-rose-300/80 mt-1">{sub.rejectionReason}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2 bg-zinc-800 text-white rounded-xl font-medium text-sm border border-zinc-700">
//             {page} / {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Attendance ============
// const EmployeeAttendance = () => {
//   const { user } = useAuth();
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year]);

//   const fetchAttendance = async () => {
//     if (!user?.employeeId) return;
//     setLoading(true);
//     try {
//       const data = await getMyAttendanceApi(user.employeeId, { month, year });
//       setAttendance(data.attendance || []);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     PRESENT: 'bg-emerald-600',
//     ABSENT: 'bg-rose-600',
//     PENDING: 'bg-amber-600',
//     HOLIDAY: 'bg-zinc-700',
//   };

//   const present = attendance.filter((a) => a.status === 'PRESENT').length;
//   const absent = attendance.filter((a) => a.status === 'ABSENT').length;

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December',
//   ];

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Attendance</h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Month</label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(parseInt(e.target.value))}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
//             >
//               {months.map((m, i) => (
//                 <option key={i} value={i + 1} className="bg-zinc-900">
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Year</label>
//             <select
//               value={year}
//               onChange={(e) => setYear(parseInt(e.target.value))}
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
//             >
//               {[2024, 2025, 2026, 2027].map((y) => (
//                 <option key={y} value={y} className="bg-zinc-900">
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="bg-zinc-950 border-l-4 border-l-emerald-500 p-3 rounded-xl border border-zinc-800/80">
//             <p className="text-xs text-zinc-400">Present</p>
//             <p className="text-2xl font-bold text-emerald-400">{present}</p>
//           </div>
//           <div className="bg-zinc-950 border-l-4 border-l-rose-500 p-3 rounded-xl border border-zinc-800/80">
//             <p className="text-xs text-zinc-400">Absent</p>
//             <p className="text-2xl font-bold text-rose-400">{absent}</p>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
//           <div className="grid grid-cols-7 gap-2">
//             {attendance.map((record) => (
//               <div
//                 key={record._id}
//                 className={`aspect-square rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-sm ${
//                   statusColor[record.status] || 'bg-zinc-800'
//                 }`}
//               >
//                 <span className="text-xs">
//                   {new Date(record.date).getDate()}
//                 </span>
//                 <span className="text-[10px] opacity-80">{record.status?.charAt(0)}</span>
//               </div>
//             ))}
//           </div>
//           {attendance.length === 0 && (
//             <p className="text-center text-zinc-500 py-8 text-sm">No records for this month</p>
//           )}
//           <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-zinc-800">
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-emerald-500 rounded" /> Present
//             </div>
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-rose-500 rounded" /> Absent
//             </div>
//             <div className="flex items-center gap-2 text-xs text-zinc-400">
//               <div className="w-3 h-3 bg-amber-500 rounded" /> Pending
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============ Profile ============
// const EmployeeProfile = () => {
//   const { user, logout } = useAuth();
//   const [uploading, setUploading] = useState(false);
//   const [profilePic, setProfilePic] = useState(user?.profilePicture || null);

//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Photo must be less than 2MB');
//       return;
//     }
//     if (!file.type.startsWith('image/')) {
//       toast.error('Only image files allowed');
//       return;
//     }

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('photo', file);

//       const result = await uploadProfilePictureApi(formData);

//       if (result.success) {
//         setProfilePic(result.profilePicture);
//         toast.success('Profile picture updated!');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemovePhoto = async () => {
//     if (!window.confirm('Remove profile picture?')) return;

//     setUploading(true);
//     try {
//       const result = await removeProfilePictureApi();
//       if (result.success) {
//         setProfilePic(null);
//         toast.success('Profile picture removed');
//       }
//     } catch (error) {
//       toast.error('Remove failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Profile</h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         <div className="flex flex-col items-center mb-6 border-b border-zinc-800 pb-6">
//           {/* Profile Picture with Upload */}
//           <div className="relative group">
//             <div className="w-32 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg overflow-hidden">
//               {profilePic ? (
//                 <img
//                   src={profilePic}
//                   alt={user?.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 user?.name?.charAt(0)
//               )}
//             </div>

//             {/* Camera Overlay */}
//             <label
//               className={`absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-opacity ${
//                 uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
//               }`}
//             >
//               {uploading ? (
//                 <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <span className="text-2xl">📷</span>
//                   <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
//                     Change
//                   </span>
//                 </>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="hidden"
//                 disabled={uploading}
//               />
//             </label>
//           </div>

//           {/* Remove Button */}
//           {profilePic && !uploading && (
//             <button
//               onClick={handleRemovePhoto}
//               className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
//             >
//               Remove Photo
//             </button>
//           )}

//           <h2 className="text-xl font-bold text-zinc-100 mt-4">{user?.name}</h2>
//           <span className="mt-2 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-semibold">
//             {user?.role}
//           </span>
//         </div>

//         <div className="space-y-4">
//           {[
//             { label: 'User ID', value: user?.userId },
//             { label: 'Employee Type', value: user?.employeeType },
//             { label: 'Designation', value: user?.designation },
//             { label: 'Mobile', value: user?.mobile },
//             {
//               label: 'Joining Date',
//               value: user?.joiningDate
//                 ? format(new Date(user.joiningDate), 'dd MMM yyyy')
//                 : 'N/A',
//             },
//             { label: 'CLF', value: user?.clfName || 'N/A' },
//             { label: 'Status', value: user?.status },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
//               <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
//                 {item.label}
//               </span>
//               <span className="text-sm font-bold text-zinc-200 text-right">
//                 {item.value || 'N/A'}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 pt-6 border-t border-zinc-800">
//           <button
//             onClick={logout}
//             className="w-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
//           >
//             <span className="text-base">🚪</span> Logout Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============ Main Routes ============
// const Employee = () => {
//   return (
//     <EmployeeLayout>
//       <Routes>
//         <Route path="dashboard" element={<EmployeeDashboard />} />
//         <Route path="submit" element={<SubmitWork />} />
//         <Route path="history" element={<WorkHistory />} />
//         <Route path="attendance" element={<EmployeeAttendance />} />
//         <Route path="profile" element={<EmployeeProfile />} />
//         <Route path="*" element={<Navigate to="dashboard" replace />} />
//       </Routes>
//     </EmployeeLayout>
//   );
// };

// export default Employee;


import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNavbar from '../components/BottomNavbar';
import EmployeeDashboard from '../employee/EmployeeDashboard';
import SubmitWork from '../employee/SubmitWork';
import WorkHistory from '../employee/WorkHistory';
import EmployeeAttendance from '../employee/EmployeeAttendance';
import EmployeeProfile from '../employee/EmployeeProfile';

const menuItems = [
  { path: '/employee/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/employee/submit', label: 'Submit Work', icon: '📝' },
  { path: '/employee/history', label: 'History', icon: '📋' },
  { path: '/employee/attendance', label: 'Attendance', icon: '📅' },
  { path: '/employee/profile', label: 'Profile', icon: '👤' },
];

const EmployeeLayout = ({ children }) => (
  <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
    <Sidebar menuItems={menuItems} title="Employee Panel" />
    <main className="md:ml-16 p-4 md:p-6 pb-24 md:pb-6 min-h-screen">
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
    <BottomNavbar menuItems={menuItems} />
  </div>
);

const Employee = () => {
  return (
    <EmployeeLayout>
      <Routes>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="submit" element={<SubmitWork />} />
        <Route path="history" element={<WorkHistory />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </EmployeeLayout>
  );
};

export default Employee;