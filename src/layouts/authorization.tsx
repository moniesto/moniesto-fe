import { Box, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BrandText from "../components/shared/common/brandText";
import { useAppSelector } from "../store/hooks";
const AuthorizationLayout = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.id) navigate("/timeline");
  }, [user]);

  const theme = useTheme();
  return (
    !user.id && (
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
              width: "100%",
              height: "100%",
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
    )
  );
};
export default AuthorizationLayout;
