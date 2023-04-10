import { Box, Button, Container, Drawer, Stack } from "@mui/material";
import BrandText from "../../components/shared/common/brandText";
import { useTheme } from "@mui/system";
import Navigator from "../../components/shared/common/navigatior";
import { SectionBadge } from "../../components/ui/landing/sectionBadge";
import {
  ArchitectureOutlined,
  ArrowCircleDown,
  ArrowCircleUp,
  CloseOutlined,
  CopyrightOutlined,
  Facebook,
  Instagram,
  LinkedIn,
  MenuOutlined,
  Twitter,
  VisibilityOutlined,
} from "@mui/icons-material";
import { FAQ } from "../../components/ui/landing/faq";
import { useMemo, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { Trans } from "react-i18next";

type ScrollPosition = "center" | "end" | "nearest" | "start";

export const Landing = () => {
  const theme = useTheme();
  const softBgColor: string = "#ebf6f4";
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const translate = useTranslate();

  const links: { id: string; name: string; position: ScrollPosition }[] = [
    {
      id: "about",
      name: translate("page.landing.links.about"),
      position: "start",
    },
    {
      id: "pricing",
      name: translate("page.landing.links.pricing"),
      position: "center",
    },
    {
      id: "faq",
      name: translate("page.landing.links.faq"),
      position: "center",
    },
    {
      id: "contact",
      name: translate("page.landing.links.contact"),
      position: "center",
    },
  ];

  const handleClickScroll = (
    id: string,
    position: ScrollPosition = "center"
  ) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: position,
        inline: position,
      });
    }
  };

  const data = {
    __html: `lorem ipsum <img src="" onerror="alert('message');" />`,
  };

  const renderHeaderLinks = useMemo(
    () => (
      <Stack
        sx={{
          li: {
            cursor: "pointer",
            fontWeight: { xs: 600 },
          },
        }}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={{ xs: 4, md: 6 }}
      >
        {links.map((link) => (
          <Stack
            key={link.id}
            component="li"
            onClick={() => {
              handleClickScroll(link.id, link.position);
              setOpenMenu(false);
            }}
          >
            {link.name}
          </Stack>
        ))}

        <Stack component="li">
          <Navigator path="login">
            <Button
              sx={{
                width: "10rem",
                color: theme.palette.secondary.main + " !important",
                backgroundColor: "white !important",
              }}
              variant="outlined"
              color="secondary"
            >
              {translate("page.landing.actions.login")}
            </Button>
          </Navigator>
        </Stack>
      </Stack>
    ),
    []
  );

  return (
    <Box
      className="landing-page"
      sx={{
        background: "white",
        color: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
      }}
    >
      <Box
        sx={{
          background: "url(images/landing/header_bg.png)",
          minHeight: "100vh",
          backgroundRepeat: { xs: "no-repeat", md: "round" },
          backgroundSize: "cover",
          backgroundPosition: { xs: "right",md:"unset" },
        }}
        component="section"
      >
        <Container maxWidth="lg">
          <Stack
            sx={{ height: "100px", fontWeight: 600 }}
            component="header"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <BrandText sx={{ color: theme.palette.primary.main }}></BrandText>
            <MenuOutlined
              sx={{
                fontSize: "2rem",
                color: theme.palette.primary.main,
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
              onClick={() => setOpenMenu(true)}
            ></MenuOutlined>
            <Drawer
              PaperProps={{
                sx: {
                  background: "white",
                  color: theme.palette.primary.main,
                },
              }}
              anchor="right"
              open={openMenu}
              onClose={() => setOpenMenu(false)}
            >
              <Box padding={3} pt={5}>
                <CloseOutlined
                  onClick={() => setOpenMenu(false)}
                  sx={{
                    color: theme.palette.primary.main,
                    position: "absolute",
                    right: 16,
                    top: 16,
                  }}
                ></CloseOutlined>
                {renderHeaderLinks}
              </Box>
            </Drawer>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              {renderHeaderLinks}
            </Box>
          </Stack>

          <Stack
            minHeight={"calc(100vh - 120px)"}
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={2}
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
                  onClick={() => handleClickScroll("about", "start")}
                >
                  {translate("page.landing.actions.learn_more")}
                </Button>
              </Stack>
            </Stack>
            <Stack sx={{ width: "100%" }} flex={1}>
              <img src="images/landing/header_hero.png" alt="" />
            </Stack>
          </Stack>
        </Container>
      </Box>
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
                  <img
                    width="100%"
                    src="images/landing/invest_hero.png"
                    alt=""
                  />
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
      <Box sx={{ background: softBgColor }} id="pricing" component="section">
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
                    background: softBgColor,
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
      <Box>
        <img width="100%" src="images/landing/divider_bg.png" alt="" />
      </Box>

      <Box id="faq" component="section">
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center">
            <Box
              component="h1"
              fontSize={{ xs: "1.7rem", md: "2rem" }}
              lineHeight={1}
            >
              {translate("page.landing.faq.title")}
            </Box>
            <Box component="h4" sx={{ opacity: 0.7, mt: "0 !important" }}>
              {translate("page.landing.faq.header")}
            </Box>
            <FAQ></FAQ>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ background: softBgColor }} id="contact" component="section">
        <Container maxWidth="lg">
          <Stack padding="2rem" alignItems="center">
            <Box component="h1">
              {translate("page.landing.still_question.title")}
            </Box>
            <Box component="h3" sx={{ opacity: 0.7 }}>
              {translate("page.landing.still_question.header")}
            </Box>
            <Button
              href="mailto:noreply@moniesto.com?subject=From moniesto.com contact"
              sx={{
                color: "white !important",
                marginTop: 2,
              }}
              size="large"
              variant="contained"
              color="secondary"
            >
              {translate("page.landing.still_question.action")}
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box component="footer">
        <Container maxWidth="xl">
          <Box paddingX={{ md: 5, xs: 2 }}>
            <Stack
              flexWrap="wrap"
              direction="row"
              justifyContent="space-between"
            >
              <Stack>
                <BrandText
                  sx={{ color: theme.palette.primary.main }}
                ></BrandText>
                <Box
                  component="h4"
                  sx={{ opacity: 0.6, maxWidth: 300, paddingBottom: 2 }}
                >
                  <Trans i18nKey="page.landing.discover_power"></Trans>
                </Box>
                <Stack
                  spacing={3}
                  sx={{
                    ">div": {
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: 0.8,
                      whiteSpace: "nowrap",
                    },
                  }}
                  direction="row"
                  flexWrap="wrap"
                  justifyContent={{ xs: "center" }}
                  gap={{ xs: 2 }}
                  margin={{ xs: "20px 0 50px", md: 0 }}
                >
                  {links.map((link) => (
                    <Box
                      onClick={() => handleClickScroll(link.id, link.position)}
                      key={link.id}
                    >
                      {link.name}
                    </Box>
                  ))}

                  <Box>{translate("page.landing.links.terms")} </Box>
                  <Box>{translate("page.landing.links.privacy_policy")} </Box>
                </Stack>
              </Stack>

              <Navigator path="login">
                <Button
                  size="large"
                  sx={{
                    width: "12rem",
                    color: theme.palette.secondary.main + " !important",
                    backgroundColor: "white !important",
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  {translate("page.landing.actions.get_start")}
                </Button>
              </Navigator>
            </Stack>
            <Stack
              sx={{
                paddingBottom: "3rem",
                paddingTop: "2rem",
                marginTop: "2rem",
                borderTop: "1px solid rgba(0,0,0,0.2)",
                opacity: 0.7,
              }}
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 3, md: 0 }}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CopyrightOutlined
                  sx={{ color: theme.palette.primary.main }}
                  fontSize="small"
                />
                <Box>{new Date().getFullYear()} </Box>
                <Box> Moniesto.</Box>
                <Box whiteSpace="nowrap">
                  {translate("page.landing.all_rights_reserved")}
                </Box>
              </Stack>
              <Stack
                sx={{
                  ">.MuiSvgIcon-root": {
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                  },
                }}
                justifyContent={{ xs: "center" }}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Twitter />
                <LinkedIn />
                <Facebook />
                <Instagram />
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
