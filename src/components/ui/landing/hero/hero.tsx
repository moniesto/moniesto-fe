import { Box, Button, Container, Stack } from "@mui/material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useTheme } from "@mui/system";
import Navigator from "../../../shared/common/navigatior";
import { useNavigateScroll } from "../../../../hooks/useNavigateScroll";
import { HeroNavbar } from "./heroNavbar";
import { StarCanvas } from "./starCanvas";

export const Hero = () => {
  const translate = useTranslate();
  const theme = useTheme();
  const navigateScroll = useNavigateScroll();

  return (
    <Box id="navbar" component="section">
      <Box position="absolute" top={0} height="100vh">
        <StarCanvas />
      </Box>
      <HeroNavbar></HeroNavbar>
      <Container sx={{ marginTop: "200px" }} maxWidth="lg">
        <Stack
          position="relative"
          // minHeight={"calc(100vh - 180px)"}
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
              sx={{
                fontSize: { xs: 70, md: 100 },
                lineHeight: { xs: "80px", md: "110px" },
                backgroundImage: "linear-gradient(to left, #26283d, #22d4b3)",
                color: "transparent",
                backgroundClip: "text",
                margin: "0",
              }}
            >
              <Trans i18nKey="page.landing.invest_wisely"></Trans>
            </Box>
            <Box
              component="h3"
              textAlign="center"
              sx={{ letterSpacing: "1px", lineHeight: "24px", opacity: 0.8 }}
            >
              <Trans i18nKey="page.landing.discover_power"></Trans>
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
          <Box zIndex={2}>
            <img
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                maxHeight: 400,
                borderRadius: "10px",
              }}
              height="100%"
              width="100%"
              src="./images/landing/new/desktop.png"
              alt="desktop"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
