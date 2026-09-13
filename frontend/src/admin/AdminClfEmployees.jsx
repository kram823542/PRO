// import { useState, useEffect } from 'react';
// import {
//   getEmployeesApi,
//   createEmployeeApi,
//   updateEmployeeApi,
//   deleteEmployeeApi,
//   resetEmployeePasswordApi,
// } from '../api/adminApi';
// import Loader from '../components/Loader';
// import Modal from '../components/Modal';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const EMPLOYEE_TYPES = [
//   'CADER',
//   'Bank Sakhi',
//   'BDSP',
//   'FLCRP',
//   'Gender CRP',
//   'Setu',
//   'Senior Setu',
// ];

// const AdminClfEmployees = () => {
//   const { user } = useAuth();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [resetUserId, setResetUserId] = useState(null);
//   const [filters, setFilters] = useState({ employeeType: '', status: '', search: '' });

//   const [formData, setFormData] = useState({
//     name: '',
//     userId: '',
//     password: '',
//     employeeType: 'BDSP',
//     designation: '',
//     mobile: '',
//     joiningDate: new Date().toISOString().split('T')[0],
//   });
//   const [newPassword, setNewPassword] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//   }, [filters]);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const params = { clfId: user.clfId };
//       if (filters.employeeType) params.employeeType = filters.employeeType;
//       if (filters.status) params.status = filters.status;
//       if (filters.search) params.search = filters.search;

//       const data = await getEmployeesApi(params);
//       setEmployees(data.employees || []);
//     } catch (error) {
//       toast.error('Failed to load employees');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateEmployeeApi(editingId, {
//           name: formData.name,
//           employeeType: formData.employeeType,
//           designation: formData.designation,
//           mobile: formData.mobile,
//         });
//         toast.success('Employee updated successfully');
//       } else {
//         await createEmployeeApi({ ...formData, clfId: user.clfId });
//         toast.success('Employee created successfully');
//       }
//       setShowModal(false);
//       resetForm();
//       fetchEmployees();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Deactivate this employee? They will not be able to login.')) return;
//     try {
//       await deleteEmployeeApi(id);
//       toast.success('Employee deactivated');
//       fetchEmployees();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Delete failed');
//     }
//   };

//   const handleActivate = async (id) => {
//     try {
//       await updateEmployeeApi(id, { status: 'ACTIVE' });
//       toast.success('Employee activated');
//       fetchEmployees();
//     } catch (error) {
//       toast.error('Failed to activate');
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }
//     try {
//       await resetEmployeePasswordApi(resetUserId, newPassword);
//       toast.success('Password reset successfully');
//       setShowResetModal(false);
//       setNewPassword('');
//       setResetUserId(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Reset failed');
//     }
//   };

