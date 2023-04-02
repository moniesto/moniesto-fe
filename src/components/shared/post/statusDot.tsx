import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
type propTypes = {
  status: "pending" | "fail" | "success";
};

const StatusDot = ({ status }: propTypes) => {
  const [color, setColor] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    let newColor: string = "";

    switch (status) {
      case "success":
        newColor = theme.palette.success.main;
        break;
      case "fail":
        newColor = theme.palette.error.main;
        break;
      case "pending":
        newColor = theme.palette.warning.main;
        break;
    }
    setColor(newColor);
  }, [status]);

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
