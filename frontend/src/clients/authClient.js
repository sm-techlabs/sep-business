import apiClient from './apiClient';

const authClient = {
  // --- 🧩 API calls ---
  
  /**
   * Log in with username and password.
   * Returns { token, user } if successful.
   */
  login: async ({ username, password }) => {
      const { data } = await apiClient.post('/api/authentication/login', { username, password }, { withAuth: false });
      // Won't set token if login fails (throws)
      setToken(data.token);
      return data;
  },

  /**
   * Validate current JWT (optional, if backend supports it).
   * Returns { valid: true, user: {...} }
   */
  validateToken: async () => {
      const { data } = await apiClient.get('/api/authentication/validate', { withAuth: true }, );
      return data;
  },

  // --- 🧠 Local helpers (no API calls) ---

  /**
   * Returns true if a JWT is stored locally.
   */
  isAuthenticated: () => !!localStorage.getItem('jwt'),

  /**
   * Removes JWT from localStorage (logout).
   */
  logout: () => {
    localStorage.removeItem('jwt');
  },
};

  /**
   * Stores a JWT in localStorage.
   */
  const setToken = (token) => {
    localStorage.setItem('jwt', token);
  }

export default authClient;
