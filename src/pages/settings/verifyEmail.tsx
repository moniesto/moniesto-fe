import { Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { LoadingButton } from "@mui/lab";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useAppSelector } from "../../store/hooks";
import { useTheme } from "@mui/system";

export const VerifyEmailSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handleSendVerifyEmail = () => {
    setLoading(true);
    api.account
      .send_verification_email({
        redirect_url: "http://localhost:3000/settings/verify-email",
      })
      .then(() => {
        toastService.open({
          message: "We send an email to your email address.",
          severity: "success",
        });
        setIsSendVerifyMail(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card
      sx={{
        paddingBottom: 2,
        background: theme.palette.background[500],
      }}
    >
      <Stack
        mt={2}
        p={3}
        rowGap={2}
        justifyContent="center"
        alignItems="center"
      >
        {user.email_verified ? (
          <>
            <DoneAllOutlinedIcon
              sx={{
                fontSize: "4.6rem",
                color: theme.palette.secondary.main,
              }}
            />
            <Typography variant="h3">Your email is verified</Typography>
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
                We sent the mail to {user.email}
              </Typography>
              <Typography variant="h3">Please check your email</Typography>
            </Stack>
          </>
        ) : (
          <>
            <Typography sx={{ paddingTop: "2rem" }} variant="h3">
              After pressing the button, follow the instructions in the link
              that we will send to your e-mail.
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
              Verify Email
            </LoadingButton>
          </>
        )}
      </Stack>
    </Card>
  );
};
