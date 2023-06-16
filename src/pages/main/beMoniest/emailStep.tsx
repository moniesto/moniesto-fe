import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { BeMoniestReq } from "../../../interfaces/requests";
import toastService from "../../../services/toastService";
import { LoadingButton } from "@mui/lab";
import api from "../../../services/api";
import { useTranslate } from "../../../hooks/useTranslate";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleVerifyEmail: () => void;
  emailVerified: boolean;
  email: string;
};

const EmailStep = ({
  handleNext,
  emailVerified,
  email,
  handleVerifyEmail,
}: propType) => {
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

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
    <Stack rowGap={2} justifyContent="center" alignItems="center">
      {emailVerified ? (
        <>
          <DoneAllOutlinedIcon
            sx={{
              fontSize: "4.6rem",
              color: theme.palette.secondary.main,
            }}
          />
          <Typography variant="h3">
            {translate("page.be_moniest.already_verified_email")}
          </Typography>
          <Stack mt={4} width="80%" alignItems="end">
            <Button
              onClick={() => handleNext({})}
              variant="contained"
              color="secondary"
            >
              {translate("common.next")}
            </Button>
          </Stack>
        </>
      ) : isSendVerifyMail ? (
        <>
          <DoneAllOutlinedIcon
            sx={{
              fontSize: "4.6rem",
              color: theme.palette.secondary.main,
            }}
          />
          <Stack alignItems="center" rowGap={1}>
            <Typography variant="h3">
              {translate("page.be_moniest.send_mailto", { email: email })}
            </Typography>
            <Typography variant="h3">
              {translate("page.be_moniest.check_mail")}
            </Typography>
          </Stack>
        </>
      ) : (
        <>
          <Typography sx={{ paddingTop: "2rem" }} variant="h3">
            {translate("page.be_moniest.need_verify")}
          </Typography>
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
        </>
      )}
    </Stack>
  );
};
export default EmailStep;
