import { Box } from "@mui/material";
import { ReactNode } from "react";

export const FormItem = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Box mt={1}>
      <Box pb={0.5} sx={{ opacity: 0.6, fontSize: "0.75rem" }}>
        {title}
      </Box>
      {children}
    </Box>
  );
};
