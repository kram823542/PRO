import apiClient from '../../services/apiClient.js';

export const listUsers = (params) => apiClient.get('/users', { params });
export const createBPM = (payload) => apiClient.post('/users/bpm', payload);
// export const resetPassword = (id) => apiClient.post(`/users/${id}/reset-password`);

export const resetPassword = (id, newPassword) =>
  apiClient.post(`/users/${id}/reset-password`, { newPassword });
export const setStatus = (id, status) => apiClient.patch(`/users/${id}/status`, { status });
export const changeBlock = (id, blockId) => apiClient.patch(`/users/${id}/block`, { blockId });