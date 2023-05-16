import { Box, Button, Container, Stack } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

export const Contact = () => {
  const translate = useTranslate();

  return (
    <Box
      sx={{ background: "var(--theme-secondary-bg)" }}
      id="contact"
      component="section"
    >
      <Container maxWidth="lg">
        <Stack padding="2rem" alignItems="center">
          <Box component="h1">
            {translate("page.landing.still_question.title")}
          </Box>
          <Box component="h3" sx={{ opacity: 0.7 }}>
            {translate("page.landing.still_question.header")}
          </Box>
          <Button
            href="mailto:noreply@moniesto.com?subject=From moniesto.com contact"
            sx={{
              color: "white !important",
              marginTop: 2,
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
