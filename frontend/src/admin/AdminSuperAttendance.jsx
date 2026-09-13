// import { useState, useEffect } from 'react';
// import { getMonthlyAttendanceApi, getClfsApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const AdminSuperAttendance = () => {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     clfId: '',
//     employeeType: '',
//     month: new Date().getMonth() + 1,
//     year: new Date().getFullYear(),
//   });

//   useEffect(() => {
//     fetchClfs();
//   }, []);

//   useEffect(() => {
//     fetchAttendance();
//   }, [filters]);

//   const fetchClfs = async () => {
//     try {
//       const data = await getClfsApi();
//       setClfs(data.clfs || []);
//     } catch (error) {
//       // silent
//     }
//   };

//   const fetchAttendance = async () => {
//     setLoading(true);
//     try {
//       const params = { month: filters.month, year: filters.year };
//       if (filters.clfId) params.clfId = filters.clfId;
//       if (filters.employeeType) params.employeeType = filters.employeeType;
//       const res = await getMonthlyAttendanceApi(params);
//       setData(res.data || []);
//       setSummary(res.summary);
//     } catch (error) {
//       toast.error('Failed to load attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDaysInMonth = () => new Date(filters.year, filters.month, 0).getDate();

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
//         Attendance Overview
//       </h1>

//       <div className="card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="label">CLF</label>
//             <select
//               value={filters.clfId}
//               onChange={(e) => setFilters({ ...filters, clfId: e.target.value })}
//               className="input-field"
//             >
//               <option value="">All CLFs</option>
//               {clfs.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="label">Month</label>
//             <select
//               value={filters.month}
//               onChange={(e) =>
//                 setFilters({ ...filters, month: parseInt(e.target.value) })
//               }
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
//               value={filters.year}
//               onChange={(e) =>
//                 setFilters({ ...filters, year: parseInt(e.target.value) })
//               }
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
//               value={filters.employeeType}
//               onChange={(e) =>
//                 setFilters({ ...filters, employeeType: e.target.value })
//               }
//               className="input-field"
//             >
//               <option value="">All</option>
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
//               <p className="text-xs text-gray-500">Total</p>
//               <p className="text-2xl font-bold text-primary">
//                 {summary.totalEmployees}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500">Present</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {summary.totalPresent}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500">Absent</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {summary.totalAbsent}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs text-gray-500">Pending</p>
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
//           <p className="text-gray-500">No data</p>
//         </div>
//       ) : (
//         <div className="card overflow-x-auto">
//           <table className="min-w-full text-xs">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="p-2 text-left sticky left-0 bg-primary z-10">
//                   Employee
//                 </th>
//                 <th className="p-2 text-left">CLF</th>
//                 {Array.from({ length: getDaysInMonth() }).map((_, i) => (
//                   <th key={i} className="p-1 min-w-[28px]">
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
//                   </td>
//                   <td className="p-2 text-gray-700">{emp.clfName}</td>
//                   {Array.from({ length: getDaysInMonth() }).map((_, i) => {
//                     const date = `${filters.year}-${String(filters.month).padStart(
//                       2,
//                       '0'
//                     )}-${String(i + 1).padStart(2, '0')}`;
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
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSuperAttendance;


