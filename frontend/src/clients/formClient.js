import apiClient from './apiClient';

const formClient = {
  /**
   * Form Submission Handlers
   * Typically includes create, edit and delete handlers
   * for each type of form
   */
  createRecruitmentRequest: async ( data ) => {
    const response = await apiClient.post('/api/recruitment', data);
    return response;
  },
  updateRecruitmentRequest: async ( id, data ) => {
    const response = await apiClient.put(`/api/recruitment/${id}`, data);
    return response;
  },

  createEventRequestForRegistered: async ( data ) => {
    const response = await apiClient.post('/api/requests/registered', data);
    return response;
  },

  createEventRequestForNonRegistered: async ( data ) => {
    const response = await apiClient.post('/api/requests/unregistered', data);
    return response;
  },
  updateEventRequest: async ( id, data ) => {
    const response = await apiClient.put(`/api/requests/${id}`, data);
    return response;
  },
}
export default formClient;
