import { Box, Card, Container, Stack } from "@mui/material";
import { SectionBadge } from "./sectionBadge";
import {
  ArchitectureOutlined,
  DoneAllOutlined,
  GroupOutlined,
  HowToRegOutlined,
  PriceCheckOutlined,
  RocketLaunchOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../hooks/useTranslate";

export const About = () => {
  const translate = useTranslate();

  return (
    <Box mt={-6} minHeight="100vh" id="about" component="section">
      <Box sx={{ background: "#26283d" }}>
        <Box padding="6rem 0 3rem">
          <Container maxWidth="lg">
            <Stack
              width="100%"
              color="white"
              textAlign="center"
              alignItems="center"
            >
              <Box
                letterSpacing={2}
                fontSize={40}
                lineHeight="50px"
                mb={0}
                component="h1"
                sx={{
                  backgroundImage: "linear-gradient(to left, white, #22d4b3)",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              >
                Moniesto'yu Keşfet
              </Box>
              <Box
                fontSize={24}
                sx={{ opacity: 0.9, maxWidth: 820 }}
                lineHeight="42px"
                component="h2"
                letterSpacing={1}
              >
                Kriptopara analizlerini paylaşan moniest'lar ile kriptopara
                borsasına ilgi duyan insanların bir araya geldiği platform
              </Box>
            </Stack>

            <Stack mt={10} gap={5} direction="row" flexWrap="wrap">
              <Stack flexWrap="wrap" flex={1} gap={3} flexDirection="row">
                <Stack
                  minWidth={300}
                  flex={1}
                  padding={2.3}
                  borderRadius={1}
                  sx={{ background: "white" }}
                  boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                >
                  <Stack alignItems="center" gap={3}>
                    <Box maxWidth={320} minWidth={90}>
                      <img
                        width="100%"
                        height="100%"
                        src="./images/landing/new/vector-grades.svg"
                        alt="vector-crypto-invest"
                      />
                    </Box>
                    <Stack alignItems="center">
                      <Box
                        fontSize={30}
                        lineHeight="40px"
                        margin={0}
                        component="h1"
                      >
                        Abone ol
                      </Box>
                      <Box
                        textAlign="center"
                        maxWidth={360}
                        mb={0}
                        component="h3"
                        lineHeight="24px"
                        letterSpacing="1px"
                        sx={{ opacity: 0.6 }}
                      >
                        Senin için en uygun puan ve ücreti olan moniest'ı bul
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  minWidth={300}
                  flex={1}
                  padding={2.3}
                  borderRadius={1}
                  sx={{ background: "white" }}
                  boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                >
                  <Stack alignItems="center" gap={3}>
                    <Box maxWidth={320} minWidth={90}>
                      <img
                        width="100%"
                        height="100%"
                        src="./images/landing/new/vector-invest.svg"
                        alt="vector-crypto-invest"
                      />
                    </Box>
                    <Stack alignItems="center">
                      <Box
                        fontSize={30}
                        lineHeight="40px"
                        margin={0}
                        component="h1"
                      >
                        Analizlerini gör
                      </Box>
                      <Box
                        textAlign="center"
                        maxWidth={360}
                        mb={0}
                        component="h3"
                        lineHeight="24px"
                        letterSpacing="1px"
                        sx={{ opacity: 0.6 }}
                      >
                        Abone olduğun moniest'ın analizlerine gör ve
                        yatırımlarına yön ver
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Box minHeight="100vh" my={20}>
          <Stack
            gap={15}
            alignItems="center"
            flexWrap="wrap"
            flexDirection="row"
          >
            <Box flex={1}>
              <Box
                margin="auto"
                position="relative"
                maxWidth={320}
                minWidth={200}
              >
                <img
                  width="100%"
                  height="100%"
                  src="./images/landing/new/mobile.png"
                  alt="vector-crypto-invest"
                />
                <Box
                  right={{ xs: "-6%", md: "-21%" }}
                  top="22%"
                  position="absolute"
                  maxWidth={200}
                  minWidth={70}
                  sx={{ background: "white" }}
                >
                  <img
                    style={{
                      padding: "6px",
                      borderRadius: "10px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    }}
                    width="100%"
                    height="100%"
                    src="./images/landing/new/mobile-moniest.png"
                    alt="vector-crypto-invest"
                  />
                </Box>
              </Box>
            </Box>

            <Stack flex={2}>
              <Box
                sx={{
                  backgroundImage: "linear-gradient(to left, #26283d, #22d4b3)",
                  color: "transparent",
                  backgroundClip: "text",
                }}
                fontSize={70}
                lineHeight="80px"
                marginTop={0}
                marginBottom={2}
                component="h1"
              >
                Moniest Ol
              </Box>
              <Box
                sx={{ opacity: 0.8 }}
                fontSize={30}
                lineHeight="40px"
                marginTop={1}
                component="h1"
              >
                Kriptopara borsasında bilgi sahibiysen ve para kazanmak
                istiyorsan
              </Box>
              <Stack mt={3} gap={2}>
                <Stack
                  padding={2}
                  border="1px solid #22d4b3"
                  borderRadius="10px"
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <PriceCheckOutlined sx={{ fontSize: 30 }} />
                  <Box component="h2">Ücretini belirle</Box>
                </Stack>
                <Stack
                  padding={2}
                  border="1px solid #22d4b3"
                  borderRadius="10px"
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <HowToRegOutlined sx={{ fontSize: 30 }} />
                  <Box component="h2">Binance ID'ni gir</Box>
                </Stack>
                <Stack
                  padding={2}
                  border="1px solid #22d4b3"
                  borderRadius="10px"
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <DoneAllOutlined color="secondary" sx={{ fontSize: 30 }} />
                  <Box component="h2">Analizlerini dünyaya göster</Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
