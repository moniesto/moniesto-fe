import { Box, Container, Stack } from "@mui/material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../hooks/useTranslate";
import { useTheme } from "@mui/system";
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";

export const WhoWeAre = () => {
  const translate = useTranslate();
  const theme = useTheme();

  return (
    <Box id="who_we_are" component="section">
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-evenly"
        >
          <Box flex={1} maxWidth={400}>
            <Stack spacing={3}>
              <Box
                p={2}
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  display: "grid",
                  placeContent: "center",
                  background: "var(--theme-secondary-bg)",
                }}
              >
                <ArrowCircleUp
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.secondary.main,
                  }}
                ></ArrowCircleUp>
              </Box>
              <Box component="h1" lineHeight={1.4}>
                {translate("page.landing.who_we_are.title")}
              </Box>
              <Box component="h4" sx={{ opacity: 0.7 }}>
                <Trans i18nKey="page.landing.who_we_are.message"></Trans>
              </Box>
            </Stack>
          </Box>
          <Box flex={1} maxWidth={400} pt={6}>
            <Stack spacing={3}>
              <Box
                p={2}
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  display: "grid",
                  placeContent: "center",
                  background: theme.palette.warning.light,
                }}
              >
                <ArrowCircleDown
                  sx={{
                    fontSize: "2rem",
                    color: theme.palette.warning.dark,
                  }}
                ></ArrowCircleDown>
              </Box>
              <Box component="h1" lineHeight={1.4}>
                {translate("page.landing.who_we_are_not.title")}
              </Box>
              <Box component="h4" sx={{ opacity: 0.7 }}>
                <Trans i18nKey="page.landing.who_we_are_not.message"></Trans>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
