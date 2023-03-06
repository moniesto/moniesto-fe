import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import localStorageService, { StorageState, ThemeMode } from '../../services/localStorageService'
import httpService from '../../services/httpService'

// Define the initial state using that type
const initialState: StorageState = localStorageService.getStorage()


const setStorage = (key: string, value: any) => {
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
      return state
    },
    setToken: (state, action: PayloadAction<string>) => {
      setStorage("token", action.payload)
      httpService.createInstance(action.payload);
      state.token = action.payload;
      return state

    },
  },
})

export const { setThemeMode, setToken } = storageSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default storageSlice.reducer