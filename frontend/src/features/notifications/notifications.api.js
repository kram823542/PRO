import apiClient from '../../services/apiClient.js';

export const myMessages = (params) => apiClient.get('/notifications/my', { params });
export const unreadCount = () => apiClient.get('/notifications/unread-count');
export const markRead = (id) => apiClient.patch(`/notifications/${id}/read`);
export const ignoreMessage = (id) => apiClient.patch(`/notifications/${id}/ignore`);

export const sendMessage = (payload) => apiClient.post('/notifications', payload);
export const sentMessages = (params) => apiClient.get('/notifications/sent', { params });
export const messageTracking = (id) => apiClient.get(`/notifications/sent/${id}/tracking`);