import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
export type GlobalStateType = {
  inMaintenance: boolean;
};

const initialState: GlobalStateType = {
  inMaintenance: false,
};

export const globalSlice = createSlice({
  name: "global",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInMaintenance: (state, action: PayloadAction<boolean>) => {
      state.inMaintenance = action.payload;
      return state;
    },
  },
});

export const { setInMaintenance } = globalSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default globalSlice.reducer;
