import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import localStorageService, { StorageState } from '../../services/localStorageService'

// Define the initial state using that type
const initialState: StorageState = localStorageService.getStorage()
type themeMode = "light" | "dark"


export const storageSlice = createSlice({
  name: 'storage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<themeMode>) => {
      state.theme_mode = action.payload;
      localStorageService.setStorage({ ...localStorageService.getStorage(), theme_mode: action.payload })
    },
  },
})

export const { setThemeMode } = storageSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default storageSlice.reducer