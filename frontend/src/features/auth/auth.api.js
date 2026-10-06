import apiClient from '../../services/apiClient.js';

export const login = (payload) => apiClient.post('/auth/login', payload);
export const logout = () => apiClient.post('/auth/logout');
export const me = () => apiClient.get('/auth/me');
export const changePassword = (payload) => apiClient.post('/auth/change-password', payload);