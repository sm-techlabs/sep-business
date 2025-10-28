import apiClient from './apiClient';

const recruitmentRequestClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/recruitment-requests?${query}` : '/api/recruitment-requests';
    return await apiClient.get(url);
  },

  getById: async (id) => 
    apiClient.get(`/api/recruitment-requests/${id}`),

  create: async (data) => 
    apiClient.post('/api/recruitment-requests/', data),

  update: async (id, data) => 
    apiClient.put(`/api/recruitment-requests/${id}`, data),
  
  partialUpdate: async (id, data) => 
    apiClient.patch(`/api/recruitment-requests/${id}`, data),

  delete: async (id) => 
    apiClient.delete(`/api/recruitment-requests/${id}`),

};

export default recruitmentRequestClient;
