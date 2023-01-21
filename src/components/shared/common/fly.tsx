import { Typography } from "@mui/material";
import { ReactNode } from "react";

type PageProp = {
  children: ReactNode;
};

const Fly = ({ children }: PageProp) => {
  return (
    <Typography
      component="span"
      className="fly"
      sx={{
        "*>:not(input,.notFly)": {
          opacity: 0,
          animation: "fly 0.3s ease",
          animationFillMode: "forwards",
        },
      }}
    >
      {children}
    </Typography>
  );
};
export default Fly;
