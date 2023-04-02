import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t } = useTranslation();
  const translate = (key: string, options?: {}) => t(key, options!);
  return translate;
};
