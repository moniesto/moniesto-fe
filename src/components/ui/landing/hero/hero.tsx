import { Box, Button, Container, Stack } from "@mui/material";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useTheme } from "@mui/system";
import Navigator from "../../../shared/common/navigatior";
import { useNavigateScroll } from "../../../../hooks/useNavigateScroll";
import { HeroNavbar } from "./heroNavbar";
import { StarCanvas } from "./starCanvas";
import { useScrollPosition } from "../../../../hooks/useScrollPosition";
import { useAppSelector } from "../../../../store/hooks";

export const Hero = () => {
  const translate = useTranslate();
  const theme = useTheme();
  const navigateScroll = useNavigateScroll();
  const language = useAppSelector((state) => state.storage.language);

  const scrollPosition = useScrollPosition();

  return (
    <Box id="navbar" component="section">
      <Box position="absolute" top={0} height="100vh">
        <StarCanvas />
      </Box>
      <HeroNavbar></HeroNavbar>
      <Container sx={{ marginTop: "200px" }} maxWidth="lg">
        <Stack
          position="relative"
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={2}
        >
          <Stack
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            flex={1}
          >
            <Box
              component="h1"
              textAlign="center"
              sx={{
                fontSize: { xs: 60, md: 100 },
                lineHeight: { xs: "70px", md: "110px" },
                backgroundImage:
                  "linear-gradient(to left, var(--theme-color-primary), var(--theme-color-secondary))",
                color: "transparent",
                backgroundClip: "text",
                margin: "0",
              }}
            >
              {translate("page.landing.invest_wisely")}
            </Box>
            <Box
              component="h3"
              textAlign="center"
              fontSize={{ xs: 24, md: 26 }}
              lineHeight={{ xs: "32px", md: "36px" }}
              sx={{ letterSpacing: "1px", opacity: 0.8 }}
            >
              {translate("page.landing.discover_power")}
            </Box>

            <Stack mt="3rem" direction="row" alignItems="center" spacing={2}>
              <Navigator path="login">
                <Button
                  size="large"
                  sx={{
                    width: { xs: "10rem", md: "12rem" },
                    color: theme.palette.secondary.main + " !important",
                    backgroundColor: "white !important",
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  {translate("page.landing.actions.get_start")}
                </Button>
              </Navigator>
              <Button
                size="large"
                sx={{
                  width: { xs: "10rem", md: "12rem" },
                }}
                variant="outlined"
                color="inherit"
                onClick={() => navigateScroll("about", "start")}
              >
                {translate("page.landing.actions.learn_more")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          mt={10}
          height="100%"
          justifyContent="center"
          flexDirection="row"
        >
          <Box zIndex={2} sx={{ perspective: 500 }}>
            <img
              style={{
                boxShadow: "var(--theme-shadow-primary)",
                maxHeight: 560,
                borderRadius: "10px",
                transition: "transform 0.1s ease",
                transform: `rotateX(${Math.max(
                  10 - scrollPosition.scrollY / 20,
                  0
                )}deg)`,
              }}
              height="100%"
              width="100%"
              src={`./images/landing/desktop_${language}.png`}
              alt="desktop"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
