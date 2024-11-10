//Library
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

//Context
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, accountInfo } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  if (allowedRoles && accountInfo) {
    const hasRequiredRole = allowedRoles.includes(accountInfo.role);
    if (!hasRequiredRole) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return <>{children}</>;
};