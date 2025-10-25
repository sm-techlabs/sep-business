import apiClient from './apiClient';

const formClient = {
  /**
   * Log in with username and password.
   * Backend sets an HTTP-only cookie.
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
