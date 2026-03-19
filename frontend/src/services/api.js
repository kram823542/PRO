// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Get the base URL
// const getBaseURL = () => {
//     // For development - explicitly set to port 5000
//     return 'http://localhost:5000/api';
// };

// // Base API configuration
// const API = axios.create({
//     baseURL: getBaseURL(),
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Important for CORS
//     timeout: 60000, // 10 second timeout
// });

// // Request interceptor to add token
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
        
//         // Log request for debugging
//         console.log('🚀 API Request:', {
//             method: config.method,
//             url: config.url,
//             baseURL: config.baseURL,
//             headers: config.headers
//         });
        
//         return config;
//     },
//     (error) => {
//         console.error('❌ Request Error:', error);
//         return Promise.reject(error);
//     }
// );

// // Response interceptor for error handling
// API.interceptors.response.use(
//     (response) => {
//         console.log('✅ API Response:', response.status);
//         return response;
//     },
//     (error) => {
//         console.error('❌ Response Error:', {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data,
//             config: error.config
//         });

//         if (error.code === 'ERR_NETWORK') {
//             toast.error('Cannot connect to server. Please check if backend is running.');
//         } else if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('admin');
//             window.location.href = '/admin/login';
//             toast.error('Session expired. Please login again.');
//         } else if (error.response?.status === 403) {
//             toast.error('You do not have permission to perform this action.');
//         } else if (error.response?.status === 404) {
//             toast.error('Resource not found.');
//         } else if (error.response?.status >= 500) {
//             toast.error('Server error. Please try again later.');
//         }
        
//         return Promise.reject(error);
//     }
// );

// // Admin APIs
// export const adminAPI = {
//     login: (credentials) => API.post('/admin/login', credentials),
//     register: (userData) => API.post('/admin/register', userData),
//     getProfile: () => API.get('/admin/profile'),
//     updateProfile: (data) => API.put('/admin/profile', data),
// };

// // Post APIs
// export const postAPI = {
//     getPosts: (params = {}) => {
//         const queryParams = new URLSearchParams();
//         Object.keys(params).forEach(key => {
//             if (params[key]) queryParams.append(key, params[key]);
//         });
        
//         const queryString = queryParams.toString();
//         return API.get(`/posts${queryString ? `?${queryString}` : ''}`);
//     },

//     getPostById: (id) => API.get(`/posts/${id}`),

//     createPost: (formData) => {
//         return API.post('/posts', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//     },

//     updatePost: (id, formData) => {
//         return API.put(`/posts/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//     },

//     deletePost: (id) => API.delete(`/posts/${id}`),

//     getPostsByAuthor: (authorId) => API.get(`/posts/author/${authorId}`),
//     getPostsByCategory: (category) => API.get(`/posts/category/${category}`),
// };

// // Dashboard stats API
// export const dashboardAPI = {
//     getStats: async () => {
//         try {
//             const postsResponse = await postAPI.getPosts({ limit: 100 });
//             const posts = postsResponse.data.data || postsResponse.data;
            
//             return {
//                 totalPosts: posts.length,
//                 totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
//                 recentPosts: posts.slice(0, 5),
//             };
//         } catch (error) {
//             console.error('Error fetching dashboard stats:', error);
//             throw error;
//         }
//     },
// };




// // Contact APIs
// export const contactAPI = {
//     submitContact: (data) => API.post('/contact', data),
    
//     // Admin only endpoints (for future use)
//     getContacts: (params = {}) => {
//         const queryParams = new URLSearchParams();
//         if (params.page) queryParams.append('page', params.page);
//         if (params.limit) queryParams.append('limit', params.limit);
//         if (params.status) queryParams.append('status', params.status);
        
//         const queryString = queryParams.toString();
//         return API.get(`/contact${queryString ? `?${queryString}` : ''}`);
//     },
    
//     getContactStats: () => API.get('/contact/stats'),
    
//     getContactById: (id) => API.get(`/contact/${id}`),
    
//     updateContactStatus: (id, status) => API.put(`/contact/${id}`, { status }),
    
//     deleteContact: (id) => API.delete(`/contact/${id}`)
// };

// export default API;


// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Get the base URL - PRODUCTION READY VERSION
// const getBaseURL = () => {
//     // Production (Vercel/Netlify etc) - Render API use karein
//     if (process.env.NODE_ENV === 'production') {
//         // Pehle environment variable check karein, nahi to direct Render URL use karein
//         return process.env.REACT_APP_API_URL || 'https://pro-muko.onrender.com/api';
//     }
    
//     // Development (localhost) - localhost use karein
//     return 'http://localhost:5000/api';
// };

