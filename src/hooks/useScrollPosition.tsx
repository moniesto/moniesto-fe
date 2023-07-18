import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [position, setPosition] = useState({
    scrollY: 0,
    scrollX: 0,
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPosition({ scrollY: window.scrollY, scrollX: window.screenX });
    });
    return window.removeEventListener("scroll", () => {});
  }, []);

  return position;
};
