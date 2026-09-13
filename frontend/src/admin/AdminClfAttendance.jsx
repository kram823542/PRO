// import { useState, useEffect } from 'react';
// import { getMonthlyAttendanceApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const AdminClfAttendance = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [employeeType, setEmployeeType] = useState('');

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year, employeeType]);

//   const fetchAttendance = async () => {
//     setLoading(true);
//     try {
//       const params = { month, year };
//       if (employeeType) params.employeeType = employeeType;
//       const res = await getMonthlyAttendanceApi(params);
//       setData(res.data || []);
//       setSummary(res.summary);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDaysInMonth = () => {
//     return new Date(year, month, 0).getDate();
//   };

//   const getStatusColor = (status) => {
//     if (status === 'PRESENT') return 'bg-green-500 text-white';
//     if (status === 'ABSENT') return 'bg-red-500 text-white';
//     if (status === 'PENDING') return 'bg-yellow-500 text-white';
//     return 'bg-gray-200 text-gray-500';
//   };

//   const getStatusLetter = (status) => {
//     if (status === 'PRESENT') return 'P';
//     if (status === 'ABSENT') return 'A';
//     if (status === 'PENDING') return '⏱';
//     return '-';
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
//         Monthly Attendance
//       </h1>

//       <div className="card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="label">Month</label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(parseInt(e.target.value))}
//               className="input-field"
//             >
//               {MONTHS.map((m, i) => (
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
//           <div>
//             <label className="label">Employee Type</label>
//             <select
//               value={employeeType}
//               onChange={(e) => setEmployeeType(e.target.value)}
//               className="input-field"
//             >
//               <option value="">All Types</option>
//               <option>CADER</option>
//               <option>Bank Sakhi</option>
//               <option>BDSP</option>
//               <option>FLCRP</option>
//               <option>Gender CRP</option>
//               <option>Setu</option>
//               <option>Senior Setu</option>
//             </select>
//           </div>
//         </div>

//         {summary && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
//             <div className="text-center">
//               <p className="text-xs text-gray-500 font-semibold">Total</p>
//               <p className="text-2xl font-bold text-primary">
//                 {summary.totalEmployees}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500 font-semibold">Present</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {summary.totalPresent}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500 font-semibold">Absent</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {summary.totalAbsent}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500 font-semibold">Pending</p>
//               <p className="text-2xl font-bold text-yellow-600">
//                 {summary.totalPending}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {loading ? (
//         <Loader />
//       ) : data.length === 0 ? (
//         <div className="card text-center py-12">
//           <p className="text-gray-500">No data for this month</p>
//         </div>
//       ) : (
//         <div className="card overflow-x-auto">
//           <table className="min-w-full text-xs">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-2 text-left sticky left-0 bg-primary z-10">
//                   Employee
//                 </th>
//                 <th className="p-2 text-left">Type</th>
//                 {Array.from({ length: getDaysInMonth() }).map((_, i) => (
//                   <th key={i} className="p-1 min-w-[32px]">
//                     {i + 1}
//                   </th>
//                 ))}
//                 <th className="p-2">P</th>
//                 <th className="p-2">A</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((emp) => (
//                 <tr key={emp.employeeId} className="border-b hover:bg-gray-50">
//                   <td className="p-2 font-semibold text-primary sticky left-0 bg-white z-10">
//                     {emp.name}
//                     <div className="text-[10px] text-gray-500 font-normal">
//                       {emp.userId}
//                     </div>
//                   </td>
//                   <td className="p-2 text-gray-700">{emp.employeeType}</td>
//                   {Array.from({ length: getDaysInMonth() }).map((_, i) => {
//                     const date = `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
//                     const status = emp.dailyStatus?.[date];
//                     return (
//                       <td
//                         key={i}
//                         className={`p-1 text-center font-bold ${getStatusColor(status)}`}
//                       >
//                         {getStatusLetter(status)}
//                       </td>
//                     );
//                   })}
//                   <td className="p-2 text-center font-bold text-green-600">
//                     {emp.present}
//                   </td>
//                   <td className="p-2 text-center font-bold text-red-600">
//                     {emp.absent}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-xs">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-green-500 rounded" /> Present (P)
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-red-500 rounded" /> Absent (A)
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-yellow-500 rounded" /> Pending
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminClfAttendance;




