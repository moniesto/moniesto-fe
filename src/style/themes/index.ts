import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";

// assets

// project imports
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";
import colors from './_themes-vars.module.scss';


export const theme = (mode: string) => {
  const color = colors;
  console.log("color :", color)
  const themeOption = {
    mode: mode,
    colors: color,
    textMain: mode === 'light' ? color.lightTextMain : color.darkTextMain,
    appBar: mode === 'light' ? color.darkTextMain : color.primaryMain,
    backgroundPrimary: mode === 'light' ? color.backgroundLightPrimary : color.backgroundDarkPrimary,
    backgroundSecondary: mode === 'light' ? color.backgroundLightSecondary : color.backgroundDarkSecondary,
    sectionPrimary: mode === 'light' ? color.darkTextMain : color.lightTextMain,
    borderRadius: {
      small: "6px",
      main: "10px",
      large: "16px"
    },
  };

  const themeOptions: any = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
    shape: {
      borderRadius: 10,
    },
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
