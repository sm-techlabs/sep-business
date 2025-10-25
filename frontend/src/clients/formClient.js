import apiClient from './apiClient';

const formClient = {
  /**
   * Form Submission Handlers
   * Typically includes create, edit and delete handlers
   * for each type of form
   */
  submitRecruitmentForm: async ( data ) => {
    const response = await apiClient.post('/api/forms/recruitment', data);
    return response;
  },

  submitEventRequestForRegistered: async ( data ) => {
    const response = await apiClient.post('/api/requests/registered', data);
    return response;
  },

  submitEventRequestForNonRegistered: async ( data ) => {
    const response = await apiClient.post('/api/requests/unregistered', data);
    return response;
  }
}
export default formClient;
