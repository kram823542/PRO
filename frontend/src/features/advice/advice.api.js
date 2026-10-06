// import apiClient from '../../services/apiClient.js';

// /** ✅ Save advice to backend + get stored record */
// export const createAdvice = (payload) => apiClient.post('/advice', payload);

// /** ✅ List all advices (with pagination + type filter) */
// export const listAdvices = (params) => apiClient.get('/advice', { params });

// /** ✅ Get single advice */
// export const getAdvice = (id) => apiClient.get(`/advice/${id}`);

// /** ✅ Download PDF — returns blob */
// export const downloadAdvicePDF = (id) =>
//   apiClient.get(`/advice/${id}/pdf`, { responseType: 'blob' });

// /** ✅ Delete advice */
// export const deleteAdvice = (id) => apiClient.delete(`/advice/${id}`);






import apiClient from '../../services/apiClient.js';

export const createAdvice = (payload) => apiClient.post('/advice', payload);
export const listAdvices = (params) => apiClient.get('/advice', { params });
export const getAdvice = (id) => apiClient.get(`/advice/${id}`);
export const deleteAdvice = (id) => apiClient.delete(`/advice/${id}`);

/** ✅ Download PDF — as attachment */
export const downloadAdvicePDF = (id) =>
  apiClient.get(`/advice/${id}/pdf?mode=download`, { responseType: 'blob' });

/** ✅ Get PDF for print — as inline (browser preview kholta hai) */
export const getAdvicePDFForPrint = (id) =>
  apiClient.get(`/advice/${id}/pdf?mode=print`, { responseType: 'blob' });