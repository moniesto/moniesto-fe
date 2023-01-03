import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { emptyUser, User } from "../../interfaces/user";
import { useAppSelector } from "../../store/hooks";

const ProtectedRoutes = () => {
  const [authUser, setAuthUser] = useState<User>(emptyUser);
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    console.log("user :", user);
    setAuthUser(user);
  }, [user]);

  return authUser.id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
