import {
  Autocomplete,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
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
import helper from "../../services/helper";

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

  const [selectedCurrencyPrice, setSelectedCurrencyPrice] = useState<number>(0);

  const oneMinLater = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now;
  };
  const formik = useFormik({
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
        duration: yup
          .date()
          .required("Duration is required")
          .min(oneMinLater(), "Duration must be greater than a minute"),
        currency: yup.string().required("Currency is required"),
        stop: yup
          .number()

          .when("direction", {
            is: "long",
            then: yup
              .number()
              .lessThan(
                selectedCurrencyPrice,
                `Stop should be lower than ${selectedCurrencyPrice}`
              ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .moreThan(
                selectedCurrencyPrice,
                `Stop should be more than ${selectedCurrencyPrice}`
              ),
          })

          .required("Stop is required"),
        target1: yup
          .number()
          .when("direction", {
            is: "long",
            then: yup
              .number()
              .moreThan(
                selectedCurrencyPrice,
                `TP1 should be greater than ${selectedCurrencyPrice}`
              ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .lessThan(
                selectedCurrencyPrice,
                `TP1 should be lower than ${selectedCurrencyPrice}`
              ),
          })
          .required("TP1 is required"),

        target2: yup
          .number()
          .when("direction", {
            is: "long",
            then: yup
              .number()
              .moreThan(
                formik.values.target1 || 0,
                `TP2 should be greater than ${formik.values.target1 || 0}`
              ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .lessThan(
                formik.values.target1 || 0,
                `TP2 should be lower than ${formik.values.target1 || 0}`
              ),
          })
          .required("TP2 is required"),

        target3: yup
          .number()

          .when("direction", {
            is: "long",
            then: yup
              .number()
              .moreThan(
                formik.values.target2 || 0,
                `TP3 should be greater than ${formik.values.target2 || 0}`
              ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .lessThan(
                formik.values.target2 || 0,
                `TP3 should be lower than ${formik.values.target2 || 0}`
              ),
          })
          .required("TP3 is required"),
      }),
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const savedData = await editorJs.current?.save();
      if (savedData) values.description = JSON.stringify(savedData);
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
    if (!formik.values.currency) return formik.submitForm();

    setSubmitLoading(true);
    const [coin] = await api.crypto.search_currencies(formik.values.currency);
    setSelectedCurrencyPrice(Number(coin.price));
    setSubmitLoading(false);
    formik.submitForm();
  };

  useEffect(() => {
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
      formik.setValues({
        ...formik.values,
        stop: 0,
        target1: 0,
        target2: 0,
        target3: 0,
      });
      return;
    }

    setLoading(true);
    api.crypto
      .search_currencies(formik.values.currency)
      .then((res) => setOptions(res))
      .finally(() => setLoading(false));
  }, [formik.values.currency]);

  const calculatedRound = (value: number = 0) =>
    value
      ? helper.parseCurrency(
          (helper.operatonByDirection(formik.values.direction) *
            (value - selectedCurrencyPrice) *
            100) /
            selectedCurrencyPrice
        )
      : 0;

  return (
    <Card
      sx={{
        minHeight: "calc(100vh - 150px)",
        padding: "1.8rem 2rem",
        background: theme.palette.background[500],
        overflow: "unset",
      }}
    >
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
      <Stack width="100%" spacing={8}>
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
                  setSelectedCurrencyPrice(Number(event?.price) || 0);
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
                            {helper.parseCurrency(selectedCurrencyPrice)}
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
                      onClick={() => {
                        setCalendarOpen(!calendarOpen);
                      }}
                      {...params}
                      error={
                        formik.touched.duration &&
                        Boolean(formik.errors.duration)
                      }
                      helperText={
                        formik.touched.duration && formik.errors.duration
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthOutlinedIcon
                              onClick={() => {
                                setCalendarOpen(!calendarOpen);
                              }}
                            />
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
                    disabled={!selectedCurrencyPrice}
                    fullWidth
                    name="target1"
                    placeholder="TP1"
                    type="number"
                    onFocus={() =>
                      formik.values.target1 == 0 &&
                      formik.setFieldValue("target1", "")
                    }
                    value={selectedCurrencyPrice ? formik.values.target1 : 0}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target1 && Boolean(formik.errors.target1)
                    }
                    helperText={formik.touched.target1 && formik.errors.target1}
                    InputProps={{
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
                    disabled={!selectedCurrencyPrice}
                    fullWidth
                    name="target2"
                    placeholder="TP2"
                    type="number"
                    onFocus={() =>
                      formik.values.target2 == 0 &&
                      formik.setFieldValue("target2", "")
                    }
                    value={selectedCurrencyPrice ? formik.values.target2 : 0}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target2 && Boolean(formik.errors.target2)
                    }
                    helperText={formik.touched.target2 && formik.errors.target2}
                    InputProps={{
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
                    disabled={!selectedCurrencyPrice}
                    fullWidth
                    name="target3"
                    placeholder="TP3"
                    type="number"
                    onFocus={() =>
                      formik.values.target3 == 0 &&
                      formik.setFieldValue("target3", "")
                    }
                    value={selectedCurrencyPrice ? formik.values.target3 : 0}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.target3 && Boolean(formik.errors.target3)
                    }
                    helperText={formik.touched.target3 && formik.errors.target3}
                    InputProps={{
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
                    disabled={!selectedCurrencyPrice}
                    fullWidth
                    name="stop"
                    placeholder="Stop"
                    type="number"
                    onFocus={() =>
                      formik.values.stop == 0 &&
                      formik.setFieldValue("stop", "")
                    }
                    value={selectedCurrencyPrice ? formik.values.stop : 0}
                    onChange={formik.handleChange}
                    error={formik.touched.stop && Boolean(formik.errors.stop)}
                    helperText={formik.touched.stop && formik.errors.stop}
                    InputProps={{
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
                    value={
                      !formik.values.stop
                        ? 0
                        : helper.operatonByDirection(formik.values.direction) *
                          helper.parseCurrency(
                            100 -
                              ((formik.values.stop || 1) /
                                (selectedCurrencyPrice || 1)) *
                                100
                          )
                    }
                    InputProps={{
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
              <Card
                sx={{
                  height: "80px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setShowDescription(true)}
              >
                <Stack>+ Add Description (Optional)</Stack>
              </Card>
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
    </Card>
  );
};