// // Base API configuration
// const API = axios.create({
//     baseURL: getBaseURL(),
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Important for CORS
//     timeout: 60000, // 60 second timeout (increased from 10)
// });

// // Request interceptor to add token and log
// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
        
//         // Log request for debugging (with environment info)
//         console.log('🚀 API Request:', {
//             method: config.method,
//             url: config.url,
//             baseURL: config.baseURL,
//             environment: process.env.NODE_ENV || 'development',
//             headers: config.headers
//         });
        
//         return config;
//     },
//     (error) => {
//         console.error('❌ Request Error:', error);
//         return Promise.reject(error);
//     }
// );

// // Response interceptor for error handling
// API.interceptors.response.use(
//     (response) => {
//         console.log('✅ API Response:', {
//             status: response.status,
//             url: response.config.url
//         });
//         return response;
//     },
//     (error) => {
//         // Better error logging
//         console.error('❌ Response Error:', {
//             message: error.message,
//             status: error.response?.status,
//             statusText: error.response?.statusText,
//             data: error.response?.data,
//             config: {
//                 url: error.config?.url,
//                 baseURL: error.config?.baseURL,
//                 method: error.config?.method
//             }
//         });

//         // Network error - backend down or wrong URL
//         if (error.code === 'ERR_NETWORK') {
//             toast.error(`Cannot connect to server. Using: ${getBaseURL()}`);
//             console.error('❌ Network Error - Check if backend is running at:', getBaseURL());
//         } 
//         // Unauthorized - token expired or invalid
//         else if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('admin');
//             // Redirect to login if not already there
//             if (!window.location.pathname.includes('/admin/login')) {
//                 window.location.href = '/admin/login';
//                 toast.error('Session expired. Please login again.');
//             }
//         } 
//         // Forbidden
//         else if (error.response?.status === 403) {
//             toast.error('You do not have permission to perform this action.');
//         } 
//         // Not Found
//         else if (error.response?.status === 404) {
//             toast.error('Resource not found.');
//         } 
//         // Server Error
//         else if (error.response?.status >= 500) {
//             toast.error('Server error. Please try again later.');
//         }
        
//         return Promise.reject(error);
//     }
// );

// // Admin APIs
// export const adminAPI = {
//     login: (credentials) => API.post('/admin/login', credentials),
//     register: (userData) => API.post('/admin/register', userData),
//     getProfile: () => API.get('/admin/profile'),
//     updateProfile: (data) => API.put('/admin/profile', data),
// };

// // Post APIs - IMPROVED VERSION
// export const postAPI = {
//     // Get all posts with filters
//     getPosts: (params = {}) => {
//         const queryParams = new URLSearchParams();
//         Object.keys(params).forEach(key => {
//             if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
//                 queryParams.append(key, params[key]);
//             }
//         });
        
//         const queryString = queryParams.toString();
//         const url = `/posts${queryString ? `?${queryString}` : ''}`;
        
//         console.log('📸 Fetching posts from:', url);
//         return API.get(url);
//     },

//     // Get single post by ID
//     getPostById: (id) => {
//         console.log('📸 Fetching post by ID:', id);
//         return API.get(`/posts/${id}`);
//     },

//     // Create new post with images
//     createPost: (formData) => {
//         return API.post('/posts', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//     },

//     // Update post with images
//     updatePost: (id, formData) => {
//         return API.put(`/posts/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//     },

//     // Delete post
//     deletePost: (id) => API.delete(`/posts/${id}`),

//     // Get posts by author
//     getPostsByAuthor: (authorId) => API.get(`/posts/author/${authorId}`),
    
//     // Get posts by category
//     getPostsByCategory: (category) => API.get(`/posts/category/${category}`),
// };

// // Dashboard stats API - FIXED VERSION
// export const dashboardAPI = {
//     getStats: async () => {
//         try {
//             console.log('📊 Fetching dashboard stats...');
            
//             // Fetch posts
//             const postsResponse = await postAPI.getPosts({ limit: 100 });
            
//             // Handle different response structures
//             let posts = [];
//             if (postsResponse.data && postsResponse.data.data) {
//                 posts = postsResponse.data.data; // If wrapped in data property
//             } else if (Array.isArray(postsResponse.data)) {
//                 posts = postsResponse.data; // If direct array
//             } else if (postsResponse.data && postsResponse.data.posts) {
//                 posts = postsResponse.data.posts; // If under posts property
//             }
            
//             console.log(`📊 Found ${posts.length} posts`);
            
//             return {
//                 totalPosts: posts.length,
//                 totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
//                 recentPosts: posts.slice(0, 5),
//             };
//         } catch (error) {
//             console.error('❌ Error fetching dashboard stats:', error);
//             // Return default values instead of throwing
//             return {
//                 totalPosts: 0,
//                 totalViews: 0,
//                 recentPosts: [],
//             };
//         }
//     },
// };

