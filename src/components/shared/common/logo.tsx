import { Box, SxProps, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type Variants = "logo-medium" | "logo-small";
export type ThemeMode = "light" | "dark";

const Logo = ({
  sx,
  onClick,
  variant = "logo-medium",
  mode,
  navigateHome = false,
  width,
}: {
  sx?: SxProps;
  onClick?: () => void;
  variant?: Variants;
  mode?: ThemeMode;
  navigateHome?: boolean;
  width: number;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigateHome && navigate("/timeline");
    onClick?.();
  };

  return (
    <Box
      width={width}
      sx={{ cursor: onClick || navigateHome ? "pointer" : "unset", ...sx }}
      onClick={handleClick}
    >
      <img
        width="100%"
        src={`./images/${variant}-${
          mode ? mode : theme.palette.mode === "dark" ? "light" : "dark"
        }.png`}
        alt="logo"
      ></img>
    </Box>
  );
};
export default Logo;
