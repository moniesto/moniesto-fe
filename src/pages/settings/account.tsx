import {
  AddPhotoAlternateOutlined,
  PersonOutline,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
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
    <Card
      sx={{
        width: "100%",
        paddingBottom: "45px",
        background: theme.palette.background[500],
      }}
    >
      <Box
        height={{ xs: "8.2rem", md: "9.4rem" }}
        sx={{
          background: theme.palette.background[600],
          backgroundImage: `url(${user?.background_photo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderTopLeftRadius: theme.palette.borderRadius.main,
          borderTopRightRadius: theme.palette.borderRadius.main,
          position: "relative",
        }}
      >
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            border: `2px solid ${theme.palette.background[800]}`,
            backgroundColor: theme.palette.background[600],
            width: "35px",
            height: "35px",
            zIndex: 2,
            ">svg": {
              fontSize: "1rem",
            },
            "&:hover": {
              backgroundColor: theme.palette.background[800],
            },
          }}
        >
          <input hidden accept="image/*" type="file" />
          <AddPhotoAlternateOutlined />
        </IconButton>
        <Box sx={{ position: "relative", height: "100%" }}>
          <Avatar
            sx={{
              width: "6rem",
              height: "6rem",
              position: "absolute",
              bottom: "-3rem",
              left: "30px",
              border: `3px solid ${theme.palette.background[800]}`,
              background: theme.palette.background[600],
              ".MuiAvatar-fallback": {
                width: "50%",
                height: "50%",
              },
            }}
            src={user?.profile_photo}
          ></Avatar>
          <IconButton
            color="primary"
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: "100px",
              border: `2px solid ${theme.palette.background[800]}`,
              backgroundColor: theme.palette.background[600],
              width: "35px",
              height: "35px",
              ">svg": {
                fontSize: "1rem",
              },
              "&:hover": {
                backgroundColor: theme.palette.background[800],
              },
            }}
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
    </Card>
  );
};
