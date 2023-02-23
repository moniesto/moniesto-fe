import { AppBar, Box, Container, Grid, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/layout/header";
import { SettingsSideBar } from "../components/layout/main/settingsSideBar";
import SideBar from "../components/layout/main/sideBar";

const MainLayout = () => {
  const theme = useTheme();
  const [sideBar, setSideBar] = useState<any>();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/settings")) {
      setSideBar(<SettingsSideBar />);
    } else setSideBar(<SideBar />);
  }, [location.pathname]);

  return (
    <Stack sx={{ background: theme.palette.background[500] }}>
      <AppBar
        elevation={0}
        sx={{
          boxShadow: "0px 0px 16px 1px " + theme.palette.background[200],
        }}
        position="fixed"
      >
        <Toolbar sx={{ height: "80px" }}>
          <Header></Header>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          marginTop: "80px",
          minHeight: "calc(100vh - 80px)",
          padding: { xs: "35px 15px", md: "35px" },
        }}
        maxWidth="lg"
      >
        <Grid container item md={12}>
          <Grid sx={{ display: { xs: "none", md: "block" } }} item md={3}>
            <Box sx={{ position: "fixed", width: "100%", maxWidth: "282px" }}>
              {sideBar}
            </Box>
          </Grid>
          <Grid
            width={"100%"}
            sx={{
              "> *": {
                animation: "fadeIn 0.3s ease",
              },
              marginLeft: { xs: 0, md: 4 },
            }}
            item
            md={7}
            sm={12}
          >
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
export default MainLayout;
