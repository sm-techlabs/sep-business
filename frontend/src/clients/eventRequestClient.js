import apiClient from './apiClient';

const eventRequestClient = {
  getAll: async () => {
    const response = await apiClient.get('/api/event-requests');
    return response;
  },
  
  getById: async ( id ) => {
    const response = await apiClient.get(`/api/event-requests/${id}`);
    return response;
  },

  getAllCreatedBy: async ( createdById ) => {
    const response = await apiClient.get(`/api/event-requests?createdBy=${createdById}`);
    return response;
  },

  createRegistered: async ( data ) => {
    const response = await apiClient.post('/api/event-requests/registered', data);
    return response;
  },

  createUnregistered: async ( data ) => {
    const response = await apiClient.post('/api/event-requests/unregistered', data);
    return response;
  },
  update: async ( id, data ) => {
    const response = await apiClient.put(`/api/event-requests/${id}`, data);
    return response;
  },

  delete: async ( id, data ) => {
    const response = await apiClient.delete(`/api/event-requests/${id}`);
    return response;
  },

};

export default eventRequestClient;
