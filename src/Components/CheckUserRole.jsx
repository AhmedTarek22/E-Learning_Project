import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const CheckUserRole = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};
export default CheckUserRole;
