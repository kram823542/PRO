
import { useState, useEffect } from 'react';
import { getMonthlyAttendanceApi, getEmployeeApi } from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
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

  // ✅ 3-dot menu state
  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Employee detail modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, [month, year, employeeType]);

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const fetchEmployeeDetail = async (employeeId) => {
    setDetailLoading(true);
    setShowDetailModal(true);
    try {
      const res = await getEmployeeApi(employeeId);
      setSelectedEmployee(res.employee);
    } catch (error) {
      toast.error('Failed to load employee details');
      setShowDetailModal(false);
    } finally {
      setDetailLoading(false);
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
              Designation
            </label>
            <input
              type="text"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              placeholder="Filter by designation"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
            />
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
                  Designation
                </th>
                {Array.from({ length: getDaysInMonth() }).map((_, i) => (
                  <th key={i} className="p-1 min-w-[30px] text-center border-r border-zinc-800 font-semibold">
                    {i + 1}
                  </th>
                ))}
                <th className="p-2 text-center font-bold tracking-wider uppercase border-r border-zinc-800 text-emerald-400">P</th>
                <th className="p-2 text-center font-bold tracking-wider uppercase border-r border-zinc-800 text-red-400">A</th>
                {/* ✅ Actions Column */}
                <th className="p-2 text-center font-bold tracking-wider uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {data.map((emp) => (
                <tr key={emp.employeeId} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-2.5 font-bold text-zinc-100 sticky left-0 bg-zinc-900 z-10 border-r border-zinc-800 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-2">
                      {/* ✅ Profile Picture Thumbnail */}
                      <div
                        className={`w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0 ${
                          emp.profilePicture ? 'cursor-pointer' : ''
                        }`}
                        onClick={() => emp.profilePicture && setZoomPhoto({ url: emp.profilePicture, name: emp.name })}
                      >
                        {emp.profilePicture ? (
                          <img src={emp.profilePicture} alt={emp.name} className="w-full h-full object-cover" />
                        ) : (
                          emp.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div>{emp.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono font-normal">
                          {emp.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 text-zinc-300 border-r border-zinc-800 whitespace-nowrap">
                    {emp.designation || emp.employeeType || '-'}
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
                  <td className="p-2 text-center font-bold text-red-400 bg-zinc-950/60 border-r border-zinc-800">
                    {emp.absent}
                  </td>
                  {/* ✅ 3-Dot Menu */}
                  <td className="p-2 text-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === emp.employeeId ? null : emp.employeeId);
                      }}
                      className="w-8 h-8 rounded-lg hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 transition-colors mx-auto"
                      title="Actions"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>

                    {/* ✅ Dropdown Menu */}
                    {openMenuId === emp.employeeId && (
                      <div
                        className="absolute right-2 top-full mt-1 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            fetchEmployeeDetail(emp.employeeId);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-2"
                        >
                          <span className="text-base">👁️</span>
                          View Details
                        </button>
                        {emp.profilePicture && (
                          <button
                            onClick={() => {
                              setZoomPhoto({ url: emp.profilePicture, name: emp.name });
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-2 border-t border-zinc-800"
                          >
                            <span className="text-base">📷</span>
                            View Photo
                          </button>
                        )}
                      </div>
                    )}
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

      {/* ✅ Employee Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedEmployee(null);
        }}
        title="Employee Details"
        size="lg"
      >
        {detailLoading ? (
          <Loader />
        ) : selectedEmployee ? (
          <div className="space-y-5">
            {/* Profile Section */}
            <div className="flex flex-col items-center pb-5 border-b border-zinc-800">
              <div
                className={`w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden ${
                  selectedEmployee.profilePicture ? 'cursor-pointer' : ''
                }`}
                onClick={() =>
                  selectedEmployee.profilePicture &&
                  setZoomPhoto({ url: selectedEmployee.profilePicture, name: selectedEmployee.name })
                }
              >
                {selectedEmployee.profilePicture ? (
                  <img
                    src={selectedEmployee.profilePicture}
                    alt={selectedEmployee.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  selectedEmployee.name?.charAt(0).toUpperCase()
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-3">{selectedEmployee.name}</h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">{selectedEmployee.userId}</p>
              <span
                className={`mt-2 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  selectedEmployee.status === 'ACTIVE'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                    : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                }`}
              >
                {selectedEmployee.status}
              </span>
            </div>

            {/* Personal Info */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Personal Information
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Designation', value: selectedEmployee.designation },
                  { label: 'Mobile', value: selectedEmployee.mobile },
                  {
                    label: 'Joining Date',
                    value: selectedEmployee.joiningDate
                      ? new Date(selectedEmployee.joiningDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A',
                  },
                  { label: 'CLF', value: selectedEmployee.clfId?.name || 'N/A' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-zinc-200 text-right">
                      {item.value || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Details */}
            <div>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                Bank Details
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Bank Name', value: selectedEmployee.bankName },
                  { label: 'Account Number', value: selectedEmployee.bankAccountNumber },
                  { label: 'Branch', value: selectedEmployee.branch },
                  { label: 'IFSC Code', value: selectedEmployee.ifscCode },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-zinc-200 text-right font-mono">
                      {item.value || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-zinc-500 py-8">No data</p>
        )}
      </Modal>

      {/* ✅ Photo Zoom Modal */}
      {zoomPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-zinc-900 rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
              <img
                src={zoomPhoto.url}
                alt={zoomPhoto.name}
                className="w-full h-auto max-h-[80vh] object-contain bg-zinc-950"
              />
              <div className="p-4 text-center bg-zinc-900 border-t border-zinc-800">
                <p className="text-white font-bold text-lg">{zoomPhoto.name}</p>
                <p className="text-zinc-500 text-xs mt-1">Tap anywhere to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClfAttendance;