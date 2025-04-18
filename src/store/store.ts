import { configureStore } from "@reduxjs/toolkit";
import storageSlice from "./slices/localStorageSlice";
import toastSlice from "./slices/toastSlice";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import beMoniestSlice from "./slices/beMoniestSlice";
import globalSlice from "./slices/globalSlice";
// ...

export const store = configureStore({
  reducer: {
    storage: storageSlice,
    user: userSlice,
    toast: toastSlice,
    profile: profileSlice,
    beMoniest: beMoniestSlice,
    global: globalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
