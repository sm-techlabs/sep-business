import apiClient from './apiClient';

const formClient = {
  /**
   * Log in with username and password.
   * Backend sets an HTTP-only cookie.
   */
  submitRecruitmentForm: async ( data ) => {
    const response = await apiClient.post('/api/forms/recruitment', data);
    return response.data;
  },

}
export default formClient;
