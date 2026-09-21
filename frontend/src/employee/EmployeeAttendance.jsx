// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getMyAttendanceApi } from '../api/employeeApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

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
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
//         My Attendance
//       </h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Month
//             </label>
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
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Year
//             </label>
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
//                 <span className="text-[10px] opacity-80">
//                   {record.status?.charAt(0)}
//                 </span>
//               </div>
//             ))}
//           </div>
//           {attendance.length === 0 && (
//             <p className="text-center text-zinc-500 py-8 text-sm">
//               No records for this month
//             </p>
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

// export default EmployeeAttendance;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyAttendanceApi } from '../api/employeeApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  const fetchAttendance = async () => {
    if (!user?.employeeId) return;
    setLoading(true);
    try {
      const data = await getMyAttendanceApi(user.employeeId, { month, year });
      setAttendance(data.attendance || []);
    } catch (error) {
      toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    PRESENT: 'bg-emerald-600',
    ABSENT: 'bg-rose-600',
    PENDING: 'bg-amber-600',
    HOLIDAY: 'bg-zinc-700',
  };

  const present = attendance.filter((a) => a.status === 'PRESENT').length;
  const absent = attendance.filter((a) => a.status === 'ABSENT').length;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Attendance</h1>

      <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1} className="bg-zinc-900">
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y} className="bg-zinc-900">
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-zinc-950 border-l-4 border-l-emerald-500 p-3 rounded-xl border border-zinc-800/80">
            <p className="text-xs text-zinc-400">Present</p>
            <p className="text-2xl font-bold text-emerald-400">{present}</p>
          </div>
          <div className="bg-zinc-950 border-l-4 border-l-rose-500 p-3 rounded-xl border border-zinc-800/80">
            <p className="text-xs text-zinc-400">Absent</p>
            <p className="text-2xl font-bold text-rose-400">{absent}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl shadow-xl">
          <div className="grid grid-cols-7 gap-2">
            {attendance.map((record) => (
              <div
                key={record._id}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-sm ${
                  statusColor[record.status] || 'bg-zinc-800'
                }`}
              >
                <span className="text-xs">
                  {new Date(record.date).getDate()}
                </span>
                <span className="text-[10px] opacity-80">{record.status?.charAt(0)}</span>
              </div>
            ))}
          </div>
          {attendance.length === 0 && (
            <p className="text-center text-zinc-500 py-8 text-sm">No records for this month</p>
          )}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-3 h-3 bg-emerald-500 rounded" /> Present
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-3 h-3 bg-rose-500 rounded" /> Absent
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-3 h-3 bg-amber-500 rounded" /> Pending
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;