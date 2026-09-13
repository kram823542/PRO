// // import { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { getAttendanceSummaryApi } from '../api/adminApi';
// // import { getClfsApi } from '../api/adminApi';
// // import { getEmployeesApi } from '../api/adminApi';
// // import Loader from '../components/Loader';
// // import toast from 'react-hot-toast';

// // const AdminSuperDashboard = () => {
// //   const { user } = useAuth();
// //   const [summary, setSummary] = useState(null);
// //   const [stats, setStats] = useState({ clfs: 0, employees: 0 });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchAll();
// //   }, []);

// //   const fetchAll = async () => {
// //     try {
// //       const [sumRes, clfsRes, empRes] = await Promise.all([
// //         getAttendanceSummaryApi(),
// //         getClfsApi(),
// //         getEmployeesApi({ status: 'ACTIVE' }),
// //       ]);
// //       setSummary(sumRes.summary);
// //       setStats({
// //         clfs: clfsRes.count || 0,
// //         employees: empRes.count || 0,
// //       });
// //     } catch (error) {
// //       toast.error('Failed to load dashboard');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <Loader />;

// //   return (
// //     <div className="p-4 md:p-8">
// //       <div className="mb-6">
// //         <h1 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h1>
// //         <p className="text-sm text-gray-500 mt-1">Welcome, {user?.name}</p>
// //       </div>

// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
// //         <div className="card border-l-4 border-secondary">
// //           <p className="text-xs text-gray-500 font-semibold uppercase">Total CLFs</p>
// //           <p className="text-2xl md:text-3xl font-bold text-primary mt-2">
// //             {stats.clfs}
// //           </p>
// //         </div>
// //         <div className="card border-l-4 border-blue-500">
// //           <p className="text-xs text-gray-500 font-semibold uppercase">Total Employees</p>
// //           <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">
// //             {stats.employees}
// //           </p>
// //         </div>
// //         <div className="card border-l-4 border-green-500">
// //           <p className="text-xs text-gray-500 font-semibold uppercase">Present Today</p>
// //           <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
// //             {summary?.presentToday || 0}
// //           </p>
// //         </div>
// //         <div className="card border-l-4 border-yellow-500">
// //           <p className="text-xs text-gray-500 font-semibold uppercase">
// //             Pending Approvals
// //           </p>
// //           <p className="text-2xl md:text-3xl font-bold text-yellow-600 mt-2">
// //             {summary?.pendingApprovals || 0}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <a
// //           href="/admin-super/clfs"
// //           className="card hover:scale-105 transition-transform cursor-pointer"
// //         >
// //           <div className="text-4xl mb-3">🏢</div>
// //           <h3 className="font-bold text-primary">Manage CLFs</h3>
// //           <p className="text-sm text-gray-500 mt-1">Add, edit CLFs</p>
// //         </a>
// //         <a
// //           href="/admin-super/submissions"
// //           className="card hover:scale-105 transition-transform cursor-pointer"
// //         >
// //           <div className="text-4xl mb-3">✅</div>
// //           <h3 className="font-bold text-primary">Pending Approvals</h3>
// //           <p className="text-sm text-gray-500 mt-1">{summary?.pendingApprovals || 0} pending</p>
// //         </a>
// //         <a
// //           href="/admin-super/reports"
// //           className="card hover:scale-105 transition-transform cursor-pointer"
// //         >
// //           <div className="text-4xl mb-3">📈</div>
// //           <h3 className="font-bold text-primary">Reports</h3>
// //           <p className="text-sm text-gray-500 mt-1">Excel downloads</p>
// //         </a>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSuperDashboard;

// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getAttendanceSummaryApi } from '../api/adminApi';
// import { getClfsApi } from '../api/adminApi';
// import { getEmployeesApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const AdminSuperDashboard = () => {
//   const { user } = useAuth();
//   const [summary, setSummary] = useState(null);
//   const [stats, setStats] = useState({ clfs: 0, employees: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     try {
//       const [sumRes, clfsRes, empRes] = await Promise.all([
//         getAttendanceSummaryApi(),
//         getClfsApi(),
//         getEmployeesApi({ status: 'ACTIVE' }),
//       ]);
//       setSummary(sumRes.summary);
//       setStats({
//         clfs: clfsRes.count || 0,
//         employees: empRes.count || 0,
//       });
//     } catch (error) {
//       toast.error('Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 md:p-8">
//       {/* Header Banner */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-800/60 backdrop-blur-md border border-slate-700/60 p-5 sm:p-6 rounded-2xl shadow-lg">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//             Dashboard
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             Welcome back, <span className="text-indigo-400 font-semibold">{user?.name || 'Admin'}</span> 👋
//           </p>
//         </div>
//         <div className="self-start sm:self-auto bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-medium text-indigo-300">
//           Super Admin Console
//         </div>
//       </div>

//       {/* Metric Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
//         {/* Total CLFs */}
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
//           <div className="flex items-center justify-between">
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Total CLFs
//             </p>
//             <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//           </div>
//           <p className="text-3xl font-extrabold text-white mt-3">
//             {stats.clfs}
//           </p>
//         </div>

