import axios from 'axios';
import { getApiBaseUrl } from '../config.js';

// ✅ Create a single configured Axios instance
const apiClient = axios.create({
  baseURL: getApiBaseUrl(''), // Base URL from config or vite proxy in dev
  timeout: 10000,
  withCredentials: true, // Always include cookies
});

// ✅ Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
