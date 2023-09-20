import { Post } from "../interfaces/post";
import {
  BaseResponse,
  BeMoniestReq,
  CalculatePnlRoiReq,
  ChangePasswordReq,
  Config,
  CreatePostReq,
  ExplorePostsRequest,
  LoginReq,
  LoginResponse,
  PaginateRequest,
  PayoutInfoResponse,
  RegisterReq,
  Requests,
  SendMailReq,
  SendVerificationMailReq,
  SubscribeRequest,
  SubscribeResponse,
  SubscriptionInfoResponse,
  SummaryStatsResponse,
  UsernameCheck,
  UserPostsRequest,
  VerifyTokenReq,
} from "../interfaces/requests";
import { Moniest, User } from "../interfaces/user";
import httpService from "./httpService";

class api {
  auth = {
    login(params: LoginReq) {
      return httpService.post<LoginResponse>(Requests.auth.login, params);
    },
    register(params: RegisterReq) {
      return httpService.post<LoginResponse>(Requests.auth.register, params);
    },
  };
  password = {
    change_password(params: ChangePasswordReq) {
      return httpService.put(Requests.password.change_password, params);
    },
    change_password_with_token(params: ChangePasswordReq) {
      return httpService.post(
        Requests.password.change_password_with_token,
        params
      );
    },
    verify_token(params: VerifyTokenReq) {
      return httpService.post(Requests.password.verify_token, params);
    },
    send_email(params: SendMailReq) {
      return httpService.post(Requests.password.send_email, params);
    },
  };
  account = {
    send_verification_email(params: SendVerificationMailReq) {
      return httpService.post(Requests.account.send_verification_email, params);
    },
    verify_email: (params: VerifyTokenReq) =>
      httpService.post<{ redirect_url: string }>(
        Requests.account.verify_email,
        params
      ),
    check_username: (username: string) =>
      httpService.get<UsernameCheck>(Requests.account.check_username(username)),
    update_password: (params: { new: string; old: string }) =>
      httpService.put(Requests.account.update_password, params),
    change_username: (params: { new: string }) =>
      httpService.patch<{ token: string }>(
        Requests.account.change_username,
        params
      ),
  };
  asset = {
    configs: () => httpService.get<Config>(Requests.asset.configs),
  };
  content = {
    moniests: (params: PaginateRequest) =>
      httpService.get<User[]>(Requests.content.moniests, params),
    posts: (params: ExplorePostsRequest) =>
      httpService.get<Post[]>(Requests.content.posts, params),
    moniest_search: (params: PaginateRequest & { searchText: string }) =>
      httpService.get<User[]>(Requests.content.moniest_search, params),
  };
  crypto = {
    search_currencies: (name: string, market_type: string) =>
      httpService.get<{ currency: string; price: number }[]>(
        Requests.crypto.search_currencies(name, market_type)
      ),
  };
  moniest = {
    be_moniest: (params: BeMoniestReq) =>
      httpService.post<User>(Requests.moniest.be_moniest, params),
    update_profile: (params: Partial<Moniest>) =>
      httpService.patch<User>(Requests.moniest.update_profile, params),
    subscribe: (username: string, params: SubscribeRequest) =>
      httpService.post<SubscribeResponse>(
        Requests.moniest.subscribe(username),
        params
      ),
    unsubscribe: (username: string) =>
      httpService.post(Requests.moniest.unsubscribe(username)),
    subscription_info: (username: string) =>
      httpService.get<SubscriptionInfoResponse>(
        Requests.moniest.subscription_info(username)
      ),
    subscribers: (username: string, params: PaginateRequest) =>
      httpService.get<User[]>(Requests.moniest.subscribers(username), params),
    get_payout: () =>
      httpService.get<PayoutInfoResponse>(Requests.moniest.get_payout),
    patch_payout: (params: { binance_id: string }) =>
      httpService.patch<PayoutInfoResponse>(
        Requests.moniest.patch_payout,
        params
      ),
  };
  post = {
    create_post: (params: CreatePostReq) =>
      httpService.post<Post>(Requests.post.create_post, params),
    user_posts: (username: string, params: UserPostsRequest) =>
      httpService.get<Post[]>(Requests.post.user_posts(username), params),
    calculate_pnl_roi: (params: CalculatePnlRoiReq) =>
      httpService.post<{ pnl: number; roi: number }>(
        Requests.post.calculate_pnl_roi,
        params
      ),
  };
  payment = {
    binance_transaction_check: (transaction_id: string) =>
      httpService.post<BaseResponse>(
        Requests.payment.binance_transaction_check(transaction_id)
      ),
  };
  user = {
    update_profile: (params: Partial<User>) =>
      httpService.patch<User>(Requests.user.update_profile, params),
    user_by_username: (username: string) =>
      httpService.get<User>(Requests.user.user_by_username(username)),
    subscriptions: (username: string, params: PaginateRequest) =>
      httpService.get<User[]>(Requests.user.subscriptions(username), params),
    summary_stats: (username: string) =>
      httpService.get<SummaryStatsResponse>(
        Requests.user.summary_stats(username)
      ),
  };
  feedback = {
    feedback: (params: { type: string; message: string }) =>
      httpService.post(Requests.feedback.feedback, params),
  };
}
export default new api();
