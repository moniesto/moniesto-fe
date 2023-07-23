import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { ReactNode } from "react";

export const CoverImageBox = ({
  image,
  children,
}: {
  image: string;
  children: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Box
      height={{ xs: "8.2rem", md: "9.4rem" }}
      borderBottom={`1px solid ${theme.palette.background[800]}`}
      sx={{
        background: theme.palette.background[200],
        backgroundImage: `url(${image}) !important`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderTopLeftRadius: theme.palette.borderRadius.main,
        borderTopRightRadius: theme.palette.borderRadius.main,
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};
