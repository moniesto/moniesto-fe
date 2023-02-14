import {
  AddPhotoAlternateOutlined,
  PersonOutline,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useFormik } from "formik";
import { useAppSelector } from "../../store/hooks";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { UsernameInput } from "../../components/layout/auth/usernameInput";

export const AccountSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values :", values);
    },
  });

  return (
    <Paper sx={{ width: "100%", paddingBottom: "45px" }} elevation={0}>
      <Box
        height={{ xs: "8.2rem", md: "9.4rem" }}
        sx={{
          backgroundImage: `url(${user?.background_photo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          position: "relative",
          borderBottom: `1px solid ${theme.palette.background.input}`,
          // background: theme.palette.background.input,
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <Avatar
            sx={{
              width: "6rem",
              height: "6rem",
              position: "absolute",
              bottom: "-3rem",
              left: "30px",
              border: `3px solid ${theme.palette.background.input}`,
              background: theme.palette.background.secondary,
              ".MuiAvatar-fallback": {
                width: "50%",
                height: "50%",
              },
            }}
            src={user?.profile_photo}
          ></Avatar>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: "100px",
              background: theme.palette.background.secondary,
              border: `2px solid ${theme.palette.background.input}`,
              width: "35px",
              height: "35px",
              ">svg": {
                fontSize: "1rem",
              },
            }}
            // sx={{  background: theme.palette.background.input}}
          >
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateOutlined />
          </IconButton>
        </Box>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack mt={10} p={3} spacing={4}>
          <Stack spacing={2}>
            <UsernameInput currentValue={user.username} formik={formik} />
          </Stack>

          <LoadingButton
            type="submit"
            size="large"
            color="secondary"
            loading={loading}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
};
