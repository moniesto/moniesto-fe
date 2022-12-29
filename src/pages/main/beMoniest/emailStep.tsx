import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

type propType = { handleNext: () => void };

const EmailStep = ({ handleNext }: propType) => {
  const [isSendVerifyMail, setIsSendVerifyMail] = useState<boolean>(false);
  const [hasEmailVerified, setHasEmailVerified] = useState<boolean>(true);
  const theme = useTheme();

  const handleSendVerifyEmail = () => {
    setIsSendVerifyMail(true);
  };

  return (
    <Stack rowGap={2} justifyContent="center" alignItems="center">
      {hasEmailVerified ? (
        <>
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
                onClick={handleNext}
                variant="contained"
                color="secondary"
              >
                Next
              </Button>
            </Stack>
          </>
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
              We sent the mail to test@gmail.com
            </Typography>
            <Typography variant="h3">Please check your email</Typography>
          </Stack>
        </>
      ) : (
        <>
          <Typography sx={{ paddingTop: "2rem" }} variant="h3">
            You need to verify your email address to become a Moniest
          </Typography>
          <Button
            sx={{ marginTop: "1rem" }}
            onClick={handleSendVerifyEmail}
            variant="contained"
            color="secondary"
          >
            Verify Email
          </Button>
        </>
      )}
    </Stack>
  );
};
export default EmailStep;
