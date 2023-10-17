import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import analytic from "../../services/analytic";
import { useTranslate } from "../../hooks/useTranslate";
import { ENVIRONMENT } from "../../services/environment";

export const AnalytcPageView = () => {
  const { pathname } = useLocation();
  const translate = useTranslate();
  useEffect(() => {
    const pagename = pathname.substring(1).split("/")[0];

    const translatedPagename = translate("navigation." + pagename);

    let finalPageName = translatedPagename.includes("navigation.")
      ? translatedPagename.split("navigation.")[1]
      : translatedPagename;

    if (ENVIRONMENT === "alpha") {
      finalPageName = "ALPHA - " + finalPageName;
    }
    document.title = finalPageName
      ? finalPageName + " | Moniesto"
      : " Moniesto";

    analytic.pageView(window.location.href);
  }, [pathname, translate]);

  return <Outlet />;
};
