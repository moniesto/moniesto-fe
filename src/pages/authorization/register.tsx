import { InputAdornment, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Navigator from "../../components/shared/common/navigatior";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";
import { setToken } from "../../store/slices/localStorageSlice";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useTranslate } from "../../hooks/useTranslate";
import configService from "../../services/configService";
import Fly from "../../components/shared/common/fly/fly";
import { useUsernameValidation } from "../../hooks/useUsernameValidation";
import { WrappedTextField } from "../../components/shared/common/wrappers/wrappedTextField";

type RegisterForm = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  language: string;
};

const Register = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { usernameValidation, usernameInput } = useUsernameValidation();
  const [loading, setLoading] = useState<boolean>(false);
  const browserLanguage = navigator.language.split("-")[0];

  const handleSubmit = (values: RegisterForm) => {
    setLoading(true);

    api.auth
      .register(values)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setToken(res.token));
        navigate("/timeline");
        toastService.open({
          severity: "success",
          message: "page.register.toast.register_success",
        });
      })
      .finally(() => setLoading(false));
  };

  const validationSchema = yup.object({
    username: usernameValidation,
    fullname: yup
      .string()
      .max(
        configService?.configs?.validation?.max_fullname_length as number,
        translate("form.validation.fullname_max", {
          value: configService?.configs?.validation?.max_fullname_length,
        })
      )
      .required(translate("form.validation.fullname_req")),
    email: yup
      .string()
      .email(translate("form.validation.email_valid"))
      .required(translate("form.validation.email_req"))
      .matches(
        configService?.configs?.validation?.email_regex as RegExp,
        translate("form.validation.email_valid")
      ),
    password: yup
      .string()
      .min(
        configService?.configs?.validation?.min_password_length as number,
        translate("form.validation.password_min", {
          value: configService?.configs?.validation?.min_password_length,
        })
      )
      .max(
        configService?.configs?.validation?.max_password_length as number,
        translate("form.validation.password_max", {
          value: configService?.configs?.validation?.max_password_length,
        })
      )
      .required(translate("form.validation.password_req")),
  });
  const formik = useFormik<RegisterForm>({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      language: browserLanguage,
    },
    initialTouched: {
      username: true,
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
          {/* <Fly.Item>
            <Typography fontSize={"2.2rem"}>
              {translate("page.register.title")}
            </Typography>
          </Fly.Item> */}
          <Fly.Item>
            <Typography fontSize={"2.6rem"} variant="h1">
              {translate("page.register.title")}
            </Typography>
          </Fly.Item>
          <Fly.Item>
            <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
              {translate("page.register.enter_detail")}
            </Typography>
          </Fly.Item>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Fly.Item>
                {usernameInput(
                  formik.values.username,
                  formik.handleChange,
                  formik.touched.username,
                  Boolean(formik.errors.username),
                  formik.errors.username
                )}
              </Fly.Item>
              <Fly.Item>
                <WrappedTextField
                  fullWidth
                  id="fullname"
                  name="fullname"
                  placeholder={translate("form.field.fullname")}
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullname && Boolean(formik.errors.fullname)
                  }
                  helperText={formik.touched.fullname && formik.errors.fullname}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Fly.Item>
              <Fly.Item>
                <WrappedTextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={translate("form.field.email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Fly.Item>
              <Fly.Item>
                <WrappedTextField
                  fullWidth
                  id="password"
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
                {translate("page.register.action.register")}
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
                {translate("page.register.action.have_account")}
                <Navigator path="/login">
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant="h3"
                    color="secondary"
                  >
                    {translate("page.register.action.login")}
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

export default Register;
