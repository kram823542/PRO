

// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Modal from '../../components/ui/Modal.jsx';
// import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
// import EmployeeForm from './EmployeeForm.jsx';
// import EmployeeRow from './EmployeeRow.jsx';
// import ResetPasswordModal from '../../components/common/ResetPasswordModal.jsx';
// import { theme } from '../../config/theme.js';
// import * as api from './employees.api.js';

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [openForm, setOpenForm] = useState(false);
//   const [tempCred, setTempCred] = useState(null);

//   // Reset password modal state
//   const [resetTarget, setResetTarget] = useState(null);

//   // ✅ Delete confirm modal state
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // ✅ Status toggle state
//   const [statusTarget, setStatusTarget] = useState(null);
//   const [statusLoading, setStatusLoading] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const canCreate = user.role === 'CLF';
//   const canReset = ['CLF', 'SUPER_ADMIN'].includes(user.role);
//   const canDelete = ['CLF', 'SUPER_ADMIN'].includes(user.role);

//   const basePath =
//     user.role === 'BPM' ? '/bpm' : user.role === 'CLF' ? '/clf' : '';

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.listEmployees({ page: 1, limit: 100, search });
//       setEmployees(data.data.employees || []);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [search]);

//   /* Reset password */
//   const handleResetConfirm = async (newPassword) => {
//     const { data } = await api.resetEmployeePassword(resetTarget._id, newPassword);
//     return data.data;
//   };

//   /* Delete employee */
//   const handleDeleteConfirm = async () => {
//     if (!deleteTarget) return;
//     setDeleteLoading(true);
//     try {
//       await api.deleteEmployee(deleteTarget._id);
//       setDeleteTarget(null);
//       load();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to delete');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   /* Toggle activate/deactivate */
//   const handleToggleStatusConfirm = async () => {
//     if (!statusTarget) return;
//     setStatusLoading(true);
//     try {
//       const newStatus = statusTarget.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
//       await api.setEmployeeStatus(statusTarget._id, newStatus);
//       setStatusTarget(null);
//       load();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to update status');
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageHeader
//         title="Employees"
//         actions={
//           canCreate && <Button onClick={() => setOpenForm(true)}>+ Add Employee</Button>
//         }
//       />

//       <div style={{ marginBottom: 14 }}>
//         <input
//           placeholder="Search by name, code, mobile..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: '10px 14px',
//             borderRadius: 8,
//             border: `1px solid ${theme.colors.border}`,
//             fontSize: 14,
//             width: 320,
//             maxWidth: '100%',
//             outline: 'none',
//           }}
//         />
//       </div>

//       {loading ? (
//         <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>Loading...</div>
//       ) : employees.length === 0 ? (
//         <div
//           style={{
//             padding: 40,
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             textAlign: 'center',
//             color: theme.colors.muted,
//           }}
//         >
//           No employees found
//         </div>
//       ) : (
//         <div
//           style={{
//             background: theme.colors.surface,
//             borderRadius: theme.radius.md,
//             boxShadow: theme.shadow.sm,
//             overflow: 'hidden',
//           }}
//         >
//           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
//             <thead>
//               <tr style={{ background: theme.colors.background }}>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Code</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Name</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Mobile</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Designation</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Panchayat</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Status</th>
//                 <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <EmployeeRow
//                   key={emp._id}
//                   employee={emp}
//                   basePath={basePath}
//                   canReset={canReset}
//                   canDelete={canDelete}
//                   onReset={(employee) => setResetTarget(employee)}
//                   onDelete={(employee) => setDeleteTarget(employee)}
//                   onToggleStatus={(employee) => setStatusTarget(employee)}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Create employee modal */}
//       <Modal open={openForm} onClose={() => setOpenForm(false)} title="Add Employee">
//         <EmployeeForm
//           onCreated={(login) => {
//             setTempCred(login);
//             setOpenForm(false);
//             load();
//           }}
//         />
//       </Modal>

//       {/* New credential modal */}
//       <Modal open={!!tempCred} onClose={() => setTempCred(null)} title="Employee Credentials">
//         <p style={{ fontSize: 14 }}>सिर्फ एक बार दिखेंगे:</p>
//         <div style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 14 }}>
//           <div>
//             <b>Username:</b> {tempCred?.username}
//           </div>
//           <div>
//             <b>Password:</b> {tempCred?.tempPassword}
//           </div>
//         </div>
//       </Modal>

//       {/* Reset password modal */}
//       <ResetPasswordModal
//         open={!!resetTarget}
//         onClose={() => setResetTarget(null)}
//         entityName={resetTarget?.name}
//         entityLabel="Employee"
//         onConfirm={handleResetConfirm}
//       />

//       {/* ✅ Delete confirm dialog */}
//       <ConfirmDialog
//         open={!!deleteTarget}
//         onClose={() => setDeleteTarget(null)}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Employee Permanently?"
//         message={`Are you sure you want to permanently delete "${deleteTarget?.name}" (${deleteTarget?.employeeCode})? This will also delete their user account. This action cannot be undone.`}
//         confirmText="Delete Permanently"
//         cancelText="Cancel"
//         variant="danger"
//         loading={deleteLoading}
//       />

