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
import { PermIdentity } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import httpService from "../../services/httpService";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";
import { LoginResponse } from "../../interfaces/requests";
import { setToken } from "../../store/slices/localStorageSlice";

type RegisterForm = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
};
const validationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Username should be of minimum 5 characters length")
    .required("Username is required"),
  name: yup
    .string()
    .min(2, "Name should be of minimum 2 characters length")
    .required("Name is required"),
  surname: yup
    .string()
    .min(2, "Surname should be of minimum 2 characters length")
    .required("Surname is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: RegisterForm) => {
    setLoading(true);
    httpService
      .post<LoginResponse>("account/register", values)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setToken(res.token));
        navigate("/timeline");
      })
      .catch(console.error)
      .finally(() => {setLoading(false); navigate("/timeline");});
  };

  const formik = useFormik<RegisterForm>({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
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
        <Typography fontSize={"2.2rem"}>Register</Typography>
        <Typography fontSize={"2.6rem"} variant="h1">
          Welcome
        </Typography>

        <Typography fontSize={"1rem"} color={theme.palette.grey[400]}>
          Please enter your account information
        </Typography>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="username"
              name="username"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentity />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="name"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              id="surname"
              name="surname"
              placeholder="Surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
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
                autoComplete: "new-password",
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          {/* <Button
            size="large"
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Register
          </Button> */}
          <LoadingButton
            type="submit"
            size="large"
            color="secondary"
            loading={loading}
            variant="contained"
          >
            Register
          </LoadingButton>
          <Stack
            columnGap={1}
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            color={theme.palette.text.secondary}
          >
            Have an account?
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

export default Register;
