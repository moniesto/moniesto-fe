import {
  Box,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Stack } from "@mui/system";
import EmailStep from "./emailStep";
import MoniestInfoStep from "./moniestInfoStep";
import PaymentStep from "./paymentStep";
import SubmitStep from "./submitStep";
import { useAppSelector } from "../../../store/hooks";

type Step = {
  order: number;
  title: string;
  icon: ReactNode;
};
const steps: Step[] = [
  {
    order: 1,
    title: "Email verify",
    icon: <MailOutlineIcon />,
  },
  {
    order: 2,
    title: "Moniest information",
    icon: <ArticleOutlinedIcon />,
  },
  {
    order: 3,
    title: "Payment Method",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    order: 4,
    title: "Submit",
    icon: <SendOutlinedIcon />,
  },
];
const BeMoniest = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.email_verified) {
      handleNext();
    }
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const stepContent = useMemo(() => {
    let content: ReactNode;
    switch (activeStep) {
      case 1:
        content = <EmailStep handleNext={handleNext}></EmailStep>;
        break;
      case 2:
        content = (
          <MoniestInfoStep
            handleNext={handleNext}
            handleBack={handleBack}
          ></MoniestInfoStep>
        );
        break;
      case 3:
        content = (
          <PaymentStep
            handleNext={handleNext}
            handleBack={handleBack}
          ></PaymentStep>
        );
        break;
      case 4:
        content = (
          <SubmitStep
            handleNext={handleNext}
            handleBack={handleBack}
          ></SubmitStep>
        );
        break;
    }
    return content;
  }, [activeStep]);

  return (
    <Paper sx={{ minHeight: "calc(100vh - 150px)", padding: "1.8rem 2rem" }}>
      <Stack pb={6}>
        <Typography variant="h2" pb={1.4}>
          Be Moniest
        </Typography>
        <Divider></Divider>
      </Stack>
      <Stepper
        alternativeLabel
        sx={{
          ".Mui-completed": {
            ".MuiStepLabel-root": {
              opacity: 1,
            },
            ".MuiSvgIcon-root": {
              color: theme.palette.secondary.main,
            },
          },
          ".MuiStepLabel-root": {
            opacity: 0.7,
          },
          ".MuiStepLabel-label": {
            marginTop: "10px !important",
            fontSize: "0.8rem",
            fontWeight: "600 !important",
          },
          ".MuiStepConnector-root": {
            color: theme.palette.grey[500],
            "&.Mui-completed": {
              ".MuiStepConnector-line": {
                borderColor: theme.palette.secondary.main,
              },
            },
          },
        }}
        activeStep={activeStep}
      >
        {steps.map((step) => (
          <Step key={step.title} completed={step.order <= activeStep}>
            <StepLabel icon={step.icon}>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          ">*": {
            animation: "fadeIn 0.3s ease",
          },
        }}
        mt={6}
      >
        {stepContent}
      </Box>
    </Paper>
  );
};
export default BeMoniest;
