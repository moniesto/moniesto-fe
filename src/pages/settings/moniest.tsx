import {
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as yup from "yup";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import {
  AccountBoxOutlined,
  ArticleOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { setUser } from "../../store/slices/userSlice";
import { useTranslate } from "../../hooks/useTranslate";
import configService from "../../services/configService";

export const MoniestSettings = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const translate = useTranslate();

  const validationSchema = yup.object({
    fee: yup
      .number()
      .min(
        configService?.validations?.min_fee,
        translate("form.validation.fee_min", {
          value: configService?.validations?.min_fee,
        })
      )
      .required("form.validation.fee_req"),
    bio: yup
      .string()
      .max(
        configService?.validations?.max_bio_lenght,
        translate("form.validation.bio_max", {
          value: configService?.validations?.max_bio_lenght,
        })
      )
      .required(translate("form.validation.bio_req")),
    description: yup.string().max(
      configService?.validations?.max_description_length,
      translate("form.validation.desc_max", {
        value: configService?.validations?.max_description_length,
      })
    ),
  });

  const handleSaveAccount = () => {
    setLoading(true);
    api.moniest
      .update_profile({
        bio: formik.values.bio,
        description: formik.values.description,
        subscription_info: {
          fee: formik.values.fee as number,
        },
      })
      .then((response) => {
        dispatch(setUser(response));
        toastService.open({
          message: translate("page.settings.moniest.toast.updated_success"),
          severity: "success",
        });
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fee: user.moniest?.subscription_info.fee,
      bio: user.moniest?.bio,
      description: user.moniest?.description,
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
            {translate("page.settings.moniest.title")}
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="fee"
              type="number"
              value={formik.values.fee}
              placeholder={translate("form.field.fee")}
              onChange={formik.handleChange}
              error={formik.touched.fee && Boolean(formik.errors.fee)}
              helperText={formik.touched.fee && formik.errors.fee}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{
                ".MuiInputBase-root": {
                  alignItems: "baseline",
                  paddingLeft: "14px !important",
                },
              }}
              multiline
              rows={4}
              fullWidth
              name="bio"
              placeholder={translate("form.field.bio")}
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{
                ".MuiInputBase-root": {
                  alignItems: "baseline",
                  paddingLeft: "14px !important",
                },
              }}
              multiline
              rows={7}
              fullWidth
              name="description"
              placeholder={translate("form.field.desc")}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ArticleOutlined />
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
