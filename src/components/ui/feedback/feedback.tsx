import {
  ArticleOutlined,
  ForumOutlined,
  RateReviewOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
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
import { FormItem } from "../../shared/common/formItem";
import { WrappedModal } from "../../shared/common/wrappedModal";

export const Feedback = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();
  const types: string[] = [
    "feature_request",
    "bug_report",
    "improvement",
    "other",
  ];

  const validationSchema = yup.object({
    type: yup.string().required(translate("form.validation.type_req")),
    message: yup.string().required(translate("form.validation.message_req")),
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
        variant="contained"
        color="secondary"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "-36px",
          transform: "rotate(270deg)",
          bottom: "110px",
          padding: "0 12px",
        }}
      >
        {translate("component.feedback.title")}
      </Button>
      <Button
        onClick={() => setOpen(true)}
        endIcon={<ForumOutlined />}
        variant="contained"
        color="secondary"
        sx={{
          position: "fixed",
          display: { xs: "none", md: "flex" },
          right: "30px",
          bottom: "30px",
          borderRadius: "100px",
        }}
      >
        {translate("component.feedback.title")}
      </Button>
      <WrappedModal width={420} opened={open} onClose={() => setOpen(false)}>
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
            <FormItem title={"+" + translate("form.field.feedback_type")}>
              <FormControl
                error={formik.touched.type && Boolean(formik.errors.type)}
                fullWidth
              >
                <Select
                  color="secondary"
                  onChange={formik.handleChange}
                  name="type"
                  value={formik.values.type}
                  startAdornment={<RateReviewOutlined />}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {translate("component.feedback.type." + type)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.errors.type}</FormHelperText>
              </FormControl>
            </FormItem>

            <FormItem title={translate("form.field.message")}>
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
                placeholder={"+" + translate("form.field.enter_message")}
                value={formik.values.message}
                onChange={formik.handleChange}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArticleOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </FormItem>
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
      </WrappedModal>
    </Box>
  );
};
