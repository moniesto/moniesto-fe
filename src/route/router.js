import { createBrowserRouter } from "react-router-dom";
import Authorization from "../layouts/authorization";
import ChangePassword from "../pages/authorization/changePassword";
import ForgetPassword from "../pages/authorization/forgetPassword";
import { Landing } from "../pages/landing/landing";
import Login from "../pages/authorization/login";
import NotFound from "../pages/notFound";
import Register from "../pages/authorization/register";
import MainLayout from "../layouts/main";
import TimeLine from "../pages/main/timeLine";
import Explore from "../pages/main/explore/explore";
import Profile from "../pages/main/profile/profile";
import BeMoniest from "../pages/main/beMoniest/beMoniest";
import ProtectedRoutes from "../components/layout/protectedRoutes";
import UnprotectedRoutes from "../components/layout/unprotectedRoutes";
import VerifyEmail from "../pages/main/verifyEmail";
import { SharePost } from "../pages/main/sharePost/sharePost";
import { AccountSettings } from "../pages/settings/account";
import { MoniestSettings } from "../pages/settings/moniest";
import { PaymentSettings } from "../pages/settings/payment";
import { PasswordSettings } from "../pages/settings/password";
import { VerifyEmailSettings } from "../pages/settings/verifyEmail";
import { SettingsList } from "../pages/settings/list";
import { AnalytcPageView } from "../components/layout/analyticPageView";
import { PrivacyPolicy } from "../pages/settings/legals/privacyPolicy/privacyPolicy";
import { TermsConditions } from "../pages/settings/legals/termsConditions";
import { Disclaimer } from "../pages/settings/legals/disclaimer";

const Router = createBrowserRouter([
  {
    element: <AnalytcPageView />,
    children: [
      {
        element: <UnprotectedRoutes />,
        children: [
          {
            path: "/",
            // element: <Landing />
            element: <Landing />,
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
            ],
          },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: ":username",
                element: <Profile />,
                children: [
                  {
                    path: "subscription",
                    children: [
                      {
                        path: "fail",
                        id: "fail",
                      },
                      {
                        path: "success",
                        id: "success",
                      },
                    ],
                  },
                ],
              },
              {
                path: "timeline",
                element: <TimeLine />,
              },
              {
                path: "explore",
                element: <Explore />,
              },
              {
                path: "bemoniest",
                element: <BeMoniest />,
              },
              {
                path: "share",
                element: <SharePost />,
              },
              {
                path: "settings",
                children: [
                  {
                    path: "",
                    element: <SettingsList />,
                  },
                  {
                    path: "account",
                    element: <AccountSettings />,
                  },
                  {
                    path: "moniest",
                    element: <MoniestSettings />,
                  },
                  {
                    path: "payment",
                    element: <PaymentSettings />,
                  },
                  {
                    path: "password",
                    element: <PasswordSettings />,
                  },
                  {
                    path: "verify-email",
                    element: <VerifyEmailSettings />,
                  },
                  {
                    path: "legals",
                    children: [
                      {
                        path: "disclaimer",
                        element: <Disclaimer />,
                      },
                      {
                        path: "privacy-policy",
                        element: <PrivacyPolicy />,
                      },
                      {
                        path: "terms-and-conditions",
                        element: <TermsConditions />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
