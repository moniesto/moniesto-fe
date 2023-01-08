import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const UnprotectedRoutes = () => {
  const user = useAppSelector((state) => state.user.user);
  return user.id ? <Navigate to="/timeline" /> : <Outlet />;
};

export default UnprotectedRoutes;
