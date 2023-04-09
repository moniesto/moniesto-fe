import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/system";

export const FAQ = () => {
  const [expanded, setExpanded] = useState<number>(-1);
  const theme = useTheme();

  const handleChange = (panel: number) => {
    setExpanded(expanded == panel ? -1 : panel);
  };

  const faqs: { question: string; answer: string }[] = [
    {
      question: "faq 1",
      answer: "Answer 1",
    },
    {
      question: "faq 2",
      answer: "Answer 2",
    },
    {
      question: "faq 3",
      answer: "Answer 3",
    },
    {
      question: "faq 4",
      answer: "Answer 4",
    },
  ];

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
            <Box fontWeight={600}>{faq.question}</Box>
          </AccordionSummary>
          <AccordionDetails sx={{
            background:"white",
            color: theme.palette.primary.main
          }}>
            <Box>{faq.answer}</Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
