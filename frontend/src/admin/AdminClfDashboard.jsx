// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getAttendanceSummaryApi, getPendingSubmissionsApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const AdminClfDashboard = () => {
//   const { user } = useAuth();
//   const [summary, setSummary] = useState(null);
//   const [pending, setPending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const [sumData, pendData] = await Promise.all([
//         getAttendanceSummaryApi(),
//         getPendingSubmissionsApi({ limit: 5 }),
//       ]);
//       setSummary(sumData.summary);
//       setPending(pendData.submissions || []);
//     } catch (error) {
//       toast.error('Failed to load dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="p-4 md:p-8">
//       <div className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Welcome back, {user?.name}
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="card border-l-4 border-secondary">
//           <p className="text-xs text-gray-500 font-semibold uppercase">
//             Total Employees
//           </p>
//           <p className="text-2xl md:text-3xl font-bold text-primary mt-2">
//             {summary?.totalEmployees || 0}
//           </p>
//         </div>
//         <div className="card border-l-4 border-green-500">
//           <p className="text-xs text-gray-500 font-semibold uppercase">
//             Present Today
//           </p>
//           <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">
//             {summary?.presentToday || 0}
//           </p>
//         </div>
//         <div className="card border-l-4 border-red-500">
//           <p className="text-xs text-gray-500 font-semibold uppercase">
//             Absent Today
//           </p>
//           <p className="text-2xl md:text-3xl font-bold text-red-600 mt-2">
//             {summary?.absentToday || 0}
//           </p>
//         </div>
//         <div className="card border-l-4 border-yellow-500">
//           <p className="text-xs text-gray-500 font-semibold uppercase">
//             Pending Approvals
//           </p>
//           <p className="text-2xl md:text-3xl font-bold text-yellow-600 mt-2">
//             {summary?.pendingApprovals || 0}
//           </p>
//         </div>
//       </div>

//       {/* Recent Pending */}
//       <div className="card">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold text-primary">Recent Pending Approvals</h2>
//           <a
//             href="/admin-clf/submissions"
//             className="text-sm text-secondary hover:text-primary font-semibold"
//           >
//             View All →
//           </a>
//         </div>

//         {pending.length === 0 ? (
//           <p className="text-center text-gray-500 py-8">No pending submissions 🎉</p>
//         ) : (
//           <div className="space-y-3">
//             {pending.map((sub) => (
//               <div
//                 key={sub._id}
//                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//               >
//                 <div>
//                   <p className="font-bold text-primary text-sm">
//                     {sub.employeeId?.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {sub.employeeId?.employeeType} •{' '}
//                     {format(new Date(sub.date), 'dd MMM yyyy')}
//                   </p>
//                 </div>
//                 <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
//                   PENDING
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminClfDashboard;





import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAttendanceSummaryApi, getPendingSubmissionsApi } from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminClfDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [sumData, pendData] = await Promise.all([
        getAttendanceSummaryApi(),
        getPendingSubmissionsApi({ limit: 5 }),
      ]);
      setSummary(sumData.summary);
      setPending(pendData.submissions || []);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl border-l-4 border-l-zinc-100 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Total Employees
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mt-2">
            {summary?.totalEmployees || 0}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl border-l-4 border-l-emerald-500 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Present Today
          </p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-400 mt-2">
            {summary?.presentToday || 0}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl border-l-4 border-l-red-500 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Absent Today
          </p>
          <p className="text-2xl md:text-3xl font-bold text-red-400 mt-2">
            {summary?.absentToday || 0}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Pending Approvals
          </p>
          <p className="text-2xl md:text-3xl font-bold text-amber-400 mt-2">
            {summary?.pendingApprovals || 0}
          </p>
        </div>
      </div>

      {/* Recent Pending */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Recent Pending Approvals</h2>
          <a
            href="/admin-clf/submissions"
            className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            View All →
          </a>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-10 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-zinc-400 font-medium text-sm">No pending submissions 🎉</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((sub) => (
              <div
                key={sub._id}
                className="flex items-center justify-between p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl hover:border-zinc-700 transition-colors"
              >
                <div>
                  <p className="font-bold text-zinc-200 text-sm">
                    {sub.employeeId?.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {sub.employeeId?.employeeType} •{' '}
                    {format(new Date(sub.date), 'dd MMM yyyy')}
                  </p>
                </div>
                <span className="text-xs bg-amber-950/40 text-amber-400 border border-amber-800/60 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  PENDING
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClfDashboard;