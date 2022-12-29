import { User } from "./user"

type EntryPosition = "long" | "short"

export interface Post {
    id: string
    moniest: User,
    base_currency: string
    quote_currency: string
    start_price: number
    duration: Date
    target1: number
    target2?: number
    target3?: number
    stop?: number
    direction: EntryPosition
    created_at: Date
    description: string
    updated_at: Date
}
