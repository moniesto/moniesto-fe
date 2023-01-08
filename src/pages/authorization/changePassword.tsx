import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Navigator from "../../components/shared/common/navigatior";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import httpService from "../../services/httpService";
import { useNavigate, useSearchParams } from "react-router-dom";
import toastService from "../../services/toastService";

type ChangePasswordForm = {
  password: string;
  repassword: string;
};

const validationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  repassword: yup.string().required("Repassword is required"),
});

const ChangePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [validationTokenState, setValidationTokenState] = useState<0 | 1 | 2>(
    0
  ); //0 pending, 1 success, 2 fail

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setValidationTokenState(2);
      return;
    }
    setToken(token);
    httpService
      .post("account/password/verify_token", { token })
      .then(() => setValidationTokenState(1))
      .catch(() => setValidationTokenState(2));
  }, []);

  const handleChangePassword = (values: ChangePasswordForm) => {
    setLoading(true);
    httpService
      .post("/account/password/change_password", {
        new: values.password,
        token,
      })
      .then(() => {
        toastService.open({
          message:
            "You changed your password successfully. You can login with your new credentials.",
          severity: "success",
        });
        navigate("/login");
      })
      .catch(() => setValidationTokenState(2))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("validationTokenState :", validationTokenState);
  }, [validationTokenState]);

  const formik = useFormik<ChangePasswordForm>({
    initialValues: {
      password: "",
      repassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleChangePassword(values);
    },
  });

  return (
    <>
      {validationTokenState == 0 ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : validationTokenState == 1 ? (
        <Stack width={"100%"} maxWidth={500} spacing={8}>
          <Stack spacing={1.8}>
            <Typography fontSize={"2.2rem"}>Change Password</Typography>
            <Typography fontSize={"2.6rem"} variant="h1">
              Welcome
            </Typography>

            <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
              Please enter your password
            </Typography>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="repassword"
                  name="repassword"
                  placeholder="Confirm password"
                  type="password"
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.repassword &&
                    Boolean(formik.errors.repassword)
                  }
                  helperText={
                    formik.touched.repassword && formik.errors.repassword
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyOutlinedIcon />
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
                Save
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
      ) : (
        <Stack rowGap={3}>
          <Typography variant="h2">Sorry, this page is unavailable.</Typography>
          <Typography variant="h4">
            The link you clicked may be broken or the page may have been
            removed. Back to{" "}
            <Navigator path="/">
              <Typography fontWeight="bold" component="span" color="secondary">
                moniesto
              </Typography>{" "}
            </Navigator>
            .
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default ChangePassword;
