import { Box, Button, Container, Stack } from "@mui/material";
import BrandText from "../../components/shared/common/brandText";
import { useTheme } from "@mui/system";
import Navigator from "../../components/shared/common/navigatior";
import { SectionBadge } from "../../components/ui/landing/sectionBadge";
import {
  ArchitectureOutlined,
  ArrowCircleDown,
  ArrowCircleUp,
  CopyrightOutlined,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  VisibilityOutlined,
} from "@mui/icons-material";
import { FAQ } from "../../components/ui/landing/faq";

type ScrollPosition = "center" | "end" | "nearest" | "start";

export const Landing = () => {
  const theme = useTheme();
  const softBgColor: string = "#ebf6f4";

  const links: { id: string; name: string; position: ScrollPosition }[] = [
    {
      id: "about",
      name: "About",
      position: "start",
    },
    {
      id: "pricing",
      name: "Pricing",
      position: "center",
    },
    {
      id: "faq",
      name: "FAQ",
      position: "center",
    },
    {
      id: "contact",
      name: "Contact",
      position: "center",
    },
  ];

  const handleClickScroll = (
    id: string,
    position: ScrollPosition = "center"
  ) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: position,
        inline: position,
      });
    }
  };

  return (
    <Box
      className="landing-page"
      sx={{
        background: "white",
        color: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        gap: "5rem",
      }}
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
                  onClick={() => handleClickScroll(link.id, link.position)}
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
                    Get Started
                  </Button>
                </Navigator>
                <Button
                  size="large"
                  sx={{
                    width: "12rem",
                    borderColor: "white",
                    color: "white !important",
                  }}
                  variant="outlined"
                  color="inherit"
                  onClick={() => handleClickScroll("about", "start")}
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
      <Box sx={{ background: softBgColor }} id="pricing" component="section">
        <Container maxWidth="lg">
          <Stack padding="2rem">
            <Box
              component="h1"
              sx={{ color: theme.palette.secondary.main, marginY: 1 }}
            >
              Pricing
            </Box>
            <Box component="h3" marginY={1}>
              Pricing is up to the moniests.
            </Box>
            <Box component="h4" marginY={1} sx={{ opacity: 0.7 }}>
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
      <Box id="who_we_are" component="section">
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} justifyContent="space-evenly">
            <Box flex={1} maxWidth={400}>
              <Stack spacing={3}>
                <Box
                  p={2}
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    display: "grid",
                    placeContent: "center",
                    background: softBgColor,
                  }}
                >
                  <ArrowCircleUp
                    sx={{
                      fontSize: "2rem",
                      color: theme.palette.secondary.main,
                    }}
                  ></ArrowCircleUp>
                </Box>
                <Box component="h1" lineHeight={1.4}>
                  Who we are?
                </Box>
                <Box component="h4" sx={{ opacity: 0.7 }}>
                  We connect people who are interested in cryptocurrencies with
                  experts called Moniests. Our aim is to simplify crypto
                  education and help people make informed decisions about
                  investments.
                  <br />
                  <br />
                  Our aim is to simplify crypto education and help people make
                  informed decisions about investments.
                </Box>
              </Stack>
            </Box>
            <Box flex={1} maxWidth={400} pt={6}>
              <Stack spacing={3}>
                <Box
                  p={2}
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    display: "grid",
                    placeContent: "center",
                    background: theme.palette.warning.light,
                  }}
                >
                  <ArrowCircleDown
                    sx={{
                      fontSize: "2rem",
                      color: theme.palette.warning.dark,
                    }}
                  ></ArrowCircleDown>
                </Box>
                <Box component="h1" lineHeight={1.4}>
                  Who we are not?
                </Box>
                <Box component="h4" sx={{ opacity: 0.7 }}>
                  Moniesto is not a financial advisory firm or investment app.
                  <br />
                  <br />
                  We do not provide investment advice ourselves or make
                  investment decisions on behalf of our users.
                  <br />
                  <br />
                  We are not responsible for the accuracy or reliability of the
                  advice provided by Moniests.
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box>
        <img width="100%" src="images/landing/divider_bg.png" alt="" />
      </Box>

      <Box id="faq" component="section">
        <Container maxWidth="lg">
          <Stack spacing={2} alignItems="center">
            <Box component="h1" fontSize="2rem">
              Frequently asked questions
            </Box>
            <Box component="h4" sx={{ opacity: 0.7, mt: "0 !important" }}>
              Everything you need to know about Moniesto.
            </Box>
            <FAQ></FAQ>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ background: softBgColor }} id="contact" component="section">
        <Container maxWidth="lg">
          <Stack padding="2rem" alignItems="center">
            <Box component="h1">Still have questions</Box>
            <Box component="h3" sx={{ opacity: 0.7 }}>
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </Box>
            <Button
              sx={{
                color: "white !important",
              }}
              size="large"
              variant="contained"
              color="secondary"
            >
              Get in touch
            </Button>
          </Stack>
        </Container>
      </Box>

      <Box component="footer">
        <Container maxWidth="xl">
          <Box paddingX={{ md: 5, xs: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <BrandText
                  sx={{ color: theme.palette.primary.main }}
                ></BrandText>
                <Box
                  component="h4"
                  sx={{ opacity: 0.6, maxWidth: 300, paddingBottom: 2 }}
                >
                  Discover the power of moniest insights to make better
                  investment decisions.
                </Box>
                <Stack
                  spacing={3}
                  sx={{
                    ">div": {
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: 0.9,
                    },
                  }}
                  direction="row"
                  alignItems="center"
                >
                  {links.map((link) => (
                    <Box
                      onClick={() => handleClickScroll(link.id, link.position)}
                      key={link.id}
                    >
                      {link.name}
                    </Box>
                  ))}

                  <Box>Terms</Box>
                  <Box>Privacy Policy</Box>
                </Stack>
              </Stack>
              <Navigator path="login">
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
                    Get Started
                  </Button>
                </Navigator>
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
              direction="row"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CopyrightOutlined
                  sx={{ color: theme.palette.primary.main }}
                  fontSize="small"
                />
                <Box>{new Date().getFullYear()} </Box>
                <Box> Moniesto.</Box>
                <Box> All rights reserved.</Box>
              </Stack>
              <Stack
                sx={{
                  ">.MuiSvgIcon-root": {
                    cursor: "pointer",
                    color: theme.palette.primary.main,
                  },
                }}
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
    </Box>
  );
};
