import apiClient from '../../services/apiClient.js';

export const listClfs = (params) => apiClient.get('/clfs', { params });
export const getClf = (id) => apiClient.get(`/clfs/${id}`);
export const createClf = (payload) => apiClient.post('/clfs', payload);
export const bpmDashboard = () => apiClient.get('/clfs/dashboard/bpm');

export const resetClfPassword = (id, newPassword) =>
  apiClient.post(`/clfs/${id}/reset-password`, { newPassword });

// ✅ NAYA: BOD aur Core Members update karne ke liye
export const updateClfBod = (id, payload) => 
  apiClient.put(`/clfs/${id}/bod`, payload);