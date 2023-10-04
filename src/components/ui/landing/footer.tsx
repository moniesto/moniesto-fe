import { Box, Button, Container, Stack } from "@mui/material";
import {
  CopyrightOutlined,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { useTheme } from "@mui/system";
import { useTranslate } from "../../../hooks/useTranslate";
import { useNavLinks } from "../../../hooks/useNavLinks";
import { useNavigateScroll } from "../../../hooks/useNavigateScroll";
import Navigator from "../../shared/common/navigatior";
import Logo from "../../shared/common/logo";

export const Footer = () => {
  const theme = useTheme();

  const translate = useTranslate();
  const links = useNavLinks();

  const navigateScroll = useNavigateScroll();
  return (
    <Box component="footer">
      <Container maxWidth="xl">
        <Box paddingTop="5rem" paddingX={{ xs: 0, md: 6 }}>
          <Stack
            flexWrap="wrap"
            direction="row"
            justifyContent={{ xs: "center", md: "space-between" }}
          >
            <Stack
              alignItems={{ xs: "center", md: "unset" }}
              textAlign={{ xs: "center", md: "unset" }}
            >
              <Logo width={100} mode="dark" navigateHome />
              <Box
                component="h3"
                lineHeight="24px"
                marginTop="10px"
                sx={{ opacity: 0.6, maxWidth: 350, paddingBottom: 2 }}
              >
                {translate("page.landing.discover_power")}
              </Box>
              <Stack
                spacing={3}
                sx={{
                  ">div": {
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    opacity: 0.8,
                    whiteSpace: "nowrap",
                  },
                  background: {
                    xs: "var(--theme-background-secondary-light)",
                    md: "unset",
                  },
                  padding: { xs: "10px", md: "unset" },
                  borderRadius: { xs: "10px", md: "unset" },
                }}
                direction="row"
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "unset" }}
                gap={{ xs: 2 }}
                margin={{ xs: "20px 0 50px", md: 0 }}
              >
                {links.map((link) => (
                  <Box
                    onClick={() => navigateScroll(link.id, link.position)}
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
              <Box
                component="a"
                target="_blank"
                href="https://twitter.com/moniesto_app"
              >
                <Twitter />
              </Box>
              <Box
                component="a"
                target="_blank"
                href="https://www.instagram.com/moniesto_app"
              >
                <Instagram />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
