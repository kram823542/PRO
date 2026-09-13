import api from './api';

// POST /api/auth/login
export const loginApi = async (userId, password) => {
  const response = await api.post('/auth/login', { userId, password });
  return response.data;
};

// GET /api/auth/me
export const getMeApi = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};