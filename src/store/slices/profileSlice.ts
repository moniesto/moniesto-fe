import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";

// Define the initial state using that type
type initialStateType = {
  account: User | null;
  isSubscribed: boolean;
  isMyAccount: boolean;
};

const initialState: initialStateType = {
  account: null,
  isSubscribed: false,
  isMyAccount: false,
};

export const profileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User | null>) => {
      state.account = action.payload;
      return state;
    },
    setIsSubscribed: (state, action: PayloadAction<boolean>) => {
      state.isSubscribed = action.payload;
      return state;
    },
    setIsMyAccount: (state, action: PayloadAction<boolean>) => {
      state.isMyAccount = action.payload;
      return state;
    },
  },
});

export const { setProfile, setIsSubscribed, setIsMyAccount } =
  profileSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default profileSlice.reducer;
