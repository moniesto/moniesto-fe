import {
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Navigator from "../../components/shared/common/navigatior";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  repassword: yup.string().required("Repassword is required"),
});

const ChangePassword = () => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Stack width={"100%"} maxWidth={500} spacing={8}>
      <Stack spacing={1.8}>
        <Typography fontSize={"2.2rem"}>Change Password</Typography>
        <Typography fontSize={"2.6rem"} variant="h1">
          Welcome
        </Typography>

        <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
          Please enter your password
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="repassword"
              name="repassword"
              placeholder="Repassword"
              type="repassword"
              value={formik.values.repassword}
              onChange={formik.handleChange}
              error={
                formik.touched.repassword && Boolean(formik.errors.repassword)
              }
              helperText={formik.touched.repassword && formik.errors.repassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Button  size="large" color="secondary" variant="contained" fullWidth type="submit">
            Save
          </Button>

          <Stack
            columnGap={1}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            color={theme.palette.text.secondary}
          >
            Back to
            <Navigator path="/login">
              <Typography
                sx={{ cursor: "pointer" }}
                variant="h4"
                color="secondary"
              >
                Login
              </Typography>
            </Navigator>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChangePassword;
