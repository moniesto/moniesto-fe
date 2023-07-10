import { InputAdornment, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { useTranslate } from "../../../hooks/useTranslate";
import configService from "../../../services/configService";
import { FormItem } from "../../../components/shared/common/formItem";
import Fly from "../../../components/shared/common/fly/fly";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { nextStep } from "../../../store/slices/beMoniestSlice";
import { BeMoniestStepperFooter } from "./beMoniestStepperFooter";

const MoniestInfoStep = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const stepperState = useAppSelector((state) => state.beMoniest);

  const validationSchema = yup.object({
    fee: yup
      .number()
      .min(
        configService?.validations?.min_fee,
        translate("form.validation.fee_min", {
          value: configService?.validations?.min_fee,
        })
      )
      .required(translate("form.validation.fee_req")),
    bio: yup
      .string()
      .max(
        configService?.validations?.max_bio_lenght,
        translate("form.validation.bio_max", {
          value: configService?.validations?.max_bio_lenght,
        })
      )
      .required(translate("form.validation.bio_req")),
    description: yup.string().max(
      configService?.validations?.max_description_length,
      translate("form.validation.desc_max", {
        value: configService?.validations?.max_description_length,
      })
    ),
  });
  const formik = useFormik({
    initialValues: {
      fee: stepperState.data.fee,
      bio: stepperState.data.bio,
      description: stepperState.data.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(nextStep(values));
    },
  });

  return (
    <Fly>
      <Stack width={"100%"} spacing={8}>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Fly.Item>
                <FormItem title={translate("form.field.fee")}>
                  <TextField
                    fullWidth
                    name="fee"
                    type="number"
                    value={formik.values.fee}
                    onFocus={() =>
                      formik.values.fee === 0 &&
                      formik.setFieldValue("fee", "", true)
                    }
                    onChange={formik.handleChange}
                    error={formik.touched.fee && Boolean(formik.errors.fee)}
                    helperText={formik.touched.fee && formik.errors.fee}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormItem>
              </Fly.Item>
              <Fly.Item>
                <FormItem title={translate("form.field.bio")}>
                  <TextField
                    sx={{
                      ".MuiInputBase-root": {
                        alignItems: "baseline",
                        paddingLeft: "14px !important",
                      },
                    }}
                    multiline
                    rows={4}
                    fullWidth
                    name="bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountBoxOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormItem>
              </Fly.Item>
              <Fly.Item>
                <FormItem title={translate("form.field.desc")}>
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
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ArticleOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormItem>
              </Fly.Item>
            </Stack>
            <Fly.Item>
              <BeMoniestStepperFooter handleNext={formik.submitForm} />
            </Fly.Item>
          </Stack>
        </form>
      </Stack>
    </Fly>
  );
};

export default MoniestInfoStep;
