import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import analytic from "../../services/googleAnalytic/analytic";
import { useTranslate } from "../../hooks/useTranslate";

export const AnalytcPageView = () => {
  const { pathname } = useLocation();
  const translate = useTranslate();
  useEffect(() => {
    console.log("pathname :", pathname);
    const pagename = pathname.substring(1).split("/")[0];
    const translatedPagename = translate("navigation." + pagename);
    const finalPageName = translatedPagename.includes("navigation.")
      ? translatedPagename.split("navigation.")[1]
      : translatedPagename;

    document.title = finalPageName
      ? finalPageName + " | Moniesto"
      : " Moniesto";

    analytic.pageView(window.location.href);
  }, [pathname, translate]);

  return <Outlet />;
};
