import { InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Navigator from "../../components/shared/common/navigatior";
import toastService from "../../services/toastService";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import api from "../../services/api";
import { useTranslate } from "../../hooks/useTranslate";
import configService from "../../services/configService";
import Fly from "../../components/shared/common/fly/fly";

type ForgetPasswordForm = {
  email: string;
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const translate = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(translate("form.validation.email_valid"))
      .required(translate("form.validation.email_req"))
      .matches(
        configService?.validations?.email_regex,
        translate("form.validation.email_valid")
      ),
  });

  const handleForgetPassword = (values: ForgetPasswordForm) => {
    setLoading(true);
    api.password
      .send_email({ email: values.email })
      .then(() => {
        toastService.open({
          message: "page.forget_pass.toast.mail_sent",
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
    <Fly>
      <Stack width={"100%"} maxWidth={500} spacing={8}>
        <Stack spacing={1.8}>
          {/* <Fly.Item>
            <Typography fontSize={"2.2rem"}>
              {translate("page.forget_pass.title")}
            </Typography>
          </Fly.Item> */}

          <Fly.Item>
            <Typography fontSize={"2.6rem"} variant="h1">
              {translate("page.forget_pass.title")}
            </Typography>
          </Fly.Item>

          <Fly.Item>
            <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
              {translate("page.forget_pass.enter_email")}
            </Typography>
          </Fly.Item>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
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
                    autoComplete: "new-email",
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
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
                {translate("page.forget_pass.action.continue")}
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
                {translate("page.forget_pass.action.back_to")}
                <Navigator path="/login">
                  <Typography
                    sx={{ cursor: "pointer" }}
                    variant="h3"
                    color="secondary"
                  >
                    {translate("page.forget_pass.action.login")}
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

export default ForgetPassword;
