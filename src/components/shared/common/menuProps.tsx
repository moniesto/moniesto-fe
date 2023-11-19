import { PaperProps } from "@mui/material";

export const MenuProps: Partial<PaperProps> = {
  elevation: 0,
  sx: {
    fontSize: "1.06em",
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 45,
      height: 45,
      ml: -0.5,
      mr: 1,
    },

    " .MuiSvgIcon-root": {
      fontSize: "1.45rem",
      width: "0.95em",
      height: "0.95em",
    },
    " .MuiMenuItem-root": {
      padding: "10px 16px",
      fontSize: "1rem",
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
      borderTop: "1px solid",
      borderLeft: "1px solid",
    },
  },
};
