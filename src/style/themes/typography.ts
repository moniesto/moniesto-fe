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
      letterSpacing: "0.02em",
    },
    h5: {
      fontSize: "0.895em",
      color: theme.textMain,
      fontWeight: 500,
      // lineHeight: 0.75
      letterSpacing: "0.02em",
    },
    h4: {
      fontSize: "1em",
      color: theme.textMain,
      fontWeight: 600,
      marginTop: "0",
      letterSpacing: "0.02em",
    },
    h3: {
      fontSize: "1.25em",
      color: theme.textMain,
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    h2: {
      fontSize: "1.5em ",
      color: theme.textMain,
      fontWeight: 700,
      letterSpacing: "0.04em",
    },
    h1: {
      fontSize: "2.125em",
      color: theme.textMain,
      fontWeight: 900,
      letterSpacing: "0.03em",
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
      opacity: 0.8,
    },
    button: {
      textTransform: "capitalize",
    },
  };
}
