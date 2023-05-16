import { Box, Container, Stack } from "@mui/material";
import { SectionBadge } from "./sectionBadge";
import { ArchitectureOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../hooks/useTranslate";

export const About = () => {
  const translate = useTranslate();

  return (
    <Box minHeight="100vh" id="about" component="section" padding="3rem 0">
      <Container maxWidth="lg">
        <Stack rowGap={{ xs: 14, md: 20 }}>
          <Box>
            <Box maxWidth="600px" margin="auto">
              <Stack spacing={3} alignItems="center" textAlign="center">
                <SectionBadge
                  title={translate("page.landing.why_moniesto.title")}
                >
                  <VisibilityOutlined></VisibilityOutlined>
                </SectionBadge>
                <Box component="h1" lineHeight={1.3}>
                  {translate("page.landing.why_moniesto.header")}
                </Box>
                <Box component="h5" sx={{ opacity: 0.7 }}>
                  {translate("page.landing.why_moniesto.message")}
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              spacing={4}
            >
              <Box width={{ xs: 240 }}>
                <img width="100%" src="images/landing/invest_hero.png" alt="" />
              </Box>
              <Box maxWidth="340px">
                <Stack spacing={3}>
                  <SectionBadge
                    title={translate("page.landing.for_investors.title")}
                  >
                    <VisibilityOutlined></VisibilityOutlined>
                  </SectionBadge>
                  <Box component="h1" lineHeight={1.4}>
                    {translate("page.landing.for_investors.header")}
                  </Box>
                  <Box component="h5" sx={{ opacity: 0.7 }}>
                    {translate("page.landing.for_investors.message")}
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction={{ xs: "column-reverse", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              columnGap={4}
            >
              <Box maxWidth="340px">
                <Stack spacing={3}>
                  <SectionBadge
                    title={translate("page.landing.for_moniest.title")}
                  >
                    <ArchitectureOutlined></ArchitectureOutlined>
                  </SectionBadge>
                  <Box component="h1" lineHeight={1.4}>
                    {translate("page.landing.for_moniest.header")}
                  </Box>
                  <Box component="h5" sx={{ opacity: 0.7 }}>
                    {translate("page.landing.for_moniest.message")}
                  </Box>
                </Stack>
              </Box>
              <Box width={{ xs: 240 }}>
                <img
                  width="100%"
                  src="images/landing/become_moniest_hero.png"
                  alt=""
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              columnGap={4}
            >
              <Box width={{ xs: 240 }}>
                <img
                  width="100%"
                  src="images/landing/algorithm_hero.png"
                  alt=""
                />
              </Box>
              <Box maxWidth="340px">
                <Stack spacing={3}>
                  <SectionBadge
                    title={translate("page.landing.scoring_algorithm.title")}
                  >
                    <VisibilityOutlined></VisibilityOutlined>
                  </SectionBadge>
                  <Box component="h1" lineHeight={1.4}>
                    {translate("page.landing.scoring_algorithm.header")}
                  </Box>
                  <Box component="h5" sx={{ opacity: 0.7 }}>
                    <Trans i18nKey="page.landing.scoring_algorithm.message"></Trans>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
