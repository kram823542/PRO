// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// const apiClient = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Attach access token
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Auto refresh on 401
// apiClient.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (!refreshToken) throw new Error('No refresh token');
//         const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
//         const newToken = data?.data?.accessToken;
//         if (newToken) {
//           localStorage.setItem('accessToken', newToken);
//           original.headers.Authorization = `Bearer ${newToken}`;
//           return apiClient(original);
//         }
//       } catch (e) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;



import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // ✅ 30s — bade lists ke liye
});

// ─── Request interceptor: attach access token ───
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Shared refresh promise (prevents multiple refresh calls) ───
let refreshPromise = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Response interceptor: refresh on 401, retry on network errors ───
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    // ═══════════════════════════════════════════
    // Case 1: 401 Unauthorized → try to refresh token
    // ═══════════════════════════════════════════
    if (
      status === 401 &&
      !original._retry &&
      !original.url?.includes('/auth/refresh') &&
      !original.url?.includes('/auth/login')
    ) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        // ✅ Share refresh promise across simultaneous 401s
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${API_URL}/auth/refresh`, { refreshToken })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const { data } = await refreshPromise;
        const newToken = data?.data?.accessToken;

        if (!newToken) throw new Error('No new token');

        localStorage.setItem('accessToken', newToken);
        original.headers.Authorization = `Bearer ${newToken}`;

        // ✅ Retry original request with new token
        return apiClient(original);
      } catch (e) {
        // ❌ Refresh failed → clear session, redirect to login
        console.warn('Session expired — redirecting to login');

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');

        // ✅ Safe redirect: skip if already on /login
        if (
          typeof window !== 'undefined' &&
          window.location.pathname !== '/login'
        ) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }

    // ═══════════════════════════════════════════
    // Case 2: Network error / Timeout → retry up to 2 times
    // ═══════════════════════════════════════════
    const isNetworkError =
      !error.response ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_NETWORK' ||
      error.code === 'ETIMEDOUT';

    // Only retry GET requests (safe) — not POST/PATCH/DELETE
    const isGet = (original.method || '').toLowerCase() === 'get';

    if (isNetworkError && isGet) {
      original._networkRetry = (original._networkRetry || 0) + 1;

      if (original._networkRetry <= 2) {
        // Exponential backoff: 1s, 2s
        await sleep(1000 * original._networkRetry);
        return apiClient(original);
      }
    }

    // ═══════════════════════════════════════════
    // Case 3: 5xx Server error → retry GET once
    // ═══════════════════════════════════════════
    if (status >= 500 && status < 600 && isGet) {
      original._serverRetry = (original._serverRetry || 0) + 1;

      if (original._serverRetry <= 1) {
        await sleep(1500);
        return apiClient(original);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;