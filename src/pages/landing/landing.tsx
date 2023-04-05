import { Box, Button, Container, Stack } from "@mui/material";
import "./landing.scss";
import BrandText from "../../components/shared/common/brandText";
import { useTheme } from "@mui/system";
import Navigator from "../../components/shared/common/navigatior";
import { SectionBadge } from "../../components/ui/landing/sectionBadge";
import { ArchitectureOutlined, VisibilityOutlined } from "@mui/icons-material";

export const Landing = () => {
  const links = [
    {
      id: "about",
      name: "About",
    },
    {
      id: "pricing",
      name: "Pricing",
    },
    {
      id: "faq",
      name: "FAQ",
    },
    {
      id: "contact",
      name: "Contact",
    },
  ];
  const theme = useTheme();

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              {links.map((link) => (
                <Stack
                  key={link.id}
                  component="li"
                  onClick={() => handleClickScroll(link.id)}
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
      <Box minHeight="100vh" id="about" component="section" padding="3rem 0">
        <Container maxWidth="lg">
          <Stack rowGap={20}>
            <Box>
              <Box maxWidth="600px" margin="auto">
                <Stack spacing={3} alignItems="center" textAlign="center">
                  <SectionBadge title="Why moniesto">
                    <VisibilityOutlined></VisibilityOutlined>
                  </SectionBadge>
                  <Box component="h1">
                    Get actionable insights from the cryptocurrency market
                  </Box>
                  <Box component="h5" sx={{ opacity: 0.7 }}>
                    Moniesto provides expert advice from experienced advisors
                    who specialize in the cryptocurrency market, ensuring that
                    investors receive reliable and up-to-date information.
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                columnGap={4}
              >
                <img src="images/landing/invest_hero.png" alt="" />
                <Box maxWidth="340px">
                  <Stack spacing={3}>
                    <SectionBadge title="For Investors">
                      <VisibilityOutlined></VisibilityOutlined>
                    </SectionBadge>
                    <Box component="h1" lineHeight={1.4}>
                      Invest like a Pro
                    </Box>
                    <Box component="h5" sx={{ opacity: 0.7 }}>
                      Take your cryptocurrency investments to the next level and
                      earn money with moniesto. Our app connects users with
                      moniests, who provide predictions and insights on the
                      future price of crypto coins.
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                columnGap={4}
              >
                <Box maxWidth="340px">
                  <Stack spacing={3}>
                    <SectionBadge title="For Moniest">
                      <ArchitectureOutlined></ArchitectureOutlined>
                    </SectionBadge>
                    <Box component="h1" lineHeight={1.4}>
                      Crypto Expert? Become Moniest
                    </Box>
                    <Box component="h5" sx={{ opacity: 0.7 }}>
                      Join the moniesto community as an expert. As a moniest on
                      moniesto, you'll have the opportunity to share your
                      insights with your subscribers and earn money doing what
                      you love.
                    </Box>
                  </Stack>
                </Box>
                <img src="images/landing/become_moniest_hero.png" alt="" />
              </Stack>
            </Box>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                columnGap={4}
              >
                <img src="images/landing/algorithm_hero.png" alt="" />
                <Box maxWidth="340px">
                  <Stack spacing={3}>
                    <SectionBadge title="Scoring Algorithm">
                      <VisibilityOutlined></VisibilityOutlined>
                    </SectionBadge>
                    <Box component="h1" lineHeight={1.4}>
                      Algorithm: What It Means for Your Investments
                    </Box>
                    <Box component="h5" sx={{ opacity: 0.7 }}>
                      Our scoring algorithm is designed to help users evaluate
                      the accuracy of our moniests' predictions. After a
                      prediction has timed out, our algorithm assigns a score to
                      each moniest based on the success of their prediction.
                      <br />
                      <br />
                      This information helps users identify moniests who
                      consistently provide accurate predictions and make
                      informed decisions about who to follow.
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ background: "#ebf6f4" }} id="pricing" component="section">
        <Container maxWidth="lg">
          <Stack padding="2rem">
            <Box component="h1" sx={{ color: theme.palette.secondary.main }}>
              Pricing
            </Box>
            <Box component="h3">Pricing is up to the moniests.</Box>
            <Box component="h4" sx={{ opacity: 0.7 }}>
              Moniests set their own subscription fees for users to access their
              crypto advice. We believe in a fair pricing strategy that benefits
              both moniests and users. <br />
              <br /> This allows users to access high-quality advice from
              moniests at prices that reflect their expertise and track record.
              Moniests, in turn, can earn money for sharing their valuable
              insights with users.
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
