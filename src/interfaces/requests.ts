import { User } from "./user"
export interface LoginResponse {
    user: User,
    token: string
}
export interface UsernameCheck {
    validity:boolean
}