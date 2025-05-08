
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

/**
 * A wrapper component that protects routes requiring authentication
 */
const ProtectedRoute = ({ children, isAuthenticated = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const auth = useAuth();
  
  // Use the auth context if available, otherwise fall back to the prop
  const isUserAuthenticated = auth.isAuthenticated || isAuthenticated;

  useEffect(() => {
    if (!isUserAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [isUserAuthenticated]);

  if (!isUserAuthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
