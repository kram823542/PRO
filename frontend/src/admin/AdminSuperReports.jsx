// import { useState, useEffect } from 'react';
// import {
//   downloadAttendanceExcelApi,
//   getAttendanceReportApi,
//   getClfSummaryReportApi,
//   getClfsApi,
// } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const AdminSuperReports = () => {
//   const [clfs, setClfs] = useState([]);
//   const [clfId, setClfId] = useState('');
//   const [month, setMonth] = useState(new Date().getMonth() + 1);
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [clfSummary, setClfSummary] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchInit();
//   }, []);

//   const fetchInit = async () => {
//     try {
//       const [clfsData, summaryData] = await Promise.all([
//         getClfsApi(),
//         getClfSummaryReportApi(),
//       ]);
//       setClfs(clfsData.clfs || []);
//       setClfSummary(summaryData.summaryData || []);
//       if (clfsData.clfs?.length > 0) {
//         setClfId(clfsData.clfs[0]._id);
//       }
//     } catch (error) {
//       toast.error('Failed to load');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadExcel = async () => {
//     if (!clfId) {
//       toast.error('Select a CLF');
//       return;
//     }
//     try {
//       const response = await downloadAttendanceExcelApi({ clfId, month, year });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `Attendance_${month}_${year}.xlsx`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success('Downloaded');
//     } catch (error) {
//       toast.error('Download failed');
//     }
//   };

//   if (loading) return <Loader />;

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Reports</h1>

//       {/* CLF Summary */}
//       <div className="card mb-6">
//         <h2 className="font-bold text-primary mb-4">Today's CLF Summary</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[600px]">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="text-left p-3 text-sm">CLF</th>
//                 <th className="text-left p-3 text-sm">Block</th>
//                 <th className="text-center p-3 text-sm">Employees</th>
//                 <th className="text-center p-3 text-sm">Present</th>
//                 <th className="text-center p-3 text-sm">Absent</th>
//                 <th className="text-center p-3 text-sm">Pending</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clfSummary.map((s) => (
//                 <tr key={s.clf.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3 text-sm font-semibold text-primary">
//                     {s.clf.name}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">{s.clf.block}</td>
//                   <td className="p-3 text-sm text-center">{s.employeeCount}</td>
//                   <td className="p-3 text-sm text-center font-bold text-green-600">
//                     {s.presentToday}
//                   </td>
//                   <td className="p-3 text-sm text-center font-bold text-red-600">
//                     {s.absentToday}
//                   </td>
//                   <td className="p-3 text-sm text-center font-bold text-yellow-600">
//                     {s.pendingToday}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Excel Download */}
//       <div className="card">
//         <h2 className="font-bold text-primary mb-4">Download Attendance Excel</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="label">CLF</label>
//             <select
//               value={clfId}
//               onChange={(e) => setClfId(e.target.value)}
//               className="input-field"
//             >
//               <option value="">Select CLF</option>
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
//           <div className="flex items-end">
//             <button onClick={downloadExcel} className="btn-success w-full">
//               📥 Download Excel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSuperReports;


import { useState, useEffect } from 'react';
import {
  downloadAttendanceExcelApi,
  getAttendanceReportApi,
  getClfSummaryReportApi,
  getClfsApi,
} from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const AdminSuperReports = () => {
  const [clfs, setClfs] = useState([]);
  const [clfId, setClfId] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [clfSummary, setClfSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInit();
  }, []);

  const fetchInit = async () => {
    try {
      const [clfsData, summaryData] = await Promise.all([
        getClfsApi(),
        getClfSummaryReportApi(),
      ]);
      setClfs(clfsData.clfs || []);
      setClfSummary(summaryData.summaryData || []);
      if (clfsData.clfs?.length > 0) {
        setClfId(clfsData.clfs[0]._id);
      }
    } catch (error) {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    if (!clfId) {
      toast.error('Select a CLF');
      return;
    }
    try {
      const response = await downloadAttendanceExcelApi({ clfId, month, year });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Attendance_${month}_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Downloaded');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Reports</h1>

      {/* CLF Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 mb-6 shadow-md">
        <h2 className="font-bold text-white text-lg mb-4">Today's CLF Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-zinc-800 text-white border-b border-zinc-700">
              <tr>
                <th className="text-left p-3 text-sm font-semibold">CLF</th>
                <th className="text-left p-3 text-sm font-semibold">Block</th>
                <th className="text-center p-3 text-sm font-semibold">Employees</th>
                <th className="text-center p-3 text-sm font-semibold">Present</th>
                <th className="text-center p-3 text-sm font-semibold">Absent</th>
                <th className="text-center p-3 text-sm font-semibold">Pending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {clfSummary.map((s) => (
                <tr key={s.clf.id} className="hover:bg-zinc-800/50">
                  <td className="p-3 text-sm font-semibold text-white">
                    {s.clf.name}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">{s.clf.block}</td>
                  <td className="p-3 text-sm text-center text-zinc-300">{s.employeeCount}</td>
                  <td className="p-3 text-sm text-center font-bold text-white">
                    {s.presentToday}
                  </td>
                  <td className="p-3 text-sm text-center font-bold text-zinc-400">
                    {s.absentToday}
                  </td>
                  <td className="p-3 text-sm text-center font-bold text-zinc-400">
                    {s.pendingToday}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Excel Download */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 shadow-md">
        <h2 className="font-bold text-white text-lg mb-4">Download Attendance Excel</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">CLF</label>
            <select
              value={clfId}
              onChange={(e) => setClfId(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">Select CLF</option>
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
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
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
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              {[2024, 2025, 2026, 2027].map((y) => (
                <option key={y} value={y} className="bg-black text-white">
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={downloadExcel}
              className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-lg transition-all text-sm shadow-md"
            >
              📥 Download Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSuperReports;