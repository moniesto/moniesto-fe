import React, { useEffect } from "react";
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";

import { useFormik } from "formik";
import * as yup from "yup";
import DoNotDisturbAltOutlinedIcon from "@mui/icons-material/DoNotDisturbAltOutlined";
import api from "../../../services/api";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

import { useState, useCallback } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import ReactTimeAgo from "react-time-ago";

import { SwapVertOutlined } from "@mui/icons-material";
import toastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import helper from "../../../services/helper";
import { DateTimeProvider } from "../../../components/shared/common/dateTimeProvider";
import { useTranslate } from "../../../hooks/useTranslate";
import { ApproximateScore } from "./approximateScore";
import { FormItem } from "../../../components/shared/common/formItem";
import { CurrencyInput } from "./currencyInput";
import configService from "../../../services/configService";
import { WrappedTextField } from "../../../components/shared/common/wrappers/wrappedTextField";
import { WrappedSelect } from "../../../components/shared/common/wrappers/wrappedSelect";
import { InfoChip } from "../../../components/shared/post/infoChip";
import { Editor } from "../../../components/shared/common/editor/editor";
import { normalizePostFromForm } from "./utils";
import { CreatePostReq } from "../../../interfaces/requests";

export const SharePost = () => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const translate = useTranslate();
  const theme = useTheme();

  const maxDuration = new Date();
  maxDuration.setDate(
    maxDuration.getDate() +
      (configService?.configs?.validation?.max_duration_day as number)
  );

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getMinute = (value: number) => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + value || 1);
    return now;
  };
  const formik = useFormik<
    CreatePostReq & {
      crypto_currency: {
        currency: string;
        price: number;
      };
    }
  >({
    initialValues: {
      crypto_currency: {
        currency: "",
        price: 0,
      },
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
        crypto_currency: yup.object({
          currency: yup
            .string()
            .required(translate("form.validation.currency_req")),
          price: yup.number(),
        }),
        stop: yup
          .number()
          .moreThan(0, translate("form.validation.stop_min"))
          .required(translate("form.validation.stop_req"))
          .when("direction", {
            is: "long",
            then: yup.number().lessThan(
              formik.values.crypto_currency.price,
              translate("form.validation.stop_lower", {
                price: formik.values.crypto_currency.price,
              })
            ),
          })
          .when("direction", {
            is: "short",
            then: yup
              .number()
              .moreThan(
                formik.values.crypto_currency.price,
                translate("form.validation.stop_more", {
                  price: formik.values.crypto_currency.price,
                })
              )
              .lessThan(
                formik.values.crypto_currency.price * 2,
                translate("form.validation.stop_max", {
                  price: formik.values.crypto_currency.price * 2,
                })
              ),
          }),

        target1: yup
          .number()
          .when("direction", {
            is: "long",
            then: yup.number().moreThan(
              formik.values.crypto_currency.price,
              translate("form.validation.tp1_more", {
                price: formik.values.crypto_currency.price,
              })
            ),
          })
          .when("direction", {
            is: "short",
            then: yup.number().lessThan(
              formik.values.crypto_currency.price,
              translate("form.validation.tp1_lower", {
                price: formik.values.crypto_currency.price,
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
                formik.values.crypto_currency.price * 100,
                translate("form.validation.tp3_max", {
                  price: formik.values.crypto_currency.price * 100,
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
      api.post
        .create_post(normalizePostFromForm(values))
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

  const fetchCurrency = useCallback(async (currency: string) => {
    const [coin] = await api.crypto.search_currencies(currency);
    return coin;
  }, []);

  const handleShare = async () => {
    if (!formik.values.crypto_currency.currency) return formik.submitForm();

    setSubmitLoading(true);
    const coin = await fetchCurrency(formik.values.crypto_currency.currency);
    formik.setFieldValue("crypto_currency.price", Number(coin?.price || 0));
    setSubmitLoading(false);
    formik.submitForm();
  };

  const calculatedRound = (value: number = 0) =>
    value
      ? helper.parseCurrency(
          (helper.operatonByDirection(formik.values.direction) *
            (value - formik.values.crypto_currency.price) *
            100) /
            formik.values.crypto_currency.price,
          2
        )
      : 0;

  const handleChangeDesc = useCallback(
    (value: string) => {
      formik.setValues({ ...formik.values, description: value });
    },
    [formik]
  );

  useEffect(() => {
    if (!formik.values.crypto_currency.currency) return;

    const timeout = setTimeout(async () => {
      const coin = await fetchCurrency(formik.values.crypto_currency.currency);
      formik.setFieldValue("crypto_currency.price", Number(coin?.price || 0));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fetchCurrency, formik, formik.values.crypto_currency.currency]);

  return (
    <Card
      sx={{
        padding: { xs: "1rem 1.1rem", md: "1.8rem 2rem" },
        background: theme.palette.background[500],
        overflow: "unset",
      }}
    >
      <Stack pb={2}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h2" pb={1.4}>
            {translate("page.share_post.share_post")}
          </Typography>
        </Stack>
        <Divider></Divider>
      </Stack>
      <Stack width="100%" spacing={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <FormItem title={translate("form.field.currency")}>
                <CurrencyInput
                  value={formik.values.crypto_currency}
                  onChange={(e) => {
                    formik.setValues({
                      ...formik.values,
                      crypto_currency: e,
                      stop: 0,
                      target1: 0,
                      target2: 0,
                      target3: 0,
                    });
                  }}
                  touched={formik.touched.crypto_currency?.currency}
                  error={formik.errors.crypto_currency?.currency}
                />
              </FormItem>
              <FormItem title={translate("form.field.duration")}>
                <DateTimeProvider>
                  <DateTimePicker
                    minDateTime={dayjs(new Date().toString())}
                    maxDate={dayjs(maxDuration.toString())}
                    ampm={false}
                    open={calendarOpen}
                    onOpen={() => setCalendarOpen(true)}
                    onClose={() => setCalendarOpen(false)}
                    value={formik.values.duration}
                    onChange={(value) =>
                      formik.setFieldValue("duration", value, true)
                    }
                    renderInput={(params: any) => (
                      <WrappedTextField
                        fullWidth
                        onBlur={formik.handleBlur}
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
                  <WrappedSelect
                    onBlur={formik.handleBlur}
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
                  </WrappedSelect>
                </FormControl>
              </FormItem>

              <Divider></Divider>

              <FormItem title={translate("form.field.targets")}>
                <Stack
                  spacing={2}
                  // sx={{
                  //   ">div": {
                  //     ".MuiFormControl-root:last-of-type": {
                  //       maxWidth: "125px",
                  //     },
                  //   },
                  // }}
                >
                  <WrappedTextField
                    disabled={!formik.values.crypto_currency.price}
                    fullWidth
                    name="target1"
                    placeholder={translate("form.field.tp_1")}
                    type="number"
                    onBlur={formik.handleBlur}
                    onFocus={() =>
                      formik.values.target1 === 0 &&
                      formik.setFieldValue("target1", "", true)
                    }
                    value={
                      formik.values.crypto_currency.price
                        ? formik.values.target1
                        : 0
                    }
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
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target1
                            )} %`}
                            loading={false}
                          />
                          {/* <Box
                              component="h4"
                              sx={{
                                padding: "2px 8px",
                                marginRight: "10px",
                                background: "rgba(0,0,0,0.03)",
                                border: "2px solid #e8e8e8",
                                borderRadius: "100px",
                              }}
                            >
                              {calculatedRound(formik.values.target1)} %
                            </Box> */}
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_1")}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <WrappedTextField
                    disabled={!formik.values.crypto_currency.price}
                    fullWidth
                    name="target2"
                    placeholder={translate("form.field.tp_2")}
                    onBlur={formik.handleBlur}
                    type="number"
                    onFocus={() =>
                      formik.values.target2 === 0 &&
                      formik.setFieldValue("target2", "", true)
                    }
                    value={
                      formik.values.crypto_currency.price
                        ? formik.values.target2
                        : 0
                    }
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
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target2
                            )} %`}
                            loading={false}
                          />
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_2")}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <WrappedTextField
                    disabled={!formik.values.crypto_currency.price}
                    fullWidth
                    name="target3"
                    placeholder={translate("form.field.tp_3")}
                    type="number"
                    onBlur={formik.handleBlur}
                    onFocus={() =>
                      formik.values.target3 === 0 &&
                      formik.setFieldValue("target3", "", true)
                    }
                    value={
                      formik.values.crypto_currency.price
                        ? formik.values.target3
                        : 0
                    }
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
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target3
                            )} %`}
                            loading={false}
                          />
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_3")}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </FormItem>
              <Divider></Divider>
              <FormItem title={translate("form.field.stop_point")}>
                <WrappedTextField
                  disabled={!formik.values.crypto_currency.price}
                  fullWidth
                  name="stop"
                  type="number"
                  onFocus={() =>
                    formik.values.stop === 0 &&
                    formik.setFieldValue("stop", "", true)
                  }
                  value={
                    formik.values.crypto_currency.price ? formik.values.stop : 0
                  }
                  onBlur={formik.handleBlur}
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
                        <InfoChip
                          sx={{ marginRight: 1 }}
                          value={`${
                            !formik.values.stop
                              ? 0
                              : helper.operatonByDirection(
                                  formik.values.direction
                                ) *
                                helper.parseCurrency(
                                  100 -
                                    ((formik.values.stop || 1) /
                                      (formik.values.crypto_currency.price ||
                                        1)) *
                                      100,
                                  2
                                )
                          } %`}
                          loading={false}
                        />
                        <Typography sx={{ opacity: 0.7 }} variant="h4">
                          {translate("form.field.stop")}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormItem>
            </Stack>
            <Divider></Divider>
            {showDescription ? (
              <Editor
                label={translate("form.field.description")}
                onChange={handleChangeDesc}
              />
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

            <Box>
              <ApproximateScore
                isSubmitting={submitLoading}
                isValid={formik.dirty && formik.isValid && !formik.isValidating}
                post={normalizePostFromForm(formik.values)}
              ></ApproximateScore>
            </Box>

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
