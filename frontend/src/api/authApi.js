// import api from './api';

// // POST /api/auth/login
// export const loginApi = async (userId, password) => {
//   const response = await api.post('/auth/login', { userId, password });
//   return response.data;
// };

// // GET /api/auth/me
// export const getMeApi = async () => {
//   const response = await api.get('/auth/me');
//   return response.data;
// };

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

// ✅ NEW: POST /api/auth/upload-profile-picture
export const uploadProfilePictureApi = async (formData) => {
  const response = await api.post('/auth/upload-profile-picture', formData);
  return response.data;
};

// ✅ NEW: DELETE /api/auth/remove-profile-picture
export const removeProfilePictureApi = async () => {
  const response = await api.delete('/auth/remove-profile-picture');
  return response.data;
};