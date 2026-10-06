import apiClient from '../../services/apiClient.js';

export const listBlocks = (params) => apiClient.get('/blocks', { params });
export const createBlock = (payload) => apiClient.post('/blocks', payload);
export const updateBlock = (id, payload) => apiClient.patch(`/blocks/${id}`, payload);