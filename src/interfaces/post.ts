import { User } from "./user";

type EntryPosition = "long" | "short";

export interface Post {
  id: string;
  user: User;
  currency: string;
  start_price: number;
  duration: Date | string;
  pnl: number;
  roi: number;
  take_profit: number;
  target1?: number;
  target2?: number;
  target3?: number;
  stop: number;
  direction: EntryPosition;
  created_at: Date;
  description: string;
  updated_at: Date;
  finished: boolean;
  hit_price?: number;
  status: "pending" | "fail" | "success";
  market_type: MarketTypeValues;
  leverage: number;
}

export enum MarketTypeKeys {
  Futures = "futures",
  Spot = "spot",
}

export type MarketTypeValues = `${MarketTypeKeys}`;
