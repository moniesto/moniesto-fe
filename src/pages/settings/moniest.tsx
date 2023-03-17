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

export const MoniestSettings = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const validationSchema = yup.object({
    fee: yup
      .number()
      .min(1, "Fee should be greater then 0")
      .required("Fee is required"),
    bio: yup
      .string()
      .min(3, "Bio should be of minimum 3 characters length")
      .required("Bio is required"),
    description: yup.string(),
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
          message: "Your account successfully updated",
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
            Moniest Information
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="fee"
              type="number"
              value={formik.values.fee}
              placeholder="Monthly fee (USDT)"
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
              placeholder="Bio"
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
              placeholder="Description (optional)"
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
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
