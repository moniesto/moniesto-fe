import { Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import toastService from "../../../services/toastService";
import { LoadingButton } from "@mui/lab";
import api from "../../../services/api";
import { useTranslate } from "../../../hooks/useTranslate";
import Fly from "../../../components/shared/common/fly/fly";
import { useAppDispatch } from "../../../store/hooks";
import { nextStep } from "../../../store/slices/beMoniestSlice";
import { BeMoniestStepperFooter } from "./beMoniestStepperFooter";

type propType = {
  handleVerifyEmail: () => void;
  emailVerified: boolean;
  email: string;
};

const EmailStep = ({ emailVerified, email, handleVerifyEmail }: propType) => {
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const handleSendVerifyEmail = () => {
    setLoading(true);
    api.account
      .send_verification_email({
        redirect_url: "/bemoniest",
      })
      .then(() => {
        toastService.open({
          message: translate("page.be_moniest.toast.mail_sent"),
          severity: "success",
        });
        setIsSendVerifyMail(true);
      })
      .catch((e) => {
        if (e.error_code === "Account_EmailVerification_AlreadyVerified") {
          handleVerifyEmail();
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Fly>
      <Stack rowGap={2} justifyContent="center" alignItems="center">
        {emailVerified ? (
          <>
            <Fly.Item>
              <DoneAllOutlinedIcon
                sx={{
                  fontSize: "4.6rem",
                  color: theme.palette.secondary.main,
                }}
              />
            </Fly.Item>
            <Fly.Item>
              <Typography variant="h3">
                {translate("page.be_moniest.already_verified_email")}
              </Typography>
            </Fly.Item>
            <Fly.Item sx={{ width: "100%" }}>
              <BeMoniestStepperFooter
                handleNext={() => dispatch(nextStep(null))}
              />
            </Fly.Item>
          </>
        ) : isSendVerifyMail ? (
          <>
            <Fly.Item>
              <DoneAllOutlinedIcon
                sx={{
                  fontSize: "4.6rem",
                  color: theme.palette.secondary.main,
                }}
              />
            </Fly.Item>

            <Stack alignItems="center" rowGap={1}>
              <Fly.Item>
                <Typography variant="h3">
                  {translate("page.be_moniest.send_mailto", { email: email })}
                </Typography>
              </Fly.Item>
              <Fly.Item>
                <Typography variant="h3">
                  {translate("page.be_moniest.check_mail")}
                </Typography>
              </Fly.Item>
            </Stack>
          </>
        ) : (
          <Fly.Item>
            <>
              <Typography sx={{ paddingTop: "2rem" }} variant="h3">
                {translate("page.be_moniest.need_verify")}
              </Typography>
              <Stack alignItems="center">
                <LoadingButton
                  sx={{ marginTop: "1rem" }}
                  onClick={handleSendVerifyEmail}
                  type="submit"
                  color="secondary"
                  loading={loading}
                  variant="contained"
                >
                  {translate("page.be_moniest.verify_email")}
                </LoadingButton>
              </Stack>
            </>
          </Fly.Item>
        )}
      </Stack>
    </Fly>
  );
};
export default EmailStep;
