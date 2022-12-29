import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setThemeMode } from "../../../store/slices/localStorageSlice";

const ThemeModeButton = () => {
  const mode = useAppSelector((state) => state.storage.theme_mode);
  const dispatch = useAppDispatch();

  const handleChangeMode = () => {
    dispatch(setThemeMode(mode == "dark" ? "light" : "dark"));
  };

  return (
    <IconButton
      sx={{ margin: "0 10px" }}
      disableRipple
      onClick={handleChangeMode}
    >
      {mode == "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
export default ThemeModeButton;
