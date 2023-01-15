export const emptyUser:User={
id:"",
username:"",
name:"",
surname:"",
email:"",
}

export interface User {
    id: string
    name: string
    surname: string
    username: string
    email: string
    email_verified?: boolean
    location?: string
    profile_photo?: string
    profile_photo_thumbnail?: string
    background_photo?: string
    background_photo_thumbnail?: string
    created_at?: Date
    updated_at?: Date
    moniest?: Moniest
}
export interface Moniest {
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

