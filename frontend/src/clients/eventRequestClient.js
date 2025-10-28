import apiClient from './apiClient';

const eventRequestClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/event-requests?${query}` : '/api/event-requests';
    return await apiClient.get(url);
  },

  getById: async (id) => 
    apiClient.get(`/api/event-requests/${id}`),

  createRegistered: async (data) => 
    apiClient.post('/api/event-requests/registered', data),

  createNonRegistered: async (data) => 
    apiClient.post('/api/event-requests/nonregistered', data),

  updateRegistered: async (id, data) => 
    apiClient.put(`/api/event-requests/registered/${id}`, data),
  
  updateNonRegistered: async (id, data) => 
    apiClient.put(`/api/event-requests/nonregistered/${id}`, data),

  delete: async (id) => 
    apiClient.delete(`/api/event-requests/${id}`),

  approve: async (id) => 
    apiClient.patch(`/api/event-requests/${id}/approve`),

  reject: async (id, data = {}) => 
    apiClient.patch(`/api/event-requests/${id}/reject`, data),
};

export default eventRequestClient;
