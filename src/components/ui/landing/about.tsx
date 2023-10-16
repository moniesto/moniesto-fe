import { Box, Container, Stack } from "@mui/material";
import {
  DoneAllOutlined,
  HowToRegOutlined,
  PriceCheckOutlined,
} from "@mui/icons-material";
import { useTranslate } from "../../../hooks/useTranslate";
import imageService from "../../../services/imageService";

export const About = () => {
  const translate = useTranslate();

  const discoverSections = [
    {
      img_source: "vector-grades.svg",
      sectionKey: "subscribe",
    },
    {
      img_source: "vector-invest.svg",
      sectionKey: "see_analysis",
    },
  ];

  const becomeMoniestSteps = [
    <PriceCheckOutlined />,
    <HowToRegOutlined />,
    <DoneAllOutlined />,
  ];

  return (
    <Box mt={-6} minHeight="100vh" id="about" component="section">
      <Box sx={{ background: "var(--theme-color-primary)" }}>
        <Box padding="6rem 0 3rem">
          <Container maxWidth="lg">
            <Stack
              width="100%"
              color="white"
              textAlign="center"
              alignItems="center"
            >
              <Box
                letterSpacing={3}
                fontSize={{ md: 54, xs: 44 }}
                lineHeight={{ md: "68px", xs: "56px" }}
                mb={0}
                component="h1"
                sx={{
                  backgroundImage:
                    "linear-gradient(to left, white, var(--theme-color-secondary))",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              >
                {translate("page.landing.about.discover.title")}
              </Box>
              <Box
                fontSize={24}
                sx={{ opacity: 0.9, maxWidth: 820 }}
                lineHeight="36px"
                component="h2"
                letterSpacing={1}
              >
                {translate("page.landing.about.discover.desc")}
              </Box>
            </Stack>

            <Stack mt={10} gap={5} direction="row" flexWrap="wrap">
              <Stack flexWrap="wrap" flex={1} gap={3} flexDirection="row">
                {discoverSections.map((item) => (
                  <Stack
                    key={item.sectionKey}
                    minWidth={300}
                    flex={1}
                    padding="5rem 2rem"
                    borderRadius={1}
                    sx={{ background: "white" }}
                    boxShadow="var(--theme-shadow-primary)"
                  >
                    <Stack alignItems="center" gap={3}>
                      <Box maxWidth={320} minWidth={90}>
                        <img
                          width="100%"
                          height="100%"
                          src={`./images/landing/${item.img_source}`}
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
                          {translate(
                            `page.landing.about.discover.${item.sectionKey}.title`
                          )}
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
                          {translate(
                            `page.landing.about.discover.${item.sectionKey}.desc`
                          )}
                        </Box>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Box my={20}>
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
                  src={imageService.getFirebaseImagePath("landing/mobile.png")}
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
                    src={imageService.getFirebaseImagePath(
                      "landing/mobile-moniest.png"
                    )}
                    alt="vector-crypto-invest"
                  />
                </Box>
              </Box>
            </Box>

            <Stack flex={2}>
              <Box
                sx={{
                  backgroundImage:
                    "linear-gradient(to left, var(--theme-color-primary), var(--theme-color-secondary))",
                  color: "transparent",
                  backgroundClip: "text",
                }}
                fontSize={{ md: 54, xs: 44 }}
                lineHeight={{ md: "68px", xs: "56px" }}
                marginTop={0}
                marginBottom={2}
                component="h1"
              >
                {translate("page.landing.about.be_moniest.title")}
              </Box>
              <Box
                sx={{ opacity: 0.8 }}
                fontSize={{ md: 30, xs: 25 }}
                lineHeight={{ md: "40px", xs: "34px" }}
                marginTop={1}
                component="h1"
              >
                {translate("page.landing.about.be_moniest.desc")}
              </Box>
              <Stack mt={3} gap={2}>
                {becomeMoniestSteps.map((item, i) => (
                  <Stack
                    key={"step_" + i}
                    padding={2}
                    border="1px solid var(--theme-color-secondary)"
                    borderRadius="10px"
                    gap={2}
                    direction="row"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        ".MuiSvgIcon-root": {
                          fontSize: 30,
                          color: "var(--theme-primary-color)",
                        },
                      }}
                    >
                      {item}
                    </Box>

                    <Box component="h2">
                      {translate(`page.landing.about.be_moniest.step${i + 1}`)}
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
