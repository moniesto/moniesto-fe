import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { BeMoniestReq } from "../../../interfaces/requests";
import toastService from "../../../services/toastService";
import { User } from "../../../interfaces/user";
import { LoadingButton } from "@mui/lab";
import api from "../../../services/api";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  user: User;
};

const EmailStep = ({ handleNext, user }: propType) => {
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handleSendVerifyEmail = () => {
    setLoading(true);
    api.account
      .send_verification_email({
        redirect_url: "/bemoniest",
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
    <Stack rowGap={2} justifyContent="center" alignItems="center">
      {user.email_verified ? (
        <>
          <DoneAllOutlinedIcon
            sx={{
              fontSize: "4.6rem",
              color: theme.palette.secondary.main,
            }}
          />
          <Typography variant="h3">Your email is verified</Typography>
          <Stack mt={4} width="80%" alignItems="end">
            <Button
              onClick={() => handleNext({})}
              variant="contained"
              color="secondary"
            >
              Next
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
              We sent the mail to {user.email}
            </Typography>
            <Typography variant="h3">Please check your email</Typography>
          </Stack>
        </>
      ) : (
        <>
          <Typography sx={{ paddingTop: "2rem" }} variant="h3">
            You need to verify your email address to become a Moniest
          </Typography>
          <LoadingButton
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
  );
};
export default EmailStep;
