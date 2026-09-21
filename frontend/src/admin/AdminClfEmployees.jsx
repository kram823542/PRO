

import { useState, useEffect, useRef } from 'react';
import {
  getEmployeesApi,
  getDesignationsApi,
  getEmployeeApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
  resetEmployeePasswordApi,
} from '../api/adminApi';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminClfEmployees = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [resetUserId, setResetUserId] = useState(null);
  const [filters, setFilters] = useState({ designation: '', status: '', search: '' });

  // ✅ Photo Zoom state
  const [zoomPhoto, setZoomPhoto] = useState(null);

  // ✅ 3-dot menu state
  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Employee detail modal state
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ✅ Password visibility state (for reset modal)
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    designation: '',
    mobile: '',
    bankName: '',
    bankAccountNumber: '',
    branch: '',
    ifscCode: '',
    joiningDate: new Date().toISOString().split('T')[0],
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchDesignations();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  // ✅ Outside click to close menu
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchDesignations = async () => {
    try {
      const data = await getDesignationsApi();
      setDesignations(data.designations || []);
    } catch (error) {
      toast.error('Failed to load designations');
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = { clfId: user.clfId };
      if (filters.designation) params.designation = filters.designation;
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

  const fetchEmployeeDetail = async (employeeId) => {
    setDetailLoading(true);
    setShowDetailModal(true);
    setOpenMenuId(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEmployeeApi(editingId, {
          name: formData.name,
          designation: formData.designation,
          mobile: formData.mobile,
          bankName: formData.bankName,
          bankAccountNumber: formData.bankAccountNumber,
          branch: formData.branch,
          ifscCode: formData.ifscCode,
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
      setShowPassword(false);
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
      designation: emp.designation || '',
      mobile: emp.mobile || '',
      bankName: emp.bankName || '',
      bankAccountNumber: emp.bankAccountNumber || '',
      branch: emp.branch || '',
      ifscCode: emp.ifscCode || '',
      joiningDate: emp.joiningDate?.split('T')[0] || '',
    });
    setShowModal(true);
    setOpenMenuId(null);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      userId: '',
      password: '',
      designation: '',
      mobile: '',
      bankName: '',
      bankAccountNumber: '',
      branch: '',
      ifscCode: '',
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
              Designation
            </label>
            <select
              value={filters.designation}
              onChange={(e) => setFilters({ ...filters, designation: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
            >
              <option value="">All Designations</option>
              {designations.map((d) => (
                <option key={d} value={d} className="bg-zinc-900 text-zinc-100">
                  {d}
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-zinc-950/60 text-zinc-400 border-b border-zinc-800 text-left uppercase text-xs tracking-wider">
                  <th className="p-4 font-bold">Photo</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">User ID</th>
                  <th className="p-4 font-bold">Designation</th>
                  <th className="p-4 font-bold">Mobile</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${
                          emp.profilePicture ? 'cursor-pointer hover:border-zinc-500 transition-colors' : ''
                        }`}
                        onClick={() => emp.profilePicture && setZoomPhoto({ url: emp.profilePicture, name: emp.name })}
                        title={emp.profilePicture ? 'Click to view full photo' : 'No photo'}
                      >
                        {emp.profilePicture ? (
                          <img src={emp.profilePicture} alt={emp.name} className="w-full h-full object-cover" />
                        ) : (
                          emp.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-semibold text-zinc-100">{emp.name}</td>
                    <td className="p-4 text-sm text-zinc-400 font-mono">{emp.userId}</td>
                    <td className="p-4 text-sm text-zinc-300">{emp.designation || '-'}</td>
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

                    <td className="p-4 relative">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === emp._id ? null : emp._id);
                          }}
                          className="w-9 h-9 rounded-lg hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 transition-colors"
                          title="Actions"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </button>

                        {openMenuId === emp._id && (
                          <div
                            className="absolute right-4 top-full mt-1 w-52 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-[999] overflow-hidden text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => fetchEmployeeDetail(emp._id)}
                              className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-3"
                            >
                              <span className="text-base">👁️</span>
                              <span className="font-medium">View Details</span>
                            </button>

                            <button
                              onClick={() => openEdit(emp)}
                              className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-3 border-t border-zinc-800"
                            >
                              <span className="text-base">✏️</span>
                              <span className="font-medium">Edit Employee</span>
                            </button>

                            <button
                              onClick={() => {
                                setResetUserId(emp._id);
                                setShowResetModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 transition-colors flex items-center gap-3 border-t border-zinc-800"
                            >
                              <span className="text-base">🔑</span>
                              <span className="font-medium">Reset Password</span>
                            </button>

                            {emp.status === 'ACTIVE' ? (
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleDelete(emp._id);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/40 transition-colors flex items-center gap-3 border-t border-zinc-800"
                              >
                                <span className="text-base">🚫</span>
                                <span className="font-medium">Deactivate</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  handleActivate(emp._id);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs text-emerald-400 hover:bg-emerald-950/40 transition-colors flex items-center gap-3 border-t border-zinc-800"
                              >
                                <span className="text-base">✅</span>
                                <span className="font-medium">Activate</span>
                              </button>
                            )}
                          </div>
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

      {/* ==============================
          Add/Edit Modal
          ============================== */}
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
                Designation *
              </label>
              <select
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none transition-colors"
                required
              >
                <option value="" className="bg-zinc-900 text-zinc-100">
                  Select Designation
                </option>
                {designations.map((d) => (
                  <option key={d} value={d} className="bg-zinc-900 text-zinc-100">
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Mobile *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                required
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

          {/* Bank Details Section */}
          <div className="pt-4 mt-4 border-t border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-200 mb-4 uppercase tracking-wider">
              Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                  placeholder="e.g. State Bank of India"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, bankAccountNumber: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Branch *
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) =>
                    setFormData({ ...formData, branch: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) =>
                    setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors font-mono uppercase"
                  placeholder="e.g. SBIN0001234"
                  required
                />
              </div>
            </div>
          </div>

          {/* ✅ Actions: Primary zinc + Rose cancel */}
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
              className="px-6 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-semibold rounded-xl border border-rose-800/60 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* ==============================
          Reset Password Modal — WITH EYE ICON
          ============================== */}
      <Modal
        isOpen={showResetModal}
        onClose={() => {
          setShowResetModal(false);
          setNewPassword('');
          setResetUserId(null);
          setShowPassword(false);
        }}
        title="Reset Password"
      >
        <div className="space-y-4 pt-2 text-zinc-100">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              New Password *
            </label>
            {/* ✅ Eye icon input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-2.5 pr-12 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
                minLength={6}
                placeholder="Minimum 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye-off icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ✅ Actions: Primary zinc + Rose cancel */}
          <div className="flex gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={handleResetPassword}
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-2.5 flex-1 rounded-xl shadow-md transition-all active:scale-95 text-sm"
            >
              Reset Password
            </button>
            <button
              onClick={() => {
                setShowResetModal(false);
                setShowPassword(false);
              }}
              className="px-6 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-semibold rounded-xl border border-rose-800/60 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ==============================
          Employee Detail Modal — Clean B&W/Zinc theme
          ============================== */}
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
          <div className="space-y-6 text-zinc-100">
            {/* Profile Header */}
            <div className="flex flex-col items-center pb-6 border-b border-zinc-800">
              <div
                className={`w-28 h-28 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-white text-4xl font-bold overflow-hidden ${
                  selectedEmployee.profilePicture ? 'cursor-pointer hover:border-zinc-500 transition-colors' : ''
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
              <h2 className="text-xl font-bold text-white mt-4">{selectedEmployee.name}</h2>
              <p className="text-xs text-zinc-500 font-mono mt-1">{selectedEmployee.userId}</p>
              <span
                className={`mt-3 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  selectedEmployee.status === 'ACTIVE'
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                }`}
              >
                {selectedEmployee.status}
              </span>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Personal Information
              </h3>
              <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl divide-y divide-zinc-800/60">
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
                  <div key={i} className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-zinc-100 text-right">
                      {item.value || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Details */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                Bank Details
              </h3>
              <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl divide-y divide-zinc-800/60">
                {[
                  { label: 'Bank Name', value: selectedEmployee.bankName },
                  { label: 'Account Number', value: selectedEmployee.bankAccountNumber },
                  { label: 'Branch', value: selectedEmployee.branch },
                  { label: 'IFSC Code', value: selectedEmployee.ifscCode },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-3">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-zinc-100 text-right font-mono">
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

      {/* Photo Zoom Modal */}
      {zoomPhoto && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setZoomPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-colors"
              title="Close"
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

export default AdminClfEmployees;