import { Navigate, createBrowserRouter } from "react-router-dom";
import Authorization from "../layouts/authorization";
import ChangePassword from "../pages/authorization/changePassword";
import ForgetPassword from "../pages/authorization/forgetPassword";
import Landing from "../pages/landing";
import Login from "../pages/authorization/login";
import NotFound from "../pages/notFound";
import Register from "../pages/authorization/register";
import MainLayout from "../layouts/main";
import TimeLine from "../pages/main/timeLine";
import Explore from "../pages/main/explore";
import Profile from "../pages/main/profile/profile";
import BeMoniest from "../pages/main/beMoniest/beMoniest";
import ProtectedRoutes from "../components/layout/protectedRoutes";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />

    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "/:username",
                        element: <Profile />,
                    },
                    {
                        path: "timeline",
                        element: <TimeLine />
                    },
                    {
                        path: "explore",
                        element: <Explore />,
                    },
                    {
                        path: "bemoniest",
                        element: <BeMoniest />,
                    },
                ],
            }
        ]
    },
    {
        element: <Authorization />,
        children: [

            {
                path: "login",
                element: <Login />,

            },
            {
                path: "register",
                element: <Register />,
            },

            {
                path: "forget-password",
                element: <ForgetPassword />,
            },

            {
                path: "change-password",
                element: <ChangePassword />,
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }

]);


export default Router;