import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
