import { Card, Stack, Typography } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { Trans } from "react-i18next";

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
          {translate("component.legals.disclaimer")}
        </Typography>
        <Typography component="p">
          <Trans i18nKey="component.not_advice.message"></Trans>
        </Typography>
      </Stack>
    </Card>
  );
};
