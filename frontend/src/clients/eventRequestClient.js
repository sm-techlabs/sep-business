import apiClient from './apiClient';

const eventRequestClient = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `/api/event-requests?${query}` : '/api/event-requests';
    return await apiClient.get(url);
  },

  getById: async (id) => apiClient.get(`/api/event-requests/${id}`),

  createRegistered: async (data) =>
    apiClient.post('/api/event-requests/registered', data),

  createUnregistered: async (data) =>
    apiClient.post('/api/event-requests/unregistered', data),

  update: async (id, data) => apiClient.put(`/api/event-requests/${id}`, data),

  delete: async (id) => apiClient.delete(`/api/event-requests/${id}`),
};

export default eventRequestClient;
