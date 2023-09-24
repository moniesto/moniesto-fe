import { Box, Container, Stack } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

export const PaymentMethod = () => {
  const translate = useTranslate();

  return (
    <Box
      sx={{ background: "var(--theme-color-primary)", color: "white" }}
      minHeight="100vh"
      id="pricing"
      component="section"
    >
      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          padding="5rem 0"
          justifyContent="center"
          sx={{
            height: "100vh",
          }}
        >
          <Box
            href="https://pay.binance.com/"
            target="_blank"
            component="a"
            // margin="auto"
            position="relative"
            maxWidth={200}
            minWidth={80}
          >
            <img
              width="100%"
              height="100%"
              src="https://res.cloudinary.com/dniupzza6/image/upload/v1690191200/Photo/BackgroundPhotos/d0ff38a6-6db5-4e3a-8de5-4a89cd42dec4.png"
              alt="binance pay"
            />
          </Box>
          <Box
            fontSize={{ md: 50, xs: 44 }}
            lineHeight={{ md: "62px", xs: "55px" }}
            letterSpacing={{ md: 2, xs: 1 }}
            maxWidth={550}
            textAlign="center"
            mb={0}
            component="h1"
            sx={{
              backgroundImage:
                "linear-gradient(90deg, white 0%, var(--color-yellow-primary)  100%)",
              color: "transparent",
              backgroundClip: "text",
            }}
          >
            {translate("page.landing.payment.title")}
          </Box>

          <Stack
            sx={{
              background: "white",
              borderRadius: "10px",
              color: "var(--theme-color-primary)",
              marginTop: "3rem",
            }}
            padding="4rem 2rem"
            gap={5}
            flexDirection="row"
            flexWrap="wrap"
          >
            <Box flex={1} display="flex">
              <Box
                margin="auto"
                position="relative"
                maxWidth={320}
                minWidth={140}
              >
                <img
                  width="100%"
                  height="100%"
                  src="./images/landing/vector-btc.svg"
                  alt="vector-btc"
                />
              </Box>
            </Box>
            <Stack flex={2}>
              <Box fontSize={34} lineHeight="42px" marginTop={1} component="h1">
                {translate("page.landing.payment.sub_title")}
              </Box>
              <Box
                sx={{ opacity: 0.7 }}
                fontSize={22}
                lineHeight="30px"
                marginTop={1}
                component="h2"
              >
                {translate("page.landing.payment.desc")}
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
