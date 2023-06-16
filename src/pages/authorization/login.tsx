import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Navigator from "../../components/shared/common/navigatior";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";
import { setToken } from "../../store/slices/localStorageSlice";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useTranslate } from "../../hooks/useTranslate";
import Fly from "../../components/shared/common/fly/fly";
import configService from "../../services/configService";

type LoginForm = {
  identifier: string;
  password: string;
};

const Login = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    identifier: yup
      .string()
      .required(translate("form.validation.identifier_req")),
    password: yup
      .string()
      .min(
        configService?.validations?.password_length,
        translate("form.validation.password_min", {
          value: configService?.validations?.password_length,
        })
      )
      .required(translate("form.validation.password_req")),
  });

  const handleSubmit = (values: LoginForm) => {
    setLoading(true);
    api.auth
      .login(values)
      .then((res) => {
        toastService.open({
          severity: "success",
          message: "page.login.toast.login_success",
        });
        dispatch(setUser(res.user));
        dispatch(setToken(res.token));
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik<LoginForm>({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Fly>
      <Stack width={"100%"} maxWidth={500} spacing={6}>
        <Stack spacing={1.8}>
          <Fly.Item>
            <Typography fontSize={"2.2rem"}>
              {translate("page.login.title")}
            </Typography>
          </Fly.Item>

          <Fly.Item>
            <Typography fontSize={"2.6rem"} variant="h1">
              {translate("common.welcome")}
            </Typography>
          </Fly.Item>
          <Fly.Item>
            <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
              {translate("page.login.enter_detail")}
            </Typography>
          </Fly.Item>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Fly.Item>
                <TextField
                  fullWidth
                  name="identifier"
                  placeholder={translate("form.field.email_or_username")}
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.identifier &&
                    Boolean(formik.errors.identifier)
                  }
                  helperText={
                    formik.touched.identifier && formik.errors.identifier
                  }
                  InputProps={{
                    autoComplete: "new-email",
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Fly.Item>
              <Fly.Item>
                <TextField
                  fullWidth
                  name="password"
                  placeholder={translate("form.field.password")}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    autoComplete: "new-password",
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Fly.Item>
              <Fly.Item>
                <Navigator path="/forget-password">
                  <Stack
                    alignItems="end"
                    color={theme.palette.grey[500]}
                    sx={{ cursor: "pointer" }}
                  >
                    {translate("page.login.action.forget_pass")}
                  </Stack>
                </Navigator>
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
                {translate("page.login.action.login")}
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
                {translate("page.login.action.no_account")}
                <Navigator path="/register">
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant="h4"
                    color="secondary"
                  >
                    {translate("page.login.action.register")}
                  </Typography>
                </Navigator>
              </Stack>
            </Fly.Item>
          </Stack>
        </form>
      </Stack>
    </Fly>
  );
};

export default Login;
