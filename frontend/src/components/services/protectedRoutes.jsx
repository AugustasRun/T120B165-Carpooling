import React from "react";

import { Navigate } from "react-router-dom";

const protectedRoutes = ({ requiredRole, page }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  if (user) {
    if (requiredRole === role || role === "Admin") {
      return page;
    }
    if (requiredRole !== role) {
      return <Navigate to="/" />;
    }
  }
  return <Navigate to="/login" />;
};

export default protectedRoutes;
