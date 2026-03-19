import axios from 'axios';
import toast from 'react-hot-toast';

// Get the base URL
const getBaseURL = () => {
    // For development - explicitly set to port 5000
    return 'http://localhost:5000/api';
};

// Base API configuration
const API = axios.create({
    baseURL: getBaseURL(),
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for CORS
    timeout: 60000, // 10 second timeout
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