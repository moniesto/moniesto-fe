import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";

import StarIcon from "@mui/icons-material/Star";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import api from "../../services/api";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReactTimeAgo from "react-time-ago";
import dayjs from "dayjs";
import { SwapVertOutlined } from "@mui/icons-material";
import toastService from "../../services/toastService";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../components/shared/common/editor/editor";
import { LoadingButton } from "@mui/lab";

export const SharePost = () => {
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const theme = useTheme();

  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const editorJs = useRef<{
    save(): Promise<any>;
  }>(null);

  const [options, setOptions] = React.useState<
    { currency: string; price: number }[]
  >([]);

  const [selectedOption, setSelectedOption] = useState<number>(0);

  const formik: FormikValues = useFormik({
    initialValues: {
      currency: "",
      description: "",
      direction: "long",
      duration: new Date().toString(),
      stop: 0,
      target1: 0,
      target2: 0,
      target3: 0,
    },
    validationSchema: () =>
      yup.object({
        duration: yup.string().required("duration is required"),
        direction: yup.string().required("Direction is required"),
        currency: yup.string().required("Currency is required"),
        description: yup.string(),
        stop: yup
          .number()
          .max(selectedOption, `Stop should be lower than ${selectedOption}`)
          .max(selectedOption, `Stop should be lower than ${selectedOption}`)
          .required("Stop is required"),
        target1: yup
          .number()
          .min(selectedOption, `TP1 should be greater than ${selectedOption}`)
          .required("TP1 is required"),
        target2: yup
          .number()
          .moreThan(
            formik.values.target1 || 0,
            `TP2 should be greater than ${formik.values.target1 || 0}`
          )
          .required("TP2 is required"),
        target3: yup
          .number()
          .moreThan(
            formik.values.target2 || 0,
            `TP3 should be greater than ${formik.values.target2 || 0}`
          )
          .required("TP3 is required"),
      }),
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const savedData = await editorJs.current?.save();

      values.description = JSON.stringify(savedData || {});
      api.post
        .create_post(values)
        .then(() => {
          toastService.open({
            message: "Your post successfully created",
            severity: "success",
          });
          navigate("/timeline");
        })
        .finally(() => setSubmitLoading(false));
    },
  });

  const handleShare = async () => {
    const [coin] = await api.crypto.search_currencies(formik.values.currency);
    setSelectedOption(Number(coin.price));
    formik.submitForm();
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const setDefaultOptions = () => {
    setLoading(true);
    setOpen(true);
    api.crypto
      .search_currencies("usdt")
      .then((res) => setOptions(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!formik.values.currency) {
      setOpen(false);
      return;
    }

    setLoading(true);
    api.crypto
      .search_currencies(formik.values.currency)
      .then((res) => setOptions(res))
      .finally(() => setLoading(false));
  }, [formik.values.currency]);

  const fixedTo = (value: number) =>
    value ? value.toFixed(3).replace(/\.?0+$/, "") : "";

  const calculatedRound = (value: number = 0) =>
    value ? fixedTo(((value - selectedOption) * 100) / selectedOption) : 0;

  return (
    <Paper sx={{ minHeight: "calc(100vh - 150px)", padding: "1.8rem 2rem" }}>
      <Stack pb={6}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h2" pb={1.4}>
            Share Post
          </Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h5" sx={{ opacity: "0.8" }}>
              Max Score
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              21.3
            </Typography>
            <StarIcon
              sx={{
                marginLeft: "0 !important",
                paddingBottom: "2px",
                fontSize: "1.1rem",
                color: "#FED839 !important",
              }}
            />
          </Stack>
        </Stack>
        <Divider></Divider>
      </Stack>
      <Stack width={"100%"} spacing={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Autocomplete
                open={open}
                onOpen={() => {
                  setDefaultOptions();
                }}
                onClose={() => {
                  setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.currency === value.currency
                }
                getOptionLabel={(option) => option.currency}
                options={options}
                loading={loading}
                onChange={(_, event) => {
                  formik.setFieldValue("currency", event?.currency, true);
                  setSelectedOption(Number(event?.price) || 0);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="currency"
                    placeholder="Currency"
                    onChange={formik.handleChange}
                    error={
                      formik.touched.currency && Boolean(formik.errors.currency)
                    }
                    helperText={
                      formik.touched.currency && formik.errors.currency
                    }
                    InputProps={{
                      ...params.InputProps,
                      color: "secondary",
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyBitcoinOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress
                              sx={{ mr: 1 }}
                              color="inherit"
                              size={20}
                            />
                          ) : null}
                          <Typography variant="h4">
                            {fixedTo(selectedOption as number)}
                          </Typography>

                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  minDateTime={dayjs(new Date().toString())}
                  ampm={false}
                  open={calendarOpen}
                  onClose={() => setCalendarOpen(false)}
                  label="Duration"
                  value={formik.values.duration}
                  onChange={(value) =>
                    formik.setFieldValue("duration", value, true)
                  }
                  renderInput={(params: any) => (
                    <TextField
                      onKeyDown={(e) => e.preventDefault()}
                      onClick={() => setCalendarOpen(!calendarOpen)}
                      {...params}
                      error={
                        formik.touched.duration &&
                        Boolean(formik.errors.duration)
                      }
                      helperText={
                        formik.touched.duration && formik.errors.duration
                      }
                      InputProps={{
                        color: "secondary",
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthOutlinedIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="h4">
                              <ReactTimeAgo
                                date={new Date(formik.values.duration)}
                              />
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              <FormControl
                error={
                  formik.touched.direction && Boolean(formik.errors.direction)
                }
                fullWidth
              >
                <InputLabel>Direction</InputLabel>
                <Select
                  color="secondary"
                  onChange={formik.handleChange}
                  placeholder="Direction"
                  name="direction"
                  value={formik.values.direction}
                  startAdornment={<SwapVertOutlined></SwapVertOutlined>}
                >
                  <MenuItem value="long">Long</MenuItem>
                  <MenuItem value="short">Short</MenuItem>
                </Select>
                {formik.touched.direction && formik.errors.direction ? (
                  <FormHelperText>Without label</FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>

              <Divider></Divider>
              <Typography sx={{ opacity: 0.6 }} variant="h3">
                Targets
              </Typography>
              <Stack
                spacing={2}
                sx={{
                  ">div": {
                    ".MuiFormControl-root:last-of-type": {
                      maxWidth: "125px",
                    },
                  },
                }}
              >
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    name="target1"
                    placeholder="TP1"
                    type="number"
                    // value={formik.values.target1}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target1 && Boolean(formik.errors.target1)
                    }
                    helperText={formik.touched.target1 && formik.errors.target1}
                    InputProps={{
                      color: "secondary",
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            TP1
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="0"
                    value={calculatedRound(formik.values.target1)}
                    InputProps={{
                      color: "secondary",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            %
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    name="target2"
                    placeholder="TP2"
                    type="number"
                    // value={formik.values.target2}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target2 && Boolean(formik.errors.target2)
                    }
                    helperText={formik.touched.target2 && formik.errors.target2}
                    InputProps={{
                      color: "secondary",
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            TP2
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="0"
                    value={calculatedRound(formik.values.target2)}
                    InputProps={{
                      color: "secondary",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            %
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    name="target3"
                    placeholder="TP3"
                    type="number"
                    // value={formik.values.target3}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target3 && Boolean(formik.errors.target3)
                    }
                    helperText={formik.touched.target3 && formik.errors.target3}
                    InputProps={{
                      color: "secondary",
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            TP3
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="0"
                    value={calculatedRound(formik.values.target3)}
                    InputProps={{
                      color: "secondary",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            %
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    name="stop"
                    placeholder="Stop"
                    type="number"
                    value={formik.values.stop}
                    onChange={formik.handleChange}
                    error={formik.touched.stop && Boolean(formik.errors.stop)}
                    helperText={formik.touched.stop && formik.errors.stop}
                    InputProps={{
                      color: "secondary",
                      startAdornment: (
                        <InputAdornment position="start">
                          <DoNotDisturbAltOutlinedIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            Stop
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    placeholder="0"
                    value={fixedTo(
                      100 - (formik.values.stop / selectedOption) * 100
                    )}
                    InputProps={{
                      color: "secondary",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            %
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Divider></Divider>
            {showDescription ? (
              <Editor
                label="Description (optional)"
                editorJs={editorJs}
              ></Editor>
            ) : (
              <Stack
                sx={{
                  height: "80px",
                  backgroundColor: theme.palette.background.input,
                  borderRadius: theme.palette.borderRadius.large,
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowDescription(true)}
              >
                + Add Description (Optional)
              </Stack>
            )}

            <Stack alignItems="end">
              <LoadingButton
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleShare}
                loading={submitLoading}
              >
                Share
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
