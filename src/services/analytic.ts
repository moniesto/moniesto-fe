// import firebase from "firebase/compat/app";
// import {
//   getAnalytics,
//   logEvent,
//   Analytics,
//   setUserId,
// } from "firebase/analytics";
// import { User } from "../interfaces/user";
import ReactGA from "react-ga4";
import { User } from "../interfaces/user";

// type EventType = "page_view" | "screen_view"|"dvt_page";

// class analytic {
//   private analytics!: Analytics;
//   initialize = () => {
//     const firebaseConfig = {
//       apiKey: "AIzaSyConTL_Qh47bSUUUj1oVQJGSMH4Q2uQCqA",
//       authDomain: "moniesto-bd2f6.firebaseapp.com",
//       projectId: "moniesto-bd2f6",
//       storageBucket: "moniesto-bd2f6.appspot.com",
//       messagingSenderId: "889461759120",
//       appId: "1:889461759120:web:903b14e9782d32b42e0c15",
//       measurementId: "G-XY6DB52M21",
//     };

//     const app = firebase.initializeApp(firebaseConfig);
//     this.analytics = getAnalytics(app);
//   };

//   setUser = (user: User) => {
//     setUserId(
//       this.analytics,
//       user.username ? `${user.id}_${user.username}` : null
//     );
//   };
//   logAnalyticEvent = (
//     event: EventType = "dvt_page",
//     params?: { [key: string]: any }
//   ) => {
//     const alnalyticParams = {
//       page_location: window.location.href,
//       ...params,
//     };
//     logEvent(this.analytics, event as never, alnalyticParams);
//   };
// }
// export default new analytic();

class analytic {
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
  sendEvent = (event: string, params: any) => {
    ReactGA.event(event, params);
  };
}
export default new analytic();
