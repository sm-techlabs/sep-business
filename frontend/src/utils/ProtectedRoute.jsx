// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

/**
 * Protects routes by checking for a stored JWT token.
 * If the token doesn't exist, user is redirected to /login.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');
  const isAuthenticated = !!token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
