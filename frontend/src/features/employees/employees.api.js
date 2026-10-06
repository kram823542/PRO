// import apiClient from '../../services/apiClient.js';

// export const listEmployees = (params) => apiClient.get('/employees', { params });
// export const getEmployee = (id) => apiClient.get(`/employees/${id}`);
// export const createEmployee = (payload) => apiClient.post('/employees', payload);
// export const updateEmployee = (id, payload) => apiClient.patch(`/employees/${id}`, payload);
// export const setEmployeeStatus = (id, status) =>
//   apiClient.patch(`/employees/${id}/status`, { status });





// export const resetEmployeePassword = (id, newPassword) =>
//   apiClient.post(`/employees/${id}/reset-password`, { newPassword });


import apiClient from '../../services/apiClient.js';

export const listEmployees = (params) => apiClient.get('/employees', { params });
export const getEmployee = (id) => apiClient.get(`/employees/${id}`);
export const createEmployee = (payload) => apiClient.post('/employees', payload);
export const updateEmployee = (id, payload) => apiClient.patch(`/employees/${id}`, payload);
export const setEmployeeStatus = (id, status) =>
  apiClient.patch(`/employees/${id}/status`, { status });

// ✅ Reset password
export const resetEmployeePassword = (id, newPassword) =>
  apiClient.post(`/employees/${id}/reset-password`, { newPassword });

// ✅ NEW: Permanently delete
export const deleteEmployee = (id) => apiClient.delete(`/employees/${id}`);