import firebase from "firebase/compat/app";
import {
  getAnalytics,
  logEvent,
  Analytics,
  setUserId,
} from "firebase/analytics";
import { User } from "../interfaces/user";

type EventType = "page_view" | "screen_view";

class analytic {
  private analytics!: Analytics;
  initialize = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyConTL_Qh47bSUUUj1oVQJGSMH4Q2uQCqA",
      authDomain: "moniesto-bd2f6.firebaseapp.com",
      projectId: "moniesto-bd2f6",
      storageBucket: "moniesto-bd2f6.appspot.com",
      messagingSenderId: "889461759120",
      appId: "1:889461759120:web:903b14e9782d32b42e0c15",
      measurementId: "G-XY6DB52M21",
    };

    const app = firebase.initializeApp(firebaseConfig);
    this.analytics = getAnalytics(app);
  };

  setUser = (user: User) => {
    setUserId(
      this.analytics,
      user.username ? `${user.id}_${user.username}` : null
    );
  };
  logAnalyticEvent = (
    event: EventType = "screen_view",
    params?: { [key: string]: any }
  ) => {
    const alnalyticParams = {
      page_location: window.location.href,
      ...params,
    };
    logEvent(this.analytics, event as never, alnalyticParams);
  };
}
export default new analytic();
