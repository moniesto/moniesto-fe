import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
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

type RegisterForm = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Register = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { usernameValidation, usernameInput } = useUsernameValidation();
  const [loading, setLoading] = useState<boolean>(false);

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
    name: yup
      .string()
      .max(
        configService?.validations?.max_name_length,
        translate("form.validation.name_max", {
          value: configService?.validations?.max_name_length,
        })
      )
      .required(translate("form.validation.name_req")),
    surname: yup
      .string()
      .max(
        configService?.validations?.max_surname_length,
        translate("form.validation.surname_max", {
          value: configService?.validations?.max_surname_length,
        })
      )
      .required(translate("form.validation.surname_req")),
    email: yup
      .string()
      .email(translate("form.validation.email_valid"))
      .required(translate("form.validation.email_req"))
      .matches(
        configService?.validations?.email_regex,
        translate("form.validation.email_valid")
      ),
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
  const formik = useFormik<RegisterForm>({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      password: "",
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
          <Fly.Item>
            <Typography fontSize={"2.2rem"}>
              {translate("page.register.title")}
            </Typography>
          </Fly.Item>
          <Fly.Item>
            <Typography fontSize={"2.6rem"} variant="h1">
              {translate("common.welcome")}
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
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  placeholder={translate("form.field.name")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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
                <TextField
                  fullWidth
                  id="surname"
                  name="surname"
                  placeholder={translate("form.field.surname")}
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
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
                <TextField
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
                <TextField
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
                    variant="h4"
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
