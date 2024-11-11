//Library
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

//Context
import { useAuth } from "../../contexts/AuthContext";
import LoadingLoader from "../loaders/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const Protected_Route = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, accountInfo, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div>
        <LoadingLoader displayText="Đang Xử Lý"/>
      </div>
    );
  }

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

export default Protected_Route;