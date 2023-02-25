import { Card, InputAdornment, Stack, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import * as yup from "yup";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { KeyOutlined } from "@mui/icons-material";

export const PasswordSettings = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    old: yup.number().required("Fee is required"),
    new: yup.string().required("Bio is required"),
  });

  const handleSaveAccount = () => {
    setLoading(true);
    api.account
      .update_password(formik.values)
      .then((_) => {
        toastService.open({
          message: "Your password successfully updated",
          severity: "success",
        });
      })
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
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="old"
              type="password"
              value={formik.values.old}
              placeholder="Old password"
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
            <TextField
              fullWidth
              name="new"
              type="password"
              value={formik.values.new}
              placeholder="New password"
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
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
