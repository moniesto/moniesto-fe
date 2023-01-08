import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

type Props = { children: ReactNode; path: string };

const Navigator = ({ children, path }: Props) => {
  const navigate = useNavigate();
  return (
    <Typography
      sx={{ cursor: "pointer" }}
      component="span"
      onClick={() => navigate(path)}
    >
      {children}
    </Typography>
  );
};

export default Navigator;
