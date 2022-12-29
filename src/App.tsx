import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import Router from "./route/router";
import themes from "./style/themes";
import { useAppSelector } from "./store/hooks";

function App() {
  const mode = useAppSelector((state) => state.storage.theme_mode);
  return (
    <ThemeProvider theme={themes(mode)}>
      <CssBaseline />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
