import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Navigator from "../../components/shared/common/navigatior";
import httpService from "../../services/httpService";

type LoginForm = {
  identifier: string;
  password: string;
};
const validationSchema = yup.object({
  identifier: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const theme = useTheme();

  const handleSubmit = (values: LoginForm) => {
    httpService
      .post("account/login", values)
      .then(console.log)
      .catch(console.error);
  };

  const formik = useFormik<LoginForm>({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Stack width={"100%"} maxWidth={500} spacing={8}>
      <Stack spacing={1.8}>
        <Typography fontSize={"2.2rem"}>Login</Typography>
        <Typography fontSize={"2.6rem"} variant="h1">
          Welcome
        </Typography>

        <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
          Please enter your account details
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="identifier"
              placeholder="Email or username"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              error={formik.touched.identifier && Boolean(formik.errors.identifier)}
              helperText={formik.touched.identifier && formik.errors.identifier}
              InputProps={{
                autoComplete: "new-email",
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                autoComplete: "new-password",
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Navigator path="/forget-password">
              <Stack
                alignItems="end"
                color={theme.palette.grey[500]}
                sx={{ cursor: "pointer" }}
              >
                Forget Password?
              </Stack>
            </Navigator>
          </Stack>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Login
          </Button>
          <Stack
            columnGap={1}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            color={theme.palette.text.secondary}
          >
            No account?
            <Navigator path="/register">
              <Typography
                sx={{ cursor: "pointer" }}
                variant="h4"
                color="secondary"
              >
                Register
              </Typography>
            </Navigator>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
