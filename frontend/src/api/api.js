// import axios from 'axios';
// import toast from 'react-hot-toast';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor - attach token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor - handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || 'Something went wrong';

//     // 401 - Unauthorized
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       if (window.location.pathname !== '/login') {
//         toast.error('Session expired. Please login again.');
//         window.location.href = '/login';
//       }
//     }

//     // 403 - Forbidden
//     if (error.response?.status === 403) {
//       toast.error(message || 'Access denied');
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // ← headers section poori hata do
});

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // ← Yahan Content-Type set mat karo
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      toast.error(message || 'Access denied');
    }

    return Promise.reject(error);
  }
);

export default api;