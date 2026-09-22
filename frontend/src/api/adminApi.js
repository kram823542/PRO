
// import api from './api';

// // ==============================
// // ADMIN USER APIs
// // ==============================

// // POST /api/admin/users
// export const createAdminUserApi = async (data) => {
//   const response = await api.post('/admin/users', data);
//   return response.data;
// };

// // GET /api/admin/users
// export const getAdminUsersApi = async () => {
//   const response = await api.get('/admin/users');
//   return response.data;
// };

// // PUT /api/admin/users/:id
// export const updateAdminUserApi = async (id, data) => {
//   const response = await api.put(`/admin/users/${id}`, data);
//   return response.data;
// };

// // DELETE /api/admin/users/:id
// export const deleteAdminUserApi = async (id) => {
//   const response = await api.delete(`/admin/users/${id}`);
//   return response.data;
// };

// // ==============================
// // CLF APIs
// // ==============================

// // POST /api/admin/clfs
// export const createClfApi = async (data) => {
//   const response = await api.post('/admin/clfs', data);
//   return response.data;
// };

// // GET /api/admin/clfs
// export const getClfsApi = async () => {
//   const response = await api.get('/admin/clfs');
//   return response.data;
// };

// // GET /api/admin/clfs/:id
// export const getClfApi = async (id) => {
//   const response = await api.get(`/admin/clfs/${id}`);
//   return response.data;
// };

// // PUT /api/admin/clfs/:id
// export const updateClfApi = async (id, data) => {
//   const response = await api.put(`/admin/clfs/${id}`, data);
//   return response.data;
// };

// // DELETE /api/admin/clfs/:id
// export const deleteClfApi = async (id) => {
//   const response = await api.delete(`/admin/clfs/${id}`);
//   return response.data;
// };

// // ==============================
// // EMPLOYEE APIs
// // ==============================

// // ✅ GET /api/admin/employees/designations  ← YE NAYA FUNCTION HAI
// export const getDesignationsApi = async () => {
//   const response = await api.get('/admin/employees/designations');
//   return response.data;
// };

// // POST /api/admin/employees
// export const createEmployeeApi = async (data) => {
//   const response = await api.post('/admin/employees', data);
//   return response.data;
// };

// // GET /api/admin/employees
// export const getEmployeesApi = async (params = {}) => {
//   const response = await api.get('/admin/employees', { params });
//   return response.data;
// };

// // GET /api/admin/employees/:id
// export const getEmployeeApi = async (id) => {
//   const response = await api.get(`/admin/employees/${id}`);
//   return response.data;
// };

// // PUT /api/admin/employees/:id
// export const updateEmployeeApi = async (id, data) => {
//   const response = await api.put(`/admin/employees/${id}`, data);
//   return response.data;
// };

// // DELETE /api/admin/employees/:id
// export const deleteEmployeeApi = async (id) => {
//   const response = await api.delete(`/admin/employees/${id}`);
//   return response.data;
// };

// // POST /api/admin/employees/:id/reset-password
// export const resetEmployeePasswordApi = async (id, newPassword) => {
//   const response = await api.post(`/admin/employees/${id}/reset-password`, {
//     newPassword,
//   });
//   return response.data;
// };

// // ==============================
// // WORK SUBMISSION APIs
// // ==============================

// // GET /api/admin/work/pending
// export const getPendingSubmissionsApi = async (params = {}) => {
//   const response = await api.get('/admin/work/pending', { params });
//   return response.data;
// };

// // GET /api/admin/work/:id
// export const getSubmissionApi = async (id) => {
//   const response = await api.get(`/admin/work/${id}`);
//   return response.data;
// };

// // PUT /api/admin/work/:id/approve
// export const approveSubmissionApi = async (id) => {
//   const response = await api.put(`/admin/work/${id}/approve`);
//   return response.data;
// };

// // PUT /api/admin/work/:id/reject
// export const rejectSubmissionApi = async (id, rejectionReason) => {
//   const response = await api.put(`/admin/work/${id}/reject`, {
//     rejectionReason,
//   });
//   return response.data;
// };

// // GET /api/admin/work/history
// export const getWorkHistoryApi = async (params = {}) => {
//   const response = await api.get('/admin/work/history', { params });
//   return response.data;
// };

// // ==============================
// // ATTENDANCE APIs
// // ==============================

// // GET /api/admin/attendance/monthly
// export const getMonthlyAttendanceApi = async (params) => {
//   const response = await api.get('/admin/attendance/monthly', { params });
//   return response.data;
// };

// // GET /api/admin/attendance/summary
// export const getAttendanceSummaryApi = async () => {
//   const response = await api.get('/admin/attendance/summary');
//   return response.data;
// };

// // GET /api/admin/attendance/employee/:employeeId
// export const getEmployeeAttendanceApi = async (employeeId, params = {}) => {
//   const response = await api.get(`/admin/attendance/employee/${employeeId}`, {
//     params,
//   });
//   return response.data;
// };

// // ==============================
// // REPORT APIs
// // ==============================

// // GET /api/admin/reports/attendance
// export const getAttendanceReportApi = async (params) => {
//   const response = await api.get('/admin/reports/attendance', { params });
//   return response.data;
// };

// // GET /api/admin/reports/attendance/excel (download)
// export const downloadAttendanceExcelApi = async (params) => {
//   const response = await api.get('/admin/reports/attendance/excel', {
//     params,
//     responseType: 'blob',
//   });
//   return response;
// };

// // GET /api/admin/reports/clf-summary
// export const getClfSummaryReportApi = async () => {
//   const response = await api.get('/admin/reports/clf-summary');
//   return response.data;
// };


import api from './api';

// ==============================
// ADMIN USER APIs
// ==============================

// POST /api/admin/users
export const createAdminUserApi = async (data) => {
  const response = await api.post('/admin/users', data);
  return response.data;
};

// GET /api/admin/users
export const getAdminUsersApi = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

// PUT /api/admin/users/:id
export const updateAdminUserApi = async (id, data) => {
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data;
};

// DELETE /api/admin/users/:id
export const deleteAdminUserApi = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

// ==============================
// CLF APIs
// ==============================

// POST /api/admin/clfs
export const createClfApi = async (data) => {
  const response = await api.post('/admin/clfs', data);
  return response.data;
};

// GET /api/admin/clfs
export const getClfsApi = async () => {
  const response = await api.get('/admin/clfs');
  return response.data;
};

// GET /api/admin/clfs/:id
export const getClfApi = async (id) => {
  const response = await api.get(`/admin/clfs/${id}`);
  return response.data;
};

// PUT /api/admin/clfs/:id
export const updateClfApi = async (id, data) => {
  const response = await api.put(`/admin/clfs/${id}`, data);
  return response.data;
};

// DELETE /api/admin/clfs/:id
export const deleteClfApi = async (id) => {
  const response = await api.delete(`/admin/clfs/${id}`);
  return response.data;
};

// ==============================
// EMPLOYEE APIs
// ==============================

// ✅ GET /api/admin/employees/designations
export const getDesignationsApi = async () => {
  const response = await api.get('/admin/employees/designations');
  return response.data;
};

// ✅ GET /api/admin/employees/banks  ← YE NAYA FUNCTION HAI
export const getBanksApi = async () => {
  const response = await api.get('/admin/employees/banks');
  return response.data;
};

// POST /api/admin/employees
export const createEmployeeApi = async (data) => {
  const response = await api.post('/admin/employees', data);
  return response.data;
};

// GET /api/admin/employees
export const getEmployeesApi = async (params = {}) => {
  const response = await api.get('/admin/employees', { params });
  return response.data;
};

// GET /api/admin/employees/:id
export const getEmployeeApi = async (id) => {
  const response = await api.get(`/admin/employees/${id}`);
  return response.data;
};

// PUT /api/admin/employees/:id
export const updateEmployeeApi = async (id, data) => {
  const response = await api.put(`/admin/employees/${id}`, data);
  return response.data;
};

// DELETE /api/admin/employees/:id
export const deleteEmployeeApi = async (id) => {
  const response = await api.delete(`/admin/employees/${id}`);
  return response.data;
};

// POST /api/admin/employees/:id/reset-password
export const resetEmployeePasswordApi = async (id, newPassword) => {
  const response = await api.post(`/admin/employees/${id}/reset-password`, {
    newPassword,
  });
  return response.data;
};

// ==============================
// WORK SUBMISSION APIs
// ==============================

// GET /api/admin/work/pending
export const getPendingSubmissionsApi = async (params = {}) => {
  const response = await api.get('/admin/work/pending', { params });
  return response.data;
};

// GET /api/admin/work/:id
export const getSubmissionApi = async (id) => {
  const response = await api.get(`/admin/work/${id}`);
  return response.data;
};

// PUT /api/admin/work/:id/approve
export const approveSubmissionApi = async (id) => {
  const response = await api.put(`/admin/work/${id}/approve`);
  return response.data;
};

// PUT /api/admin/work/:id/reject
export const rejectSubmissionApi = async (id, rejectionReason) => {
  const response = await api.put(`/admin/work/${id}/reject`, {
    rejectionReason,
  });
  return response.data;
};

// GET /api/admin/work/history
export const getWorkHistoryApi = async (params = {}) => {
  const response = await api.get('/admin/work/history', { params });
  return response.data;
};

// ==============================
// ATTENDANCE APIs
// ==============================

// GET /api/admin/attendance/monthly
export const getMonthlyAttendanceApi = async (params) => {
  const response = await api.get('/admin/attendance/monthly', { params });
  return response.data;
};

// GET /api/admin/attendance/summary
export const getAttendanceSummaryApi = async () => {
  const response = await api.get('/admin/attendance/summary');
  return response.data;
};

// GET /api/admin/attendance/employee/:employeeId
export const getEmployeeAttendanceApi = async (employeeId, params = {}) => {
  const response = await api.get(`/admin/attendance/employee/${employeeId}`, {
    params,
  });
  return response.data;
};

// ==============================
// REPORT APIs
// ==============================

// GET /api/admin/reports/attendance
export const getAttendanceReportApi = async (params) => {
  const response = await api.get('/admin/reports/attendance', { params });
  return response.data;
};

// GET /api/admin/reports/attendance/excel (download)
export const downloadAttendanceExcelApi = async (params) => {
  const response = await api.get('/admin/reports/attendance/excel', {
    params,
    responseType: 'blob',
  });
  return response;
};

// GET /api/admin/reports/clf-summary
export const getClfSummaryReportApi = async () => {
  const response = await api.get('/admin/reports/clf-summary');
  return response.data;
};