import apiClient from './apiClient';

const applicationClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/applications?${query}` : '/api/applications';
    return await apiClient.get(url);
  },

  getById: async (id) => 
    apiClient.get(`/api/applications/${id}`),

  create: async (data) => 
    apiClient.post('/api/applications/', data),

  update: async (id, data) => 
    apiClient.put(`/api/applications/${id}`, data),

  delete: async (id) => 
    apiClient.delete(`/api/applications/${id}`),

};

export default applicationClient;
