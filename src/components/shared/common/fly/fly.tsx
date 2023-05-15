import { Box } from "@mui/material";
import { useEffect } from "react";
import "./style.scss";

type PageProp = {
  children: JSX.Element;
};

const Fly = ({ children }: PageProp) => {
  useEffect(() => {
    const nodeList = document.querySelectorAll(".fly__item");
    let elements = Array.from(nodeList) as HTMLElement[];

    elements.forEach((element, i) => {
      element.style.animationDelay = i * 40 + "ms";
    });
  }, []);

  return children || <></>;
};

const FlyItem = ({ children }: PageProp) => {
  return (
    <Box component="span" className="fly__item">
      {children}
    </Box>
  );
};

Fly.Item = FlyItem;

export default Fly;
