import { User } from "./user";

type EntryPosition = "long" | "short";

export interface Post {
  id: string;
  user: User;
  currency: string;
  start_price: number;
  duration: Date | string;
  target1: number;
  target2: number;
  target3: number;
  stop: number;
  direction: EntryPosition;
  created_at: Date;
  description: string;
  updated_at: Date;
  score: number;
  finished: boolean;
  status: "pending" | "fail" | "success";
  market_type: "futures" | "spot";
  leverage: number;
}