// import { useState, useEffect } from 'react';
// import { getMonthlyAttendanceApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const AdminClfAttendance = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [employeeType, setEmployeeType] = useState('');

//   useEffect(() => {
//     fetchAttendance();
//   }, [month, year, employeeType]);

//   const fetchAttendance = async () => {
//     setLoading(true);
//     try {
//       const params = { month, year };
//       if (employeeType) params.employeeType = employeeType;
//       const res = await getMonthlyAttendanceApi(params);
//       setData(res.data || []);
//       setSummary(res.summary);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDaysInMonth = () => {
//     return new Date(year, month, 0).getDate();
//   };

//   const getStatusColor = (status) => {
//     if (status === 'PRESENT') return 'bg-black text-white font-black';
//     if (status === 'ABSENT') return 'bg-neutral-200 text-neutral-800 font-bold';
//     if (status === 'PENDING') return 'bg-neutral-100 text-neutral-500 border border-dashed border-black';
//     return 'bg-white text-neutral-300';
//   };

//   const getStatusLetter = (status) => {
//     if (status === 'PRESENT') return 'P';
//     if (status === 'ABSENT') return 'A';
//     if (status === 'PENDING') return '⏱';
//     return '-';
//   };

//   return (
//     <div className="p-4 md:p-8 space-y-6 text-black">
//       {/* Header */}
//       <div className="bg-white border border-black p-6 rounded-2xl shadow-sm">
//         <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
//           Monthly Attendance
//         </h1>
//         <p className="text-neutral-600 text-sm font-medium mt-1">
//           Detailed monthly sheet and status breakdown
//         </p>
//       </div>

//       {/* Filter Options */}
//       <div className="bg-white border border-black p-5 rounded-2xl shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
//               Month
//             </label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(parseInt(e.target.value))}
//               className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none transition-colors"
//             >
//               {MONTHS.map((m, i) => (
//                 <option key={i} value={i + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
//               Year
//             </label>
//             <select
//               value={year}
//               onChange={(e) => setYear(parseInt(e.target.value))}
//               className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none transition-colors"
//             >
//               {[2024, 2025, 2026, 2027].map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
//               Employee Type
//             </label>
//             <select
//               value={employeeType}
//               onChange={(e) => setEmployeeType(e.target.value)}
//               className="w-full bg-white border border-neutral-300 focus:border-black rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none transition-colors"
//             >
//               <option value="">All Types</option>
//               <option>CADER</option>
//               <option>Bank Sakhi</option>
//               <option>BDSP</option>
//               <option>FLCRP</option>
//               <option>Gender CRP</option>
//               <option>Setu</option>
//               <option>Senior Setu</option>
//             </select>
//           </div>
//         </div>

