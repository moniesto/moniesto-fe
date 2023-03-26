import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import localStorageService, { StorageState, ThemeMode } from '../../services/localStorageService'
import httpService from '../../services/httpService'
import configService from '../../services/configService';



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
    changeLanguage: (state, action: PayloadAction<string>) => {
      const languages = configService.getAvailableLanguages()
      let language = "en"
      if (languages.includes(action.payload)) {
        language = action.payload;
      }
      state.language = language;
      configService.changeLanguage(language);
      setStorage("language", language)
      return state
    },
  },
})

export const { setThemeMode, setToken, changeLanguage } = storageSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default storageSlice.reducer