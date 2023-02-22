import { Card, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

export const CardSettings = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        paddingBottom: 2,
        background: theme.palette.background[500],
      }}
    >
      <Typography p={3} variant="h4"> Card settings</Typography>
    </Card>
  );
};
