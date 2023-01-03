import { AppBar, Container, Grid, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/system";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/layout/header";
import SideBar from "../components/layout/sideBar/sideBar";
import { useAppSelector } from "../store/hooks";

const MainLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    console.log("user :", user);
    if (!user.id) navigate("login");
  }, [user]);

  return (
    <Stack sx={{ background: theme.palette.background.primary }}>
      <AppBar elevation={0} position="fixed">
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
            <SideBar></SideBar>
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
