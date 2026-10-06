import apiClient from '../../services/apiClient.js';

export const getMyProfile = () => apiClient.get('/auth/me');
export const updateMyProfile = (payload) => apiClient.patch('/auth/profile', payload);
export const changeMyPassword = (payload) => apiClient.post('/auth/change-password', payload);
export const logout = () => apiClient.post('/auth/logout');