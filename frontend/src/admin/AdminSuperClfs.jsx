// import { useState, useEffect } from 'react';
// import { getClfsApi, createClfApi, updateClfApi, deleteClfApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import Modal from '../components/Modal';
// import toast from 'react-hot-toast';

// const AdminSuperClfs = () => {
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     block: '',
//     district: 'Palamu',
//     adminName: '',
//     adminUserId: '',
//     adminPassword: '',
//   });

//   useEffect(() => {
//     fetchClfs();
//   }, []);

//   const fetchClfs = async () => {
//     setLoading(true);
//     try {
//       const data = await getClfsApi();
//       setClfs(data.clfs || []);
//     } catch (error) {
//       toast.error('Failed to load CLFs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateClfApi(editingId, {
//           name: formData.name,
//           block: formData.block,
//         });
//         toast.success('CLF updated');
//       } else {
//         await createClfApi(formData);
//         toast.success('CLF created');
//       }
//       setShowModal(false);
//       resetForm();
//       fetchClfs();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Deactivate this CLF? All employees will be affected.')) return;
//     try {
//       await deleteClfApi(id);
//       toast.success('CLF deactivated');
//       fetchClfs();
//     } catch (error) {
//       toast.error('Delete failed');
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       name: '',
//       code: '',
//       block: '',
//       district: 'Palamu',
//       adminName: '',
//       adminUserId: '',
//       adminPassword: '',
//     });
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-primary">CLF Management</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="btn-primary"
//         >
//           + Add CLF
//         </button>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : clfs.length === 0 ? (
//         <div className="card text-center py-12">
//           <p className="text-gray-500">No CLFs yet</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {clfs.map((clf) => (
//             <div key={clf._id} className="card">
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-bold text-primary text-lg">{clf.name}</h3>
//                   <p className="text-xs text-gray-500">{clf.code}</p>
//                 </div>
//                 <span
//                   className={`text-xs px-2 py-1 rounded-full font-bold ${
//                     clf.status === 'ACTIVE'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {clf.status}
//                 </span>
//               </div>

