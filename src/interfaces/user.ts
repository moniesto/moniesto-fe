export const emptyUser: User = {
  id: "",
  username: "",
  fullname: "",
  email: "",
};

export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  email_verified?: boolean;
  location?: string;
  background_photo_link?: string;
  background_photo_thumbnail_link?: string;
  profile_photo_link?: string;
  profile_photo_thumbnail_link?: string;
  created_at?: Date;
  updated_at?: Date;
  moniest?: Moniest;
  language?: string;
}
export interface Moniest {
  id: string;
  bio: string;
  description?: string;
  post_statistics: {
    pnl_7days: number;
    pnl_30days: number;
    pnl_total: number;
    roi_7days: number;
    roi_30days: number;
    roi_total: number;
    win_rate_7days: number;
    win_rate_30days: number;
    win_rate_total: number;
  };
  subscription_info: SubscriptionInfo;
  subscriber_count?: number;
}
export interface SubscriptionInfo {
  fee: number;
  message?: string;
  updated_at?: Date;
}
