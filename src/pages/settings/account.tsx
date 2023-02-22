import {
  AddPhotoAlternateOutlined,
  BadgeOutlined,
  LocationOnOutlined,
  PersonOutline,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { UsernameInput } from "../../components/layout/auth/usernameInput";
import { UploadPhotoButton } from "../../components/shared/user/uploadPhotoButton";
import { Spinner } from "../../components/shared/common/spinner";
import api from "../../services/api";
import { User } from "../../interfaces/user";
import toastService from "../../services/toastService";

export const AccountSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const [imageLoadings, setImageLoadings] = useState({
    pp: false,
    cover: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    name: yup
      .string()
      .min(2, "Name should be of minimum 2 characters length")
      .required("Name is required"),
    surname: yup
      .string()
      .min(2, "Surname should be of minimum 2 characters length")
      .required("Surname is required"),
  });

  const handleSaveAccount = () => {
    setLoading(true);
    api.user
      .update_profile(formik.values)
      .then(() => {
        toastService.open({
          message: "Your account successfully updated",
          severity: "success",
        });
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik<Partial<User>>({
    enableReinitialize:true,
    initialValues: {
      name: user.name,
      surname: user.surname,
      username: user.username,
      background_photo_link: user.background_photo_link,
      profile_photo_link: user.profile_photo_link,
      location: user.location,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSaveAccount();
    },
  });

  return (
    user && (
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
            backgroundImage: `url(${formik.values?.background_photo_link})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderTopLeftRadius: theme.palette.borderRadius.main,
            borderTopRightRadius: theme.palette.borderRadius.main,
            position: "relative",
          }}
        >
          {imageLoadings.cover && <Spinner size={40} center={true} />}
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              zIndex: 2,
            }}
          >
            <UploadPhotoButton
              loading={imageLoadings.cover}
              handleLoading={(isLoading) =>
                setImageLoadings({ ...imageLoadings, cover: isLoading })
              }
              handleBase64Image={(base64) =>
                formik.setFieldValue("background_photo", base64)
              }
            />
          </Box>

          <Box
            sx={{
              width: "6rem",
              height: "6rem",
              position: "absolute",
              bottom: "-3rem",
              left: "30px",
            }}
          >
            <Box sx={{ position: "relative", height: "100%" }}>
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  border: `3px solid ${theme.palette.background[800]}`,
                  background: theme.palette.background[600],
                  ".MuiAvatar-fallback": {
                    width: "50%",
                    height: "50%",
                  },
                }}
                src={formik.values?.profile_photo_link}
              ></Avatar>

              <Box sx={{ position: "absolute", top: "4rem", right: "-4px" }}>
                <UploadPhotoButton
                  loading={imageLoadings.pp}
                  handleLoading={(isLoading) =>
                    setImageLoadings({ ...imageLoadings, pp: isLoading })
                  }
                  handleBase64Image={(base64) =>
                    formik.setFieldValue("profile_photo", base64)
                  }
                />
              </Box>

              {imageLoadings.pp && <Spinner center={true} />}
            </Box>
          </Box>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Stack mt={10} p={3} spacing={4}>
            <Stack spacing={2}>
              <UsernameInput currentValue={user.username} formik={formik} />
              <Stack direction="row" spacing={2}>
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
                        <BadgeOutlined />
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
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <TextField
                fullWidth
                id="location"
                name="location"
                placeholder="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlined />
                    </InputAdornment>
                  ),
                }}
              />
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
    )
  );
};
