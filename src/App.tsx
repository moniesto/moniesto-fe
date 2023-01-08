import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import Router from "./route/router";
import themes from "./style/themes";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import httpService from "./services/httpService";
import { useEffect, useState } from "react";
import Toast from "./components/shared/common/toast";
import localStorageService from "./services/localStorageService";
import { setUser } from "./store/slices/userSlice";
import toastService from "./services/toastService";
import { User } from "./interfaces/user";
import { openToast } from "./store/slices/toastSlice";
import { setToken } from "./store/slices/localStorageSlice";
import configService from "./services/configService";

function App() {
  const mode = useAppSelector((state) => state.storage.theme_mode);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    httpService.setDispatch(dispatch);
    toastService.setDispatch(dispatch);
    configService.initialize();

    if (!localStorageService.getStorage().token) {
      setLoading(false);
      return;
    }

    const decoded = localStorageService.getDecodedToken();
    if (!decoded.user.id) {
      dispatch(openToast({ message: "Need authorization", severity: "error" }));
      dispatch(setToken(""));
      setLoading(false);
      return;
    }

    httpService
      .get<User>("/users/" + decoded.user.username)
      .then((res) => {
        dispatch(setUser(res));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={themes(mode)}>
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
