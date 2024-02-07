import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
export const ProtectedRoute = () => {
  const { user } = useAuth();
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
