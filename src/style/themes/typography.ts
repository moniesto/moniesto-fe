/**
 * Typography used in theme
 * @param {JsonObject} theme theme object
 */

export default function themeTypography(theme: any) {
  return {
    fontFamily: theme?.fontFamily,
    h6: {
      fontWeight: 500,
      color: theme.textMain,
      fontSize: "0.75em",
      // lineHeight: 1.05
    },
    h5: {
      fontSize: "0.895em",
      color: theme.textMain,
      fontWeight: 500,
      // lineHeight: 0.75
    },
    h4: {
      fontSize: "1em",
      color: theme.textMain,
      fontWeight: 600,
      marginTop: "0",
    },
    h3: {
      fontSize: "1.25em",
      color: theme.textMain,
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5em ",
      color: theme.textMain,
      fontWeight: 700,
    },
    h1: {
      fontSize: "2.125em",
      color: theme.textMain,
      fontWeight: 900,
    },
    subtitle1: {
      fontSize: "0.875em",
      fontWeight: 500,
      color: theme.textMain,
    },
    subtitle2: {
      fontSize: "0.75em",
      fontWeight: 400,
      color: theme.textMain,
    },
    caption: {
      fontSize: "0.75em",
      color: theme.textMain,
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
      lineHeight: "1.334em",
      color: theme?.textMain,
      fontSize: "0.85rem",
    },
    body2: {
      letterSpacing: "0em",
      fontWeight: 400,
      lineHeight: "1.5em",
      color: theme.textMain,
      opacity: 0.7,
    },
    button: {
      textTransform: "capitalize",
    },
  };
}
