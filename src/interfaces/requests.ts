import { User } from "./user"
export interface LoginResponse {
    user: User,
    token: string
}
export interface LoginReq {
    identifier: string,
    password: string
}

export interface RegisterReq {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
}
export interface ChangePasswordReq {
    new: string;
    token: string;
}


export interface UsernameCheck {
    validity: boolean
}
export interface VerifyTokenReq {
    token: string
}

export interface SendMailReq {
    email: string
}

export interface SendVerificationMailReq {
    redirect_url: string
}
export interface BeMoniestReq {
    bio: string,
    card_id: string,
    description: string,
    fee: number,
    message: string
}
export interface CreatePostReq {
    currency: string,
    description: string,
    direction: string,
    duration: string,
    stop: number,
    target1: number,
    target2: number,
    target3: number
}

export interface PaginateRequest {
    limit: number,
    offset: number
}
export interface ExplorePostsRequest extends PaginateRequest {
    active?: boolean,
    subscribed: boolean,
    sortBy: "score" | "created_at"
}

export interface UserPostsRequest extends PaginateRequest {
    active?: boolean,
}



export const Requests: {
    password:
    {
        change_password: string,
        change_password_with_token: string,
        verify_token: string,
        send_email: string
    },
    auth: {
        login: string,
        register: string
    },
    account: {
        send_verification_email: string,
        verify_email: string,
        check_username: (username: string) => string,
        update_password: string,
        change_username: string
    },
    asset: {
        error_codes: string
    },
    content: {
        moniests: string,
        posts: string
    },
    crypto: {
        search_currencies: (name: string) => string
    },
    moniest: {
        be_moniest: string,
        update_profile: string,
        subscribe: (username: string) => string,
        unsubscribe: (username: string) => string,
        subscribe_check: (username: string) => string,
        subscribers: (username: string) => string,
    },
    post: {
        create_post: string,
        user_posts: (username: string) => string,
    },
    user: {
        user_by_username: (username: string) => string,
        update_profile: string,
        subscriptions: (username: string) => string,
    }
} =
{
    password: {
        change_password: "account/password/change_password",
        change_password_with_token: "account/password/change_password",
        verify_token: "account/password/verify_token",
        send_email: "account/password/send_email"
    },
    auth: {
        login: "account/login",
        register: "account/register"
    },
    account: {
        send_verification_email: "account/email/send_verification_email",
        verify_email: "account/email/verify_email",
        check_username: (username: string) => `account/usernames/${username}/check`,
        update_password: "account/password",
        change_username: "account/username"
    },
    asset: {
        error_codes: "assets/error-codes"
    },
    content: {
        moniests: "content/moniests",
        posts: "content/posts"
    },
    crypto: {
        search_currencies: (name: string) => `crypto/currencies?name=${name}`
    },
    moniest: {
        be_moniest: "moniests",
        update_profile: "moniests/profile",
        subscribe: (username: string) => `moniests/${username}/subscribe`,
        unsubscribe: (username: string) => `moniests/${username}/unsubscribe`,
        subscribe_check: (username: string) => `moniests/${username}/subscribe/check`,
        subscribers: (username: string) => `moniests/${username}/subscribers`,
    },
    post: {
        create_post: "moniests/posts",
        user_posts: (username: string) => `moniests/${username}/posts`,
    },
    user: {
        user_by_username: (username: string) => `users/${username}`,
        update_profile: "users/profile",
        subscriptions: (username: string) => `users/${username}/subscriptions`,
    }
}



