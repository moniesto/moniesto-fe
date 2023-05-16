import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { useTranslate } from "../../../hooks/useTranslate";

export const FAQ = () => {
  const [expanded, setExpanded] = useState<number>(-1);
  const theme = useTheme();
  const translate = useTranslate();

  const handleChange = (panel: number) => {
    setExpanded(expanded == panel ? -1 : panel);
  };

  const faqs: { question: string; answer: string }[] = [...Array(6)].map(
    (x, i) => {
      return {
        question: "question" + (i + 1),
        answer: "answer" + (i + 1),
      };
    }
  );

  return (
    <Box id="faq" component="section">
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Box
            component="h1"
            fontSize={{ xs: "1.7rem", md: "2rem" }}
            lineHeight={1}
          >
            {translate("page.landing.faq.title")}
          </Box>
          <Box component="h4" sx={{ opacity: 0.7, mt: "0 !important" }}>
            {translate("page.landing.faq.header")}
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: 800,
              paddingTop: 2,
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                sx={{
                  border: "unset",
                  borderBottom: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "0 !important",
                  background: "white",
                  "::before": {
                    content: "unset",
                  },
                  ".MuiButtonBase-root": {
                    background: "white",
                    color: theme.palette.primary.main,
                  },
                }}
                key={"faq_" + index}
                expanded={expanded === index}
                onChange={() => handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === index ? (
                      <RemoveCircleOutline
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    ) : (
                      <AddCircleOutline
                        sx={{ color: theme.palette.secondary.main }}
                      />
                    )
                  }
                >
                  <Box fontWeight={600}>
                    {translate("page.landing.faq.questions." + faq.question)}
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "white",
                    color: theme.palette.primary.main,
                  }}
                >
                  <Box>
                    {" "}
                    {translate("page.landing.faq.questions." + faq.answer)}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
