import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const ProtectedRoutes = () => {
  const user = useAppSelector((state) => state.user.user);
  return user.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
