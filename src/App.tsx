import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import Router from "./route/router";
import themes from "./style/themes";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import httpService from "./services/httpService";
import { useEffect } from "react";
import Toast from "./components/shared/common/toast";
import localStorageService from "./services/localStorageService";
import { setUser } from "./store/slices/userSlice";

function App() {
  const mode = useAppSelector((state) => state.storage.theme_mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    httpService.setDispatch(dispatch);
    if(localStorageService.getStorage().token){
      // !TODO verify user
      // dispatch(setUser())
    }
  }, []);

  return (
    <ThemeProvider theme={themes(mode)}>
      <CssBaseline />
      <RouterProvider router={Router} />
      <Toast />
    </ThemeProvider>
  );
}

export default App;
