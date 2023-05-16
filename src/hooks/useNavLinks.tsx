import { useTranslate } from "./useTranslate";

export type ScrollPosition = "center" | "end" | "nearest" | "start";

export const useNavLinks = () => {
  const translate = useTranslate();

  const links: { id: string; name: string; position: ScrollPosition }[] = [
    {
      id: "about",
      name: translate("page.landing.links.about"),
      position: "start",
    },
    {
      id: "pricing",
      name: translate("page.landing.links.pricing"),
      position: "center",
    },
    {
      id: "faq",
      name: translate("page.landing.links.faq"),
      position: "center",
    },
    {
      id: "contact",
      name: translate("page.landing.links.contact"),
      position: "center",
    },
  ];
  return links;
};
