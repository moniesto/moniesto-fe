import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/tr";
import "dayjs/locale/en";

import { useAppSelector } from "../../../store/hooks";

export const DateTimeProvider = ({ children }: { children: ReactNode }) => {
  const language = useAppSelector((state) => state.storage.language);

  return (
    <LocalizationProvider adapterLocale={language} dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};
