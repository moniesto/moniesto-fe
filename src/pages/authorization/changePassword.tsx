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
import { useNavigate, useSearchParams } from "react-router-dom";
import toastService from "../../services/toastService";
import api from "../../services/api";
import { useTranslate } from "../../hooks/useTranslate";
import Fly from "../../components/shared/common/fly/fly";

type ChangePasswordForm = {
  password: string;
  repassword: string;
};

const ChangePassword = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [token, setToken] = useState<string>("");
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
    api.password
      .verify_token({ token })
      .then(() => setValidationTokenState(1))
      .catch(() => setValidationTokenState(2));
  }, []);

  const handleChangePassword = (values: ChangePasswordForm) => {
    setLoading(true);

    api.password
      .change_password_with_token({
        new: values.password,
        token,
      })
      .then(() => {
        toastService.open({
          message: "page.change_pass.toast.password_changed",
          severity: "success",
        });
        navigate("/login");
      })
      .catch(() => setValidationTokenState(2))
      .finally(() => setLoading(false));
  };

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, translate("form.validation.password_min"))
      .required(translate("form.validation.password_req")),
    repassword: yup
      .string()
      .required(translate("form.validation.confirm_password_req"))
      .oneOf(
        [yup.ref("password"), null],
        translate("form.validation.confirm_password_match")
      ),
  });

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
      {validationTokenState === 0 ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : validationTokenState === 1 ? (
        <Fly>
          <Stack width={"100%"} maxWidth={500} spacing={8}>
            <Stack spacing={1.8}>
              <Fly.Item>
                <Typography fontSize={"2.2rem"}>
                  {translate("page.change_pass.title")}
                </Typography>
              </Fly.Item>
              <Fly.Item>
                <Typography fontSize={"2.6rem"} variant="h1">
                  {translate("common.welcome")}
                </Typography>
              </Fly.Item>

              <Fly.Item>
                <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
                  {translate("page.change_pass.enter_pass")}
                </Typography>
              </Fly.Item>
            </Stack>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Fly.Item>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      placeholder={translate("form.field.password")}
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyOutlinedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Fly.Item>
                  <Fly.Item>
                    <TextField
                      fullWidth
                      id="repassword"
                      name="repassword"
                      placeholder={translate("form.field.confirm_password")}
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
                  </Fly.Item>
                </Stack>

                <Fly.Item>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    size="large"
                    color="secondary"
                    loading={loading}
                    variant="contained"
                  >
                    {translate("common.save")}
                  </LoadingButton>
                </Fly.Item>

                <Fly.Item>
                  <Stack
                    columnGap={1}
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="center"
                    color={theme.palette.text.secondary}
                  >
                    {translate("page.change_pass.action.back_to")}
                    <Navigator path="/login">
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant="h4"
                        color="secondary"
                      >
                        {translate("page.change_pass.action.login")}
                      </Typography>
                    </Navigator>
                  </Stack>
                </Fly.Item>
              </Stack>
            </form>
          </Stack>
        </Fly>
      ) : (
        <Stack rowGap={3}>
          <Typography variant="h2">
            {translate("page.change_pass.unavailable.title")}
          </Typography>
          <Typography variant="h4">
            {translate("page.change_pass.unavailable.body")}
            <Navigator path="/">
              <Typography fontWeight="bold" component="span" color="secondary">
                &nbsp;{translate("common.moniesto")}
              </Typography>
            </Navigator>
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default ChangePassword;
