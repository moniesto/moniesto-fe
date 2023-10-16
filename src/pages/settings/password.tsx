import { Card, InputAdornment, Stack, Typography } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { KeyOutlined } from "@mui/icons-material";
import { useTranslate } from "../../hooks/useTranslate";
import { WrappedTextField } from "../../components/shared/common/wrappers/wrappedTextField";
import configService from "../../services/configService";

export const PasswordSettings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const translate = useTranslate();

  const validationSchema = yup.object({
    old: yup
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
      .required(translate("form.validation.old_pass_req")),
    new: yup
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
      .required(translate("form.validation.new_pass_req")),
  });

  const handleSaveAccount = () => {
    setLoading(true);
    api.account
      .update_password(formik.values)
      .then((_) => {
        toastService.open({
          message: translate("page.settings.password.toast.updated_success"),
          severity: "success",
        });
      })
      .catch()
      .finally(() => setLoading(false));
  };

  const formik = useFormik<{ old: string; new: string }>({
    enableReinitialize: true,
    initialValues: {
      new: "",
      old: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSaveAccount();
    },
  });

  return (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack mt={2} p={3} spacing={4}>
          <Typography variant="h2" sx={{ opacity: 0.9 }}>
            {translate("page.settings.password.title")}
          </Typography>
          <Stack spacing={2}>
            <WrappedTextField
              fullWidth
              name="old"
              type="password"
              value={formik.values.old}
              placeholder={translate("form.field.old_pass")}
              onChange={formik.handleChange}
              error={formik.touched.old && Boolean(formik.errors.old)}
              helperText={formik.touched.old && formik.errors.old}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <WrappedTextField
              fullWidth
              name="new"
              type="password"
              value={formik.values.new}
              placeholder={translate("form.field.new_pass")}
              onChange={formik.handleChange}
              error={formik.touched.new && Boolean(formik.errors.new)}
              helperText={formik.touched.new && formik.errors.new}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlined />
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
            {translate("common.save")}
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
