import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

import Spinner from "./Spinner";
import { useCoursesContext } from "../Context/CoursesProvider";
export default function PrivateRoute() {
  const { loginStatus } = useCoursesContext();
  const { isLoading } = useAuthStatus();
  if (isLoading) {
    return <Spinner />;
  }
  return loginStatus ? <Outlet /> : <Navigate to="/login" />;
}
