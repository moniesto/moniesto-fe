import { Box, Container, Stack } from "@mui/material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../hooks/useTranslate";
import { useTheme } from "@mui/system";

export const Pricing = () => {
  const translate = useTranslate();
  const theme = useTheme();

  return (
    <Box
      sx={{ background: "var(--theme-secondary-bg)" }}
      id="pricing"
      component="section"
    >
      <Container maxWidth="lg">
        <Stack padding="2rem">
          <Box
            component="h1"
            sx={{ color: theme.palette.secondary.main, marginY: 1 }}
          >
            {translate("page.landing.pricing.title")}
          </Box>
          <Box component="h3" marginY={1}>
            {translate("page.landing.pricing.header")}
          </Box>
          <Box component="h4" marginY={1} sx={{ opacity: 0.7 }}>
            <Trans i18nKey="page.landing.pricing.message"></Trans>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
