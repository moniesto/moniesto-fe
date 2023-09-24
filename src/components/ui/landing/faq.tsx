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
    setExpanded(expanded === panel ? -1 : panel);
  };

  const faqs: { question: string; answer: string }[] = [...Array(5)].map(
    (x, i) => {
      return {
        question: "question" + i,
        answer: "answer" + i,
      };
    }
  );

  return (
    <Box id="faq" component="section">
      <Container maxWidth="lg">
        <Stack spacing={2} padding="5rem 0" alignItems="center">
          <Box
            component="h1"
            fontSize={{ md: 44, xs: 40 }}
            lineHeight={{ md: "55px", xs: "48px" }}
            sx={{
              backgroundImage:
                "linear-gradient(to left, var(--theme-color-primary), var(--theme-color-secondary))",
              color: "transparent",
              backgroundClip: "text",
            }}
          >
            {translate("page.landing.faq.title")}
          </Box>

          <Box
            sx={{
              width: "100%",
              maxWidth: 800,
              fontSize: 23,
            }}
          >
            {faqs.map((faq, index) => (
              <Accordion
                sx={{
                  border: "unset",
                  borderBottom: "1px solid var(--theme-color-secondary)",
                  borderRadius: "0 !important",
                  background: "white",
                  "::before": {
                    content: "unset",
                  },
                  ".MuiButtonBase-root": {
                    background: "white",
                    color: theme.palette.primary.main,
                  },
                  ".MuiAccordionSummary-content": {
                    margin: "18px 0",
                  },
                  ".MuiAccordionSummary-expandIconWrapper>.MuiSvgIcon-root": {
                    fontSize: 32,
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
                  <Box fontWeight={600} padding="8px 0" lineHeight="30px">
                    {translate("page.landing.faq.questions." + faq.question)}
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: theme.palette.primary.main,
                    background: "var(--theme-background-secondary-light)",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    padding: 2,
                  }}
                >
                  <Box
                    sx={{
                      lineHeight: "23px",
                      fontSize: 18,
                      opacity: 0.8,
                      maxWidth: 700,
                      paddingRight: "20px",
                    }}
                  >
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
