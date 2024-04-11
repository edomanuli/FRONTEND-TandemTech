import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Services/AuthService";

function PrivateRoute() {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
