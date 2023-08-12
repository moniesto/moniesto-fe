import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
type propTypes = {
  status: "pending" | "fail" | "success";
};

const StatusDot = ({ status }: propTypes) => {
  const theme = useTheme();

  const color = useMemo(() => {
    switch (status) {
      case "success":
        return theme.palette.success.main;
      case "fail":
        return theme.palette.error.main;
      case "pending":
        return theme.palette.warning.main;
    }
  }, [status, theme]);

  return (
    <Box
      sx={{
        width: "10px",
        height: "10px",
        background: color,
        borderRadius: "100%",
        transform: "translate(-5px, -10px)",
      }}
    ></Box>
  );
};

export default StatusDot;
