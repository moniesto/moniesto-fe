import { Box, Button, Container, Stack } from "@mui/material";
import BrandText from "../../shared/common/brandText";
import { Trans } from "react-i18next";
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

export const Footer = () => {
  const theme = useTheme();

  const translate = useTranslate();
  const links = useNavLinks();

  const navigateScroll = useNavigateScroll();
  return (
    <Box component="footer">
      <Container maxWidth="xl">
        <Box paddingX={{ md: 5, xs: 2 }}>
          <Stack flexWrap="wrap" direction="row" justifyContent="space-between">
            <Stack>
              <BrandText sx={{ color: theme.palette.primary.main }}></BrandText>
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
              <Twitter />
              <LinkedIn />
              <Facebook />
              <Instagram />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
