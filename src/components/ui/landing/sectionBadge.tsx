import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@mui/system";

export const SectionBadge = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const theme = useTheme();
  return (
    <Box
      width="fit-content"
      padding="8px 24px"
      sx={{ background: "#ebf6f4", borderRadius: "100px" }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          color: theme.palette.secondary.main,
          ".MuiSvgIcon-root": { color: theme.palette.secondary.main },
        }}
      >
        {children}
        <Box
          component="h1"
          fontSize="1rem"
          sx={{ textShadow: `0.4px 0px ${theme.palette.secondary.main}` }}
        >
          {title}{" "}
        </Box>
      </Stack>
    </Box>
  );
};
