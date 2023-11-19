import {
  Box,
  Card,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Stack } from "@mui/system";
import EmailStep from "./emailStep";
import MoniestInfoStep from "./moniestInfoStep";
import PaymentStep from "./paymentStep/paymentMethod";
import SubmitStep from "./submitStep";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import api from "../../../services/api";
import toastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/slices/userSlice";
import { useTranslate } from "../../../hooks/useTranslate";
import { PaymentsOutlined, RocketLaunchOutlined } from "@mui/icons-material";
import Confetti from "../../../components/shared/common/confetti";
import {
  nextStep,
  resetMoniestStepper,
} from "../../../store/slices/beMoniestSlice";
import { BeMoniestStepperFooter } from "./beMoniestStepperFooter";

type StepItem = {
  order: number;
  title: string;
  icon: ReactNode;
};
const steps: StepItem[] = [
  {
    order: 1,
    title: "email_verify",
    icon: <MailOutlineIcon />,
  },
  {
    order: 2,
    title: "moniest_info",
    icon: <ArticleOutlinedIcon />,
  },
  {
    order: 3,
    title: "payment_metod",
    icon: <PaymentsOutlined />,
  },
  {
    order: 4,
    title: "submit",
    icon: <SendOutlinedIcon />,
  },
];
const BeMoniest = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const stepperState = useAppSelector((state) => state.beMoniest);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.moniest) {
      navigate("/timeline");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (stepperState.activeStep > steps.length) {
      api.moniest
        .be_moniest(stepperState.data)
        .then((res) => {
          toastService.open({
            severity: "success",
            message: "page.be_moniest.cong_moniest",
          });
          setIsConfettiVisible(true);
          setTimeout(() => {
            dispatch(setUser(res));
            dispatch(resetMoniestStepper());
          }, 1500);
        })
        .catch(console.error);
    }
  }, [dispatch, stepperState.activeStep, stepperState.data]);

  const handleChangeVerifyEmailState = useCallback(() => {
    dispatch(setUser({ ...user, email_verified: true }));
  }, [dispatch, user]);

  const stepContent = useMemo(() => {
    let content: ReactNode;
    switch (stepperState.activeStep) {
      case 1:
        content = (
          <EmailStep
            email={user.email}
            handleVerifyEmail={handleChangeVerifyEmailState}
            emailVerified={user.email_verified as boolean}
          />
        );
        break;
      case 2:
        content = <MoniestInfoStep />;
        break;
      case 3:
        content = (
          <PaymentStep
            onChange={{
              binance: (val) => dispatch(nextStep({ binance_id: val })),
            }}
            defaults={{ binance_id: stepperState.data.binance_id }}
            footer={
              <BeMoniestStepperFooter
                handleNext={() => console.log("next step")}
              />
            }
          />
        );
        break;
      case 4:
      case 5:
        content = <SubmitStep />;
        break;
      // case 5:
      //   content = <DoneStep />;
      //   break;
    }
    return content;
  }, [
    stepperState.activeStep,
    stepperState.data.binance_id,
    user.email,
    user.email_verified,
    handleChangeVerifyEmailState,
    dispatch,
  ]);

  return (
    <Card
      sx={{
        minHeight: { md: "calc(100vh - 150px)", xs: "calc(100vh - 134px)" },
        padding: { md: "1.8rem 2rem", xs: "1rem 1.2rem" },
      }}
    >
      {isConfettiVisible && <Confetti></Confetti>}
      <Stack pb={{ md: 6, xs: 3 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h2" pb={1.4}>
            {translate("page.be_moniest.be_moniest")}
          </Typography>
          <RocketLaunchOutlined />
        </Stack>
        <Divider></Divider>
        {stepperState.activeStep === 1 && (
          <Stack spacing={1.5} mt={3}>
            <Typography sx={{ opacity: 0.7 }} variant="h3">
              {translate("page.be_moniest.start_journey")}
            </Typography>

            <Typography sx={{ opacity: 0.6 }} variant="h4">
              {translate("page.be_moniest.folow_steps")}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Stepper
        alternativeLabel
        sx={{
          ".MuiStepLabel-iconContainer": {
            ".MuiSvgIcon-root": {
              transition: "all 0.4s ease",
            },
            ".MuiStepLabel-labelContainer": {
              transition: "all 0.4s ease",
            },
          },
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
            borderColor: "transparent",
            ".MuiStepConnector-line": {
              borderColor: "transparent",
            },
            "&.Mui-completed": {
              ".MuiStepConnector-line": {
                borderColor: "transparent",
              },
            },
          },
        }}
        activeStep={stepperState.activeStep}
      >
        {steps.map((step) => (
          <Step
            sx={{ px: "2px" }}
            key={step.title}
            completed={step.order <= stepperState.activeStep}
          >
            <StepLabel icon={step.icon}>
              {translate("page.be_moniest.step." + step.title)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={6}>{stepContent}</Box>
    </Card>
  );
};
export default BeMoniest;
