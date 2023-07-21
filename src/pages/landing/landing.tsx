import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

import { FAQ } from "../../components/ui/landing/faq";
import { Hero } from "../../components/ui/landing/hero/hero";
import { Footer } from "../../components/ui/landing/footer";
import { About } from "../../components/ui/landing/about";
import { Pricing } from "../../components/ui/landing/pricing";
import { WhoWeAre } from "../../components/ui/landing/whoWeAre";
import { Contact } from "../../components/ui/landing/contact";

export const Landing = () => {
  const theme = useTheme();
  return (
    <Box
      className="landing-page"
      sx={{
        background: "white",
        color: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        // gap: "5rem",
      }}
    >
      <Hero></Hero>
      <About></About>
      <Pricing></Pricing>
      <WhoWeAre></WhoWeAre>
      <Box>
        <img width="100%" src="images/landing/divider_bg.png" alt="" />
      </Box>
      <FAQ></FAQ>
      <Contact></Contact>
      <Footer></Footer>
    </Box>
  );
};
