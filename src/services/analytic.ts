import ReactGA from "react-ga4";
import { User } from "../interfaces/user";
import { GA_MEASUREMENT_ID } from "./environment";

class analytic {
  events = {
    NotAdviceCategory: "Not Advice",
    NotAdviceClickAction: "Not Advice Clicked",
    HelpInfoCategory: "Help Info",
    HelpInfoClickAction: "Help Info Clicked",
    HelpInfoNotShowClickAction: "Help Info Not Show Clicked",
  };
  user!: User;
  initialize = () => {
    ReactGA.initialize(GA_MEASUREMENT_ID as string);
  };

  setUser = (user: User) => {
    if (user?.username) {
      this.user = user;
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
  sendEvent = (category: string, action: string, data?: {}, label?: string) => {
    const finaldata = {
      ...data,
      ...(this.user
        ? { userId: this.user?.id, username: this.user?.username }
        : {}),
    };
    console.log("finaldata :", finaldata);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
      ...finaldata,
    });
  };
}
export default new analytic();
