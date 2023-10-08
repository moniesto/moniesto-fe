import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { FormItem } from "../../../../components/shared/common/formItem";
import { HelpOutlineOutlined, PermIdentityOutlined } from "@mui/icons-material";
import { FindBUIDModal } from "../findBUIDModal";
import { ReactElement, ReactNode, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslate } from "../../../../hooks/useTranslate";
import Fly from "../../../../components/shared/common/fly/fly";
import { WrappedTextField } from "../../../../components/shared/common/wrappers/wrappedTextField";
import React from "react";

export const PaymentBinanceTab = ({
  default_binance_id,
  onBinanceIdChange,
  footer,
}: {
  default_binance_id?: string;
  onBinanceIdChange: (val: string) => void;
  footer: ReactNode;
}) => {
  const [binanceIDHelperModalOpened, setBinanceIDHelperModalOpened] =
    useState(false);
  const translate = useTranslate();

  const validationSchema = yup.object({
    binance_id: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]{7,}$/,
        translate("form.validation.binance_id_valid")
      )
      .required(translate("form.validation.binance_id_req")),
  });

  const formik = useFormik({
    initialValues: {
      binance_id: default_binance_id || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onBinanceIdChange(values.binance_id);
    },
  });

  const handleNext = () => {
    formik.submitForm();
  };

  return (
    <Fly>
      <Stack>
        <Fly.Item>
          <FormItem
            title={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <Typography>{translate("form.field.binance_id")}</Typography>
                <Stack
                  sx={{ cursor: "pointer" }}
                  onClick={() => setBinanceIDHelperModalOpened(true)}
                  direction="row"
                  alignItems="center"
                >
                  <Typography>
                    {translate("form.field.how_can_find")}
                  </Typography>
                  <IconButton size="small">
                    <HelpOutlineOutlined />
                  </IconButton>
                </Stack>
              </Stack>
            }
          >
            <WrappedTextField
              fullWidth
              id="binance_id"
              name="binance_id"
              value={formik.values.binance_id}
              onChange={formik.handleChange}
              error={
                formik.touched.binance_id && Boolean(formik.errors.binance_id)
              }
              helperText={formik.touched.binance_id && formik.errors.binance_id}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </FormItem>
        </Fly.Item>
        {React.cloneElement(footer as ReactElement, {
          handleNext: handleNext,
        })}
        {binanceIDHelperModalOpened && (
          <FindBUIDModal onClose={() => setBinanceIDHelperModalOpened(false)} />
        )}
      </Stack>
    </Fly>
  );
};
