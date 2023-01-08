import { User } from "./user"
export interface LoginResponse {
    user: User,
    token: string
}
export interface UsernameCheck {
    validity: boolean
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
        check_username: (username: string) => string
    },
    asset: {
        error_codes: string
    },
    crypto: {
        search_currencies: string
    },
    moniest: {
        be_moniest: string
    },
    post: {
        create_post: string
    },
    user: {
        user_by_username: (username: string) => string
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
        register: "account/login"
    },
    account: {
        send_verification_email: "account/email/send_verification_email",
        verify_email: "account/email/verify_email",
        check_username: (username: string) => `account/usernames/${username}/check`,
    },
    asset: {
        error_codes: "assets/error-codes"
    },
    crypto: {
        search_currencies: "crypto/currencies"
    },
    moniest: {
        be_moniest: "moniests"
    },
    post: {
        create_post: "moniests/posts"
    },
    user: {
        user_by_username: (username: string) => `users/${username}`
    }
}



