export const API_BASE_URL = "__API_BASE_URL__"; // replaced during CI/CD

/**
 * Returns a full API URL depending on environment and path.
 * - In development: uses Vite's proxy (no base URL)
 * - In production: prefixes the API_BASE_URL
 */
export const getApiBaseUrl = (path = '') => {
  // Normalize the path (so you can safely pass with or without leading '/')
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (import.meta.env.DEV) {
    // Local dev → Vite proxy will handle /api requests
    return cleanPath;
  }

  // Production → Prepend API_BASE_URL injected by CI/CD
  const base = API_BASE_URL && API_BASE_URL !== '__API_BASE_URL__'
    ? API_BASE_URL
    : '';

  // Safety check
  if (!base) {
    console.warn(
      '⚠️ API_BASE_URL not set! Make sure your CI replaces __API_BASE_URL__ during build.'
    );
  }

  return `${base}${cleanPath}`;
};
