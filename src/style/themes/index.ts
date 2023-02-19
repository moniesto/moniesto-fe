import { createTheme } from "@mui/material/styles";

// assets

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";
import colors from './_themes-vars.module.scss';


export const theme = (mode: string) => {
  const color = colors;
  const themeOption = {
    mode: mode,
    colors: color,
    borderRadius: "15px",
    textMain: mode === 'light' ? color.lightTextMain : color.darkTextMain,
    appBar: mode === 'light' ? color.darkTextMain : color.primaryMain,
    backgroundPrimary: mode === 'light' ? color.backgroundLightPrimary : color.backgroundDarkPrimary,
    backgroundSecondary: mode === 'light' ? color.backgroundLightSecondary : color.backgroundDarkSecondary,
    sectionPrimary: mode === 'light' ? color.darkTextMain : color.lightTextMain,
  };

  const themeOptions: any = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