//   const openEdit = (emp) => {
//     setEditingId(emp._id);
//     setFormData({
//       name: emp.name,
//       userId: emp.userId,
//       password: '',
//       employeeType: emp.employeeType,
//       designation: emp.designation || '',
//       mobile: emp.mobile || '',
//       joiningDate: emp.joiningDate?.split('T')[0] || '',
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       name: '',
//       userId: '',
//       password: '',
//       employeeType: 'BDSP',
//       designation: '',
//       mobile: '',
//       joiningDate: new Date().toISOString().split('T')[0],
//     });
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-primary">Employees</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="btn-primary"
//         >
//           + Add Employee
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="label">Search</label>
//             <input
//               type="text"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//               placeholder="Name or User ID"
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="label">Employee Type</label>
//             <select
//               value={filters.employeeType}
//               onChange={(e) => setFilters({ ...filters, employeeType: e.target.value })}
//               className="input-field"
//             >
//               <option value="">All Types</option>
//               {EMPLOYEE_TYPES.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="label">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="input-field"
//             >
//               <option value="">All</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : employees.length === 0 ? (
//         <div className="card text-center py-12">
//           <p className="text-gray-500">No employees found</p>
//         </div>
//       ) : (
//         <div className="card overflow-x-auto">
//           <table className="w-full min-w-[600px]">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="text-left p-3 text-sm font-semibold">Name</th>
//                 <th className="text-left p-3 text-sm font-semibold">User ID</th>
//                 <th className="text-left p-3 text-sm font-semibold">Type</th>
//                 <th className="text-left p-3 text-sm font-semibold">Mobile</th>
//                 <th className="text-left p-3 text-sm font-semibold">Status</th>
//                 <th className="text-right p-3 text-sm font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp._id} className="border-b hover:bg-gray-50">
//                   <td className="p-3 text-sm font-semibold text-primary">{emp.name}</td>
//                   <td className="p-3 text-sm text-gray-700">{emp.userId}</td>
//                   <td className="p-3 text-sm text-gray-700">{emp.employeeType}</td>
//                   <td className="p-3 text-sm text-gray-700">{emp.mobile || '-'}</td>
//                   <td className="p-3">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full font-bold ${
//                         emp.status === 'ACTIVE'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {emp.status}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex justify-end gap-2 flex-wrap">
//                       <button
//                         onClick={() => openEdit(emp)}
//                         className="text-xs bg-secondary hover:bg-secondary-dark text-white px-2.5 py-1 rounded font-medium"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => {
//                           setResetUserId(emp._id);
//                           setShowResetModal(true);
//                         }}
//                         className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 py-1 rounded font-medium"
//                       >
//                         Reset Pass
//                       </button>
//                       {emp.status === 'ACTIVE' ? (
//                         <button
//                           onClick={() => handleDelete(emp._id)}
//                           className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded font-medium"
//                         >
//                           Deactivate
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleActivate(emp._id)}
//                           className="text-xs bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 rounded font-medium"
//                         >
//                           Activate
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={editingId ? 'Edit Employee' : 'Add New Employee'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="label">Full Name *</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="input-field"
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">User ID *</label>
//               <input
//                 type="text"
//                 value={formData.userId}
//                 onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
//                 className="input-field"
//                 disabled={!!editingId}
//                 required
//                 placeholder="e.g. ramesh@101"
//               />
//             </div>
//             {!editingId && (
//               <div>
//                 <label className="label">Password *</label>
//                 <input
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className="input-field"
//                   required
//                   minLength={6}
//                 />
//               </div>
//             )}
//             <div>
//               <label className="label">Employee Type *</label>
//               <select
//                 value={formData.employeeType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, employeeType: e.target.value })
//                 }
//                 className="input-field"
//                 required
//               >
//                 {EMPLOYEE_TYPES.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="label">Designation</label>
//               <input
//                 type="text"
//                 value={formData.designation}
//                 onChange={(e) =>
//                   setFormData({ ...formData, designation: e.target.value })
//                 }
//                 className="input-field"
//               />
//             </div>
//             <div>
//               <label className="label">Mobile</label>
//               <input
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={(e) =>
//                   setFormData({ ...formData, mobile: e.target.value })
//                 }
//                 className="input-field"
//               />
//             </div>
//             <div>
//               <label className="label">Joining Date</label>
//               <input
//                 type="date"
//                 value={formData.joiningDate}
//                 onChange={(e) =>
//                   setFormData({ ...formData, joiningDate: e.target.value })
//                 }
//                 className="input-field"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button type="submit" className="btn-primary flex-1">
//               {editingId ? 'Update' : 'Create'} Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setShowModal(false);
//                 resetForm();
//               }}
//               className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-primary font-semibold rounded-lg"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Reset Password Modal */}
//       <Modal
//         isOpen={showResetModal}
//         onClose={() => {
//           setShowResetModal(false);
//           setNewPassword('');
//           setResetUserId(null);
//         }}
//         title="Reset Password"
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="label">New Password *</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="input-field"
//               minLength={6}
//               placeholder="Minimum 6 characters"
//             />
//           </div>
//           <div className="flex gap-3">
//             <button onClick={handleResetPassword} className="btn-primary flex-1">
//               Reset Password
//             </button>
//             <button
//               onClick={() => setShowResetModal(false)}
//               className="px-6 py-2.5 bg-gray-200 rounded-lg font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminClfEmployees;













// import { useState, useEffect } from 'react';
// import {
//   getEmployeesApi,
//   createEmployeeApi,
//   updateEmployeeApi,
//   deleteEmployeeApi,
//   resetEmployeePasswordApi,
// } from '../api/adminApi';
// import Loader from '../components/Loader';
// import Modal from '../components/Modal';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const EMPLOYEE_TYPES = [
//   'CADER',
//   'Bank Sakhi',
//   'BDSP',
//   'FLCRP',
//   'Gender CRP',
//   'Setu',
//   'Senior Setu',
// ];

// const AdminClfEmployees = () => {
//   const { user } = useAuth();
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [resetUserId, setResetUserId] = useState(null);
//   const [filters, setFilters] = useState({ employeeType: '', status: '', search: '' });

//   const [formData, setFormData] = useState({
//     name: '',
//     userId: '',
//     password: '',
//     employeeType: 'BDSP',
//     designation: '',
//     mobile: '',
//     joiningDate: new Date().toISOString().split('T')[0],
//   });
//   const [newPassword, setNewPassword] = useState('');

//   useEffect(() => {
//     fetchEmployees();
//   }, [filters]);

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const params = { clfId: user.clfId };
//       if (filters.employeeType) params.employeeType = filters.employeeType;
//       if (filters.status) params.status = filters.status;
//       if (filters.search) params.search = filters.search;

//       const data = await getEmployeesApi(params);
//       setEmployees(data.employees || []);
//     } catch (error) {
//       toast.error('Failed to load employees');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await updateEmployeeApi(editingId, {
//           name: formData.name,
//           employeeType: formData.employeeType,
//           designation: formData.designation,
//           mobile: formData.mobile,
//         });
//         toast.success('Employee updated successfully');
//       } else {
//         await createEmployeeApi({ ...formData, clfId: user.clfId });
//         toast.success('Employee created successfully');
//       }
//       setShowModal(false);
//       resetForm();
//       fetchEmployees();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Deactivate this employee? They will not be able to login.')) return;
//     try {
//       await deleteEmployeeApi(id);
//       toast.success('Employee deactivated');
//       fetchEmployees();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Delete failed');
//     }
//   };

//   const handleActivate = async (id) => {
//     try {
//       await updateEmployeeApi(id, { status: 'ACTIVE' });
//       toast.success('Employee activated');
//       fetchEmployees();
//     } catch (error) {
//       toast.error('Failed to activate');
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }
//     try {
//       await resetEmployeePasswordApi(resetUserId, newPassword);
//       toast.success('Password reset successfully');
//       setShowResetModal(false);
//       setNewPassword('');
//       setResetUserId(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Reset failed');
//     }
//   };

//   const openEdit = (emp) => {
//     setEditingId(emp._id);
//     setFormData({
//       name: emp.name,
//       userId: emp.userId,
//       password: '',
//       employeeType: emp.employeeType,
//       designation: emp.designation || '',
//       mobile: emp.mobile || '',
//       joiningDate: emp.joiningDate?.split('T')[0] || '',
//     });
//     setShowModal(true);
//   };

//   const resetForm = () => {
//     setEditingId(null);
//     setFormData({
//       name: '',
//       userId: '',
//       password: '',
//       employeeType: 'BDSP',
//       designation: '',
//       mobile: '',
//       joiningDate: new Date().toISOString().split('T')[0],
//     });
//   };

//   return (
//     <div className="space-y-6 text-zinc-100">
//       {/* Header Bar */}
//       <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Employees</h1>
//           <p className="text-zinc-400 text-sm font-medium mt-1">
//             Manage all team members and access credentials
//           </p>
//         </div>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowModal(true);
//           }}
//           className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
//         >
//           + Add Employee
//         </button>
//       </div>

//       {/* Filters Section */}
//       <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//               Search
//             </label>
//             <input
//               type="text"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//               placeholder="Name or User ID"
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//               Employee Type
//             </label>
//             <select
//               value={filters.employeeType}
//               onChange={(e) => setFilters({ ...filters, employeeType: e.target.value })}
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
//             >
//               <option value="">All Types</option>
//               {EMPLOYEE_TYPES.map((t) => (
//                 <option key={t} value={t} className="bg-zinc-900 text-zinc-100">
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
//               Status
//             </label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
//             >
//               <option value="">All</option>
//               <option value="ACTIVE" className="bg-zinc-900 text-zinc-100">Active</option>
//               <option value="INACTIVE" className="bg-zinc-900 text-zinc-100">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Main Table / Data Area */}
//       {loading ? (
//         <Loader />
//       ) : employees.length === 0 ? (
//         <div className="bg-zinc-900 border border-zinc-800 text-center py-12 rounded-2xl shadow-md">
//           <p className="text-zinc-400 font-medium text-sm">No employees found</p>
//         </div>
//       ) : (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[600px] border-collapse">
//               <thead>
//                 <tr className="bg-zinc-950/60 text-zinc-400 border-b border-zinc-800 text-left uppercase text-xs tracking-wider">
//                   <th className="p-4 font-bold">Name</th>
//                   <th className="p-4 font-bold">User ID</th>
//                   <th className="p-4 font-bold">Type</th>
//                   <th className="p-4 font-bold">Mobile</th>
//                   <th className="p-4 font-bold">Status</th>
//                   <th className="p-4 font-bold text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800/60">
//                 {employees.map((emp) => (
//                   <tr key={emp._id} className="hover:bg-zinc-800/40 transition-colors">
//                     <td className="p-4 text-sm font-semibold text-zinc-100">{emp.name}</td>
//                     <td className="p-4 text-sm text-zinc-400 font-mono">{emp.userId}</td>
//                     <td className="p-4 text-sm text-zinc-300">{emp.employeeType}</td>
//                     <td className="p-4 text-sm text-zinc-300">{emp.mobile || '-'}</td>
//                     <td className="p-4">
//                       <span
//                         className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
//                           emp.status === 'ACTIVE'
//                             ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
//                             : 'bg-zinc-800 text-zinc-400 border-zinc-700'
//                         }`}
//                       >
//                         {emp.status}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex justify-end gap-2 flex-wrap">
//                         <button
//                           onClick={() => openEdit(emp)}
//                           className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-medium transition-colors border border-zinc-700"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => {
//                             setResetUserId(emp._id);
//                             setShowResetModal(true);
//                           }}
//                           className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-medium transition-colors border border-zinc-700"
//                         >
//                           Reset Pass
//                         </button>
//                         {emp.status === 'ACTIVE' ? (
//                           <button
//                             onClick={() => handleDelete(emp._id)}
//                             className="text-xs bg-red-950/40 hover:bg-red-900/50 text-red-400 px-3 py-1.5 rounded-lg font-medium transition-colors border border-red-800/60"
//                           >
//                             Deactivate
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleActivate(emp._id)}
//                             className="text-xs bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 px-3 py-1.5 rounded-lg font-medium transition-colors border border-emerald-800/60"
//                           >
//                             Activate
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={editingId ? 'Edit Employee' : 'Add New Employee'}
//         size="lg"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-zinc-100">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 Full Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 User ID *
//               </label>
//               <input
//                 type="text"
//                 value={formData.userId}
//                 onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors disabled:bg-zinc-900 disabled:opacity-50"
//                 disabled={!!editingId}
//                 required
//                 placeholder="e.g. ramesh@101"
//               />
//             </div>
//             {!editingId && (
//               <div>
//                 <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                   Password *
//                 </label>
//                 <input
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                   className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//                   required
//                   minLength={6}
//                 />
//               </div>
//             )}
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 Employee Type *
//               </label>
//               <select
//                 value={formData.employeeType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, employeeType: e.target.value })
//                 }
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
//                 required
//               >
//                 {EMPLOYEE_TYPES.map((t) => (
//                   <option key={t} value={t} className="bg-zinc-900 text-zinc-100">
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 Designation
//               </label>
//               <input
//                 type="text"
//                 value={formData.designation}
//                 onChange={(e) =>
//                   setFormData({ ...formData, designation: e.target.value })
//                 }
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 Mobile
//               </label>
//               <input
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={(e) =>
//                   setFormData({ ...formData, mobile: e.target.value })
//                 }
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//                 Joining Date
//               </label>
//               <input
//                 type="date"
//                 value={formData.joiningDate}
//                 onChange={(e) =>
//                   setFormData({ ...formData, joiningDate: e.target.value })
//                 }
//                 className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
//               />
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4 border-t border-zinc-800 mt-6">
//             <button
//               type="submit"
//               className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
//             >
//               {editingId ? 'Update' : 'Create'} Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setShowModal(false);
//                 resetForm();
//               }}
//               className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl border border-zinc-700 transition-colors text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Reset Password Modal */}
//       <Modal
//         isOpen={showResetModal}
//         onClose={() => {
//           setShowResetModal(false);
//           setNewPassword('');
//           setResetUserId(null);
//         }}
//         title="Reset Password"
//       >
//         <div className="space-y-4 pt-2 text-zinc-100">
//           <div>
//             <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
//               New Password *
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
//               minLength={6}
//               placeholder="Minimum 6 characters"
//             />
//           </div>
//           <div className="flex gap-3 pt-4 border-t border-zinc-800">
//             <button
//               onClick={handleResetPassword}
//               className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
//             >
//               Reset Password
//             </button>
//             <button
//               onClick={() => setShowResetModal(false)}
//               className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl border border-zinc-700 transition-colors text-sm"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminClfEmployees;




import { useState, useEffect } from 'react';
import {
  getEmployeesApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  resetEmployeePasswordApi,
} from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EMPLOYEE_TYPES = [
  'CADER',
  'Bank Sakhi',
  'BDSP',
  'FLCRP',
  'Gender CRP',
  'Setu',
  'Senior Setu',
];

const AdminClfEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [resetUserId, setResetUserId] = useState(null);
  const [filters, setFilters] = useState({ employeeType: '', status: '', search: '' });

  // ✅ Photo Zoom state
  const [zoomPhoto, setZoomPhoto] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    employeeType: 'BDSP',
    designation: '',
    mobile: '',
    joiningDate: new Date().toISOString().split('T')[0],
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = { clfId: user.clfId };
      if (filters.employeeType) params.employeeType = filters.employeeType;
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;

      const data = await getEmployeesApi(params);
      setEmployees(data.employees || []);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEmployeeApi(editingId, {
          name: formData.name,
          employeeType: formData.employeeType,
          designation: formData.designation,
          mobile: formData.mobile,
        });
        toast.success('Employee updated successfully');
      } else {
        await createEmployeeApi({ ...formData, clfId: user.clfId });
        toast.success('Employee created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this employee? They will not be able to login.')) return;
    try {
      await deleteEmployeeApi(id);
      toast.success('Employee deactivated');
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleActivate = async (id) => {
    try {
      await updateEmployeeApi(id, { status: 'ACTIVE' });
      toast.success('Employee activated');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to activate');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await resetEmployeePasswordApi(resetUserId, newPassword);
      toast.success('Password reset successfully');
      setShowResetModal(false);
      setNewPassword('');
      setResetUserId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    }
  };

  const openEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      name: emp.name,
      userId: emp.userId,
      password: '',
      employeeType: emp.employeeType,
      designation: emp.designation || '',
      mobile: emp.mobile || '',
      joiningDate: emp.joiningDate?.split('T')[0] || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      userId: '',
      password: '',
      employeeType: 'BDSP',
      designation: '',
      mobile: '',
      joiningDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Header Bar */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Employees</h1>
          <p className="text-zinc-400 text-sm font-medium mt-1">
            Manage all team members and access credentials
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-sm"
        >
          + Add Employee
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name or User ID"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Employee Type
            </label>
            <select
              value={filters.employeeType}
              onChange={(e) => setFilters({ ...filters, employeeType: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="">All Types</option>
              {EMPLOYEE_TYPES.map((t) => (
                <option key={t} value={t} className="bg-zinc-900 text-zinc-100">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="">All</option>
              <option value="ACTIVE" className="bg-zinc-900 text-zinc-100">Active</option>
              <option value="INACTIVE" className="bg-zinc-900 text-zinc-100">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table / Data Area */}
      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 text-center py-12 rounded-2xl shadow-md">
          <p className="text-zinc-400 font-medium text-sm">No employees found</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-zinc-950/60 text-zinc-400 border-b border-zinc-800 text-left uppercase text-xs tracking-wider">
                  <th className="p-4 font-bold">Photo</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">User ID</th>
                  <th className="p-4 font-bold">Type</th>
                  <th className="p-4 font-bold">Mobile</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-zinc-800/40 transition-colors">
                    {/* ✅ Profile Picture Column */}
                    <td className="p-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${
                          emp.profilePicture ? 'cursor-pointer hover:border-zinc-500 transition-colors' : ''
                        }`}
                        onClick={() => emp.profilePicture && setZoomPhoto({ url: emp.profilePicture, name: emp.name })}
                        title={emp.profilePicture ? 'Click to view full photo' : 'No photo'}
                      >
                        {emp.profilePicture ? (
                          <img
                            src={emp.profilePicture}
                            alt={emp.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          emp.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-zinc-100">{emp.name}</td>
                    <td className="p-4 text-sm text-zinc-400 font-mono">{emp.userId}</td>
                    <td className="p-4 text-sm text-zinc-300">{emp.employeeType}</td>
                    <td className="p-4 text-sm text-zinc-300">{emp.mobile || '-'}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${
                          emp.status === 'ACTIVE'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2 flex-wrap">
                        <button
                          onClick={() => openEdit(emp)}
                          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-medium transition-colors border border-zinc-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setResetUserId(emp._id);
                            setShowResetModal(true);
                          }}
                          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg font-medium transition-colors border border-zinc-700"
                        >
                          Reset Pass
                        </button>
                        {emp.status === 'ACTIVE' ? (
                          <button
                            onClick={() => handleDelete(emp._id)}
                            className="text-xs bg-red-950/40 hover:bg-red-900/50 text-red-400 px-3 py-1.5 rounded-lg font-medium transition-colors border border-red-800/60"
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(emp._id)}
                            className="text-xs bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-400 px-3 py-1.5 rounded-lg font-medium transition-colors border border-emerald-800/60"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-zinc-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                User ID *
              </label>
              <input
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors disabled:bg-zinc-900 disabled:opacity-50"
                disabled={!!editingId}
                required
                placeholder="e.g. ramesh@101"
              />
            </div>
            {!editingId && (
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Employee Type *
              </label>
              <select
                value={formData.employeeType}
                onChange={(e) =>
                  setFormData({ ...formData, employeeType: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
                required
              >
                {EMPLOYEE_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-zinc-900 text-zinc-100">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Mobile
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Joining Date
              </label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={(e) =>
                  setFormData({ ...formData, joiningDate: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-zinc-800 mt-6">
            <button
              type="submit"
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
            >
              {editingId ? 'Update' : 'Create'} Employee
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl border border-zinc-700 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => {
          setShowResetModal(false);
          setNewPassword('');
          setResetUserId(null);
        }}
        title="Reset Password"
      >
        <div className="space-y-4 pt-2 text-zinc-100">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              New Password *
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
              minLength={6}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={handleResetPassword}
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
            >
              Reset Password
            </button>
            <button
              onClick={() => setShowResetModal(false)}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-xl border border-zinc-700 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ✅ Photo Zoom Modal */}
      {zoomPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-colors"
              title="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Photo */}
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

export default AdminClfEmployees;