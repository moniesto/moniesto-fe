import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

type Props = { children: ReactNode; path: string; handleOnClick?: () => void };

const Navigator = ({ children, path, handleOnClick }: Props) => {
  const navigate = useNavigate();
  return (
    <Typography
      sx={{ cursor: "pointer" }}
      component="span"
      onClick={() => {
        handleOnClick && handleOnClick();
        navigate(path);
      }}
    >
      {children}
    </Typography>
  );
};

export default Navigator;
