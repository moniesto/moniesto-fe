import { Box, Button, Container, Stack } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

export const Contact = () => {
  const translate = useTranslate();

  return (
    <Box
      sx={{ background: "var(--theme-color-primary)", color: "white" }}
      id="contact"
      component="section"
    >
      <Container maxWidth="lg">
        <Stack
          textAlign={{ xs: "center", md: "unset" }}
          padding="5rem 0"
          alignItems="center"
        >
          <Box
            sx={{
              backgroundImage:
                "linear-gradient(to left, white, var(--theme-color-secondary))",
              color: "transparent",
              backgroundClip: "text",
            }}
            fontSize={{ md: 44, xs: 40 }}
            lineHeight={{ md: "55px", xs: "48px" }}
            margin={0}
            component="h1"
          >
            {translate("page.landing.still_question.title")}
          </Box>
          <Box
            fontSize={{ md: 26, xs: 22 }}
            lineHeight={{ md: "32px", xs: "29px" }}
            component="h3"
            sx={{ opacity: 0.9 }}
          >
            {translate("page.landing.still_question.header")}
          </Box>
          <Button
            href="mailto:noreply@moniesto.com?subject=From moniesto.com contact"
            sx={{
              color: "white !important",
              marginTop: 2,
              fontSize: "20px",
              height: "54px",
              padding: "0 40px",
            }}
            size="large"
            variant="contained"
            color="secondary"
          >
            {translate("page.landing.still_question.action")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
