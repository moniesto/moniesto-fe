import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t } = useTranslation();
  const translate = useCallback(
    (key: string, options?: {}) => t(key, options!),
    [t]
  );

  return translate;
};
