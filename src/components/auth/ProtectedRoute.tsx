
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the auth context if available, otherwise fall back to the prop
  const isUserAuthenticated = auth.isAuthenticated || isAuthenticated;

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuthStatus = setTimeout(() => {
      setIsLoading(false);
      
      if (!isUserAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
      }
    }, 500);

    return () => clearTimeout(checkAuthStatus);
  }, [isUserAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Verifying access...</span>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