//               <div className="space-y-1 text-sm mb-4">
//                 <p className="text-gray-700">
//                   <strong>Block:</strong> {clf.block}
//                 </p>
//                 <p className="text-gray-700">
//                   <strong>District:</strong> {clf.district}
//                 </p>
//                 {clf.adminId && (
//                   <p className="text-gray-700">
//                     <strong>Admin:</strong> {clf.adminId.name} ({clf.adminId.userId})
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setEditingId(clf._id);
//                     setFormData({
//                       name: clf.name,
//                       code: clf.code,
//                       block: clf.block,
//                       district: clf.district,
//                       adminName: '',
//                       adminUserId: '',
//                       adminPassword: '',
//                     });
//                     setShowModal(true);
//                   }}
//                   className="flex-1 text-xs bg-secondary hover:bg-secondary-dark text-white py-2 rounded font-semibold"
//                 >
//                   Edit
//                 </button>
//                 {clf.status === 'ACTIVE' && (
//                   <button
//                     onClick={() => handleDelete(clf._id)}
//                     className="flex-1 text-xs bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold"
//                   >
//                     Deactivate
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={editingId ? 'Edit CLF' : 'Create New CLF'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="label">CLF Name *</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="input-field"
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">CLF Code *</label>
//               <input
//                 type="text"
//                 value={formData.code}
//                 onChange={(e) => setFormData({ ...formData, code: e.target.value })}
//                 className="input-field"
//                 disabled={!!editingId}
//                 required
//                 placeholder="CLF001"
//               />
//             </div>
//             <div>
//               <label className="label">Block *</label>
//               <input
//                 type="text"
//                 value={formData.block}
//                 onChange={(e) => setFormData({ ...formData, block: e.target.value })}
//                 className="input-field"
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">District</label>
//               <input
//                 type="text"
//                 value={formData.district}
//                 onChange={(e) => setFormData({ ...formData, district: e.target.value })}
//                 className="input-field"
//               />
//             </div>

//             {!editingId && (
//               <>
//                 <div>
//                   <label className="label">CLF Admin Name *</label>
//                   <input
//                     type="text"
//                     value={formData.adminName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, adminName: e.target.value })
//                     }
//                     className="input-field"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="label">Admin User ID *</label>
//                   <input
//                     type="text"
//                     value={formData.adminUserId}
//                     onChange={(e) =>
//                       setFormData({ ...formData, adminUserId: e.target.value })
//                     }
//                     className="input-field"
//                     required
//                     placeholder="clf001admin"
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="label">Admin Password *</label>
//                   <input
//                     type="password"
//                     value={formData.adminPassword}
//                     onChange={(e) =>
//                       setFormData({ ...formData, adminPassword: e.target.value })
//                     }
//                     className="input-field"
//                     required
//                     minLength={6}
//                   />
//                 </div>
//               </>
//             )}
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button type="submit" className="btn-primary flex-1">
//               {editingId ? 'Update' : 'Create CLF'}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setShowModal(false);
//                 resetForm();
//               }}
//               className="px-6 py-2.5 bg-gray-200 rounded-lg font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AdminSuperClfs;






// import { useState, useEffect } from 'react';
// import { getClfsApi, createClfApi, updateClfApi, deleteClfApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import Modal from '../components/Modal';
// import toast from 'react-hot-toast';

// const AdminSuperClfs = () => {
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     block: '',
//     district: 'Palamu',
//     adminName: '',
//     adminUserId: '',
//     adminPassword: '',
//   });

//   useEffect(() => {
//     fetchClfs();
//   }, []);

//   const fetchClfs = async () => {
//     setLoading(true);
//     try {
//       const data = await getClfsApi();
//       setClfs(data.clfs || []);
//     } catch (error) {
//       toast.error('Failed to load CLFs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateClfApi(editingId, {
//           name: formData.name,
//           block: formData.block,
//         });
//         toast.success('CLF updated');
//       } else {
//         await createClfApi(formData);
//         toast.success('CLF created');
//       }
//       setShowModal(false);
//       resetForm();
//       fetchClfs();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Deactivate this CLF? All employees will be affected.')) return;
//     try {
//       await deleteClfApi(id);
//       toast.success('CLF deactivated');
//       fetchClfs();
//     } catch (error) {
//       toast.error('Delete failed');
//     }
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       name: '',
//       code: '',
//       block: '',
//       district: 'Palamu',
//       adminName: '',
//       adminUserId: '',
//       adminPassword: '',
//     });
//   };

//   return (
//     <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 md:p-8">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-800/60 backdrop-blur-md border border-slate-700/60 p-5 sm:p-6 rounded-2xl shadow-lg">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//             CLF Management
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             Create, update, and manage Cluster Level Federation nodes
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
//         >
//           <span className="text-lg font-bold">+</span> Add CLF
//         </button>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : clfs.length === 0 ? (
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl text-center py-16 px-4 shadow-xl">
//           <div className="text-4xl mb-3">🏢</div>
//           <p className="text-slate-400 text-base font-medium">No CLFs available right now</p>
//           <p className="text-xs text-slate-500 mt-1">Click "+ Add CLF" above to get started.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {clfs.map((clf) => (
//             <div
//               key={clf._id}
//               className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-slate-600 flex flex-col justify-between"
//             >
//               <div>
//                 <div className="flex justify-between items-start gap-2 mb-4">
//                   <div>
//                     <h3 className="font-bold text-white text-lg group-hover:text-indigo-400 transition-colors">
//                       {clf.name}
//                     </h3>
//                     <p className="text-xs text-indigo-400 font-mono mt-0.5">{clf.code}</p>
//                   </div>
//                   <span
//                     className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
//                       clf.status === 'ACTIVE'
//                         ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
//                         : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
//                     }`}
//                   >
//                     {clf.status}
//                   </span>
//                 </div>

//                 <div className="space-y-2 text-sm text-slate-300 mb-6 bg-slate-900/50 p-3.5 rounded-xl border border-slate-700/40">
//                   <p className="flex justify-between">
//                     <span className="text-slate-400 font-medium">Block:</span>
//                     <span className="font-semibold text-slate-200">{clf.block}</span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-slate-400 font-medium">District:</span>
//                     <span className="font-semibold text-slate-200">{clf.district}</span>
//                   </p>
//                   {clf.adminId && (
//                     <p className="flex justify-between pt-1 border-t border-slate-800">
//                       <span className="text-slate-400 font-medium">Admin:</span>
//                       <span className="font-semibold text-slate-200">
//                         {clf.adminId.name} <span className="text-xs text-slate-400">({clf.adminId.userId})</span>
//                       </span>
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setEditingId(clf._id);
//                     setFormData({
//                       name: clf.name,
//                       code: clf.code,
//                       block: clf.block,
//                       district: clf.district,
//                       adminName: '',
//                       adminUserId: '',
//                       adminPassword: '',
//                     });
//                     setShowModal(true);
//                   }}
//                   className="flex-1 text-xs bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 py-2.5 rounded-xl font-semibold transition-all"
//                 >
//                   Edit
//                 </button>
//                 {clf.status === 'ACTIVE' && (
//                   <button
//                     onClick={() => handleDelete(clf._id)}
//                     className="flex-1 text-xs bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 py-2.5 rounded-xl font-semibold transition-all"
//                   >
//                     Deactivate
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Clean High-Contrast Black & White Modal Form */}
//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={editingId ? 'Edit CLF' : 'Create New CLF'}
//         size="lg"
//       >
//         <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                   CLF Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Enter CLF Name"
//                   className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                   CLF Code <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.code}
//                   onChange={(e) => setFormData({ ...formData, code: e.target.value })}
//                   placeholder="e.g. CLF001"
//                   className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed transition-all"
//                   disabled={!!editingId}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                   Block <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.block}
//                   onChange={(e) => setFormData({ ...formData, block: e.target.value })}
//                   placeholder="Enter Block Name"
//                   className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                   District
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.district}
//                   onChange={(e) => setFormData({ ...formData, district: e.target.value })}
//                   placeholder="District Name"
//                   className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                 />
//               </div>

