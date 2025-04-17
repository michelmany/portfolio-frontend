import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// API endpoints
export const projectsApi = {
    getAll: () => api.get('/projects'),
    getFeatured: () => api.get('/projects/featured'),
    getBySlug: (slug: string) => api.get(`/projects/${slug}`),
    create: (data: any) => api.post('/projects', data),
    update: (id: string, data: any) => api.put(`/projects/${id}`, data),
    delete: (id: string) => api.delete(`/projects/${id}`),
    addImage: (projectId: string, data: any) => api.post(`/projects/${projectId}/images`, data),
    deleteImage: (imageId: string) => api.delete(`/projects/images/${imageId}`),
};

export const resumeApi = {
    getActive: () => api.get('/resume/active'),
    getAll: () => api.get('/resume'),
    create: (data: any) => api.post('/resume', data),
    activate: (id: string) => api.put(`/resume/${id}/activate`),
    delete: (id: string) => api.delete(`/resume/${id}`),
};

export const socialApi = {
    getAll: () => api.get('/social'),
    create: (data: any) => api.post('/social', data),
    update: (id: string, data: any) => api.put(`/social/${id}`, data),
    delete: (id: string) => api.delete(`/social/${id}`),
};

export const authApi = {
    login: (credentials: { email: string; password: string }) =>
        api.post('/auth/login', credentials),
    register: (userData: { email: string; password: string; name: string }) =>
        api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
    updateProfile: (data: any) => api.put('/auth/profile', data),
};

export const uploadApi = {
    uploadFile: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        return api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default api;
