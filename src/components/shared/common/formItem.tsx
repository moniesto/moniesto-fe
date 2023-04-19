import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

export const FormItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Box mt={1}>
      <Typography pb={0.5} sx={{ opacity: 0.6 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
