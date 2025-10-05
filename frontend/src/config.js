export const API_BASE_URL = "__API_BASE_URL__"; // replaced during build

export const getApiBaseUrl = (path) => {
  // If in dev, use proxy; otherwise, prepend base URL
  const base = import.meta.env.DEV ? '' : API_BASE_URL;
  return `${base}${path}`;
};
