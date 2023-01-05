import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Navigator from "../../components/shared/common/navigatior";
import httpService from "../../services/httpService";
import toastService from "../../services/toastService";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

type ForgetPasswordForm = {
  email: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgetPassword = (values: ForgetPasswordForm) => {
    setLoading(true);
    httpService
      .post("account/password/send_email", { email: values.email })
      .then(() => {
        toastService.open({
          message: "We send an mail to you. Please check your email address.",
          severity: "success",
        });
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };
  const formik = useFormik<ForgetPasswordForm>({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleForgetPassword(values);
    },
  });

  return (
    <Stack width={"100%"} maxWidth={500} spacing={8}>
      <Stack spacing={1.8}>
        <Typography fontSize={"2.2rem"}>Forget Password</Typography>
        <Typography fontSize={"2.6rem"} variant="h1">
          Welcome
        </Typography>

        <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
          Please enter your email
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email or username"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                autoComplete: "new-email",
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <LoadingButton
            type="submit"
            size="large"
            color="secondary"
            loading={loading}
            variant="contained"
          >
            Continue
          </LoadingButton>

          <Stack
            columnGap={1}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            color={theme.palette.text.secondary}
          >
            Back to
            <Navigator path="/login">
              <Typography
                sx={{ cursor: "pointer" }}
                variant="h4"
                color="secondary"
              >
                Login
              </Typography>
            </Navigator>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default ForgetPassword;