//         {/* Summary Counter Bar */}
//         {summary && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-200">
//             <div className="text-center p-3 rounded-xl border border-neutral-200 bg-neutral-50">
//               <p className="text-xs text-neutral-600 font-bold uppercase tracking-wider">Total</p>
//               <p className="text-2xl font-black text-black mt-1">
//                 {summary.totalEmployees}
//               </p>
//             </div>
//             <div className="text-center p-3 rounded-xl border border-black bg-black text-white">
//               <p className="text-xs font-bold uppercase tracking-wider opacity-80">Present</p>
//               <p className="text-2xl font-black mt-1">
//                 {summary.totalPresent}
//               </p>
//             </div>
//             <div className="text-center p-3 rounded-xl border border-neutral-400 bg-neutral-200">
//               <p className="text-xs text-neutral-800 font-bold uppercase tracking-wider">Absent</p>
//               <p className="text-2xl font-black text-black mt-1">
//                 {summary.totalAbsent}
//               </p>
//             </div>
//             <div className="text-center p-3 rounded-xl border border-dashed border-black bg-white">
//               <p className="text-xs text-neutral-600 font-bold uppercase tracking-wider">Pending</p>
//               <p className="text-2xl font-black text-black mt-1">
//                 {summary.totalPending}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content / Table */}
//       {loading ? (
//         <Loader />
//       ) : data.length === 0 ? (
//         <div className="bg-white border border-black rounded-2xl text-center py-12">
//           <p className="text-neutral-500 font-medium">No attendance data found for this month</p>
//         </div>
//       ) : (
//         <div className="bg-white border border-black rounded-2xl shadow-sm p-4 overflow-x-auto space-y-4">
//           <table className="min-w-full text-xs border-collapse">
//             <thead>
//               <tr className="bg-black text-white border-b border-black">
//                 <th className="p-2.5 text-left sticky left-0 bg-black z-20 font-bold tracking-wider uppercase border-r border-neutral-800">
//                   Employee
//                 </th>
//                 <th className="p-2.5 text-left font-bold tracking-wider uppercase border-r border-neutral-800">
//                   Type
//                 </th>
//                 {Array.from({ length: getDaysInMonth() }).map((_, i) => (
//                   <th key={i} className="p-1 min-w-[30px] text-center border-r border-neutral-800 font-semibold">
//                     {i + 1}
//                   </th>
//                 ))}
//                 <th className="p-2 text-center font-bold tracking-wider uppercase border-r border-neutral-800">P</th>
//                 <th className="p-2 text-center font-bold tracking-wider uppercase">A</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-neutral-200">
//               {data.map((emp) => (
//                 <tr key={emp.employeeId} className="hover:bg-neutral-50 transition-colors">
//                   <td className="p-2.5 font-bold text-black sticky left-0 bg-white z-10 border-r border-neutral-200 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
//                     {emp.name}
//                     <div className="text-[10px] text-neutral-500 font-normal">
//                       {emp.userId}
//                     </div>
//                   </td>
//                   <td className="p-2.5 text-neutral-700 border-r border-neutral-200 whitespace-nowrap">
//                     {emp.employeeType}
//                   </td>
//                   {Array.from({ length: getDaysInMonth() }).map((_, i) => {
//                     const date = `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
//                     const status = emp.dailyStatus?.[date];
//                     return (
//                       <td
//                         key={i}
//                         className={`p-1 text-center border-r border-neutral-200 transition-all ${getStatusColor(status)}`}
//                       >
//                         {getStatusLetter(status)}
//                       </td>
//                     );
//                   })}
//                   <td className="p-2 text-center font-black text-black bg-neutral-100 border-r border-neutral-200">
//                     {emp.present}
//                   </td>
//                   <td className="p-2 text-center font-bold text-neutral-600 bg-neutral-100">
//                     {emp.absent}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Legend Section */}
//           <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200 text-xs font-medium">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-black rounded" /> Present (P)
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-neutral-200 border border-neutral-400 rounded" /> Absent (A)
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-white border border-dashed border-black rounded" /> Pending
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminClfAttendance;



