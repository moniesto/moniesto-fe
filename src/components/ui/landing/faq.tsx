import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
            <Box> {translate("page.landing.faq.questions." + faq.answer)}</Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
