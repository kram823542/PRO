import apiClient from '../../services/apiClient.js';

export const createAdvice = (payload) => apiClient.post('/advice', payload);
export const listAdvices = (params) => apiClient.get('/advice', { params });
export const getAdvice = (id) => apiClient.get(`/advice/${id}`);
export const deleteAdvice = (id) => apiClient.delete(`/advice/${id}`);

export const downloadAdvicePDF = (id) =>
  apiClient.get(`/advice/${id}/pdf?mode=download`, { responseType: 'blob' });

export const getAdvicePDFForPrint = (id) =>
  apiClient.get(`/advice/${id}/pdf?mode=print`, { responseType: 'blob' });

// ✅ NAYA: CLF Members fetch karne ke liye
export const getClfMembers = (clfId) => apiClient.get(`/advice/members/${clfId}`);