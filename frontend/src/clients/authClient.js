import apiClient from './apiClient';

const authClient = {
  // --- 🧩 API calls ---

  /**
   * Log in with username and password.
   * Returns { token, user } if successful.
   */
  login: async (credentials) => {
    const { data } = await apiClient.post('/api/authentication/login', credentials, { auth: false });
    return data;
  },

  /**
   * Register a new user.
   * Returns success message or created user.
   */
  register: async (userInfo) => {
    const { data } = await apiClient.post('/api/authentication/register', userInfo, { auth: false });
    return data;
  },

  /**
   * Validate current JWT (optional, if backend supports it).
   * Returns { valid: true, user: {...} }
   */
  validateToken: async () => {
    const { data } = await apiClient.get('/api/authentication/validate');
    return data;
  },

  // --- 🧠 Local helpers (no API calls) ---

  /**
   * Returns true if a JWT is stored locally.
   */
  isAuthenticated: () => !!localStorage.getItem('jwt'),

  /**
   * Stores a JWT in localStorage.
   */
  setToken: (token) => {
    localStorage.setItem('jwt', token);
  },

  /**
   * Removes JWT from localStorage (logout).
   */
  logout: () => {
    localStorage.removeItem('jwt');
  },
};

export default authClient;
