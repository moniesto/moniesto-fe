import ReactGA from "react-ga4";
import { User } from "../../interfaces/user";
import { NotAdviceCategory, NotAdviceClickAction } from "./events";

class analytic {
  events = {
    NotAdviceCategory: NotAdviceCategory,
    NotAdviceClickAction: NotAdviceClickAction,
  };
  initialize = () => {
    ReactGA.initialize("G-XY6DB52M21");
  };

  setUser = (user: User) => {
    if (user?.username) {
      ReactGA.set({ userId: `${user.id}_${user.username}` });
      ReactGA.gtag("set", "user_properties", {
        moniest: user.moniest,
      });
      ReactGA.gtag("set", "user_properties", {
        name: user.username,
      });
    }
  };
  pageView = (path: string) =>
    ReactGA.send({
      hitType: "pageview",
      page: path,
    });
  login = () => {
    ReactGA.event("login", {});
  };
  sendEvent = (category: string, action: string, label?: string) => {
    console.log("GA event:", category, ":", action, ":", label);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };
}
export default new analytic();
