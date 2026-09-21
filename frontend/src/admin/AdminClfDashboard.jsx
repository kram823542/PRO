
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAttendanceSummaryApi,
  getPendingSubmissionsApi,
  approveSubmissionApi,
  rejectSubmissionApi,
} from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminClfDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Approve/Reject states
  const [selected, setSelected] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [zoomPhoto, setZoomPhoto] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [sumData, pendData] = await Promise.all([
        getAttendanceSummaryApi(),
        getPendingSubmissionsApi({ limit: 10 }),
      ]);
      setSummary(sumData.summary);
      setPending(pendData.submissions || []);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve handler
  const handleApprove = async (id) => {
    if (!window.confirm('Approve this submission? Attendance will be marked PRESENT.')) return;
    try {
      await approveSubmissionApi(id);
      toast.success('Submission approved');
      setSelected(null);
      fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Approve failed');
    }
  };

  // ✅ Reject handler
  const handleReject = async () => {
    if (rejectionReason.length < 5) {
      toast.error('Reason must be at least 5 characters');
      return;
    }
    try {
      await rejectSubmissionApi(selected._id, rejectionReason);
      toast.success('Submission rejected');
      setShowRejectModal(false);
      setRejectionReason('');
      setSelected(null);
      fetchDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reject failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 text-zinc-100">
      {/* ==============================
          Header Banner
          ============================== */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-zinc-400 text-sm font-medium mt-1">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* ==============================
          Stats Cards
          ============================== */}
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

      {/* ==============================
          Pending Submissions — FULL VIEW (with photo, details, actions)
          ============================== */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Pending Approvals</h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review and approve work submissions
            </p>
          </div>
          <a
            href="/admin-clf/submissions"
            className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            View All →
          </a>
        </div>

        {pending.length === 0 ? (
          <div className="text-center py-14 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-zinc-400 font-medium">No pending submissions</p>
            <p className="text-zinc-600 text-xs mt-1">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((sub) => (
              <div
                key={sub._id}
                className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 md:p-5 shadow-md hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Work Photo */}
                  <img
                    src={sub.photoUrl}
                    alt="Work"
                    className="w-full md:w-40 h-40 object-cover rounded-xl cursor-pointer border border-zinc-800 hover:border-zinc-600 transition-colors"
                    onClick={() =>
                      setZoomPhoto({
                        url: sub.photoUrl,
                        name: sub.employeeId?.name || 'Work Photo',
                      })
                    }
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* ✅ Profile Picture */}
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white text-sm font-bold overflow-hidden shrink-0">
                          {sub.employeeId?.profilePicture ? (
                            <img
                              src={sub.employeeId.profilePicture}
                              alt={sub.employeeId.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            sub.employeeId?.name?.charAt(0).toUpperCase() || '?'
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-base truncate">
                            {sub.employeeId?.name}
                          </h3>
                          <p className="text-xs text-zinc-400 truncate">
                            {sub.employeeId?.designation || 'No Designation'} •{' '}
                            {sub.employeeId?.userId}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs bg-amber-950/40 text-amber-400 border border-amber-800/60 px-3 py-1 rounded-full font-bold uppercase tracking-wider shrink-0">
                        PENDING
                      </span>
                    </div>

                    <p className="text-sm text-zinc-300 mb-2">
                      <strong className="text-white">Date:</strong>{' '}
                      {format(new Date(sub.date), 'dd MMM yyyy')}
                    </p>
                    <p className="text-sm text-zinc-300 mb-1">
                      <strong className="text-white">Work Type:</strong>{' '}
                      {sub.workType}
                    </p>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                      {sub.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleApprove(sub._id)}
                        className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold text-xs py-2 px-4 rounded-lg transition-all active:scale-95 uppercase tracking-wider"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelected(sub);
                          setShowRejectModal(true);
                        }}
                        className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-bold text-xs py-2 px-4 rounded-lg transition-all uppercase tracking-wider"
                      >
                        ✕ Reject
                      </button>
                      <button
                        onClick={() => setSelected(sub)}
                        className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg font-bold border border-zinc-700 transition-all uppercase tracking-wider"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==============================
          Detail Modal (View Details)
          ============================== */}
      <Modal
        isOpen={!!selected && !showRejectModal}
        onClose={() => setSelected(null)}
        title={selected?.employeeId?.name || 'Submission'}
        size="lg"
      >
        {selected && (
          <div className="space-y-4 text-zinc-100">
            <img
              src={selected.photoUrl}
              alt="Work"
              className="w-full rounded-xl border border-zinc-800 shadow-md cursor-pointer hover:border-zinc-600 transition-colors"
              onClick={() =>
                setZoomPhoto({
                  url: selected.photoUrl,
                  name: selected.employeeId?.name || 'Work Photo',
                })
              }
            />
            <div className="space-y-2 text-sm bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4">
              <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Employee
                </span>
                <span className="font-bold text-zinc-200">
                  {selected.employeeId?.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-t border-zinc-800/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Designation
                </span>
                <span className="font-bold text-zinc-200">
                  {selected.employeeId?.designation || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-t border-zinc-800/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Date
                </span>
                <span className="font-bold text-zinc-200">
                  {format(new Date(selected.date), 'dd MMM yyyy')}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-t border-zinc-800/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Work Type
                </span>
                <span className="font-bold text-zinc-200">
                  {selected.workType}
                </span>
              </div>
              <div className="pt-3 border-t border-zinc-800/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Description
                </p>
                <p className="text-zinc-300 text-sm">
                  {selected.description}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleApprove(selected._id)}
                className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-2.5 px-4 rounded-xl flex-1 transition-all uppercase tracking-wider text-sm"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-bold py-2.5 px-4 rounded-xl flex-1 transition-all uppercase tracking-wider text-sm"
              >
                ✕ Reject
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ==============================
          Reject Modal
          ============================== */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectionReason('');
        }}
        title="Reject Submission"
      >
        <div className="space-y-4 text-zinc-100">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Rejection Reason *
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows="4"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-zinc-500 resize-none"
              placeholder="Why is this submission being rejected?"
              minLength={5}
            />
          </div>
          <div className="flex gap-3 pt-2 border-t border-zinc-800">
            <button
              onClick={handleReject}
              className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-bold py-2.5 px-4 rounded-xl flex-1 transition-all uppercase tracking-wider text-sm"
            >
              Confirm Reject
            </button>
            <button
              onClick={() => setShowRejectModal(false)}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 rounded-xl font-bold transition-all uppercase tracking-wider text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ==============================
          Photo Zoom Modal
          ============================== */}
      {zoomPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          onClick={() => setZoomPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
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
                <p className="text-zinc-500 text-xs mt-1">
                  Tap anywhere to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClfDashboard;