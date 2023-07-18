import { Typography, useTheme } from "@mui/material";
type propTypes = {
  color?: string;
  first_letter?: string;
  sx?: {};
  onClick?: () => void;
};

const BrandText = ({ color, first_letter, sx, onClick }: propTypes) => {
  const theme = useTheme();
  return (
    <Typography
      onClick={onClick}
      letterSpacing={6}
      color={color || theme.palette.common.white}
      sx={{
        textShadow: "0px 1px, 1px 0px, 1px 1px",
        "&::first-letter": {
          color: first_letter || theme.palette.secondary.main,
        },
        ...sx,
        cursor: onClick ? "pointer" : "unset",
      }}
      variant="h1"
    >
      moniesto
    </Typography>
  );
};

export default BrandText;