import { useState, useEffect } from 'react';
import { getMonthlyAttendanceApi } from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const AdminClfAttendance = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [employeeType, setEmployeeType] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, [month, year, employeeType]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const params = { month, year };
      if (employeeType) params.employeeType = employeeType;
      const res = await getMonthlyAttendanceApi(params);
      setData(res.data || []);
      setSummary(res.summary);
    } catch (error) {
      toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => {
    return new Date(year, month, 0).getDate();
  };

  const getStatusColor = (status) => {
    if (status === 'PRESENT') return 'bg-emerald-950/60 text-emerald-400 font-black border border-emerald-800/60';
    if (status === 'ABSENT') return 'bg-red-950/60 text-red-400 font-bold border border-red-800/60';
    if (status === 'PENDING') return 'bg-zinc-800 text-amber-400 font-bold border border-dashed border-amber-500/50';
    return 'bg-zinc-950 text-zinc-600';
  };

  const getStatusLetter = (status) => {
    if (status === 'PRESENT') return 'P';
    if (status === 'ABSENT') return 'A';
    if (status === 'PENDING') return '⏱';
    return '-';
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Monthly Attendance
        </h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">
          Detailed monthly sheet and status breakdown
        </p>
      </div>

      {/* Filter Options */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1} className="bg-zinc-900 text-zinc-100">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y} className="bg-zinc-900 text-zinc-100">
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Employee Type
            </label>
            <select
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="" className="bg-zinc-900 text-zinc-100">All Types</option>
              <option className="bg-zinc-900 text-zinc-100">CADER</option>
              <option className="bg-zinc-900 text-zinc-100">Bank Sakhi</option>
              <option className="bg-zinc-900 text-zinc-100">BDSP</option>
              <option className="bg-zinc-900 text-zinc-100">FLCRP</option>
              <option className="bg-zinc-900 text-zinc-100">Gender CRP</option>
              <option className="bg-zinc-900 text-zinc-100">Setu</option>
              <option className="bg-zinc-900 text-zinc-100">Senior Setu</option>
            </select>
          </div>
        </div>

        {/* Summary Counter Bar */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800">
            <div className="text-center p-3 rounded-xl border border-zinc-800 bg-zinc-950">
              <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Total</p>
              <p className="text-2xl font-black text-zinc-100 mt-1">
                {summary.totalEmployees}
              </p>
            </div>
            <div className="text-center p-3 rounded-xl border border-emerald-800/60 bg-emerald-950/40 text-emerald-400">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Present</p>
              <p className="text-2xl font-black mt-1">
                {summary.totalPresent}
              </p>
            </div>
            <div className="text-center p-3 rounded-xl border border-red-800/60 bg-red-950/40 text-red-400">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Absent</p>
              <p className="text-2xl font-black mt-1">
                {summary.totalAbsent}
              </p>
            </div>
            <div className="text-center p-3 rounded-xl border border-dashed border-amber-500/50 bg-amber-950/20 text-amber-400">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Pending</p>
              <p className="text-2xl font-black mt-1">
                {summary.totalPending}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content / Table */}
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 text-center py-12 rounded-2xl shadow-md">
          <p className="text-zinc-400 font-medium text-sm">No attendance data found for this month</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 overflow-x-auto space-y-4">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-950 text-zinc-300 border-b border-zinc-800">
                <th className="p-2.5 text-left sticky left-0 bg-zinc-950 z-20 font-bold tracking-wider uppercase border-r border-zinc-800">
                  Employee
                </th>
                <th className="p-2.5 text-left font-bold tracking-wider uppercase border-r border-zinc-800">
                  Type
                </th>
                {Array.from({ length: getDaysInMonth() }).map((_, i) => (
                  <th key={i} className="p-1 min-w-[30px] text-center border-r border-zinc-800 font-semibold">
                    {i + 1}
                  </th>
                ))}
                <th className="p-2 text-center font-bold tracking-wider uppercase border-r border-zinc-800 text-emerald-400">P</th>
                <th className="p-2 text-center font-bold tracking-wider uppercase text-red-400">A</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {data.map((emp) => (
                <tr key={emp.employeeId} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-2.5 font-bold text-zinc-100 sticky left-0 bg-zinc-900 z-10 border-r border-zinc-800 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                    {emp.name}
                    <div className="text-[10px] text-zinc-400 font-mono font-normal">
                      {emp.userId}
                    </div>
                  </td>
                  <td className="p-2.5 text-zinc-300 border-r border-zinc-800 whitespace-nowrap">
                    {emp.employeeType}
                  </td>
                  {Array.from({ length: getDaysInMonth() }).map((_, i) => {
                    const date = `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
                    const status = emp.dailyStatus?.[date];
                    return (
                      <td
                        key={i}
                        className={`p-1 text-center border-r border-zinc-800 transition-all ${getStatusColor(status)}`}
                      >
                        {getStatusLetter(status)}
                      </td>
                    );
                  })}
                  <td className="p-2 text-center font-black text-emerald-400 bg-zinc-950/60 border-r border-zinc-800">
                    {emp.present}
                  </td>
                  <td className="p-2 text-center font-bold text-red-400 bg-zinc-950/60">
                    {emp.absent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Legend Section */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800 text-xs font-medium text-zinc-300">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] flex items-center justify-center font-bold rounded">P</div> Present (P)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-950 border border-red-800 text-red-400 text-[10px] flex items-center justify-center font-bold rounded">A</div> Absent (A)
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-zinc-800 border border-dashed border-amber-500/50 text-amber-400 text-[10px] flex items-center justify-center font-bold rounded">⏱</div> Pending
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClfAttendance;