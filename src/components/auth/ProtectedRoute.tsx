
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

/**
 * A wrapper component that protects routes requiring authentication
 */
const ProtectedRoute = ({ children, isAuthenticated = false }: ProtectedRouteProps) => {
  const location = useLocation();

  // In a real app, this would check a user context or auth state
  // For now, we're simulating with the isAuthenticated prop
  if (!isAuthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
