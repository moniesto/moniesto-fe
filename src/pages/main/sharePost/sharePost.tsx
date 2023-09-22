import React, { useEffect, useRef } from "react";
import {
  Box,
  // Box,
  Card,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

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

import { RemoveOutlined, SwapVertOutlined } from "@mui/icons-material";
import toastService from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { DateTimeProvider } from "../../../components/shared/common/dateTimeProvider";
import { useTranslate } from "../../../hooks/useTranslate";
// import { ApproximateScore } from "./approximateScore";
import { FormItem } from "../../../components/shared/common/formItem";
import { CurrencyInput } from "./currencyInput";
import configService from "../../../services/configService";
import { WrappedTextField } from "../../../components/shared/common/wrappers/wrappedTextField";
import { WrappedSelect } from "../../../components/shared/common/wrappers/wrappedSelect";
import { InfoChip } from "../../../components/shared/post/infoChip";
import { Editor } from "../../../components/shared/common/editor/editor";
import {
  normalizePostFromForm,
  operationByDirection,
  roundNumber,
} from "./utils";
import { CreatePostReq } from "../../../interfaces/requests";

import { PreviewPost } from "./previewPost";
import { SelectMarket } from "./selectMarket";
import { LeverageSliderWrapper } from "./leverageSliderWrapper";

export type PostFormType = CreatePostReq & {
  crypto_currency: {
    currency: string;
    price: number;
  };
};

export type TargetType = {
  target1: boolean;
  target2: boolean;
  target3: boolean;
};

export const SharePost = () => {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [previewModalOpened, setPreviewModalOpened] = useState(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [displayedTargets, setDisplayedTargets] = useState<TargetType>({
    target1: false,
    target2: false,
    target3: false,
  });

  let currencyTimeout = useRef<NodeJS.Timeout | null>(null);

  const translate = useTranslate();

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
  const formik = useFormik<PostFormType>({
    initialValues: {
      crypto_currency: {
        currency: "",
        price: 0,
      },
      currency: "",
      market_type: "futures",
      leverage: 1,
      description: "",
      direction: "long",
      duration: getMinute(5).toString(),
      stop: 0,
      take_profit: 0,
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
            then: yup
              .number()
              .lessThan(
                formik.values.crypto_currency.price,
                translate("form.validation.stop_lower", {
                  price: roundNumber(formik.values.crypto_currency.price),
                })
              )
              .moreThan(
                formik.values.crypto_currency.price -
                  formik.values.crypto_currency.price *
                    (1 / formik.values.leverage),
                translate("form.validation.stop_more", {
                  price: roundNumber(
                    formik.values.crypto_currency.price -
                      formik.values.crypto_currency.price *
                        (1 / formik.values.leverage)
                  ),
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
                  price: roundNumber(formik.values.crypto_currency.price),
                })
              )
              .lessThan(
                formik.values.crypto_currency.price +
                  formik.values.crypto_currency.price *
                    (1 / formik.values.leverage),
                translate("form.validation.stop_lower", {
                  price: roundNumber(
                    formik.values.crypto_currency.price +
                      formik.values.crypto_currency.price *
                        (1 / formik.values.leverage)
                  ),
                })
              ),
          }),

        take_profit: yup
          .number()
          .moreThan(0, translate("form.validation.tp_more", { price: 0 }))
          .when("direction", {
            is: "long",
            then: yup
              .number()
              .moreThan(
                formik.values.crypto_currency.price,
                translate("form.validation.tp_more", {
                  price: roundNumber(formik.values.crypto_currency.price),
                })
              )
              .lessThan(
                formik.values.crypto_currency.price *
                  (configService.configs.validation
                    .long_max_take_profit_multiplier as number),
                translate("form.validation.tp_lower", {
                  price: roundNumber(
                    formik.values.crypto_currency.price *
                      (configService.configs.validation
                        .long_max_take_profit_multiplier as number)
                  ),
                })
              ),
          })
          .when("direction", {
            is: "short",
            then: yup.number().lessThan(
              formik.values.crypto_currency.price,
              translate("form.validation.tp_lower", {
                price: roundNumber(formik.values.crypto_currency.price),
              })
            ),
          })
          .required(translate("form.validation.tp_req")),

        target1: displayedTargets.target1
          ? yup
              .number()
              .when("direction", {
                is: "long",
                then: yup
                  .number()
                  .moreThan(
                    formik.values.crypto_currency.price || 0,
                    translate("form.validation.tp1_more", {
                      price: roundNumber(
                        formik.values.crypto_currency.price || 0
                      ),
                    })
                  )
                  .lessThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp1_lower", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .when("direction", {
                is: "short",
                then: yup
                  .number()
                  .lessThan(
                    formik.values.crypto_currency.price || 0,
                    translate("form.validation.tp1_lower", {
                      price: roundNumber(
                        formik.values.crypto_currency.price || 0
                      ),
                    })
                  )
                  .moreThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp1_more", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .required(translate("form.validation.tp1_req"))
          : yup.number(),

        target2: displayedTargets.target2
          ? yup
              .number()
              .when("direction", {
                is: "long",
                then: yup
                  .number()
                  .moreThan(
                    formik.values.target1 || 0,
                    translate("form.validation.tp2_more", {
                      price: roundNumber(formik.values.target1 || 0),
                    })
                  )
                  .lessThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp2_lower", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .when("direction", {
                is: "short",
                then: yup
                  .number()
                  .lessThan(
                    formik.values.target1 || 0,
                    translate("form.validation.tp2_lower", {
                      price: roundNumber(formik.values.target1 || 0),
                    })
                  )
                  .moreThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp2_more", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .required(translate("form.validation.tp2_req"))
          : yup.number(),

        target3: displayedTargets.target3
          ? yup
              .number()
              .optional()
              .when("direction", {
                is: "long",
                then: yup
                  .number()
                  .moreThan(
                    formik.values.target2 || 0,
                    translate("form.validation.tp3_more", {
                      price: roundNumber(formik.values.target2 || 0),
                    })
                  )
                  .lessThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp3_lower", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .when("direction", {
                is: "short",
                then: yup
                  .number()
                  .lessThan(
                    formik.values.target2 || 0,
                    translate("form.validation.tp3_lower", {
                      price: roundNumber(formik.values.target2 || 0),
                    })
                  )
                  .moreThan(
                    formik.values.take_profit || 0,
                    translate("form.validation.tp3_more", {
                      price: roundNumber(formik.values.take_profit || 0),
                    })
                  ),
              })
              .required(translate("form.validation.tp3_req"))
          : yup.number(),
      }),
    onSubmit: async (values) => {
      postShare(values);
    },
  });

  const postShare = useCallback(
    (values: PostFormType) => {
      if (!previewModalOpened) {
        setPreviewModalOpened(true);
        return;
      } else setPreviewModalOpened(false);

      setSubmitLoading(true);
      api.post
        .create_post(normalizePostFromForm(values))
        .then(() => {
          toastService.open({
            message: "page.share_post.toast.post_created",
            severity: "success",
          });
          navigate("/timeline");
        })
        .finally(() => setSubmitLoading(false));
    },
    [navigate, previewModalOpened]
  );

  const fetchCurrency = useCallback(
    async (currency: string, market_type: string) => {
      const coins = await api.crypto.search_currencies(currency, market_type);
      const coin = coins.find((item) => item.currency === currency);
      return coin;
    },
    []
  );

  const handleShare = async () => {
    if (!formik.values.crypto_currency.currency) {
      formik.submitForm();
      setPreviewModalOpened(false);
      return;
    }

    setSubmitLoading(true);
    const coin = await fetchCurrency(
      formik.values.crypto_currency.currency,
      formik.values.market_type
    );
    formik.setFieldValue("crypto_currency.price", Number(coin?.price || 0));
    setSubmitLoading(false);
    formik.submitForm();
  };

  const calculatedRound = (value: number = 0) =>
    value && formik.values.crypto_currency.price
      ? operationByDirection(formik.values.direction) *
        roundNumber(
          ((value - formik.values.crypto_currency.price) * 100) /
            formik.values.crypto_currency.price,
          2
        )
      : "";

  const calculateStop = !formik.values.stop
    ? ""
    : operationByDirection(formik.values.direction) *
      roundNumber(
        100 -
          ((formik.values.stop || 1) /
            (formik.values.crypto_currency.price || 1)) *
            100,
        2
      );

  const handleChangeDesc = useCallback(
    (value: string) => {
      formik.setValues({ ...formik.values, description: value });
    },
    [formik]
  );

  useEffect(() => {
    if (!formik.values.crypto_currency.currency) {
      if (currencyTimeout && currencyTimeout?.current)
        clearTimeout(currencyTimeout.current);
      return;
    }

    if (submitLoading && currencyTimeout.current) {
      clearTimeout(currencyTimeout.current);
      return;
    }

    currencyTimeout.current = setTimeout(async () => {
      const coin = await fetchCurrency(
        formik.values.crypto_currency.currency,
        formik.values.market_type
      );
      formik.setFieldValue("crypto_currency.price", Number(coin?.price || 0));
    }, 2000);

    return () =>
      currencyTimeout.current
        ? clearTimeout(currencyTimeout.current)
        : undefined;
  }, [fetchCurrency, formik, submitLoading]);

  const handleAddTarget = useCallback(() => {
    const newTargets = displayedTargets;
    if (!displayedTargets.target1) {
      newTargets.target1 = true;
    } else if (!displayedTargets.target2) {
      newTargets.target2 = true;
    } else newTargets.target3 = true;
    setDisplayedTargets((prev) => {
      return { ...prev, ...newTargets };
    });
  }, [displayedTargets]);

  const handleRemoveTarget = useCallback(
    (point: keyof TargetType) => {
      const newTargets = displayedTargets;
      if (displayedTargets.target3) {
        newTargets.target3 = false;
      } else if (displayedTargets.target2) {
        newTargets.target3 = false;
        newTargets.target2 = false;
      } else {
        newTargets.target3 = false;
        newTargets.target2 = false;
        newTargets.target1 = false;
        formik.setValues({
          ...formik.values,
          target1: 0,
        });
      }
      if (point === "target1") {
        formik.setValues({
          ...formik.values,
          target1: formik.values.target2,
          target2: formik.values.target3,
          target3: 0,
        });
      } else if (point === "target2") {
        formik.setValues({
          ...formik.values,
          target3: 0,
          target2: formik.values.target3,
        });
      } else {
        formik.setValues({
          ...formik.values,
          target3: 0,
        });
      }

      setDisplayedTargets((prev) => {
        return { ...newTargets, ...prev };
      });
    },
    [displayedTargets, formik]
  );

  return (
    <Card
      sx={{
        padding: { xs: "1rem 1.1rem", md: "1.8rem 2rem" },
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
          <SelectMarket
            value={formik.values.market_type}
            onChange={(val) =>
              formik.setValues({
                ...formik.values,
                market_type: val,
                leverage: 1,
                currency: "",
                crypto_currency: {
                  currency: "",
                  price: 0,
                },
              })
            }
          />
          <Stack>
            <FormItem
              sx={{ zIndex: 1 }}
              title={translate("form.field.currency")}
            >
              <CurrencyInput
                market_type={formik.values.market_type}
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
            <LeverageSliderWrapper
              market_type={formik.values.market_type}
              value={formik.values.leverage}
              onChange={(val) => formik.setFieldValue("leverage", val)}
            />

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
                  <MenuItem value="short">{translate("common.short")}</MenuItem>
                </WrappedSelect>
              </FormControl>
            </FormItem>

            <FormItem title={translate("form.field.take_profit")}>
              <WrappedTextField
                disabled={!formik.values.crypto_currency.price}
                fullWidth
                name="take_profit"
                type="number"
                onBlur={formik.handleBlur}
                onFocus={() =>
                  formik.values.take_profit === 0 &&
                  formik.setFieldValue("take_profit", "", true)
                }
                value={
                  formik.values.crypto_currency.price
                    ? formik.values.take_profit
                    : 0
                }
                onChange={formik.handleChange}
                error={
                  formik.touched.take_profit &&
                  Boolean(formik.errors.take_profit)
                }
                helperText={
                  formik.touched.take_profit && formik.errors.take_profit
                }
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
                          formik.values.take_profit
                        )} %`}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormItem>

            <Stack spacing={1} mt={1}>
              {displayedTargets.target1 ? (
                <Stack alignItems="center" direction="row" gap={2}>
                  <IconButton onClick={() => handleRemoveTarget("target1")}>
                    <RemoveOutlined />
                  </IconButton>
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
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_1")}
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target1
                            )} %`}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              ) : null}

              {displayedTargets.target2 ? (
                <Stack alignItems="center" direction="row" gap={2}>
                  <IconButton onClick={() => handleRemoveTarget("target2")}>
                    <RemoveOutlined />
                  </IconButton>
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
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_2")}
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target2
                            )} %`}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              ) : null}

              {displayedTargets.target3 ? (
                <Stack alignItems="center" direction="row" gap={2}>
                  <IconButton onClick={() => handleRemoveTarget("target3")}>
                    <RemoveOutlined />
                  </IconButton>
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
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {translate("form.field.tp_3")}
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <InfoChip
                            sx={{ marginRight: 1 }}
                            value={`${calculatedRound(
                              formik.values.target3
                            )} %`}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              ) : null}

              {!Object.keys(displayedTargets).every(
                (key) => displayedTargets[key as keyof TargetType]
              ) ? (
                <Card
                  sx={{
                    border: 0,
                    height: "50px",
                    cursor: formik.values.take_profit ? "pointer" : "default",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "0.2s ease",
                    opacity: formik.values.take_profit ? 1 : 0.6,
                  }}
                  onClick={() =>
                    formik.values.take_profit ? handleAddTarget() : null
                  }
                >
                  <Stack gap={0.5} alignItems="center" direction="row">
                    <Box component="span" fontSize="1.2rem">
                      +
                    </Box>
                    {translate("form.field.new_tp")}
                  </Stack>
                </Card>
              ) : null}
            </Stack>

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
                        value={`${calculateStop} %`}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormItem>

            {showDescription ? (
              <Editor
                label={translate("form.field.description")}
                onChange={handleChangeDesc}
              />
            ) : (
              <Card
                sx={{
                  my: 1,
                  height: "54px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setShowDescription(true)}
              >
                <Stack gap={0.5} alignItems="center" direction="row">
                  <Box component="span" fontSize="1.2rem">
                    +
                  </Box>
                  {translate("form.field.add_desc")}
                </Stack>
              </Card>
            )}

            {/* <Box>
              <ApproximateScore
                isSubmitting={submitLoading}
                isValid={formik.dirty && formik.isValid && !formik.isValidating}
                post={normalizePostFromForm(formik.values)}
              ></ApproximateScore>
            </Box> */}

            <Stack mt={2}>
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                type="button"
                onClick={() => handleShare()}
                loading={submitLoading}
              >
                {translate("form.field.share")}
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
      {previewModalOpened && (
        <PreviewPost
          values={formik.values}
          opened={previewModalOpened}
          onClose={() => setPreviewModalOpened(false)}
          onOkClik={() => {
            handleShare();
          }}
        />
      )}
    </Card>
  );
};
