import { User } from "./user";
export interface LoginResponse {
  user: User;
  token: string;
}
export interface LoginReq {
  identifier: string;
  password: string;
}

export interface RegisterReq {
  username: string;
  fullname: string;
  email: string;
  password: string;
}
export interface ChangePasswordReq {
  new: string;
  token: string;
}

export interface UsernameCheck {
  validity: boolean;
}
export interface VerifyTokenReq {
  token: string;
}

export interface SendMailReq {
  email: string;
}

export interface SendVerificationMailReq {
  redirect_url: string;
}
export interface BeMoniestReq {
  bio: string;
  binance_id: string;
  description: string;
  fee: number;
  message: string;
}
export interface CreatePostReq {
  currency: string;
  description: string;
  direction: string;
  duration: string;
  take_profit: number;
  stop: number;
  target1: number;
  target2: number;
  target3: number;
  market_type: "futures" | "spot";
  leverage: number;
}

export interface SubscribeRequest {
  cancelURL: string;
  number_of_months: number;
  returnURL: string;
}

export interface SubscriptionInfoResponse extends SubscribeResponse {
  pending: boolean;
  subscribed: boolean;
  subscription_info?: {
    subscribed_fee: number;
    payer_id: string;
    subscription_end_date: string;
    subscription_start_date: string;
  };
  timeout?: number;
}

export interface SubscribeResponse {
  checkout_link?: string;
  deep_link?: string;
  qrcode_link?: string;
  universal_link?: string;
}

export interface PayoutInfoResponse {
  payout_methods: {
    binance: [
      {
        type: string;
        value: string;
      }
    ];
  };
}

export interface PaginateRequest {
  limit: number;
  offset: number;
}
export interface ExplorePostsRequest extends PaginateRequest {
  active?: boolean;
  subscribed: boolean;
  sortBy: "score" | "created_at";
}
export interface Config {
  error_codes: {
    [key: string]: string | number;
  };
  validation: {
    [key: string]: RegExp | string | number;
  };
  general_info: {
    [key: string]: string | number;
  };
}

export interface UserPostsRequest extends PaginateRequest {
  active?: boolean;
}

export interface SummaryStatsResponse {
  post_count: number;
  subscriber_count: number;
  subscription_count: number;
}

export interface BaseResponse {
  error: string;
  error_code: string;
}

export const Requests: {
  password: {
    change_password: string;
    change_password_with_token: string;
    verify_token: string;
    send_email: string;
  };
  auth: {
    login: string;
    register: string;
  };
  account: {
    send_verification_email: string;
    verify_email: string;
    check_username: (username: string) => string;
    update_password: string;
    change_username: string;
  };
  asset: {
    configs: string;
  };
  content: {
    moniests: string;
    posts: string;
    moniest_search: string;
  };
  crypto: {
    search_currencies: (name: string, market_type: string) => string;
  };
  moniest: {
    be_moniest: string;
    update_profile: string;
    subscribe: (username: string) => string;
    unsubscribe: (username: string) => string;
    subscription_info: (username: string) => string;
    subscribers: (username: string) => string;
    get_payout: string;
    patch_payout: string;
  };
  post: {
    create_post: string;
    user_posts: (username: string) => string;
    approximate_score: string;
  };
  payment: {
    binance_transaction_check: (transaction_id: string) => string;
  };
  user: {
    user_by_username: (username: string) => string;
    update_profile: string;
    subscriptions: (username: string) => string;
    summary_stats: (username: string) => string;
  };
  feedback: {
    feedback: string;
  };
} = {
  password: {
    change_password: "account/password/change_password",
    change_password_with_token: "account/password/change_password",
    verify_token: "account/password/verify_token",
    send_email: "account/password/send_email",
  },
  auth: {
    login: "account/login",
    register: "account/register",
  },
  account: {
    send_verification_email: "account/email/send_verification_email",
    verify_email: "account/email/verify_email",
    check_username: (username: string) => `account/usernames/${username}/check`,
    update_password: "account/password",
    change_username: "account/username",
  },
  asset: {
    configs: "assets/configs",
  },
  content: {
    moniests: "content/moniests",
    posts: "content/posts",
    moniest_search: "content/moniests/search",
  },
  crypto: {
    search_currencies: (name: string, market_type: string) =>
      `crypto/currencies?name=${name}&market_type=${market_type}`,
  },
  moniest: {
    be_moniest: "moniests",
    update_profile: "moniests/profile",
    subscribe: (username: string) => `moniests/${username}/subscribe`,
    unsubscribe: (username: string) => `moniests/${username}/unsubscribe`,
    subscription_info: (username: string) =>
      `moniests/${username}/subscription-info`,
    subscribers: (username: string) => `moniests/${username}/subscribers`,
    get_payout: "moniests/payout",
    patch_payout: "moniests/payout",
  },
  post: {
    create_post: "moniests/posts",
    user_posts: (username: string) => `moniests/${username}/posts`,
    approximate_score: "moniests/posts/approximateScore",
  },
  payment: {
    binance_transaction_check: (transaction_id: string) =>
      `/payment/binance/transactions/check/${transaction_id}`,
  },
  user: {
    user_by_username: (username: string) => `users/${username}`,
    update_profile: "users/profile",
    subscriptions: (username: string) => `users/${username}/subscriptions`,
    summary_stats: (username) => `users/${username}/summary-stats`,
  },
  feedback: {
    feedback: "feedback",
  },
};
