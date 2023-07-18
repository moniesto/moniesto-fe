import { Box, Card, Container, Stack } from "@mui/material";
import { SectionBadge } from "./sectionBadge";
import { ArchitectureOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../hooks/useTranslate";

export const About = () => {
  const translate = useTranslate();

  return (
    <Box minHeight="100vh" id="about" component="section" padding="0 0 3rem">
      <Box
        sx={{
          background: "#22d4b326",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            padding="80px 0 "
            flexDirection="row"
            gap={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Stack
              sx={{ background: "white" }}
              flex={1}
              borderRadius="10px"
              gap={3}
              alignItems="center"
              minWidth={320}
              padding={4}
              boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            >
              <Box>
                <Box fontSize={30} component="h1">
                  Moniest'ları Keşfet
                </Box>
              </Box>
              <Box height={260}>
                <img
                  width="100%"
                  height="100%"
                  src="./images/landing/new/vector-explore.svg"
                  alt="vector-explore"
                />
              </Box>

              <Box>
                <Box component="h3" textAlign="center" lineHeight={1.6}>
                  Keşfet sayfasından puanlarına göre sıralanmış Moniest'ları
                  bul, kendine yakın hissettiğine abone ol
                </Box>
              </Box>
            </Stack>
            <Stack
              sx={{ background: "white" }}
              flex={1}
              borderRadius="10px"
              gap={3}
              alignItems="center"
              minWidth={320}
              padding={4}
              boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            >
              <Box>
                <Box fontSize={30} component="h1">
                  Analizleri Gör
                </Box>
              </Box>
              <Box height={260}>
                <img
                  width="100%"
                  height="100%"
                  src="./images/landing/new/vector-crypto-invest.svg"
                  alt="vector-crypto-invest"
                />
              </Box>

              <Box>
                <Box component="h3" textAlign="center" lineHeight={1.6}>
                  Abone olduğun Moniest'lerin analizinden geçen kripto
                  paralardan, hangisine yatırım yapacağın hakkında bilgi sahibi
                  ol
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Stack
          overflow="hidden"
          mt={10}
          borderRadius="10px"
          gap={3}
          alignItems="center"
          padding={4}
          flexDirection="row"
          boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        >
          <Box flex={2}>
            <Box fontSize={35} lineHeight="42px" component="h1">
              Analizlerine Güveniyor Musun?
            </Box>
            <Box fontSize={26} lineHeight="30px" component="h2">
              Kendi ücretini belirle ve para kazanmaya başla
            </Box>
            <Box component="h3" lineHeight={1.6}>
              Kayıt olduktan sonra birkaç adımda Moniest olabilirsin. <br />
            </Box>
          </Box>
          <Box position="relative" flex={1} height={300}>
            <Box
              maxWidth={320}
              minWidth={90}
              position="absolute"
              bottom={{ xs: -120, md: -50 }}
              right={{ md: 0, xs: -10 }}
            >
              <img
                width="100%"
                height="100%"
                src="./images/landing/new/vector-earn-money.svg"
                alt="vector-crypto-invest"
              />
            </Box>
          </Box>
        </Stack>

        {/* <Stack rowGap={{ xs: 14, md: 20 }}>
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
        </Stack> */}
      </Container>
    </Box>
  );
};
