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
    if (role === "SUPPLIER") {
      window.location.href = import.meta.env.VITE_FRONTEND_URL + "/order";
    } else {
      window.location.href = import.meta.env.VITE_FRONTEND_URL + "/order";
    }
  }

  // All good — render route
  return children;
};

export default ProtectedRoute;
