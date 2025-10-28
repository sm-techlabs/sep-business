import apiClient from './apiClient';

const authClient = {
  /**
   * Log in with username and password.
   * Backend sets an HTTP-only cookie.
   */
  login: async ({ username, password }) => {
    const response = await apiClient.post('/api/authentication/login', { username, password });
    return response;
  },

  /**
   * Validate current session.
   * Cookie is automatically sent with the request.
   * Returns { name, jobTitle } if valid.
   */
  validateToken: async () => {
    const response = await apiClient.get('/api/authentication/validate');
    return response;
  },

  /**
   * Get information about the currently authenticated user.
   * Returns { id, name, jobTitle } (requires /auth/self endpoint on backend).
   */
  // self: async () => {
  //   const response = await apiClient.get('/api/authentication/self');
  //   return response;
  // },

  /**
   * Log out the user (backend clears the cookie).
   */
  logout: async () => {
    const response = await apiClient.post('/api/authentication/logout');
    return response;
  },
};

export default authClient;
