// import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import PageHeader from '../../components/common/PageHeader';
// import Loader from '../../components/ui/Loader';
// import Badge from '../../components/ui/Badge';
// import LeaveForm from './LeaveForm';
// import LeaveLetterModal from './LeaveLetterModal'; // ✅ NAYA Import
// import { applyLeaveApi, getMyLeavesApi, cancelLeaveApi } from './leaves.api';

// export default function LeavePage() {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [selectedLeave, setSelectedLeave] = useState(null); // ✅ Letter Modal State

//   const fetchLeaves = async () => {
//     try {
//       setFetching(true);
//       const res = await getMyLeavesApi();
//       setLeaves(res.data);
//     } catch (error) {
//       toast.error('Failed to load leave history');
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => { fetchLeaves(); }, []);

//   const handleApplyLeave = async (payload, onSuccess) => {
//     setLoading(true);
//     try {
//       await applyLeaveApi(payload);
//       toast.success('Leave applied successfully!');
//       onSuccess();
//       fetchLeaves();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to apply leave');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelLeave = async (id) => {
//     if (!window.confirm('Are you sure you want to cancel this leave?')) return;
//     try {
//       await cancelLeaveApi(id);
//       toast.success('Leave cancelled');
//       fetchLeaves();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to cancel leave');
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto">
//       <PageHeader title="Leave Management" subtitle="Apply for leaves and view your history" />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//         <div className="lg:col-span-1">
//           <LeaveForm onSubmit={handleApplyLeave} loading={loading} />
//         </div>

//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">My Leave History</h2>
          
//           {fetching ? (
//             <div className="py-10 flex justify-center"><Loader /></div>
//           ) : leaves.length === 0 ? (
//             <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
//               You have not applied for any leaves yet.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 text-gray-600 text-sm border-y">
//                     <th className="p-3 font-medium">Type</th>
//                     <th className="p-3 font-medium">Dates</th>
//                     <th className="p-3 font-medium">Days</th>
//                     <th className="p-3 font-medium">Status</th>
//                     <th className="p-3 font-medium">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm">
//                   {leaves.map((leave) => (
//                     <tr key={leave._id} className="border-b hover:bg-gray-50 transition">
//                       <td className="p-3 font-medium text-gray-800">{leave.leaveType}</td>
//                       <td className="p-3 text-gray-600">
//                         {new Date(leave.startDate).toLocaleDateString('en-IN')} 
//                         {leave.startDate !== leave.endDate && ` - ${new Date(leave.endDate).toLocaleDateString('en-IN')}`}
//                       </td>
//                       <td className="p-3 text-gray-600">{leave.totalDays}</td>
//                       <td className="p-3">
//                         <Badge variant={leave.status === 'APPROVED' ? 'success' : leave.status === 'REJECTED' ? 'danger' : 'warning'}>
//                           {leave.status}
//                         </Badge>
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         {/* ✅ NAYA: Letter dekhne ka button */}
//                         <button
//                           onClick={() => setSelectedLeave(leave)}
//                           className="text-blue-600 hover:text-blue-800 text-xs font-medium border border-blue-200 px-2 py-1 rounded"
//                         >
//                           View Letter
//                         </button>

//                         {leave.status === 'PENDING' && (
//                           <button
//                             onClick={() => handleCancelLeave(leave._id)}
//                             className="text-red-500 hover:text-red-700 text-xs font-medium border border-red-200 px-2 py-1 rounded"
//                           >
//                             Cancel
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Letter Modal */}
//       {selectedLeave && (
//         <LeaveLetterModal 
//           leave={selectedLeave} 
//           onClose={() => setSelectedLeave(null)} 
//         />
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/ui/Loader';
import Badge from '../../components/ui/Badge';
import LeaveForm from './LeaveForm';
import LeaveLetterModal from './LeaveLetterModal';
import { applyLeaveApi, getMyLeavesApi, cancelLeaveApi } from './leaves.api';
import { theme } from '../../config/theme.js';

export default function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const fetchLeaves = async () => {
    try {
      setFetching(true);
      const res = await getMyLeavesApi();
      setLeaves(res.data);
    } catch (error) {
      toast.error('Failed to load leave history');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  const handleApplyLeave = async (payload, onSuccess) => {
    setLoading(true);
    try {
      await applyLeaveApi(payload);
      toast.success('Leave applied successfully!');
      onSuccess();
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply leave');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelLeave = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this leave?')) return;
    try {
      await cancelLeaveApi(id);
      toast.success('Leave cancelled');
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel leave');
    }
  };

  return (
    <div style={{ background: theme.colors.background, minHeight: '100vh', padding: '24px' }}>
      <div className="max-w-6xl mx-auto">
        <PageHeader title="Leave Management" subtitle="Apply for leaves and view your history" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <LeaveForm onSubmit={handleApplyLeave} loading={loading} />
          </div>

          <div style={{ background: theme.colors.surface, padding: '24px', borderRadius: theme.radius.md, boxShadow: theme.shadow.sm, border: `1px solid ${theme.colors.border}` }} className="lg:col-span-2">
            <h2 style={{ color: theme.colors.text, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '12px', marginBottom: '16px' }} className="text-lg font-semibold">
              My Leave History
            </h2>
            
            {fetching ? (
              <div className="py-10 flex justify-center"><Loader /></div>
            ) : leaves.length === 0 ? (
              <div style={{ color: theme.colors.muted, borderColor: theme.colors.border }} className="text-center py-10 rounded-lg border border-dashed">
                You have not applied for any leaves yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr style={{ background: theme.colors.background, color: theme.colors.muted, borderTop: `1px solid ${theme.colors.border}`, borderBottom: `1px solid ${theme.colors.border}` }} className="text-sm">
                      <th className="p-3 font-medium">Type</th>
                      <th className="p-3 font-medium">Dates</th>
                      <th className="p-3 font-medium">Days</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: theme.colors.text }} className="text-sm">
                    {leaves.map((leave) => (
                      <tr key={leave._id} style={{ borderBottom: `1px solid ${theme.colors.border}` }} className="hover:bg-gray-50 transition">
                        <td className="p-3 font-medium">{leave.leaveType}</td>
                        <td style={{ color: theme.colors.muted }} className="p-3">
                          {new Date(leave.startDate).toLocaleDateString('en-IN')} 
                          {leave.startDate !== leave.endDate && ` - ${new Date(leave.endDate).toLocaleDateString('en-IN')}`}
                        </td>
                        <td style={{ color: theme.colors.muted }} className="p-3">{leave.totalDays}</td>
                        <td className="p-3">
                          <Badge variant={leave.status === 'APPROVED' ? 'success' : leave.status === 'REJECTED' ? 'danger' : 'warning'}>
                            {leave.status}
                          </Badge>
                        </td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => setSelectedLeave(leave)}
                            style={{ color: theme.colors.info, borderColor: theme.colors.info }}
                            className="text-xs font-medium border px-2 py-1 rounded hover:opacity-80 transition"
                          >
                            View Letter
                          </button>

                          {leave.status === 'PENDING' && (
                            <button
                              onClick={() => handleCancelLeave(leave._id)}
                              style={{ color: theme.colors.danger, borderColor: theme.colors.danger }}
                              className="text-xs font-medium border px-2 py-1 rounded hover:opacity-80 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {selectedLeave && (
          <LeaveLetterModal leave={selectedLeave} onClose={() => setSelectedLeave(null)} />
        )}
      </div>
    </div>
  );
}