import { useState, useEffect } from 'react';
import { getMonthlyAttendanceApi, getClfsApi } from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const AdminSuperAttendance = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [clfs, setClfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    clfId: '',
    employeeType: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    fetchClfs();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [filters]);

  const fetchClfs = async () => {
    try {
      const data = await getClfsApi();
      setClfs(data.clfs || []);
    } catch (error) {
      // silent
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const params = { month: filters.month, year: filters.year };
      if (filters.clfId) params.clfId = filters.clfId;
      if (filters.employeeType) params.employeeType = filters.employeeType;
      const res = await getMonthlyAttendanceApi(params);
      setData(res.data || []);
      setSummary(res.summary);
    } catch (error) {
      toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = () => new Date(filters.year, filters.month, 0).getDate();

  const getStatusColor = (status) => {
    if (status === 'PRESENT') return 'bg-zinc-100 text-black font-bold';
    if (status === 'ABSENT') return 'bg-zinc-800 text-zinc-400 font-medium';
    if (status === 'PENDING') return 'bg-zinc-700 text-zinc-300 font-medium';
    return 'bg-zinc-900 text-zinc-600';
  };

  const getStatusLetter = (status) => {
    if (status === 'PRESENT') return 'P';
    if (status === 'ABSENT') return 'A';
    if (status === 'PENDING') return '⏱';
    return '-';
  };

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Attendance Overview
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">CLF</label>
            <select
              value={filters.clfId}
              onChange={(e) => setFilters({ ...filters, clfId: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All CLFs</option>
              {clfs.map((c) => (
                <option key={c._id} value={c._id} className="bg-black text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Month</label>
            <select
              value={filters.month}
              onChange={(e) =>
                setFilters({ ...filters, month: parseInt(e.target.value) })
              }
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1} className="bg-black text-white">
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Year</label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters({ ...filters, year: parseInt(e.target.value) })
              }
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y} className="bg-black text-white">
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Employee Type</label>
            <select
              value={filters.employeeType}
              onChange={(e) =>
                setFilters({ ...filters, employeeType: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All</option>
              <option className="bg-black text-white">CADER</option>
              <option className="bg-black text-white">Bank Sakhi</option>
              <option className="bg-black text-white">BDSP</option>
              <option className="bg-black text-white">FLCRP</option>
              <option className="bg-black text-white">Gender CRP</option>
              <option className="bg-black text-white">Setu</option>
              <option className="bg-black text-white">Senior Setu</option>
            </select>
          </div>
        </div>

        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-zinc-800">
            <div className="text-center">
              <p className="text-xs text-zinc-400">Total</p>
              <p className="text-2xl font-bold text-white">
                {summary.totalEmployees}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-zinc-400">Present</p>
              <p className="text-2xl font-bold text-white">
                {summary.totalPresent}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-zinc-400">Absent</p>
              <p className="text-2xl font-bold text-zinc-400">
                {summary.totalAbsent}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-zinc-400">Pending</p>
              <p className="text-2xl font-bold text-zinc-400">
                {summary.totalPending}
              </p>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl text-center py-12">
          <p className="text-zinc-400">No data</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto shadow-md">
          <table className="min-w-full text-xs">
            <thead className="bg-zinc-800 text-white border-b border-zinc-700">
              <tr>
                <th className="p-2 text-left sticky left-0 bg-zinc-800 z-10 font-semibold">
                  Employee
                </th>
                <th className="p-2 text-left font-semibold">CLF</th>
                {Array.from({ length: getDaysInMonth() }).map((_, i) => (
                  <th key={i} className="p-1 min-w-[28px] text-center font-semibold">
                    {i + 1}
                  </th>
                ))}
                <th className="p-2 font-semibold">P</th>
                <th className="p-2 font-semibold">A</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {data.map((emp) => (
                <tr key={emp.employeeId} className="hover:bg-zinc-800/50">
                  <td className="p-2 font-semibold text-white sticky left-0 bg-zinc-900 z-10">
                    {emp.name}
                  </td>
                  <td className="p-2 text-zinc-300">{emp.clfName}</td>
                  {Array.from({ length: getDaysInMonth() }).map((_, i) => {
                    const date = `${filters.year}-${String(filters.month).padStart(
                      2,
                      '0'
                    )}-${String(i + 1).padStart(2, '0')}`;
                    const status = emp.dailyStatus?.[date];
                    return (
                      <td
                        key={i}
                        className={`p-1 text-center ${getStatusColor(status)}`}
                      >
                        {getStatusLetter(status)}
                      </td>
                    );
                  })}
                  <td className="p-2 text-center font-bold text-white">
                    {emp.present}
                  </td>
                  <td className="p-2 text-center font-bold text-zinc-400">
                    {emp.absent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSuperAttendance;