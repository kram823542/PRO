// import { useState, useEffect } from 'react';
// import { getMyWorkHistoryApi, submitWorkApi } from '../api/employeeApi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const SubmitWork = () => {
//   const [formData, setFormData] = useState({
//     description: '',
//     workType: 'SHG Meeting',
//     photo: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [todaySubmission, setTodaySubmission] = useState(null);

//   useEffect(() => {
//     checkTodaySubmission();
//   }, []);

//   const checkTodaySubmission = async () => {
//     try {
//       const data = await getMyWorkHistoryApi({ limit: 5 });
//       const today = new Date().toDateString();
//       const todaySub = data.submissions?.find(
//         (s) => new Date(s.date).toDateString() === today
//       );
//       setTodaySubmission(todaySub);
//     } catch (error) {
//       // Ignore
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error('Photo size must be less than 5MB');
//         return;
//       }
//       setFormData({ ...formData, photo: file });
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.description.length < 10) {
//       toast.error('Description must be at least 10 characters');
//       return;
//     }

//     if (!formData.photo) {
//       toast.error('Please upload a photo');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const data = new FormData();
//       data.append('description', formData.description);
//       data.append('workType', formData.workType);
//       data.append('photo', formData.photo);

//       const result = await submitWorkApi(data);

//       if (result.success) {
//         toast.success('Work submitted successfully!');
//         setFormData({ description: '', workType: 'SHG Meeting', photo: null });
//         setPreview(null);
//         checkTodaySubmission();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submission failed');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
//         Submit Today's Work
//       </h1>

//       {todaySubmission && (
//         <div className="bg-amber-950/40 border border-amber-800/80 p-4 rounded-2xl text-amber-200">
//           <p className="text-sm font-semibold flex items-center gap-2">
//             ⚠️ You have already submitted work today
//           </p>
//           <p className="text-xs text-amber-300/80 mt-1">
//             Status:{' '}
//             <span className="font-bold uppercase tracking-wider">
//               {todaySubmission.status}
//             </span>
//           </p>
//         </div>
//       )}

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Date
//             </label>
//             <input
//               type="text"
//               value={format(new Date(), 'dd-MM-yyyy')}
//               disabled
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed font-mono text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Work Type
//             </label>
//             <select
//               value={formData.workType}
//               onChange={(e) =>
//                 setFormData({ ...formData, workType: e.target.value })
//               }
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
//             >
//               <option className="bg-zinc-900 text-zinc-200">SHG Meeting</option>
//               <option className="bg-zinc-900 text-zinc-200">Training</option>
//               <option className="bg-zinc-900 text-zinc-200">Field Visit</option>
//               <option className="bg-zinc-900 text-zinc-200">Documentation</option>
//               <option className="bg-zinc-900 text-zinc-200">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Work Description *
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               rows="5"
//               placeholder="Describe your work in detail (minimum 10 characters)..."
//               className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none text-sm"
//               required
//               minLength={10}
//             />
//             <p className="text-xs text-zinc-500 mt-1">
//               {formData.description.length}/10 characters
//             </p>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
//               Work Photo *
//             </label>
//             <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 text-center transition-colors bg-zinc-950/50">
//               {preview ? (
//                 <div>
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="max-h-60 mx-auto rounded-xl shadow-lg border border-zinc-800 object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setFormData({ ...formData, photo: null });
//                       setPreview(null);
//                     }}
//                     className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
//                   >
//                     Remove Photo
//                   </button>
//                 </div>
//               ) : (
//                 <label className="cursor-pointer block">
//                   <div className="text-4xl mb-2">📷</div>
//                   <p className="text-sm font-semibold text-zinc-200">
//                     Click to upload photo
//                   </p>
//                   <p className="text-xs text-zinc-500 mt-1">
//                     JPG, PNG, GIF, WebP (Max 5MB)
//                   </p>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={submitting || !!todaySubmission}
//             className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
//           >
//             {submitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Submitting...
//               </>
//             ) : todaySubmission ? (
//               'Already Submitted Today'
//             ) : (
//               'Submit Work'
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubmitWork;
import { useState, useEffect } from 'react';
import { getMyWorkHistoryApi, submitWorkApi } from '../api/employeeApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const SubmitWork = () => {
  const [formData, setFormData] = useState({
    description: '',
    workType: 'SHG Meeting',
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [todaySubmission, setTodaySubmission] = useState(null);

  useEffect(() => {
    checkTodaySubmission();
  }, []);

  const checkTodaySubmission = async () => {
    try {
      const data = await getMyWorkHistoryApi({ limit: 5 });
      const today = new Date().toDateString();
      const todaySub = data.submissions?.find(
        (s) => new Date(s.date).toDateString() === today
      );
      setTodaySubmission(todaySub);
    } catch (error) {
      // Ignore
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length < 10) {
      toast.error('Description must be at least 10 characters');
      return;
    }

    if (!formData.photo) {
      toast.error('Please upload a photo');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('description', formData.description);
      data.append('workType', formData.workType);
      data.append('photo', formData.photo);

      const result = await submitWorkApi(data);

      if (result.success) {
        toast.success('Work submitted successfully!');
        setFormData({ description: '', workType: 'SHG Meeting', photo: null });
        setPreview(null);
        checkTodaySubmission();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">Submit Today's Work</h1>

      {todaySubmission && (
        <div className="bg-amber-950/40 border border-amber-800/80 p-4 rounded-2xl text-amber-200">
          <p className="text-sm font-semibold flex items-center gap-2">
            ⚠️ You have already submitted work today
          </p>
          <p className="text-xs text-amber-300/80 mt-1">
            Status: <span className="font-bold uppercase tracking-wider">{todaySubmission.status}</span>
          </p>
        </div>
      )}

      <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Date</label>
            <input
              type="text"
              value={format(new Date(), 'dd-MM-yyyy')}
              disabled
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Type</label>
            <select
              value={formData.workType}
              onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
            >
              <option className="bg-zinc-900 text-zinc-200">SHG Meeting</option>
              <option className="bg-zinc-900 text-zinc-200">Training</option>
              <option className="bg-zinc-900 text-zinc-200">Field Visit</option>
              <option className="bg-zinc-900 text-zinc-200">Documentation</option>
              <option className="bg-zinc-900 text-zinc-200">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="5"
              placeholder="Describe your work in detail (minimum 10 characters)..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-none text-sm"
              required
              minLength={10}
            />
            <p className="text-xs text-zinc-500 mt-1">
              {formData.description.length}/10 characters
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Work Photo *</label>
            <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 text-center transition-colors bg-zinc-950/50">
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-60 mx-auto rounded-xl shadow-lg border border-zinc-800 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, photo: null });
                      setPreview(null);
                    }}
                    className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm font-semibold text-zinc-200">
                    Click to upload photo
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    JPG, PNG, GIF, WebP (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !!todaySubmission}
            className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : todaySubmission ? (
              'Already Submitted Today'
            ) : (
              'Submit Work'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitWork;