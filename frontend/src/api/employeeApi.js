// import api from './api';

// // POST /api/admin/work/submit (multipart form data)
// export const submitWorkApi = async (formData) => {
//   const response = await api.post('/admin/work/submit', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

// // GET /api/admin/work/history
// export const getMyWorkHistoryApi = async (params = {}) => {
//   const response = await api.get('/admin/work/history', { params });
//   return response.data;
// };

// // GET /api/admin/attendance/employee/:employeeId
// export const getMyAttendanceApi = async (employeeId, params = {}) => {
//   const response = await api.get(`/admin/attendance/employee/${employeeId}`, {
//     params,
//   });
//   return response.data;
// };

// // GET /api/auth/me
// export const getMyProfileApi = async () => {
//   const response = await api.get('/auth/me');
//   return response.data;
// };

import api from './api';

// POST /api/admin/work/submit (multipart form data)
export const submitWorkApi = async (formData) => {
  const response = await api.post('/admin/work/submit', formData);
  // ← Content-Type header mat do, browser/axios khud set karega
  return response.data;
};

// GET /api/admin/work/history
export const getMyWorkHistoryApi = async (params = {}) => {
  const response = await api.get('/admin/work/history', { params });
  return response.data;
};

// GET /api/admin/attendance/employee/:employeeId
export const getMyAttendanceApi = async (employeeId, params = {}) => {
  const response = await api.get(`/admin/attendance/employee/${employeeId}`, {
    params,
  });
  return response.data;
};

// GET /api/auth/me
export const getMyProfileApi = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};