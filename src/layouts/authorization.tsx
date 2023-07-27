import { Box, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Outlet } from "react-router-dom";
import { Trans } from "react-i18next";
import Logo from "../components/shared/common/logo";

const AuthorizationLayout = () => {
  const theme = useTheme();
  return (
    <Grid
      item
      sm={12}
      sx={{
        minHeight: "100vh",
        height: "100%",
        padding: "24px",
        background: theme.palette.background.primary,
      }}
      container
    >
      <Grid width={"100%"} item md={7}>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            height: "40px",
            paddingBottom: "24px",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid " + theme.palette.background[800],
          }}
        >
          <Logo navigateHome width={140} variant="logo-medium" />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: { xs: "calc(100% - 32px)", md: "100%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          position: "fixed",
          right: "24px",
          height: "calc(100vh - 48px)",
          display: { xs: "none", md: "block" },
        }}
        item
        md={5}
      >
        <Box
          sx={{
            height: "100%",
            background: theme.palette.primary.main,
            borderRadius: theme.palette.borderRadius.large,
            color: theme.palette.text.secondary,
            paddingY: 8,
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Typography
              fontSize={"3.1rem"}
              variant="h1"
              color={theme.palette.common.white}
            >
              <Trans i18nKey="page.landing.invest_wisely"></Trans>
            </Typography>
            <Stack direction="column" alignItems="center" spacing={3}>
              <img
                style={{ width: "16rem" }}
                src="images/auth/auth_bg.gif"
                alt=""
              />
            </Stack>
            <Logo mode="light" width={140} />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
export default AuthorizationLayout;
