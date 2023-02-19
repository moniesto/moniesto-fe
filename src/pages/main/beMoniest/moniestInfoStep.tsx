import { Button, InputAdornment, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { BeMoniestReq } from "../../../interfaces/requests";

const validationSchema = yup.object({
  fee: yup
    .number()
    .min(1, "Fee should be greater then 0")
    .required("Fee is required"),
  bio: yup
    .string()
    .min(5, "Bio should be of minimum 5 characters length")
    .required("Bio is required"),
  description: yup
    .string()
    .min(5, "Description should be of minimum 5 characters length")
    .required("Description is required"),
});

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleBack: () => void;
};

const MoniestInfoStep = ({ handleNext, handleBack }: propType) => {
  const formik = useFormik({
    initialValues: {
      fee: 0,
      bio: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleNext(values)
      // alert(JSON.stringify(values, null, 2));
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
              placeholder="Monthly fee (USDT)"
              onChange={formik.handleChange}
              error={formik.touched.fee && Boolean(formik.errors.fee)}
              helperText={formik.touched.fee && formik.errors.fee}
              InputProps={{
                color: "secondary",
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
              placeholder="Bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
              InputProps={{
                color: "secondary",
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
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              InputProps={{
                color: "secondary",
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
              <Button onClick={handleBack} variant="contained" color="inherit">
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default MoniestInfoStep;
