import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

import { FAQ } from "../../components/ui/landing/faq";
import { Hero } from "../../components/ui/landing/hero/hero";
import { Footer } from "../../components/ui/landing/footer";
import { About } from "../../components/ui/landing/about";
import { PaymentMethod } from "../../components/ui/landing/paymentMethod";
import { Contact } from "../../components/ui/landing/contact";
import { sendAnalytic } from "../../services/analytic";

export const Landing = () => {
  const theme = useTheme();
  sendAnalytic({ hitType: "pageview", page: "Landing" });
  return (
    <Box
      className="landing-page"
      sx={{
        background: "white",
        color: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Hero></Hero>
      <About></About>
      <PaymentMethod />
      <FAQ></FAQ>
      <Contact></Contact>
      <Footer></Footer>
    </Box>
  );
};
