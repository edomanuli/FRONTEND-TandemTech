import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Services/useAuth";

function PrivateRoute() {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