//               {!editingId && (
//                 <>
//                   <div>
//                     <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                       Admin Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.adminName}
//                       onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
//                       placeholder="Enter Full Name"
//                       className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                       Admin User ID <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.adminUserId}
//                       onChange={(e) => setFormData({ ...formData, adminUserId: e.target.value })}
//                       placeholder="clf001admin"
//                       className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
//                       Admin Password <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="password"
//                       value={formData.adminPassword}
//                       onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
//                       placeholder="••••••••"
//                       className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
//                       required
//                       minLength={6}
//                     />
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="flex gap-4 pt-6 border-t border-zinc-800 mt-6">
//               <button
//                 type="submit"
//                 className="flex-1 py-3 bg-white text-black hover:bg-zinc-200 font-bold text-sm rounded-lg transition-all shadow-md active:scale-[0.99]"
//               >
//                 {editingId ? 'Update CLF' : 'Create CLF'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowModal(false);
//                   resetForm();
//                 }}
//                 className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm rounded-lg border border-zinc-700 transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminSuperClfs;

import { useState, useEffect } from 'react';
import { getClfsApi, createClfApi, updateClfApi, deleteClfApi } from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const AdminSuperClfs = () => {
  const [clfs, setClfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    block: '',
    district: 'Palamu',
    adminName: '',
    adminUserId: '',
    adminPassword: '',
  });

  useEffect(() => {
    fetchClfs();
  }, []);

  const fetchClfs = async () => {
    setLoading(true);
    try {
      const data = await getClfsApi();
      setClfs(data.clfs || []);
    } catch (error) {
      toast.error('Failed to load CLFs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateClfApi(editingId, {
          name: formData.name,
          block: formData.block,
        });
        toast.success('CLF updated');
      } else {
        await createClfApi(formData);
        toast.success('CLF created');
      }
      setShowModal(false);
      resetForm();
      fetchClfs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this CLF? All employees will be affected.')) return;
    try {
      await deleteClfApi(id);
      toast.success('CLF deactivated');
      fetchClfs();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      code: '',
      block: '',
      district: 'Palamu',
      adminName: '',
      adminUserId: '',
      adminPassword: '',
    });
  };

  return (
    // Updated outer container to Black Theme
    <div className="w-full min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-zinc-900 border border-zinc-800 p-5 sm:p-6 rounded-xl shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            CLF Management
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Create, update, and manage Cluster Level Federation nodes
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-bold rounded-lg transition-all shadow-md active:scale-95 text-sm"
        >
          <span className="text-lg font-bold">+</span> Add CLF
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : clfs.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl text-center py-16 px-4 shadow-md">
          <div className="text-4xl mb-3">🏢</div>
          <p className="text-zinc-400 text-base font-medium">No CLFs available right now</p>
          <p className="text-xs text-zinc-500 mt-1">Click "+ Add CLF" above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {clfs.map((clf) => (
            <div
              key={clf._id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md hover:border-zinc-700 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {clf.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{clf.code}</p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                      clf.status === 'ACTIVE'
                        ? 'bg-zinc-100 text-black border-white'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}
                  >
                    {clf.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-zinc-300 mb-6 bg-black p-3.5 rounded-lg border border-zinc-800">
                  <p className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Block:</span>
                    <span className="font-semibold text-white">{clf.block}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-zinc-400 font-medium">District:</span>
                    <span className="font-semibold text-white">{clf.district}</span>
                  </p>
                  {clf.adminId && (
                    <p className="flex justify-between pt-1 border-t border-zinc-800">
                      <span className="text-zinc-400 font-medium">Admin:</span>
                      <span className="font-semibold text-white">
                        {clf.adminId.name} <span className="text-xs text-zinc-400">({clf.adminId.userId})</span>
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(clf._id);
                    setFormData({
                      name: clf.name,
                      code: clf.code,
                      block: clf.block,
                      district: clf.district,
                      adminName: '',
                      adminUserId: '',
                      adminPassword: '',
                    });
                    setShowModal(true);
                  }}
                  className="flex-1 text-xs bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white py-2.5 rounded-lg font-semibold transition-all"
                >
                  Edit
                </button>
                {clf.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleDelete(clf._id)}
                    className="flex-1 text-xs bg-red-950/40 border border-red-800 hover:bg-red-900/60 text-red-300 py-2.5 rounded-lg font-semibold transition-all"
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clean High-Contrast Black & White Modal Form */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? 'Edit CLF' : 'Create New CLF'}
        size="lg"
      >
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  CLF Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter CLF Name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  CLF Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. CLF001"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:border-zinc-800 disabled:cursor-not-allowed transition-all"
                  disabled={!!editingId}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Block <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.block}
                  onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                  placeholder="Enter Block Name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  District
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="District Name"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                />
              </div>

              {!editingId && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Admin Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      placeholder="Enter Full Name"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Admin User ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.adminUserId}
                      onChange={(e) => setFormData({ ...formData, adminUserId: e.target.value })}
                      placeholder="clf001admin"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Admin Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm font-medium focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
                      required
                      minLength={6}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-zinc-800 mt-6">
              <button
                type="submit"
                className="flex-1 py-3 bg-white text-black hover:bg-zinc-200 font-bold text-sm rounded-lg transition-all shadow-md active:scale-[0.99]"
              >
                {editingId ? 'Update CLF' : 'Create CLF'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-sm rounded-lg border border-zinc-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSuperClfs;