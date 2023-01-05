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

function App() {
  const mode = useAppSelector((state) => state.storage.theme_mode);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    httpService.setDispatch(dispatch);
    toastService.setDispatch(dispatch);
    if (localStorageService.getStorage().token) {
      const decoded = localStorageService.getDecodedToken();
      if (!decoded.user.id) {
        setLoading(false);
        return;
      }
      httpService
        .get("/users/" + decoded.user.username)
        .then(() => {
          dispatch(
            setUser({
              id: "89fb044f-6fe0-4ad2-a675-63366c86ae76",
              name: "test",
              surname: "test",
              username: "testt",
              email: "davutturug@teknodev.biz",
              email_verified: false,
            })
          );
        })
        .finally(() => setLoading(false));
    } else
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
