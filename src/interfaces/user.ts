export const emptyUser: User = {
    id: "",
    username: "",
    name: "",
    surname: "",
    email: "",
}

export interface User {
    id: string
    name: string
    surname: string
    username: string
    email: string
    email_verified?: boolean
    location?: string
    background_photo_link?: string,
    background_photo_thumbnail_link?: string,
    profile_photo_link?: string,
    profile_photo_thumbnail_link?: string
    created_at?: Date
    updated_at?: Date
    moniest?: Moniest
}
export interface Moniest {
    id: string
    bio: string
    description: string
    score: number
    subscription_info: SubscriptionInfo
}
export interface SubscriptionInfo {
    fee: number
    message: string
    updated_at: Date
}

