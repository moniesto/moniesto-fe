import { Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

type PageProp = {
  children: ReactNode;
};

const Fly = ({ children }: PageProp) => {
  useEffect(() => {
    console.log("ref :", children);
  }, [children]);
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
