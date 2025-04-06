import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
}
