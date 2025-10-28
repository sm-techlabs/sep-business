import apiClient from './apiClient';

const budgetAdjustmentRequestClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/budget-adjustment-requests?${query}` : '/api/budget-adjustment-requests';
    return await apiClient.get(url);
  },

  getById: async (id) => 
    apiClient.get(`/api/budget-adjustment-requests/${id}`),

  create: async (data) => 
    apiClient.post('/api/budget-adjustment-requests/', data),

  update: async (id, data) => 
    apiClient.put(`/api/budget-adjustment-requests/${id}`, data),
  
  partialUpdate: async (id, data) => 
    apiClient.patch(`/api/budget-adjustment-requests/${id}`, data),

  delete: async (id) => 
    apiClient.delete(`/api/budget-adjustment-requests/${id}`),

};

export default budgetAdjustmentRequestClient;
