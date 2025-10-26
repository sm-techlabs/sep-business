import apiClient from './apiClient';

const taskClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/tasks?${query}` : '/api/tasks';
    return await apiClient.get(url);
  },

  getById: async (id) => 
    apiClient.get(`/api/tasks/${id}`),

  create: async (data) => 
    apiClient.post('/api/tasks/', data),

  update: async (id, data) => 
    apiClient.put(`/api/tasks/${id}`, data),

  delete: async (id) => 
    apiClient.delete(`/api/tasks/${id}`),

  approve: async (id) => 
    apiClient.patch(`/api/tasks/${id}/approve`),

  reject: async (id, data = {}) => 
    apiClient.patch(`/api/tasks/${id}/reject`, data),
};

export default taskClient;
