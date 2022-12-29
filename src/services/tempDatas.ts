import { Card } from "../interfaces/card";
import { Post } from "../interfaces/post";
import { Moniest, SubscriptionInfo, User } from "../interfaces/user";


export const TestSubscriptionInfo: SubscriptionInfo = {
    fee: 10,
    message: "test message",
    updated_at: new Date()
}

export const TestMoniest: Moniest = {
    bio: "test bio",
    description: "test description",
    score: 20,
    subscription_info: TestSubscriptionInfo
}

export const TestUser: User = {
    id: "1",
    name: "Davut",
    surname: "Turug",
    username: "davuttrg",
    email: "davutturug@gmail.com",
    email_verified: false,
    location: "Antalya",
    profile_photo: "/images/user/Avatar.png",
    profile_photo_thumbnail: "/images/user/Avatar_thumbnail.png",
    background_photo: "/images/user/profil_bg.webp",
    background_photo_thumbnail: "",
    created_at: new Date(),
    updated_at: new Date(),
    moniest: TestMoniest
}

export const TestPost: Post = {
    id: "1",
    moniest: TestUser,
    base_currency: "BTC",
    quote_currency: "USDT",
    start_price: 18.50,
    duration: new Date(),
    target1: 18.542,
    target3: 18.73,
    stop: 18.30,
    direction: "long",
    created_at: new Date(),
    description: "test Description",
    updated_at: new Date()
}
export const TestCard: Card = {
    id: "1",
    name: "Davut turug",
    last4: "5082",
    brand: "Ziraat Card"
}
export const TestCard2: Card = {
    id: "2",
    name: "Davut turug",
    last4: "4242",
    brand: "Yapikredi Card"
}

