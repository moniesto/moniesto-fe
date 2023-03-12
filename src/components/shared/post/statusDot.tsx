import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
type propTypes = {
  date: string;
};

const StatusDot = ({ date }: propTypes) => {
  const [color, setColor] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    let newColor: string = "";
    let status = 0;
    if (new Date(date) < new Date()) {
      status = 2;
    } else {
      status = 1;
    }

    switch (status) {
      case 1:
        newColor = theme.palette.success.main;
        break;
      case 2:
        newColor = theme.palette.error.main;
        break;
    }
    setColor(newColor);
  }, [date]);

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
