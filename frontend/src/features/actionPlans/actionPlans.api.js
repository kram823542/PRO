import apiClient from '../../services/apiClient.js';

export const submitActionPlan = (payload) => apiClient.post('/action-plans', payload);
export const listActionPlans = (params) => apiClient.get('/action-plans', { params });
export const todayActionPlan = () => apiClient.get('/action-plans/today');