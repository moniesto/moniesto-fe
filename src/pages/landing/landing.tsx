import { Box, Button, Container, Stack } from "@mui/material";
import "./landing.scss";
import BrandText from "../../components/shared/common/brandText";
import { useTheme } from "@mui/system";
import Navigator from "../../components/shared/common/navigatior";

export const Landing = () => {
  const theme = useTheme();
  console.log("theme :", theme);
  return (
    <Box
      className="landing-page"
      sx={{ background: "white", color: theme.palette.primary.main }}
    >
      <Box
        sx={{
          background: "url(images/landing/header_bg.png)",
          height: "100vh",
          backgroundRepeat: { sm: "no-repeat", md: "round" },
          backgroundSize: "cover",
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
            <Stack
              sx={{
                li: {
                  cursor: "pointer",
                },
              }}
              direction="row"
              alignItems="center"
              spacing={6}
            >
              <Stack component="li">About</Stack>
              <Stack component="li">Pricing</Stack>
              <Stack component="li">FAQ</Stack>
              <Stack component="li">Contact</Stack>
              <Stack component="li">
                <Navigator path="login">
                  <Button
                    sx={{
                      width: "10rem",
                      color: theme.palette.secondary.main + " !important",
                      background: "white",
                    }}
                    variant="outlined"
                    color="secondary"
                  >
                    Login
                  </Button>
                </Navigator>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            height={"calc(100vh - 120px)"}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Stack flex={1}>
              <Box
                component="h1"
                sx={{ fontSize: "80px", lineHeight: "80px", margin: "10px 0" }}
              >
                Invest wisely
              </Box>
              <Box
                component="h3"
                sx={{ letterSpacing: "1px", lineHeight: "24px" }}
              >
                Discover the power of moniest insights to <br /> make better
                investment decisions.
              </Box>
              <Stack mt="5rem" direction="row" alignItems="center" spacing={2}>
                <Button
                  size="large"
                  sx={{
                    width: "12rem",
                    color: theme.palette.secondary.main + " !important",
                    background: "white",
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Get Started
                </Button>
                <Button
                  size="large"
                  sx={{
                    width: "12rem",
                    borderColor: "white",
                    color: "white !important",
                  }}
                  variant="outlined"
                  color="inherit"
                >
                  Learn More
                </Button>
              </Stack>
            </Stack>
            <Stack flex={1}>
              <img src="images/landing/header_hero.png" alt="" />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
