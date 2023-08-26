import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";
import { SubscriptionInfoResponse } from "../../interfaces/requests";

// Define the initial state using that type
type initialStateType = {
  account: User | null;
  isMyAccount: boolean;
  subscriptionInfo: SubscriptionInfoResponse | null;
};

const initialState: initialStateType = {
  account: null,
  isMyAccount: false,
  subscriptionInfo: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User | null>) => {
      state.account = action.payload;
      state.subscriptionInfo = null;
      return state;
    },
    setSubscriptionInfo: (
      state,
      action: PayloadAction<SubscriptionInfoResponse | null>
    ) => {
      state.subscriptionInfo = action.payload;
      return state;
    },
    setIsMyAccount: (state, action: PayloadAction<boolean>) => {
      state.isMyAccount = action.payload;
      return state;
    },
  },
});

export const { setProfile, setSubscriptionInfo, setIsMyAccount } =
  profileSlice.actions;

export default profileSlice.reducer;
