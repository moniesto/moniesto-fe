import { Post } from "../interfaces/post"
import { BeMoniestReq, ChangePasswordReq, CreatePostReq, LoginReq, LoginResponse, RegisterReq, Requests, SendMailReq, SendVerificationMailReq, UsernameCheck, VerifyTokenReq } from "../interfaces/requests"
import { Moniest, User } from "../interfaces/user"
import httpService from "./httpService"


class api {

    constructor() { }

    auth = {
        login(params: LoginReq) {
            return httpService.post<LoginResponse>(Requests.auth.login, params)
        },
        register(params: RegisterReq) {
            return httpService.post<LoginResponse>(Requests.auth.register, params)
        }
    }
    password = {
        change_password(params: ChangePasswordReq) {
            return httpService.put(Requests.password.change_password, params)
        },
        change_password_with_token(params: ChangePasswordReq) {
            return httpService.post(Requests.password.change_password_with_token, params)
        },
        verify_token(params: VerifyTokenReq) {
            return httpService.post(Requests.password.verify_token, params)
        },
        send_email(params: SendMailReq) {
            return httpService.post(Requests.password.send_email, params)
        },
    }
    account = {
        send_verification_email(params: SendVerificationMailReq) {
            return httpService.post(Requests.account.send_verification_email, params)
        },
        verify_email: (params: VerifyTokenReq) => httpService.post(Requests.account.verify_email, params),
        check_username: (username: string) => httpService.get<UsernameCheck>(Requests.account.check_username(username)),
        update_password: (params: { new: string, old: string }) => httpService.put(Requests.account.update_password, params),
    }
    asset = {
        error_codes: () => httpService.get(Requests.asset.error_codes),
    }
    crypto = {
        search_currencies: (name: string) => httpService.get<{ currency: string, price: number }[]>(Requests.crypto.search_currencies(name)),
    }
    moniest = {
        be_moniest: (params: BeMoniestReq) => httpService.post<User>(Requests.moniest.be_moniest, params),
        update_profile: (params: Partial<Moniest>) => httpService.patch<User>(Requests.moniest.update_profile, params),
    }
    post = {
        create_post: (params: CreatePostReq) => httpService.post<Post>(Requests.post.create_post, params),
    }
    user = {
        update_profile: (params: Partial<User>) => httpService.patch<User>(Requests.user.update_profile, params),
        user_by_username: (username: string) => httpService.get<User>(Requests.user.user_by_username(username)),

    }


}
export default new api()