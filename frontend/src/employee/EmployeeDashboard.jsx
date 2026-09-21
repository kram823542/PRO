// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getMyProfileApi } from '../api/employeeApi';
// import Loader from '../components/Loader';

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
//           {user?.employeeType} •{' '}
//           {new Date().toLocaleDateString('en-IN', {
//             weekday: 'long',
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric',
//           })}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
//             Today's Attendance
//           </p>
//           <p className="text-2xl font-bold text-amber-400 mt-1">Pending</p>
//         </div>
//         <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-emerald-500 shadow-md">
//           <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
//             Employee Type
//           </p>
//           <p className="text-2xl font-bold text-emerald-400 mt-1">
//             {user?.employeeType || 'N/A'}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a
//           href="/employee/submit"
//           className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md"
//         >
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📝</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">
//             Submit Work
//           </h3>
//           <p className="text-xs text-zinc-400 mt-1">Upload today's work</p>
//         </a>
//         <a
//           href="/employee/history"
//           className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md"
//         >
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">
//             Work History
//           </h3>
//           <p className="text-xs text-zinc-400 mt-1">View past submissions</p>
//         </a>
//         <a
//           href="/employee/attendance"
//           className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md"
//         >
//           <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
//           <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">
//             Attendance
//           </h3>
//           <p className="text-xs text-zinc-400 mt-1">View monthly attendance</p>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyProfileApi } from '../api/employeeApi';
import Loader from '../components/Loader';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyProfileApi();
        setSummary(data.user);
      } catch (error) {
        // Ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-zinc-700/20 rounded-full blur-2xl pointer-events-none" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {greeting()}, {user?.name}! 👋
        </h1>
        <p className="text-zinc-400 text-sm mt-2 font-medium">
          {user?.employeeType} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-md">
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Today's Attendance</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">Pending</p>
        </div>
        <div className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl border-l-4 border-l-emerald-500 shadow-md">
          <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Employee Type</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{user?.employeeType || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/employee/submit" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📝</div>
          <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Submit Work</h3>
          <p className="text-xs text-zinc-400 mt-1">Upload today's work</p>
        </a>
        <a href="/employee/history" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📋</div>
          <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Work History</h3>
          <p className="text-xs text-zinc-400 mt-1">View past submissions</p>
        </a>
        <a href="/employee/attendance" className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all text-center group shadow-md">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📅</div>
          <h3 className="font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors">Attendance</h3>
          <p className="text-xs text-zinc-400 mt-1">View monthly attendance</p>
        </a>
      </div>
    </div>
  );
};

export default EmployeeDashboard;