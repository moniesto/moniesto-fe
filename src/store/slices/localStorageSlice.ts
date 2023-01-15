import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import localStorageService, { StorageState, ThemeMode } from '../../services/localStorageService'

// Define the initial state using that type
const initialState: StorageState = localStorageService.getStorage()


const setStorage = (key: string, value: any) => {
  console.log("key :", key, "value :", value)
  localStorageService.setStorage({ ...localStorageService.getStorage(), [key]: value })
}

export const storageSlice = createSlice({
  name: 'storage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.theme_mode = action.payload;
      setStorage("theme_mode", action.payload)
    },
    setToken: (state, action: PayloadAction<string>) => {
      setStorage("token", action.payload)
      state.token = action.payload;
     
    },
  },
})

export const { setThemeMode, setToken } = storageSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default storageSlice.reducer