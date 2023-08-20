import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BeMoniestReq } from "../../interfaces/requests";

// Define the initial state using that type
type initialStateType = {
  data: BeMoniestReq;
  activeStep: number;
  stepCount: number;
};

const initialState: initialStateType = {
  data: {
    bio: "",
    binance_id: "",
    description: "",
    fee: 0,
    message: "",
  },
  activeStep: 1,
  stepCount: 4,
};

export const beMoniestSlice = createSlice({
  name: "be-moniest",
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<Partial<BeMoniestReq | null>>) => {
      if (action.payload) state.data = { ...state.data, ...action.payload };
      state.activeStep += 1;
      return state;
    },
    backStep: (state, action: PayloadAction) => {
      state.activeStep -= 1;
      return state;
    },
    resetMoniestStepper: (state, action: PayloadAction) => {
      state = initialState;
      return state;
    },
  },
});

export const { nextStep, backStep, resetMoniestStepper } =
  beMoniestSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default beMoniestSlice.reducer;
