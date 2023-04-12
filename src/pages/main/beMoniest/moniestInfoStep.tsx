import { Button, InputAdornment, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BeMoniestReq } from "../../../interfaces/requests";
import { useTranslate } from "../../../hooks/useTranslate";
import configService from "../../../services/configService";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleBack: () => void;
};

const MoniestInfoStep = ({ handleNext, handleBack }: propType) => {
  const translate = useTranslate();

  const validationSchema = yup.object({
    fee: yup
      .number()
      .min(
        configService?.validations?.min_fee,
        translate("form.validation.fee_min", {
          value: configService?.validations?.min_fee,
        })
      )
      .required("form.validation.fee_req"),
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
      fee: 0,
      bio: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleNext(values);
    },
  });

  return (
    <Stack width={"100%"} spacing={8}>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="fee"
              type="number"
              placeholder={translate("form.field.fee")}
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
              placeholder={translate("form.field.bio")}
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
              placeholder={translate("form.field.desc")}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
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
          </Stack>
          <Stack alignItems="center">
            <Stack
              width="80%"
              flexDirection="row"
              mt={4}
              justifyContent="space-between"
            >
              <Button onClick={handleBack} variant="outlined" color="secondary">
                {translate("common.back")}
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                {translate("common.next")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default MoniestInfoStep;
