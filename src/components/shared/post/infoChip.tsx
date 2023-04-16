import { PercentOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { ReactNode } from "react";

type InfoChipProps = {
  title: string;
  startAdornment?: ReactNode;
  value: string | number;
};

export const InfoChip = ({ title, startAdornment, value }: InfoChipProps) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        border: `1px solid ${theme.palette.background[800]}`,
        padding: "6px 12px",
        borderRadius: "100px",
      }}
      spacing={1}
      direction="row"
      alignItems="center"
    >
      <Typography sx={{ opacity: 0.7 }} variant="h5">
        {title}
      </Typography>

      <Typography variant="h5">{value}</Typography>
      <Box fontSize={12}>{startAdornment}</Box>
    </Stack>
  );
};
