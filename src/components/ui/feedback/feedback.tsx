import {
  ArticleOutlined,
  ClearOutlined,
  ForumOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslate } from "../../../hooks/useTranslate";
import { LoadingButton } from "@mui/lab";
import api from "../../../services/api";
import toastService from "../../../services/toastService";
import { Trans } from "react-i18next";

export const Feedback = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

  const validationSchema = yup.object({
    type: yup.string(),
    message: yup.string().required(translate("form.field.message_req")),
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      api.feedback
        .feedback(values)
        .then(() => {
          formik.resetForm();
          toastService.open({
            message: "component.feedback.toast.feedback_sent",
            severity: "success",
          });
        })
        .finally(() => {
          setLoading(false);
          setOpen(false);
        });
    },
  });

  return (
    <Box>
      <Button
        onClick={() => setOpen(true)}
        endIcon={<ForumOutlined />}
        variant="contained"
        color="secondary"
        sx={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          borderRadius: "100px",
        }}
      >
        {translate("component.feedback.title")}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { md: 420, xs: "90%" },
            background: theme.palette.background[600],
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 3, top: 3 }}
          >
            <ClearOutlined />
          </IconButton>
          <Box
            sx={{
              padding: "30px 20px 20px",
            }}
          >
            <Stack alignItems="center" spacing={1.3}>
              <Box>
                <TaskAltOutlined
                  sx={{
                    padding: "6px",
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    background: theme.palette.secondary[200],
                    color: theme.palette.secondary.main,
                  }}
                />
              </Box>
              <Typography variant="h3">
                {translate("component.feedback.header")}
              </Typography>
              <Typography variant="h4" textAlign="center" sx={{ opacity: 0.5 }}>
                <Trans i18nKey="component.feedback.message"></Trans>
              </Typography>
            </Stack>
            <Box mt={5}>
              <form onSubmit={formik.handleSubmit}>
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
                  name="message"
                  placeholder={translate("form.field.message")}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ArticleOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack direction="row" mt={2} spacing={4}>
                  <Button
                    onClick={() => setOpen(false)}
                    type="button"
                    sx={{ flex: 1 }}
                    variant="outlined"
                    color="inherit"
                  >
                    {translate("common.cancel")}
                  </Button>
                  <LoadingButton
                    sx={{ flex: 1 }}
                    type="submit"
                    color="secondary"
                    loading={loading}
                    variant="contained"
                  >
                    {translate("common.save")}
                  </LoadingButton>
                </Stack>
              </form>
            </Box>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};
