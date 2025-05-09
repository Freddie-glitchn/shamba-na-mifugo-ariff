
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  requiredPermission?: string; // For role-based access control
}

/**
 * A wrapper component that protects routes requiring authentication
 */
const ProtectedRoute = ({ 
  children, 
  isAuthenticated = false, 
  requiredPermission = undefined 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);
  
  // Use the auth context if available, otherwise fall back to the prop
  const isUserAuthenticated = auth.isAuthenticated || isAuthenticated;

  useEffect(() => {
    let authCheckTimer: ReturnType<typeof setTimeout>;

    const checkAuthStatus = async () => {
      try {
        // In a real app, this would check with the backend
        // to verify the user's session is still valid
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check for specific permission if required
        if (requiredPermission && auth.user) {
          // This is a mock implementation - in a real app,
          // you would check user permissions from the auth context
          const mockUserPermissions = auth.user.role === 'admin' ? ['admin', 'edit', 'delete'] : ['view']; 
          const hasRequiredPermission = mockUserPermissions.includes(requiredPermission);
          setHasPermission(hasRequiredPermission);
          
          if (!hasRequiredPermission) {
            toast({
              title: "Access denied",
              description: "You don't have permission to access this resource",
              variant: "destructive",
            });
          }
        }
        
        // Show toast only if not authenticated
        if (!isUserAuthenticated) {
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    authCheckTimer = setTimeout(checkAuthStatus, 300);
    
    return () => clearTimeout(authCheckTimer);
  }, [isUserAuthenticated, auth.user, requiredPermission]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
        <span className="text-lg font-medium text-muted-foreground">Verifying access...</span>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    // Redirect to login but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  if (!hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
        <p className="text-muted-foreground text-center max-w-md">
          You don't have the required permissions to access this page.
          Please contact your administrator if you believe this is an error.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
