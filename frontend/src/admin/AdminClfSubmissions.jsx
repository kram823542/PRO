
import { useState, useEffect } from 'react';
import {
  getPendingSubmissionsApi,
  approveSubmissionApi,
  rejectSubmissionApi,
} from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const AdminClfSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPending();
  }, [page]);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const data = await getPendingSubmissionsApi({ page, limit: 10 });
      setSubmissions(data.submissions || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this submission? Attendance will be marked PRESENT.')) return;
    try {
      await approveSubmissionApi(id);
      toast.success('Submission approved');
      setSelected(null);
      fetchPending();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Approve failed');
    }
  };

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
      fetchPending();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reject failed');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Pending Approvals
      </h1>

      {loading ? (
        <Loader />
      ) : submissions.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl text-center py-12">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-zinc-400">No pending submissions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6 shadow-md">
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={sub.photoUrl}
                  alt="Work"
                  className="w-full md:w-40 h-40 object-cover rounded-lg cursor-pointer border border-zinc-800"
                  onClick={() => setSelected(sub)}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {sub.employeeId?.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {sub.employeeId?.employeeType} • {sub.employeeId?.userId}
                      </p>
                    </div>
                    <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full font-bold">
                      PENDING
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 mb-2">
                    <strong className="text-white">Date:</strong> {format(new Date(sub.date), 'dd MMM yyyy')}
                  </p>
                  <p className="text-sm text-zinc-300 mb-1">
                    <strong className="text-white">Work Type:</strong> {sub.workType}
                  </p>
                  <p className="text-sm text-zinc-400 mb-4">{sub.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleApprove(sub._id)}
                      className="bg-white hover:bg-zinc-200 text-black font-bold text-sm py-2 px-4 rounded-lg transition-all"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => {
                        setSelected(sub);
                        setShowRejectModal(true);
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-bold text-sm py-2 px-4 rounded-lg transition-all"
                    >
                      ✕ Reject
                    </button>
                    <button
                      onClick={() => setSelected(sub)}
                      className="text-sm bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-semibold border border-zinc-700 transition-all"
                    >
                      View Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-white text-black font-bold rounded-lg">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Photo View Modal */}
      <Modal
        isOpen={!!selected && !showRejectModal}
        onClose={() => setSelected(null)}
        title={selected?.employeeId?.name || 'Submission'}
        size="lg"
      >
        {selected && (
          <div className="space-y-4 text-white">
            <img
              src={selected.photoUrl}
              alt="Work"
              className="w-full rounded-lg border border-zinc-800 shadow-md"
            />
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-white">Date:</strong> {format(new Date(selected.date), 'dd MMM yyyy')}
              </p>
              <p>
                <strong className="text-white">Type:</strong> {selected.workType}
              </p>
              <p className="text-zinc-300">
                <strong className="text-white">Description:</strong> {selected.description}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleApprove(selected._id);
                }}
                className="bg-white hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded-lg flex-1 transition-all"
              >
                ✓ Approve
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-bold py-2 px-4 rounded-lg flex-1 transition-all"
              >
                ✕ Reject
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setRejectionReason('');
        }}
        title="Reject Submission"
      >
        <div className="space-y-4 text-white">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">
              Rejection Reason *
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows="4"
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white resize-none"
              placeholder="Why is this submission being rejected?"
              minLength={5}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-bold py-2.5 px-4 rounded-lg flex-1 transition-all"
            >
              Confirm Reject
            </button>
            <button
              onClick={() => setShowRejectModal(false)}
              className="px-6 py-2.5 bg-black hover:bg-zinc-900 border border-zinc-700 text-white rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminClfSubmissions;