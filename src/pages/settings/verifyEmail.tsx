import { Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { LoadingButton } from "@mui/lab";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "@mui/system";
import { useTranslate } from "../../hooks/useTranslate";

export const VerifyEmailSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

  const handleSendVerifyEmail = () => {
    setLoading(true);
    api.account
      .send_verification_email({
        redirect_url: "/settings/verify-email",
      })
      .then(() => {
        toastService.open({
          message: translate("page.settings.verify_email.toast.email_sent"),
          severity: "success",
        });
        setIsSendVerifyMail(true);
      })
      .catch()
      .finally(() => setLoading(false));
  };

  return (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <Stack
        mt={2}
        p={3}
        rowGap={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography width="100%" variant="h2" sx={{ opacity: 0.9 }}>
          {translate("page.settings.verify_email.title")}
        </Typography>
        {user.email_verified ? (
          <>
            <DoneAllOutlinedIcon
              sx={{
                fontSize: "4.6rem",
                color: theme.palette.secondary.main,
              }}
            />
            <Typography variant="h3">
              {translate("page.settings.verify_email.already_verified")}
            </Typography>
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
              <Typography variant="h4">
                {translate("page.settings.verify_email.send_mail_to", {
                  email: user.email,
                })}
              </Typography>
              <Typography pt={2} variant="h4">
                {translate("page.settings.verify_email.check_mail")}
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <Typography pb={2} sx={{ paddingTop: "2rem", fontSize: "1rem" }}>
              {translate("page.settings.verify_email.instructions_send")}
            </Typography>
            <LoadingButton
              fullWidth
              size="large"
              sx={{ marginTop: "1rem" }}
              onClick={handleSendVerifyEmail}
              type="submit"
              color="secondary"
              loading={loading}
              variant="contained"
            >
              {translate("page.settings.verify_email.verify")}
            </LoadingButton>
          </>
        )}
      </Stack>
    </Card>
  );
};
