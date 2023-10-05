import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import analytic from "../../services/analytic";

export const AnalytcPageView = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    analytic.pageView(window.location.href);
  }, [pathname]);

  return <Outlet />;
};
