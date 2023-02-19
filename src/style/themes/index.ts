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
  const themeOption = {
    mode: mode,
    colors: color,
    textMain: mode === 'light' ? color.lightTextMain : color.darkTextMain,
    appBar: mode === 'light' ? color.darkTextMain : color.primaryMain,
    borderRadius: {
      small: "6px",
      main: "10px",
      large: "16px"
    },
    card: {
      border: `1px solid ${mode === "light" ? color.background800 : color.darkBackground800} !important`,
      borderRadius: 10,
      background: mode === "light" ? color.background500 : color.darkBackground500 + " !important",
    }

  };

  const themeOptions: any = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
    shape: {
      borderRadius: 10,
    },
    mixins: {
      card: {
        ...themeOption.card
      }
    }
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
