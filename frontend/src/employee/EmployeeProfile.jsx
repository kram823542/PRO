
// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { uploadProfilePictureApi, removeProfilePictureApi } from '../api/authApi';
// import toast from 'react-hot-toast';
// import { format } from 'date-fns';

// const EmployeeProfile = () => {
//   const { user, logout } = useAuth();
//   const [uploading, setUploading] = useState(false);
//   const [profilePic, setProfilePic] = useState(user?.profilePicture || null);

//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Photo must be less than 2MB');
//       return;
//     }
//     if (!file.type.startsWith('image/')) {
//       toast.error('Only image files allowed');
//       return;
//     }

//     setUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('photo', file);

//       const result = await uploadProfilePictureApi(formData);

//       if (result.success) {
//         setProfilePic(result.profilePicture);
//         toast.success('Profile picture updated!');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemovePhoto = async () => {
//     if (!window.confirm('Remove profile picture?')) return;

//     setUploading(true);
//     try {
//       const result = await removeProfilePictureApi();
//       if (result.success) {
//         setProfilePic(null);
//         toast.success('Profile picture removed');
//       }
//     } catch (error) {
//       toast.error('Remove failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Profile</h1>

//       <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
//         {/* Profile Photo Section */}
//         <div className="flex flex-col items-center mb-6 border-b border-zinc-800 pb-6">
//           <div className="relative group">
//             <div className="w-32 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg overflow-hidden">
//               {profilePic ? (
//                 <img
//                   src={profilePic}
//                   alt={user?.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 user?.name?.charAt(0)
//               )}
//             </div>

//             <label
//               className={`absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-opacity ${
//                 uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
//               }`}
//             >
//               {uploading ? (
//                 <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <span className="text-2xl">📷</span>
//                   <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
//                     Change
//                   </span>
//                 </>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoUpload}
//                 className="hidden"
//                 disabled={uploading}
//               />
//             </label>
//           </div>

//           {profilePic && !uploading && (
//             <button
//               onClick={handleRemovePhoto}
//               className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
//             >
//               Remove Photo
//             </button>
//           )}

//           <h2 className="text-xl font-bold text-zinc-100 mt-4">{user?.name}</h2>
//           <span className="mt-2 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-semibold">
//             {user?.role}
//           </span>
//         </div>

//         {/* Personal Information */}
//         <div className="space-y-4">
//           {[
//             { label: 'User ID', value: user?.userId },
//             { label: 'Designation', value: user?.designation },
//             { label: 'Mobile', value: user?.mobile },
//             {
//               label: 'Joining Date',
//               value: user?.joiningDate
//                 ? format(new Date(user.joiningDate), 'dd MMM yyyy')
//                 : 'N/A',
//             },
//             { label: 'CLF', value: user?.clfName || 'N/A' },
//             { label: 'Status', value: user?.status },
//           ].map((item, i) => (
//             <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
//               <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
//                 {item.label}
//               </span>
//               <span className="text-sm font-bold text-zinc-200 text-right">
//                 {item.value || 'N/A'}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* ✅ Bank Details Section */}
//         {user?.bankName && (
//           <div className="mt-6 pt-6 border-t border-zinc-800">
//             <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
//               Bank Details
//             </h3>
//             <div className="space-y-4">
//               {[
//                 { label: 'Bank Name', value: user?.bankName },
//                 { label: 'Account Number', value: user?.bankAccountNumber },
//                 { label: 'Branch', value: user?.branch },
//                 { label: 'IFSC Code', value: user?.ifscCode },
//               ].map((item, i) => (
//                 <div key={i} className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0">
//                   <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
//                     {item.label}
//                   </span>
//                   <span className="text-sm font-bold text-zinc-200 text-right font-mono">
//                     {item.value || 'N/A'}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Logout */}
//         <div className="mt-8 pt-6 border-t border-zinc-800">
//           <button
//             onClick={logout}
//             className="w-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
//           >
//             <span className="text-base">🚪</span> Logout Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfile;





import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  uploadProfilePictureApi,
  removeProfilePictureApi,
} from '../api/authApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const EmployeeProfile = () => {
  const { user, logout, refreshUser, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(user?.profilePicture || null);

  // ✅ Fetch fresh user data on mount
  useEffect(() => {
    const fetchFreshUser = async () => {
      try {
        const freshUser = await refreshUser();
        if (freshUser?.profilePicture) {
          setProfilePic(freshUser.profilePicture);
        }
      } catch (error) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchFreshUser();
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Photo must be less than 2MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files allowed');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const result = await uploadProfilePictureApi(formData);

      if (result.success) {
        setProfilePic(result.profilePicture);
        // ✅ Context + localStorage update
        setUser((prev) => ({ ...prev, profilePicture: result.profilePicture }));
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem(
          'user',
          JSON.stringify({ ...stored, profilePicture: result.profilePicture })
        );
        toast.success('Profile picture updated!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm('Remove profile picture?')) return;

    setUploading(true);
    try {
      const result = await removeProfilePictureApi();
      if (result.success) {
        setProfilePic(null);
        setUser((prev) => ({ ...prev, profilePicture: null }));
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem(
          'user',
          JSON.stringify({ ...stored, profilePicture: null })
        );
        toast.success('Profile picture removed');
      }
    } catch (error) {
      toast.error('Remove failed');
    } finally {
      setUploading(false);
    }
  };

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">My Profile</h1>

      <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-md">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6 border-b border-zinc-800 pb-6">
          <div className="relative group">
            <div className="w-32 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0)
              )}
            </div>

            <label
              className={`absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white cursor-pointer transition-opacity ${
                uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {uploading ? (
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-2xl">📷</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                    Change
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {profilePic && !uploading && (
            <button
              onClick={handleRemovePhoto}
              className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-semibold uppercase tracking-wider"
            >
              Remove Photo
            </button>
          )}

          <h2 className="text-xl font-bold text-zinc-100 mt-4">{user?.name}</h2>
          <span className="mt-2 text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full font-semibold">
            {user?.role}
          </span>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          {[
            { label: 'User ID', value: user?.userId },
            { label: 'Designation', value: user?.designation },
            { label: 'Mobile', value: user?.mobile },
            {
              label: 'Joining Date',
              value: user?.joiningDate
                ? format(new Date(user.joiningDate), 'dd MMM yyyy')
                : 'N/A',
            },
            { label: 'CLF', value: user?.clfName || 'N/A' },
            { label: 'Status', value: user?.status },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {item.label}
              </span>
              <span className="text-sm font-bold text-zinc-200 text-right">
                {item.value || 'N/A'}
              </span>
            </div>
          ))}
        </div>

        {/* Bank Details Section */}
        {user?.bankName && (
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
              Bank Details
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Bank Name', value: user?.bankName },
                { label: 'Account Number', value: user?.bankAccountNumber },
                { label: 'Branch', value: user?.branch },
                { label: 'IFSC Code', value: user?.ifscCode },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-zinc-800/60 last:border-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-zinc-200 text-right font-mono">
                    {item.value || 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <button
            onClick={logout}
            className="w-full bg-rose-600/10 hover:bg-rose-600/20 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span className="text-base">🚪</span> Logout Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;