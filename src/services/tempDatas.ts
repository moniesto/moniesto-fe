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
  score: 20,
  subscription_info: TestSubscriptionInfo,
};

export const TestUser: User = {
  id: "1",
  fullname: "Davut Turug",
  username: "davuttrg",
  email: "davutturug@gmail.com",
  email_verified: false,
  location: "Antalya",
  profile_photo_link: "/images/user/Avatar.png",
  background_photo_link: "/images/user/Avatar_thumbnail.png",
  background_photo_thumbnail_link: "/images/user/profil_bg.webp",
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
  target1: 18.542,
  target2: 18.56,
  target3: 18.73,
  stop: 18.3,
  score: 20,
  direction: "long",
  created_at: new Date(),
  description: "",
  updated_at: new Date(),
  finished: false,
  status: "pending",
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
