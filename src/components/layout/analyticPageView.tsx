import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import analytic from "../../services/analytic";

export const AnalytcPageView = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log("pathname :", pathname);
    analytic.logAnalyticEvent();
  }, [pathname]);

  return <Outlet />;
};
