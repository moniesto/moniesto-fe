import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

export const FormItem = ({
  title,
  children,
  sx,
}: {
  title: ReactNode;
  children: ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Box mt={1} sx={sx}>
      <Box pb={0.5} sx={{ opacity: 0.6, fontSize: "0.75rem" }}>
        {title}
      </Box>
      {children}
    </Box>
  );
};
