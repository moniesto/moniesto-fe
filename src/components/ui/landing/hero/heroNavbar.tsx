import { Box, Button, Container, Drawer, Stack } from "@mui/material";
import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useNavLinks } from "../../../../hooks/useNavLinks";
import { useNavigateScroll } from "../../../../hooks/useNavigateScroll";
import { useTranslate } from "../../../../hooks/useTranslate";
import Navigator from "../../../shared/common/navigatior";
import { useTheme } from "@mui/system";
import { useScrollPosition } from "../../../../hooks/useScrollPosition";
import Logo from "../../../shared/common/logo";

export const HeroNavbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const links = useNavLinks();
  const navigateScroll = useNavigateScroll();
  const translate = useTranslate();
  const theme = useTheme();
  const position = useScrollPosition();

  const renderHeaderLinks = useMemo(
    () => (
      <Stack
        sx={{
          li: {
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 16,
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
              navigateScroll(link.id, link.position);
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
    [links, navigateScroll, theme.palette.secondary.main, translate]
  );
  return (
    <Box
      display="flex"
      sx={{
        height: "100px",
        fontWeight: 600,
        background: "rgba(255,255,255,0.92)",
        transition: "box-shadow 0.2s",
        backdropFilter: "blur(5px)",
      }}
      component="header"
      position="fixed"
      zIndex={10}
      top={0}
      width="100%"
      boxShadow={
        position.scrollY > 10
          ? " 0 10px 15px -3px rgba(0,0,0,.04), 0 4px 6px -2px rgba(0,0,0,.02)"
          : ""
      }
    >
      <Container maxWidth="lg">
        <Box display="flex" height="100%">
          <Stack
            width="100%"
            position="sticky"
            top={0}
            zIndex={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo navigateHome width={150} mode="dark" />
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
        </Box>
      </Container>
    </Box>
  );
};
