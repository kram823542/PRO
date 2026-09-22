// import { useState, useEffect } from 'react';
// import { getMyWorkHistoryApi } from '../api/employeeApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const WorkHistory = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetchHistory();
//   }, [page, filter]);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const params = { page, limit: 10 };
//       if (filter) params.status = filter;
//       const data = await getMyWorkHistoryApi(params);
//       setSubmissions(data.submissions || []);
//       setTotalPages(data.totalPages || 1);
//     } catch (error) {
//       toast.error('Failed to load history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusColor = {
//     APPROVED: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
//     REJECTED: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
//     PENDING: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
//           Work History
//         </h1>
//         <select
//           value={filter}
//           onChange={(e) => {
//             setFilter(e.target.value);
//             setPage(1);
//           }}
//           className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 md:w-48"
//         >
//           <option value="" className="bg-zinc-900">All Status</option>
//           <option value="PENDING" className="bg-zinc-900">Pending</option>
//           <option value="APPROVED" className="bg-zinc-900">Approved</option>
//           <option value="REJECTED" className="bg-zinc-900">Rejected</option>
//         </select>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : submissions.length === 0 ? (
//         <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl text-center py-12">
//           <div className="text-4xl mb-3">📭</div>
//           <p className="text-zinc-400 font-medium">No submissions found</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {submissions.map((sub) => (
//             <div
//               key={sub._id}
//               className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl shadow-md"
//             >
//               <div className="flex flex-col md:flex-row gap-4">
//                 <img
//                   src={sub.photoUrl}
//                   alt="Work"
//                   className="w-full md:w-32 h-32 object-cover rounded-xl border border-zinc-800"
//                 />
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold text-zinc-200">
//                         {format(new Date(sub.date), 'dd MMM yyyy')}
//                       </p>
//                       <p className="text-xs text-zinc-400">{sub.workType}</p>
//                     </div>
//                     <span
//                       className={`text-xs font-bold px-3 py-1 rounded-full border ${
//                         statusColor[sub.status]
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-zinc-300 mt-2">{sub.description}</p>

//                   {sub.status === 'REJECTED' && sub.rejectionReason && (
//                     <div className="mt-3 bg-rose-950/40 border border-rose-800/80 p-3 rounded-xl">
//                       <p className="text-xs font-semibold text-rose-400">
//                         Rejection Reason:
//                       </p>
//                       <p className="text-xs text-rose-300/80 mt-1">
//                         {sub.rejectionReason}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Prev
//           </button>
//           <span className="px-4 py-2 bg-zinc-800 text-white rounded-xl font-medium text-sm border border-zinc-700">
//             {page} / {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkHistory;





import { useState, useEffect } from 'react';
import { getMyWorkHistoryApi } from '../api/employeeApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const WorkHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchHistory();
  }, [page, filter]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filter) params.status = filter;
      const data = await getMyWorkHistoryApi(params);
      setSubmissions(data.submissions || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = {
    APPROVED: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
    REJECTED: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
    PENDING: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Work History</h1>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-zinc-700 md:w-48"
        >
          <option value="" className="bg-zinc-900">All Status</option>
          <option value="PENDING" className="bg-zinc-900">Pending</option>
          <option value="APPROVED" className="bg-zinc-900">Approved</option>
          <option value="REJECTED" className="bg-zinc-900">Rejected</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : submissions.length === 0 ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl text-center py-12">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-zinc-400 font-medium">No submissions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub._id} className="bg-zinc-900/90 border border-zinc-800/80 p-5 rounded-2xl shadow-md">
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={sub.photoUrl}
                  alt="Work"
                  className="w-full md:w-32 h-32 object-cover rounded-xl border border-zinc-800"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-zinc-200">
                        {format(new Date(sub.date), 'dd MMM yyyy')}
                      </p>
                      <p className="text-xs text-zinc-400">{sub.workType}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        statusColor[sub.status]
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 mt-2">{sub.description}</p>

                  {sub.status === 'REJECTED' && sub.rejectionReason && (
                    <div className="mt-3 bg-rose-950/40 border border-rose-800/80 p-3 rounded-xl">
                      <p className="text-xs font-semibold text-rose-400">
                        Rejection Reason:
                      </p>
                      <p className="text-xs text-rose-300/80 mt-1">{sub.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-zinc-800 text-white rounded-xl font-medium text-sm border border-zinc-700">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 disabled:opacity-50 font-medium hover:bg-zinc-800 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkHistory;