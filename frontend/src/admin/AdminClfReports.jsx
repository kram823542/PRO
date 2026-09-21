
import { useState } from 'react';
import { downloadAttendanceExcelApi, getAttendanceReportApi } from '../api/adminApi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const AdminClfReports = () => {
  const { user } = useAuth();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const data = await getAttendanceReportApi({
        clfId: user.clfId,
        month,
        year,
      });
      setReportData(data);
      toast.success('Report loaded');
    } catch (error) {
      toast.error('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await downloadAttendanceExcelApi({
        clfId: user.clfId,
        month,
        year,
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Attendance_${user.clfId}_${month}_${year}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Excel downloaded');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Reports</h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">
          View attendance summary and export reports
        </p>
      </div>

      {/* Filter Section */}
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
          <div className="flex items-end gap-2">
            <button
              onClick={fetchReport}
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
            >
              View Report
            </button>
            <button
              onClick={downloadExcel}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold py-2.5 flex-1 rounded-xl transition-all active:scale-95 text-sm flex items-center justify-center gap-1"
            >
              📥 Excel
            </button>
          </div>
        </div>
      </div>

      {/* Main Report Display */}
      {loading ? (
        <Loader />
      ) : reportData ? (
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl">
            <h2 className="font-bold text-xl text-white mb-4 pb-3 border-b border-zinc-800">
              {reportData.clf?.name} — {MONTHS[month - 1]} {year}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Total Employees
                </p>
                <p className="text-2xl font-black text-zinc-100 mt-1">
                  {reportData.totalEmployees}
                </p>
              </div>
            </div>
          </div>

          {/* Employee Wise Report */}
          {reportData.reportData?.map((emp) => (
            <div
              key={emp.employee.id || emp.employee._id}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md"
            >
              <div className="flex justify-between items-start mb-4 pb-2 border-b border-zinc-800">
                <div>
                  <h3 className="font-bold text-white text-lg">{emp.employee.name}</h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {emp.employee.employeeType} • <span className="font-mono">{emp.employee.userId}</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Present
                  </p>
                  <p className="text-xl font-black text-emerald-400 mt-1">{emp.present}</p>
                </div>
                <div className="bg-red-950/40 border border-red-800/60 p-3 rounded-xl">
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Absent
                  </p>
                  <p className="text-xl font-bold text-red-400 mt-1">{emp.absent}</p>
                </div>
                <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-xl">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Pending
                  </p>
                  <p className="text-xl font-bold text-amber-400 mt-1">{emp.pending}</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 text-zinc-100 p-3 rounded-xl">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Total
                  </p>
                  <p className="text-xl font-black mt-1">{emp.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AdminClfReports;