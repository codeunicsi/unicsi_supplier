import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = isAuthenticated();
  const role = getUserRole();

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Role mismatch protection
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "vendor") {
      window.location.href = "https://unicse.pages.dev/marketplace";
    } else {
      return <Navigate to="/order" replace />;
    }
  }

  // All good — render route
  return children;
};

export default ProtectedRoute;
