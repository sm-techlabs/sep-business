import axios from 'axios';
import { getApiBaseUrl } from '../config.js';

// Create a single configured Axios instance
const apiClient = axios.create({
  baseURL: getApiBaseUrl(''),
  timeout: 10000,
});

// ✅ REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');

    // Attach Authorization header unless auth is explicitly disabled
    if (token && config.auth !== false) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized - token may be expired or invalid.');
      // Optional: handle redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