//         {/* Total Employees */}
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/10">
//           <div className="flex items-center justify-between">
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Total Employees
//             </p>
//             <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </div>
//           </div>
//           <p className="text-3xl font-extrabold text-blue-400 mt-3">
//             {stats.employees}
//           </p>
//         </div>

//         {/* Present Today */}
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/10">
//           <div className="flex items-center justify-between">
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Present Today
//             </p>
//             <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//           <p className="text-3xl font-extrabold text-emerald-400 mt-3">
//             {summary?.presentToday || 0}
//           </p>
//         </div>

//         {/* Pending Approvals */}
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-amber-500/10">
//           <div className="flex items-center justify-between">
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
//               Pending Approvals
//             </p>
//             <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//           <p className="text-3xl font-extrabold text-amber-400 mt-3">
//             {summary?.pendingApprovals || 0}
//           </p>
//         </div>
//       </div>

//       {/* Quick Action Navigation Grid */}
//       <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
//         <a
//           href="/admin-super/clfs"
//           className="group bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
//         >
//           <div>
//             <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
//               🏢
//             </div>
//             <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
//               Manage CLFs
//             </h3>
//             <p className="text-sm text-slate-400 mt-1">Add, edit, and organize CLF entries</p>
//           </div>
//           <div className="mt-4 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
//             Go to CLFs &rarr;
//           </div>
//         </a>

//         <a
//           href="/admin-super/submissions"
//           className="group bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between"
//         >
//           <div>
//             <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
//               ✅
//             </div>
//             <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
//               Pending Approvals
//             </h3>
//             <p className="text-sm text-slate-400 mt-1">
//               {summary?.pendingApprovals || 0} pending requests awaiting action
//             </p>
//           </div>
//           <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
//             Review Submissions &rarr;
//           </div>
//         </a>

//         <a
//           href="/admin-super/reports"
//           className="group bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
//         >
//           <div>
//             <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
//               📈
//             </div>
//             <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
//               Reports
//             </h3>
//             <p className="text-sm text-slate-400 mt-1">Generate and export Excel reports</p>
//           </div>
//           <div className="mt-4 flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
//             Download Reports &rarr;
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default AdminSuperDashboard;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAttendanceSummaryApi } from '../api/adminApi';
import { getClfsApi } from '../api/adminApi';
import { getEmployeesApi } from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AdminSuperDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState({ clfs: 0, employees: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [sumRes, clfsRes, empRes] = await Promise.all([
        getAttendanceSummaryApi(),
        getClfsApi(),
        getEmployeesApi({ status: 'ACTIVE' }),
      ]);
      setSummary(sumRes.summary);
      setStats({
        clfs: clfsRes.count || 0,
        employees: empRes.count || 0,
      });
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-zinc-900 border border-zinc-800 p-5 sm:p-6 rounded-xl shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome back, <span className="text-white font-semibold">{user?.name || 'Admin'}</span> 👋
          </p>
        </div>
        <div className="self-start sm:self-auto bg-zinc-800 border border-zinc-700 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300">
          Super Admin Console
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {/* Total CLFs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md transition-all duration-300 hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total CLFs
            </p>
            <div className="p-2.5 bg-zinc-800 text-zinc-200 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">
            {stats.clfs}
          </p>
        </div>

        {/* Total Employees */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md transition-all duration-300 hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total Employees
            </p>
            <div className="p-2.5 bg-zinc-800 text-zinc-200 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white mt-3">
            {stats.employees}
          </p>
        </div>

        {/* Present Today */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md transition-all duration-300 hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Present Today
            </p>
            <div className="p-2.5 bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 mt-3">
            {summary?.presentToday || 0}
          </p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md transition-all duration-300 hover:border-zinc-700">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Pending Approvals
            </p>
            <div className="p-2.5 bg-amber-950/50 text-amber-400 border border-amber-800/60 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-400 mt-3">
            {summary?.pendingApprovals || 0}
          </p>
        </div>
      </div>

      {/* Quick Actions Navigation Grid */}
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <a
          href="/admin-super/clfs"
          className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 text-white rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:bg-zinc-700 transition-all">
              🏢
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
              Manage CLFs
            </h3>
            <p className="text-sm text-zinc-400 mt-1">Add, edit, and organize CLF entries</p>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-zinc-300 group-hover:translate-x-1 transition-transform">
            Go to CLFs &rarr;
          </div>
        </a>

        <a
          href="/admin-super/submissions"
          className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 text-white rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:bg-zinc-700 transition-all">
              ✅
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
              Pending Approvals
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              {summary?.pendingApprovals || 0} pending requests awaiting action
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-zinc-300 group-hover:translate-x-1 transition-transform">
            Review Submissions &rarr;
          </div>
        </a>

        <a
          href="/admin-super/reports"
          className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700 hover:-translate-y-0.5 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 text-white rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:bg-zinc-700 transition-all">
              📈
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
              Reports
            </h3>
            <p className="text-sm text-zinc-400 mt-1">Generate and export Excel reports</p>
          </div>
          <div className="mt-4 flex items-center text-xs font-semibold text-zinc-300 group-hover:translate-x-1 transition-transform">
            Download Reports &rarr;
          </div>
        </a>
      </div>
    </div>
  );
};

export default AdminSuperDashboard;