import { Card, Stack, Typography } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

export const Disclaimer = () => {
  const translate = useTranslate();

  return (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <Stack mt={2} p={3} spacing={4}>
        <Typography variant="h2" sx={{ opacity: 0.9 }}>
          {translate("navigation.disclaimer")}
        </Typography>
        <Typography>{translate("component.not_advice.message")}</Typography>
      </Stack>
    </Card>
  );
};
