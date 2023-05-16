import { ScrollPosition } from "./useNavLinks";

export const useNavigateScroll = () => {
  const navigateScroll = (id: string, position: ScrollPosition = "center") => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: position,
        inline: position,
      });
    }
  };
  return navigateScroll;
};
