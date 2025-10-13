import { Navigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import Loader from '../components/Loader';

/**
 * Protects routes by verifying token validity and (optionally) user roles.
 * If token is invalid or missing, redirects to /login.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, tokenValid, loading } = useAppContext();

  // ⏳ Still validating → don’t render yet
  if (loading) return <Loader text="Validating session..." />;

  // 🚫 No valid token → redirect
  if (!tokenValid) return <Navigate to="/login" replace />;

  // ⚙️ If allowedRoles provided, check job title
  if (allowedRoles && user && !allowedRoles.includes(user.jobTitle)) {
    return null; // or <Navigate to="/unauthorized" />
  }

  // ✅ Authorized → render content
  return children;
};

export default ProtectedRoute;
