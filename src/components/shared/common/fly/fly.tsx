import { Box, SxProps } from "@mui/material";
import { ReactNode, useEffect } from "react";
import "./style.scss";

const Fly = ({ children }: { children: JSX.Element }) => {
  useEffect(() => {
    const nodeList = document.querySelectorAll(".fly__item");
    let elements = Array.from(nodeList) as HTMLElement[];

    elements.forEach((element, i) => {
      element.style.animationDelay = i * 40 + "ms";
    });
  }, []);

  return children || <></>;
};

type FlyItemProp = {
  children: ReactNode;
  sx?: SxProps;
};

const FlyItem = ({ children, sx }: FlyItemProp) => {
  return (
    <Box sx={sx} component="span" className="fly__item">
      {children}
    </Box>
  );
};

Fly.Item = FlyItem;

export default Fly;
