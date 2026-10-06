import apiClient from '../../services/apiClient.js';

export const listAuditLogs = (params) => apiClient.get('/audit-logs', { params });