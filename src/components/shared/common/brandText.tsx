import { Typography, useTheme } from "@mui/material";
type propTypes = {
  color?: string;
  first_letter?: string;
  sx?: {};
};

const BrandText = ({ color, first_letter, sx }: propTypes) => {
  const theme = useTheme();
  return (
    <Typography
      letterSpacing={6}
      color={color || theme.palette.common.white}
      sx={{
        textShadow: "0px 1px, 1px 0px, 1px 1px",
        "&::first-letter": {
          color: first_letter || theme.palette.secondary.main,
        },
        ...sx,
      }}
      variant="h1"
    >
      moniesto
    </Typography>
  );
};

export default BrandText;
