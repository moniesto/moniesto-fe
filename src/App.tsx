import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import Router from "./route/router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import httpService from "./services/httpService";
import { useCallback, useEffect, useState } from "react";
import Toast from "./components/shared/common/toast";
import localStorageService, {
  DecodeToken,
} from "./services/localStorageService";
import { setUser } from "./store/slices/userSlice";
import toastService from "./services/toastService";
import { openToast } from "./store/slices/toastSlice";
import { initLanguage, setToken } from "./store/slices/localStorageSlice";
import configService from "./services/configService";
import api from "./services/api";

function App() {
  const storage = useAppSelector((state) => state.storage);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const getUserByUserName = useCallback(async () => {
    const decoded = (await localStorageService
      .getDecodedToken()
      .catch(console.error)) as DecodeToken;

    if (!decoded.user.id) {
      dispatch(openToast({ message: "Need authorization", severity: "error" }));
      dispatch(setToken(""));
      setLoading(false);
      return;
    }

    api.user
      .user_by_username(decoded.user.username)
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch((_) => {
        dispatch(setToken(""));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    httpService.setDispatch(dispatch);
    toastService.setDispatch(dispatch);
    configService.initialize();
    dispatch(initLanguage());

    if (!localStorageService.getStorage().token) {
      setLoading(false);
      return;
    }

    getUserByUserName();
  }, [dispatch, getUserByUserName]);

  return (
    <ThemeProvider
      theme={configService.getTheme(storage.theme_mode, storage.language)}
    >
      <CssBaseline />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <RouterProvider router={Router} />
      )}
      <Toast />
    </ThemeProvider>
  );
}

export default App;
