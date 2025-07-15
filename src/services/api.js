import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Admin API
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  createQuestion: (questionData) => api.post('/admin/questions', questionData),
  uploadCSV: (formData) => api.post('/admin/questions/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getQuestions: () => api.get('/admin/questions'),
  deleteQuestion: (id) => api.delete(`/admin/questions/${id}`),
};

// Test API
export const testAPI = {
  getQuestions: (category) => api.get(`/test/questions/${category}`),
  submitTest: (testData) => api.post('/test/submit', testData),
  getResults: () => api.get('/test/results'),
};

export default api;