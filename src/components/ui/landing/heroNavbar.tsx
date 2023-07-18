import { Box, Button, Drawer, Stack } from "@mui/material";
import BrandText from "../../shared/common/brandText";
import { CloseOutlined, MenuOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useNavLinks } from "../../../hooks/useNavLinks";
import { useNavigateScroll } from "../../../hooks/useNavigateScroll";
import { useTranslate } from "../../../hooks/useTranslate";
import Navigator from "../../shared/common/navigatior";
import { useTheme } from "@mui/system";

export const HeroNavbar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const links = useNavLinks();
  const navigateScroll = useNavigateScroll();
  const translate = useTranslate();
  const theme = useTheme();

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
  );
};
