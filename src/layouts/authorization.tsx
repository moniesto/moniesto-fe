import { Box, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Outlet } from "react-router-dom";
import BrandText from "../components/shared/common/brandText";
import Fly from "../components/shared/common/fly";
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
        <Fly>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Outlet />
          </Box>
        </Fly>
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
            padding: "30px 0",
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <img
              style={{
                width: "4rem",
                borderRadius: theme.palette.borderRadius.small,
              }}
              src="images/logo.png"
              alt="Logo"
            />
            <Stack direction="column" alignItems="center" spacing={3}>
              <Typography
                fontSize={"3.1rem"}
                variant="h1"
                color={theme.palette.common.white}
              >
                Invest Wisely
              </Typography>
              <img
                style={{ width: "16rem" }}
                src="images/auth/auth_bg.svg"
                alt=""
              />
            </Stack>
            <BrandText />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};
export default AuthorizationLayout;
