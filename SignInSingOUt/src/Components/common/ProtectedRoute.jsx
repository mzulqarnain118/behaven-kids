import React, { useEffect } from "react";
import { Navigate, useNavigate, Outlet, useLocation } from "react-router-dom";
import { getLocal } from "../../utils";

const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = getLocal("token");
  const isOnboarded = getLocal("onboarding");
  const handleRedirect = () => {
    if (isAuthenticated) {
      if (isOnboarded && location.pathname === "/onboarding") {
        navigate(-1);
      } else if (location.pathname === "/") {
        navigate("/channels");
      }
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [isAuthenticated, isOnboarded]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoutes;
