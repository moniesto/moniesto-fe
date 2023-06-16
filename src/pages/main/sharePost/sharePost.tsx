import {
  Autocomplete,
  Box,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { useFormik } from "formik";
import * as yup from "yup";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import api from "../../../services/api";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import ReactTimeAgo from "react-time-ago";

import { SwapVertOutlined } from "@mui/icons-material";
import toastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { Editor } from "../../../components/shared/common/editor/editor";
import { LoadingButton } from "@mui/lab";
import helper from "../../../services/helper";
import { DateTimeProvider } from "../../../components/shared/common/dateTimeProvider";
import { useTranslate } from "../../../hooks/useTranslate";
import { ApproximateScore } from "./approximateScore";
import { Post } from "../../../interfaces/post";
import { FormItem } from "../../../components/shared/common/formItem";

export const SharePost = () => {
  const [open, setOpen] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const translate = useTranslate();
  const theme = useTheme();

  const maxDuration = new Date();
  maxDuration.setDate(maxDuration.getDate() + 90);

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

  const getMinute = (value: number) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + value || 1);
    return now;
  };
  const formik = useFormik({
    initialValues: {
      currency: "",
      description: "",
      direction: "long",
      duration: getMinute(5).toString(),
      stop: 0,
      target1: 0,
      target2: 0,
      target3: 0,
    },
    validationSchema: () =>
      yup.object({
        duration: yup
          .date()
          .required(translate("form.validation.duration_req"))
          .max(
            maxDuration,
            translate("form.validation.duration_max", {
              date: maxDuration.toLocaleDateString(),
            })
          )
          .min(getMinute(1), translate("form.validation.duration_min")),

        currency: yup
          .string()
          .required(translate("form.validation.currency_req")),
        stop: yup
          .number()
          .moreThan(0, translate("form.validation.stop_min"))
          .required(translate("form.validation.stop_req"))
          .when("direction", {
            is: "long",
            then: yup.number().lessThan(
              selectedCurrencyPrice,
              translate("form.validation.stop_lower", {
                price: selectedCurrencyPrice,
              })
            ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .moreThan(
                selectedCurrencyPrice,
                translate("form.validation.stop_more", {
                  price: selectedCurrencyPrice,
                })
              )
              .lessThan(
                selectedCurrencyPrice * 2,
                translate("form.validation.stop_max", {
                  price: selectedCurrencyPrice * 2,
                })
              ),
          }),

        target1: yup
          .number()
          .when("direction", {
            is: "long",
            then: yup.number().moreThan(
              selectedCurrencyPrice,
              translate("form.validation.tp1_more", {
                price: selectedCurrencyPrice,
              })
            ),
          })
          .when("direction", {
            is: "short",
            then: yup.number().lessThan(
              selectedCurrencyPrice,
              translate("form.validation.tp1_lower", {
                price: selectedCurrencyPrice,
              })
            ),
          })
          .required(translate("form.validation.tp1_req")),

        target2: yup
          .number()
          .when("direction", {
            is: "long",
            then: yup.number().moreThan(
              formik.values.target1 || 0,
              translate("form.validation.tp2_more", {
                price: formik.values.target1 || 0,
              })
            ),
          })
          .when("direction", {
            is: "short",
            then: yup.number().lessThan(
              formik.values.target1 || 0,
              translate("form.validation.tp2_lower", {
                price: formik.values.target1 || 0,
              })
            ),
          })
          .required(translate("form.validation.tp2_req")),

        target3: yup
          .number()
          .moreThan(0, "o dan büyük olmalı")
          .when("direction", {
            is: "long",
            then: yup
              .number()
              .moreThan(
                formik.values.target2 || 0,
                translate("form.validation.tp3_more", {
                  price: formik.values.target2 || 0,
                })
              )
              .lessThan(
                selectedCurrencyPrice * 100,
                translate("form.validation.tp3_max", {
                  price: selectedCurrencyPrice * 100,
                })
              ),
          })
          .when("direction", {
            is: "short",
            then: yup.number().lessThan(
              formik.values.target2 || 0,
              translate("form.validation.tp3_lower", {
                price: formik.values.target2 || 0,
              })
            ),
          })
          .required(translate("form.validation.tp3_req")),
      }),
    onSubmit: async (values) => {
      setSubmitLoading(true);
      const savedData = await editorJs.current?.save();
      if (savedData) values.description = JSON.stringify(savedData);
      api.post
        .create_post(values)
        .then(() => {
          toastService.open({
            message: translate("page.share_post.toast.post_created"),
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

  const setDefaultOptions = () => {
    setOpen(true);
    if (options.length) return;

    setLoading(true);
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
            selectedCurrencyPrice,
          2
        )
      : 0;

  const handleCurrencyChange = (event: { currency: string; price: number }) => {
    const price = Number(event?.price) || 0;
    formik.setFieldValue("currency", event?.currency, true);
    setSelectedCurrencyPrice(price);
    setOptions([{ currency: event?.currency, price }]);
  };

  return (
    <Card
      sx={{
        minHeight: "calc(100vh - 150px)",
        padding: "1.8rem 2rem",
        background: theme.palette.background[500],
        overflow: "unset",
      }}
    >
      <Stack pb={2}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h2" pb={1.4}>
            {translate("page.share_post.share_post")}
          </Typography>
          <ApproximateScore
            isValid={formik.isValid}
            post={formik.values as Post}
          ></ApproximateScore>
        </Stack>
        <Divider></Divider>
      </Stack>
      <Stack width="100%" spacing={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <FormItem title={translate("form.field.currency")}>
                <Autocomplete
                  open={open}
                  onOpen={setDefaultOptions}
                  onClose={() => {
                    setOpen(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.currency === value.currency
                  }
                  getOptionLabel={(option) => option?.currency || ""}
                  options={options}
                  loading={loading}
                  onChange={(_, event) => {
                    handleCurrencyChange(event!);
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Stack
                        sx={{
                          width: "100%",
                        }}
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Box>{option.currency}</Box>
                        <Box>{helper.parseCurrency(option.price)}</Box>
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="currency"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.currency &&
                        Boolean(formik.errors.currency)
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
              </FormItem>
              <FormItem title={translate("form.field.duration")}>
                <DateTimeProvider>
                  <DateTimePicker
                    minDateTime={dayjs(new Date().toString())}
                    ampm={false}
                    open={calendarOpen}
                    onClose={() => setCalendarOpen(false)}
                    value={formik.values.duration}
                    onChange={(value) =>
                      formik.setFieldValue("duration", value, true)
                    }
                    renderInput={(params: any) => (
                      <TextField
                        fullWidth
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
                </DateTimeProvider>
              </FormItem>

              <FormItem title={translate("form.field.direction")}>
                <FormControl
                  error={
                    formik.touched.direction && Boolean(formik.errors.direction)
                  }
                  fullWidth
                >
                  <Select
                    color="secondary"
                    onChange={formik.handleChange}
                    name="direction"
                    value={formik.values.direction}
                    startAdornment={<SwapVertOutlined></SwapVertOutlined>}
                  >
                    <MenuItem value="long">{translate("common.long")}</MenuItem>
                    <MenuItem value="short">
                      {translate("common.short")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </FormItem>

              <Divider></Divider>
              {/* <Typography sx={{ opacity: 0.6 }} variant="h3">
                {translate("form.field.targets")}
              </Typography> */}
              <FormItem title={translate("form.field.targets")}>
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
                      placeholder={translate("form.field.tp_1")}
                      type="number"
                      onFocus={() =>
                        formik.values.target1 === 0 &&
                        formik.setFieldValue("target1", "", true)
                      }
                      value={selectedCurrencyPrice ? formik.values.target1 : 0}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.target1 && Boolean(formik.errors.target1)
                      }
                      helperText={
                        formik.touched.target1 && formik.errors.target1
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlagOutlinedIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography sx={{ opacity: 0.7 }} variant="h4">
                              {translate("form.field.tp_1")}
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
                      placeholder={translate("form.field.tp_2")}
                      type="number"
                      onFocus={() =>
                        formik.values.target2 === 0 &&
                        formik.setFieldValue("target2", "", true)
                      }
                      value={selectedCurrencyPrice ? formik.values.target2 : 0}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.target2 && Boolean(formik.errors.target2)
                      }
                      helperText={
                        formik.touched.target2 && formik.errors.target2
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlagOutlinedIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography sx={{ opacity: 0.7 }} variant="h4">
                              {translate("form.field.tp_2")}
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
                      placeholder={translate("form.field.tp_3")}
                      type="number"
                      onFocus={() =>
                        formik.values.target3 === 0 &&
                        formik.setFieldValue("target3", "", true)
                      }
                      value={selectedCurrencyPrice ? formik.values.target3 : 0}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.target3 && Boolean(formik.errors.target3)
                      }
                      helperText={
                        formik.touched.target3 && formik.errors.target3
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FlagOutlinedIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography sx={{ opacity: 0.7 }} variant="h4">
                              {translate("form.field.tp_3")}
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
                </Stack>
              </FormItem>
              <Divider></Divider>
              <FormItem title={translate("form.field.stop_point")}>
                <Stack
                  sx={{
                    ".MuiFormControl-root:last-of-type": {
                      maxWidth: "125px",
                    },
                  }}
                  direction="row"
                  spacing={1}
                >
                  <TextField
                    disabled={!selectedCurrencyPrice}
                    fullWidth
                    name="stop"
                    type="number"
                    onFocus={() =>
                      formik.values.stop === 0 &&
                      formik.setFieldValue("stop", "", true)
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
                            {translate("form.field.stop")}
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
                                100,
                            2
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
              </FormItem>
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
                <Stack>+ {translate("form.field.add_desc")}</Stack>
              </Card>
            )}

            <Stack>
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleShare}
                loading={submitLoading}
              >
                {translate("form.field.share")}
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
};
