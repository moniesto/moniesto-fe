import { Config } from "../interfaces/requests";

export const defaultConfigs: Config = {
  validation: {
    email_regex: "^[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,4}$",
    username_regex: "^[a-z][a-z0-9_]{0,29}$",
    min_fee: 5,
    max_bio_lenght: 150,
    max_description_length: 5000,
    max_subscription_message_length: 150,
    max_fullname_length: 50,
    max_location_length: 30,
    password_length: 6,
    max_duration_day: 90,
    long_max_take_profit_multiplier: 10,
    short_max_stop_multiplier: 2,
  },
  error_codes: {
    Account_Authorization_InvalidHeader: "Authorization Header is invalid",
    Account_Authorization_InvalidToken: "Authorization Token is invalid",
    Account_Authorization_NotProvidedHeader:
      "Authorization Header is not provided",
    Account_Authorization_UnsupportedType:
      "Authorization Type is not supported",
    Account_ChangePassowrd_SendEmail: "Server error on sending email",
    Account_ChangePassword_ExpiredToken: "Password Reset Token is expired",
    Account_ChangePassword_InvalidBody:
      "Change password request body is invalid",
    Account_ChangePassword_InvalidEmail: "Email is invalid",
    Account_ChangePassword_InvalidNewPassword: "New password is invalid",
    Account_ChangePassword_InvalidOldPassword: "Old password is invalid",
    Account_ChangePassword_InvalidToken: "Password Reset Token is invalid",
    Account_ChangePassword_NotFoundEmail: "Email is not in the system",
    Account_ChangePassword_NotFoundToken:
      "Password Reset Token is not in the system",
    Account_ChangePassword_ServerErrorCheckEmail:
      "Server error on checking email",
    Account_ChangePassword_ServerErrorCheckPassword:
      "Server error on checking password",
    Account_ChangePassword_ServerErrorCreateToken:
      "Server error on creating token",
    Account_ChangePassword_ServerErrorDeleteToken:
      "Server error on deleting Password Reset Token",
    Account_ChangePassword_ServerErrorGetToken:
      "Server error on getting Password Reset Token from system",
    Account_ChangePassword_ServerErrorPassword:
      "Server error on password operation",
    Account_ChangePassword_ServerErrorUpdatePassword:
      "Server error on updating password",
    Account_ChangePassword_WrongPassword: "Wrong old Password",
    Account_ChangeUsername_InvalidBody:
      "Change username request body is invalid",
    Account_ChangeUsername_InvalidUsername: "Username is invalid",
    Account_ChangeUsername_RegisteredUsername: "Username is already registered",
    Account_ChangeUsername_ServerErrorChangeUsername:
      "Server error on changing username",
    Account_ChangeUsername_ServerErrorToken: "Server error on token operation",
    Account_CheckUsername_InvalidUsername: "Username is invalid",
    Account_CheckUsername_ServerErrorCheckUsername:
      "Server error on checking username",
    Account_EmailVerification_AlreadyVerified: "The email is already verified",
    Account_EmailVerification_ExpiredToken:
      "Email Verification Token is expired",
    Account_EmailVerification_InvalidBody:
      "Email verification request body is invalid",
    Account_EmailVerification_InvalidToken:
      "Email Verification Token is invalid",
    Account_EmailVerification_NotFoundToken:
      "Email Verification Token is not in the system",
    Account_EmailVerification_SendEmail: "Server error on sending email",
    Account_EmailVerification_ServerErrorCreateToken:
      "Server error on creating token",
    Account_EmailVerification_ServerErrorDeleteToken:
      "Server error on deleting Email Verification Token",
    Account_EmailVerification_ServerErrorGetToken:
      "Server error on getting Email Verification Token from system",
    Account_EmailVerification_ServerErrorGetUser:
      "Server error on getting user",
    Account_EmailVerification_ServerErrorVerifyEmail:
      "Server error on verifying email",
    Account_GetUser_NotFound: "User not found",
    Account_GetUser_ServerError: "Server error on getting user",
    Account_Login_InvalidBody: "Login request body is invalid",
    Account_Login_InvalidEmail: "Email is invalid",
    Account_Login_InvalidUsername: "Username is invalid",
    Account_Login_NotFoundEmail: "Email is not in the system",
    Account_Login_NotFoundUsername: "Username is not in the system",
    Account_Login_ServerErrorEmail: "Server error on login with email",
    Account_Login_ServerErrorToken: "Server error on token operation",
    Account_Login_ServerErrorUsername: "Server error on login with username",
    Account_Login_WrongPassword: "Wrong password",
    Account_Register_InvalidBody: "Register request body is invalid",
    Account_Register_InvalidEmail: "Email is invalid",
    Account_Register_InvalidFullname: "Fullname is invalid",
    Account_Register_InvalidPassword: "Password is invalid",
    Account_Register_InvalidUsername: "Username is invalid",
    Account_Register_RegisteredEmail: "Email is already registered",
    Account_Register_RegisteredUsername: "Username is already registered",
    Account_Register_ServerErrorCheckEmail: "Server error on checking email",
    Account_Register_ServerErrorCheckUsername:
      "Server error on checking username",
    Account_Register_ServerErrorCreateUser: "Server error on creating user",
    Account_Register_ServerErrorPassword: "Server error on password operation",
    Account_UpdateUserProfile_InvalidBody:
      "Update user profile request body is invalid",
    Account_UpdateUserProfile_InvalidFullname: "Fullname is invalid",
    Account_UpdateUserProfile_InvalidLocation: "Location is invalid",
    Account_UpdateUserProfile_ServerErrorGetBackgroundPhoto:
      "Server error on getting background photo",
    Account_UpdateUserProfile_ServerErrorGetProfilePhoto:
      "Server error on getting profile photo",
    Account_UpdateUserProfile_ServerErrorGetUser:
      "Server error on getting user",
    Account_UpdateUserProfile_ServerErrorInsertBackgroundPhoto:
      "Server error on inserting background photo",
    Account_UpdateUserProfile_ServerErrorInsertProfilePhoto:
      "Server error on inserting profile photo",
    Account_UpdateUserProfile_ServerErrorUpdateBackgroundPhoto:
      "Server error on updating background photo",
    Account_UpdateUserProfile_ServerErrorUpdateProfilePhoto:
      "Server error on updating profile photo",
    Account_UpdateUserProfile_ServerErrorUpdateUser:
      "Server error updating user",
    Account_UpdateUserProfile_ServerErrorUploadBackgroundPhoto:
      "Server error on uploading background photo",
    Account_UpdateUserProfile_ServerErrorUploadProfilePhoto:
      "Server error on uploading profile photo",
    Content_GetMoniests_InvalidParam: "Get Moniests request param is invalid",
    Content_GetMoniests_ServerErrorGetMoniests:
      "Server error on getting moniests",
    Content_GetPosts_InvalidParam: "Get Posts request param is invalid",
    Content_GetPosts_ServerErrorGetPosts: "Server error on getting posts",
    Content_SearchMoniests_InvalidParam:
      "Search moniest request param is invalid",
    Content_SearchMoniests_ServerErrorSearchMoniest:
      "Server error on searching moniest",
    Crypto_GetCurrenciesFromAPI_ServerError:
      "Server error on getting currencies from API",
    Crypto_GetCurrencies_InvalidParam:
      "Get Currencies request params is invalid",
    Crypto_GetCurrencyFromAPI_ServerError:
      "Server error on getting currency from API",
    Feedback_CreateFeedback_InvalidBody:
      "Create feedback request body is invalid",
    Feedback_CreateFeedback_ServerErrorCreateFeedback:
      "Server error on creating feedback",
    General_MoniestNotFoundByUsername: "No moniest with this username",
    General_ServerErrorCheckMoniestByUserID:
      "Server error on checking user is moniest by user ID",
    General_ServerErrorCheckMoniestByUsername:
      "Server error on checking user is moniest by username",
    General_ServerErrorGetMoniestByUsername:
      "Server error on getting moniest by username",
    General_UserNotFoundByID: "User not found with this user ID",
    General_UserNotFoundByUsername: "User not found with this username",
    General_UserNotMoniest: "User is not moniest",
    Moniest_CreateMoniest_InvalidBio: "Bio is invalid",
    Moniest_CreateMoniest_InvalidBody: "Create moniest request body is invalid",
    Moniest_CreateMoniest_InvalidDescription: "Description is invalid",
    Moniest_CreateMoniest_ServerErrorCreateMoniest:
      "Server error on create moniest",
    Moniest_CreateMoniest_ServerErrorUserIsMoniest:
      "Server error on user is moniest check",
    Moniest_CreateMoniest_UnverifiedEmail: "Email is not verified yet",
    Moniest_CreateMoniest_UserIsAlreadyMoniest:
      "This user is already a moniest",
    Moniest_CreatePayoutInfo_InvalidBinanceID: "Binance ID is not valid",
    Moniest_CreatePayoutInfo_ServerErrorOnCreate:
      "Server error on create payout info",
    Moniest_CreateSubscriptionInfo_InvalidFee: "Fee is invalid",
    Moniest_CreateSubscriptionInfo_InvalidSubscriptionMessage:
      "Subscription message is invalid",
    Moniest_CreateSubscriptionInfo_ServerErrorOnCreate:
      "Server error on create subscription info",
    Moniest_GetMoniestPosts_ForbiddenAccess:
      "User can not access active posts of moniests that are not subscribed",
    Moniest_GetMoniestPosts_InvalidParam: "Get moniest posts invalid params",
    Moniest_GetMoniestPosts_ServerErrorGetPosts:
      "Server error on getting posts of moniest",
    Moniest_GetMoniest_NoMoniest: "Not any moniest exist",
    Moniest_GetMoniest_ServerErrorGetMoniest: "Server error on getting moniest",
    Moniest_GetPayoutInfo_PayoutInfoNotFound:
      "Moniest does not have any payout info",
    Moniest_GetPayoutInfo_ServerErrorGetMoniest: "Server error on get moniest",
    Moniest_GetPayoutInfo_ServerErrorGetPayoutInfo:
      "Server error on getting payout infos",
    Moniest_GetStats_ServerErrorGetStats:
      "Server error on getting moniest stats",
    Moniest_GetSubscriber_InvalidParam: "Get subscribers invalid params",
    Moniest_GetSubscriber_ServerErrorGetSubscribers:
      "Server error on getting subscribed users",
    Moniest_GetUserSubscriptionInfo_ServerErrorGetSubscriptionInfo:
      "Server error on getting user subscription info",
    Moniest_SubscribeCheck_ServerErrorCheck:
      "Server error on checking moniest subscribe status",
    Moniest_Subscribe_AlreadySubscribed: "Already subscribed to moniest",
    Moniest_Subscribe_InvalidBody:
      "Subscribe to moniest request body is invalid",
    Moniest_Subscribe_ServerErrorActivateSubscription:
      "Server error on activating subscription",
    Moniest_Subscribe_ServerErrorCreateBinanceOrder:
      "Server error on creating binance payment link",
    Moniest_Subscribe_ServerErrorCreateSubscriptionDB:
      "Server error on creating subscription on DB",
    Moniest_Subscribe_ServerErrorGetSubscription:
      "Server error on getting subscription",
    Moniest_Subscribe_SubscribeOwn: "User can't subscribe to own",
    Moniest_Unsubscribe_NotSubscribed: "User is not subscribed to moniest",
    Moniest_Unsubscribe_ServerErrorGetPayoutHistory:
      "Server error on getting payout histories",
    Moniest_Unsubscribe_ServerErrorRefund: "Server error on refund user",
    Moniest_Unsubscribe_ServerErrorUnsubscribe: "Server error on unsubscribe",
    Moniest_Unsubscribe_UnsubscribeOwn: "User can't unsubscribe from own",
    Moniest_UpdateMoniest_InvalidBio: "Bio is invalid",
    Moniest_UpdateMoniest_InvalidBody:
      "Update moniest profile request body is invalid",
    Moniest_UpdateMoniest_InvalidDescription: "Description is invalid",
    Moniest_UpdateMoniest_InvalidFee: "Fee is invalid",
    Moniest_UpdateMoniest_InvalidSubscriptionMessage:
      "Subscription message is invalid",
    Moniest_UpdateMoniest_ServerErrorGetSubscriptionInfo:
      "Server error on getting subscription info",
    Moniest_UpdateMoniest_ServerErrorGetUser: "Server error on getting user",
    Moniest_UpdateMoniest_ServerErrorUpdateMoniest:
      "Server error on updating moniest",
    Moniest_UpdateMoniest_ServerErrorUpdateSubscriptionInfo:
      "Server error on updating subscription info",
    Moniest_UpdatePayout_InvalidBody:
      "Update moniest payout info request body is invalid",
    Moniest_UpdatePayout_ServerErrorGetMoniest:
      "Server error on getting moniest",
    Moniest_UpdatePayout_ServerErrorUpdatePayoutInfo:
      "Server error on updating payout info",
    Payment_CheckBinanceTransaction_ServerErrorGetTransaction:
      "Server error on getting transaction data",
    Payment_CheckBinanceTransaction_ServerErrorQueryTransaction:
      "Server error on query transaction",
    Payment_CheckBinanceTransaction_ServerErrorUpdateStatusFail:
      "Server error on updating transaction status [fail case]",
    Payment_CheckBinanceTransaction_ServerErrorUpdateStatusSuccess:
      "Server error on updating transaction status [success case]",
    Payment_CheckBinanceTransaction_TransactionIDNotFound:
      "TransactionID not found",
    Post_CreatePost_InvalidBody: "Create post request body is invalid",
    Post_CreatePost_InvalidCurrency: "Currency is invalid",
    Post_CreatePost_InvalidCurrencyPrice: "Currency price is invalid",
    Post_CreatePost_InvalidDuration: "Duration is invalid",
    Post_CreatePost_InvalidStop: "Stop is invalid",
    Post_CreatePost_InvalidTargets: "Targets are invalid",
    Post_CreatePost_ServerErrorCreateDescription:
      "Server error on creating description",
    Post_CreatePost_ServerErrorCreatePost: "Server error on creating post",
    Post_CreatePost_ServerErrorPostPhotoUpload:
      "Server error on uploading post photos (maybe invalid format)",
    User_GetStats_ServerErrorGetStats: "Server error on getting user stats",
    User_GetSubscriptions_InvalidParam:
      "Get user subscriptions request param is invalid",
    User_GetSubscriptions_ServerErrorGetSubscriptions:
      "Server error on get user subscriptions",
    User_GetUser_ServerErrorGetUser: "Server error on getting user",
  },
  general_info: {
    operation_fee_percentage: 18,
  },
};
