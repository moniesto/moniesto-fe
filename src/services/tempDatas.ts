import { Card } from "../interfaces/card";
import { Post } from "../interfaces/post";
import { Moniest, SubscriptionInfo, User } from "../interfaces/user";

export const TestSubscriptionInfo: SubscriptionInfo = {
  fee: 10,
  message: "test message",
  updated_at: new Date(),
};

export const TestMoniest: Moniest = {
  id: "1",
  bio: "test bio",
  description: "test description",
  subscription_info: TestSubscriptionInfo,
  post_statistics: {
    pnl_7days: 0,
    pnl_30days: 0,
    pnl_total: 0,
    roi_7days: 0,
    roi_30days: 0,
    roi_total: 0,
    win_rate_7days: 0,
    win_rate_30days: 0,
    win_rate_total: 0,
  },
};

export const TestUser: User = {
  id: "1",
  fullname: "Davut Turug",
  username: "davuttrg",
  email: "davutturug@gmail.com",
  email_verified: false,
  location: "Antalya",
  profile_photo_link: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  background_photo_link: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  background_photo_thumbnail_link:
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
  created_at: new Date(),
  updated_at: new Date(),
  moniest: TestMoniest,
};

export const TestPost: Post = {
  id: "1",
  user: TestUser,
  currency: "BTCUSDT",
  start_price: 18.5,
  duration: new Date(),
  take_profit: 18.8,
  target1: 18.542,
  target2: 18.56,
  target3: 18.73,
  stop: 18.3,
  direction: "long",
  created_at: new Date(),
  description: "",
  updated_at: new Date(),
  finished: false,
  status: "pending",
  market_type: "spot",
  leverage: 1,
  pnl: 11,
  roi: 22,
};
export const TestCard: Card = {
  id: "1",
  name: "Davut turug",
  last4: "5082",
  brand: "Ziraat Card",
};
export const TestCard2: Card = {
  id: "2",
  name: "Davut turug",
  last4: "4242",
  brand: "Yapikredi Card",
};
