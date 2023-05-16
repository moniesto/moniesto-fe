import { Box, Button, Container, Stack } from "@mui/material";
import { Trans } from "react-i18next";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useTheme } from "@mui/system";
import Navigator from "../../../shared/common/navigatior";
import { useNavigateScroll } from "../../../../hooks/useNavigateScroll";
import { HeroNavbar } from "../heroNavbar";
import styles from "./hero.module.scss";

export const Hero = () => {
  const translate = useTranslate();
  const theme = useTheme();
  const navigateScroll = useNavigateScroll();

  return (
    <Box
      sx={{
        background: "url(images/landing/header_bg.png)",
        minHeight: "100vh",
        backgroundRepeat: { xs: "no-repeat", md: "round" },
        backgroundSize: "cover",
        backgroundPosition: { xs: "right", md: "unset" },
      }}
      component="section"
    >
      <Container maxWidth="lg">
        <HeroNavbar></HeroNavbar>

        <Stack
          minHeight={"calc(100vh - 120px)"}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          spacing={2}
          sx={{ perspective: "300px" }}
        >
          <Stack flex={1}>
            <Box
              component="h1"
              sx={{
                fontSize: { xs: 70, md: 80 },
                lineHeight: { xs: "70px", md: "80px" },
                margin: "10px 0",
              }}
            >
              <Trans i18nKey="page.landing.invest_wisely"></Trans>
            </Box>
            <Box
              component="h3"
              sx={{ letterSpacing: "1px", lineHeight: "24px" }}
            >
              <Trans i18nKey="page.landing.discover_power"></Trans>
            </Box>
            <Stack mt="5rem" direction="row" alignItems="center" spacing={2}>
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
                  borderColor: { md: "white" },
                  color: { md: "white !important" },
                }}
                variant="outlined"
                color="inherit"
                onClick={() => navigateScroll("about", "start")}
              >
                {translate("page.landing.actions.learn_more")}
              </Button>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              maxWidth: { xs: "330px", md: "500px" },
              img: {
                width: "100%",
                objectFit: "cover",
              },
            }}
            flex={1}
            className={styles.heroImageContainer}
          >
            <Box className={styles.heroImageContainer__wind}>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </Box>
            <img src="images/landing/header_hero.png" alt="" />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
