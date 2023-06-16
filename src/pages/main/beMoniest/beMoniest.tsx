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
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Stack } from "@mui/system";
import EmailStep from "./emailStep";
import MoniestInfoStep from "./moniestInfoStep";
import PaymentStep from "./paymentStep";
import SubmitStep from "./submitStep";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Moniest } from "../../../interfaces/user";
import api from "../../../services/api";
import { BeMoniestReq } from "../../../interfaces/requests";
import toastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../store/slices/userSlice";
import { useTranslate } from "../../../hooks/useTranslate";
import { RocketLaunchOutlined } from "@mui/icons-material";

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
    icon: <CreditCardOutlinedIcon />,
  },
  {
    order: 4,
    title: "submit",
    icon: <SendOutlinedIcon />,
  },
];
const BeMoniest = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const theme = useTheme();
  const translate = useTranslate();
  const user = useAppSelector((state) => state.user.user);
  const [moniest, setMoniest] = useState<Partial<BeMoniestReq>>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.moniest) {
      navigate("/timeline");
    }
  }, [navigate, user]);

  const handleNext = useCallback(
    (data?: Partial<Moniest>) => {
      setMoniest({ ...moniest, ...data });
      if (activeStep === steps.length) {
        api.moniest
          .be_moniest({
            bio: moniest?.bio!,
            card_id: moniest?.card_id!,
            description: moniest?.description!,
            fee: moniest?.fee!,
            message: "message",
          })
          .then((res) => {
            dispatch(setUser(res));
            toastService.open({
              severity: "success",
              message: translate("page.be_moniest.cong_moniest"),
            });
            setTimeout(() => {
              navigate("/timeline");
            }, 1000);
          });
      } else setActiveStep(activeStep + 1);
    },
    [activeStep, dispatch, moniest, navigate, translate]
  );

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  const handleChangeVerifyEmailState = useCallback(() => {
    dispatch(setUser({ ...user, email_verified: true }));
  }, [dispatch, user]);

  const stepContent = useMemo(() => {
    let content: ReactNode;
    switch (activeStep) {
      case 1:
        content = (
          <EmailStep
            email={user.email}
            handleVerifyEmail={handleChangeVerifyEmailState}
            emailVerified={user.email_verified as boolean}
            handleNext={handleNext}
          ></EmailStep>
        );
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
  }, [
    activeStep,
    handleBack,
    handleChangeVerifyEmailState,
    handleNext,
    user.email,
    user.email_verified,
  ]);

  return (
    <Card
      sx={{
        minHeight: { md: "calc(100vh - 150px)", xs: "calc(100vh - 134px)" },
        padding: { md: "1.8rem 2rem", xs: "1rem 1.2rem" },
      }}
    >
      <Stack pb={{ md: 6, xs: 3 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h2" pb={1.4}>
            {translate("page.be_moniest.be_moniest")}
          </Typography>
          <RocketLaunchOutlined />
        </Stack>
        <Divider></Divider>
        {activeStep === 1 && (
          <Stack spacing={1.5} mt={2}>
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
          <Step
            sx={{ px: "2px" }}
            key={step.title}
            completed={step.order <= activeStep}
          >
            <StepLabel icon={step.icon}>
              {translate("page.be_moniest.step." + step.title)}
            </StepLabel>
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
    </Card>
  );
};
export default BeMoniest;