//       {/* ✅ Status toggle confirm dialog */}
//       <ConfirmDialog
//         open={!!statusTarget}
//         onClose={() => setStatusTarget(null)}
//         onConfirm={handleToggleStatusConfirm}
//         title={
//           statusTarget?.status === 'ACTIVE'
//             ? 'Deactivate Employee?'
//             : 'Activate Employee?'
//         }
//         message={
//           statusTarget?.status === 'ACTIVE'
//             ? `"${statusTarget?.name}" को deactivate करने पर वो login नहीं कर पाएगा। Data सुरक्षित रहेगा, बाद में activate कर सकते हैं।`
//             : `"${statusTarget?.name}" को activate करने पर वो फिर से login कर पाएगा।`
//         }
//         confirmText={statusTarget?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
//         cancelText="Cancel"
//         variant={statusTarget?.status === 'ACTIVE' ? 'warning' : 'success'}
//         loading={statusLoading}
//       />
//     </>
//   );
// }


import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';
import Modal from '../../components/ui/Modal.jsx';
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx';
import EmployeeForm from './EmployeeForm.jsx';
import EmployeeRow from './EmployeeRow.jsx';
import ResetPasswordModal from '../../components/common/ResetPasswordModal.jsx';
import { theme } from '../../config/theme.js';
import * as api from './employees.api.js';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [tempCred, setTempCred] = useState(null);

  const [resetTarget, setResetTarget] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [statusTarget, setStatusTarget] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const canCreate = user.role === 'CLF';
  const canReset = ['CLF', 'SUPER_ADMIN'].includes(user.role);
  const canDelete = ['CLF', 'SUPER_ADMIN'].includes(user.role);

  const basePath =
    user.role === 'BPM' ? '/bpm' : user.role === 'CLF' ? '/clf' : '';

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.listEmployees({ page: 1, limit: 100, search });
      setEmployees(data.data.employees || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [search]);

  const handleResetConfirm = async (newPassword) => {
    const { data } = await api.resetEmployeePassword(resetTarget._id, newPassword);
    return data.data;
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await api.deleteEmployee(deleteTarget._id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleStatusConfirm = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    try {
      const newStatus = statusTarget.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await api.setEmployeeStatus(statusTarget._id, newStatus);
      setStatusTarget(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Employees"
        actions={
          canCreate && <Button onClick={() => setOpenForm(true)}>+ Add Employee</Button>
        }
      />

      <div style={{ marginBottom: 14 }}>
        <input
          placeholder="Search by name, code, mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 14,
            width: 320,
            maxWidth: '100%',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
          Loading...
        </div>
      ) : employees.length === 0 ? (
        <div
          style={{
            padding: 40,
            background: theme.colors.surface,
            borderRadius: theme.radius.md,
            textAlign: 'center',
            color: theme.colors.muted,
          }}
        >
          No employees found
        </div>
      ) : (
        <div
          style={{
            background: theme.colors.surface,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadow.sm,
            // ✅ overflow hidden → scroll
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            maxWidth: '100%',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 14,
              // ✅ mobile par minimum width — scroll karegi
              minWidth: 800,
            }}
          >
            <thead>
              <tr style={{ background: theme.colors.background }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Code</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Name</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Mobile</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Designation</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Panchayat</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <EmployeeRow
                  key={emp._id}
                  employee={emp}
                  basePath={basePath}
                  canReset={canReset}
                  canDelete={canDelete}
                  onReset={(employee) => setResetTarget(employee)}
                  onDelete={(employee) => setDeleteTarget(employee)}
                  onToggleStatus={(employee) => setStatusTarget(employee)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={openForm} onClose={() => setOpenForm(false)} title="Add Employee">
        <EmployeeForm
          onCreated={(login) => {
            setTempCred(login);
            setOpenForm(false);
            load();
          }}
        />
      </Modal>

      <Modal open={!!tempCred} onClose={() => setTempCred(null)} title="Employee Credentials">
        <p style={{ fontSize: 14 }}>सिर्फ एक बार दिखेंगे:</p>
        <div style={{ background: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 14 }}>
          <div>
            <b>Username:</b> {tempCred?.username}
          </div>
          <div>
            <b>Password:</b> {tempCred?.tempPassword}
          </div>
        </div>
      </Modal>

      <ResetPasswordModal
        open={!!resetTarget}
        onClose={() => setResetTarget(null)}
        entityName={resetTarget?.name}
        entityLabel="Employee"
        onConfirm={handleResetConfirm}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee Permanently?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}" (${deleteTarget?.employeeCode})? This will also delete their user account. This action cannot be undone.`}
        confirmText="Delete Permanently"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      <ConfirmDialog
        open={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        onConfirm={handleToggleStatusConfirm}
        title={
          statusTarget?.status === 'ACTIVE'
            ? 'Deactivate Employee?'
            : 'Activate Employee?'
        }
        message={
          statusTarget?.status === 'ACTIVE'
            ? `"${statusTarget?.name}" को deactivate करने पर वो login नहीं कर पाएगा। Data सुरक्षित रहेगा, बाद में activate कर सकते हैं।`
            : `"${statusTarget?.name}" को activate करने पर वो फिर से login कर पाएगा।`
        }
        confirmText={statusTarget?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
        cancelText="Cancel"
        variant={statusTarget?.status === 'ACTIVE' ? 'warning' : 'success'}
        loading={statusLoading}
      />
    </>
  );
}