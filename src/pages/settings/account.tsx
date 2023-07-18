import {
  BadgeOutlined,
  LanguageOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { UploadPhotoButton } from "../../components/shared/user/uploadPhotoButton";
import { Spinner } from "../../components/shared/common/spinner";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { setUser } from "../../store/slices/userSlice";
import { CoverImageBox } from "../../components/shared/user/coverImageBox";
import { changeLanguage, setToken } from "../../store/slices/localStorageSlice";
import { useTranslate } from "../../hooks/useTranslate";
import configService from "../../services/configService";
import { useUsernameValidation } from "../../hooks/useUsernameValidation";

export const AccountSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const language = useAppSelector((state) => state.storage.language);
  const theme = useTheme();
  const translate = useTranslate();
  const { usernameValidation, usernameInput } = useUsernameValidation();
  const [imageLoadings, setImageLoadings] = useState({
    pp: false,
    cover: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  let validationSchema = yup.object({
    username: usernameValidation,
    fullname: yup
      .string()
      .max(
        configService?.validations?.max_fullname_length,
        translate("form.validation.fullname_max", {
          value: configService?.validations?.max_fullname_length,
        })
      )
      .required(translate("form.validation.fullname_req")),
    location: yup.string().max(
      configService?.validations?.max_location_length,
      translate("form.validation.location_max", {
        value: configService?.validations?.max_location_length,
      })
    ),
  });

  const handleSaveAccount = async () => {
    setLoading(true);

    if (formik.values.username !== user.username) {
      const updatedAccout = await api.account
        .change_username({
          new: formik.values.username,
        })
        .finally(() => setLoading(false));

      if (!updatedAccout) {
        return;
      }
      dispatch(setToken(updatedAccout.token));
    }

    if (user.background_photo_link === formik.values.background_photo)
      delete formik.values.background_photo;
    if (user.profile_photo_link === formik.values.profile_photo)
      delete formik.values.profile_photo;

    api.user
      .update_profile(formik.values)
      .then((response) => {
        if (language !== formik.values.language) {
          dispatch(changeLanguage(formik.values.language));
        }
        dispatch(setUser(response));
        toastService.open({
          message: "page.settings.account.toast.updated_success",
          severity: "success",
        });
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      username: user.username,
      background_photo: user.background_photo_link,
      profile_photo: user.profile_photo_link,
      location: user.location,
      language: language,
    },
    initialTouched: {
      username: true,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSaveAccount();
    },
  });

  console.log("formik", formik);

  return (
    <Card
      sx={{
        paddingBottom: { xs: 1, md: 2.5 },
      }}
    >
      <CoverImageBox image={formik.values?.background_photo as string}>
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
              src={formik.values?.profile_photo}
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
      </CoverImageBox>

      <form onSubmit={formik.handleSubmit}>
        <Stack mt={10} p={3} spacing={4}>
          <Stack spacing={2}>
            {usernameInput(
              formik.values.username,
              formik.handleChange,
              formik.touched.username,
              Boolean(formik.errors.username),
              formik.errors.username
            )}
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                id="fullname"
                name="fullname"
                placeholder={translate("form.field.fullname")}
                label={translate("form.field.fullname")}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
                helperText={formik.touched.fullname && formik.errors.fullname}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                id="location"
                name="location"
                placeholder={translate("form.field.location")}
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                fullWidth
                id="language"
                name="language"
                placeholder={translate("form.field.language")}
                value={formik.values.language}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                startAdornment={<LanguageOutlined />}
              >
                <MenuItem value={"en"}>En</MenuItem>
                <MenuItem value={"tr"}>Tr</MenuItem>
              </Select>
            </Stack>
          </Stack>

          <LoadingButton
            type="submit"
            size="large"
            color="secondary"
            loading={loading}
            variant="contained"
          >
            {translate("common.save")}
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
