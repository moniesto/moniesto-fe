import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { FormItem } from "../../../../components/shared/common/formItem";
import { HelpOutlineOutlined, PermIdentityOutlined } from "@mui/icons-material";
import { BeMoniestStepperFooter } from "../beMoniestStepperFooter";
import { FindBUIDModal } from "../findBUIDModal";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslate } from "../../../../hooks/useTranslate";
import Fly from "../../../../components/shared/common/fly/fly";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { nextStep } from "../../../../store/slices/beMoniestSlice";
import { WrappedTextField } from "../../../../components/shared/common/wrappers/wrappedTextField";

export const PaymentBinanceTab = () => {
  const [binanceIDHelperModalOpened, setBinanceIDHelperModalOpened] =
    useState(false);
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const stepperState = useAppSelector((state) => state.beMoniest);

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
      binance_id: stepperState.data.binance_id || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(nextStep(values));
    },
  });

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

        <BeMoniestStepperFooter handleNext={() => formik.submitForm()} />
        {binanceIDHelperModalOpened && (
          <FindBUIDModal onClose={() => setBinanceIDHelperModalOpened(false)} />
        )}
      </Stack>
    </Fly>
  );
};