// // Contact APIs
// export const contactAPI = {
//     submitContact: (data) => API.post('/contact', data),
    
//     // Admin only endpoints (for future use)
//     getContacts: (params = {}) => {
//         const queryParams = new URLSearchParams();
//         if (params.page) queryParams.append('page', params.page);
//         if (params.limit) queryParams.append('limit', params.limit);
//         if (params.status) queryParams.append('status', params.status);
        
//         const queryString = queryParams.toString();
//         return API.get(`/contact${queryString ? `?${queryString}` : ''}`);
//     },
    
//     getContactStats: () => API.get('/contact/stats'),
    
//     getContactById: (id) => API.get(`/contact/${id}`),
    
//     updateContactStatus: (id, status) => API.put(`/contact/${id}`, { status }),
    
//     deleteContact: (id) => API.delete(`/contact/${id}`)
// };

// // Export a function to test connection (useful for debugging)
// export const testConnection = async () => {
//     try {
//         console.log('🔍 Testing API connection to:', getBaseURL());
//         const response = await API.get('/health');
//         console.log('✅ Connection successful:', response.data);
//         return { success: true, data: response.data };
//     } catch (error) {
//         console.error('❌ Connection failed:', error.message);
//         return { 
//             success: false, 
//             error: error.message,
//             baseURL: getBaseURL(),
//             environment: process.env.NODE_ENV || 'development'
//         };
//     }
// };

// export default API;






import axios from 'axios';
import toast from 'react-hot-toast';

// Get the base URL
const getBaseURL = () => {
    // Production (Vercel) - Render API use karein
    if (process.env.NODE_ENV === 'production') {
        return 'https://pro-muko.onrender.com/api';
    }
    // Development (localhost) - localhost use karein
    return 'http://localhost:5000/api';
};

// Base API configuration
const API = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS
    timeout: 60000, // 60 second timeout
});

// Request interceptor to add token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request for debugging
        console.log('🚀 API Request:', {
            method: config.method,
            url: config.url,
            baseURL: config.baseURL,
            headers: config.headers
        });
        
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
API.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status);
        return response;
    },
    (error) => {
        console.error('❌ Response Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
        });

        if (error.code === 'ERR_NETWORK') {
            toast.error('Cannot connect to server. Please check if backend is running.');
        } else if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.location.href = '/admin/login';
            toast.error('Session expired. Please login again.');
        } else if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action.');
        } else if (error.response?.status === 404) {
            toast.error('Resource not found.');
        } else if (error.response?.status >= 500) {
            toast.error('Server error. Please try again later.');
        }
        
        return Promise.reject(error);
    }
);

// Admin APIs
export const adminAPI = {
    login: (credentials) => API.post('/admin/login', credentials),
    register: (userData) => API.post('/admin/register', userData),
    getProfile: () => API.get('/admin/profile'),
    updateProfile: (data) => API.put('/admin/profile', data),
};

// Post APIs
export const postAPI = {
    getPosts: (params = {}) => {
        const queryParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
            if (params[key]) queryParams.append(key, params[key]);
        });
        
        const queryString = queryParams.toString();
        return API.get(`/posts${queryString ? `?${queryString}` : ''}`);
    },

    getPostById: (id) => API.get(`/posts/${id}`),

    createPost: (formData) => {
        return API.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    updatePost: (id, formData) => {
        return API.put(`/posts/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deletePost: (id) => API.delete(`/posts/${id}`),

    getPostsByAuthor: (authorId) => API.get(`/posts/author/${authorId}`),
    getPostsByCategory: (category) => API.get(`/posts/category/${category}`),
};

// Dashboard stats API
export const dashboardAPI = {
    getStats: async () => {
        try {
            const postsResponse = await postAPI.getPosts({ limit: 100 });
            const posts = postsResponse.data.data || postsResponse.data;
            
            return {
                totalPosts: posts.length,
                totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
                recentPosts: posts.slice(0, 5),
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },
};

// Contact APIs
export const contactAPI = {
    submitContact: (data) => API.post('/contact', data),
    
    // Admin only endpoints (for future use)
    getContacts: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.status) queryParams.append('status', params.status);
        
        const queryString = queryParams.toString();
        return API.get(`/contact${queryString ? `?${queryString}` : ''}`);
    },
    
    getContactStats: () => API.get('/contact/stats'),
    
    getContactById: (id) => API.get(`/contact/${id}`),
    
    updateContactStatus: (id, status) => API.put(`/contact/${id}`, { status }),
    
    deleteContact: (id) => API.delete(`/contact/${id}`)
};

export default API;