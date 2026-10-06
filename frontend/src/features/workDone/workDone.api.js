import apiClient from '../../services/apiClient.js';

export const submitWorkDone = (formData) =>
  apiClient.post('/work-done', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const listWorkDone = (params) => apiClient.get('/work-done', { params });
export const pendingApprovals = () => apiClient.get('/work-done/pending');
export const approveWorkDone = (id) => apiClient.patch(`/work-done/${id}/approve`);
export const rejectWorkDone = (id, reason) =>
  apiClient.patch(`/work-done/${id}/reject`, { reason });