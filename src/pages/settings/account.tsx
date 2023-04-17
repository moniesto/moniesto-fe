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
import { useState, useEffect } from "react";
import { UsernameInput } from "../../components/layout/auth/usernameInput";
import { UploadPhotoButton } from "../../components/shared/user/uploadPhotoButton";
import { Spinner } from "../../components/shared/common/spinner";
import api from "../../services/api";
import toastService from "../../services/toastService";
import { setUser } from "../../store/slices/userSlice";
import { CoverImageBox } from "../../components/shared/user/coverImageBox";
import { changeLanguage, setToken } from "../../store/slices/localStorageSlice";
import { useTranslate } from "../../hooks/useTranslate";
import configService from "../../services/configService";

export const AccountSettings = () => {
  const user = useAppSelector((state) => state.user.user);
  const language = useAppSelector((state) => state.storage.language);
  const theme = useTheme();
  const translate = useTranslate();
  const [imageLoadings, setImageLoadings] = useState({
    pp: false,
    cover: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(translate("form.validation.usename"))
      .matches(
        configService?.validations?.username_regex,
        translate("form.validation.username_valid")
      ),
    name: yup
      .string()
      .max(
        configService?.validations?.max_name_length,
        translate("form.validation.name_max", {
          value: configService?.validations?.max_name_length,
        })
      )
      .required(translate("form.validation.name_req")),
    surname: yup
      .string()
      .max(
        configService?.validations?.max_surname_length,
        translate("form.validation.surname_max", {
          value: configService?.validations?.max_surname_length,
        })
      )
      .required(translate("form.validation.surname_req")),
    location: yup.string().max(
      configService?.validations?.max_location_length,
      translate("form.validation.location_max", {
        value: configService?.validations?.max_location_length,
      })
    ),
  });

  const handleSaveAccount = async () => {
    setLoading(true);

    if (formik.values.username != user.username) {
      const updatedAccout = await api.account.change_username({
        new: formik.values.username,
      });

      if (!updatedAccout) {
        setLoading(false);
        return;
      }
      dispatch(setToken(updatedAccout.token));
    }

    if (user.background_photo_link == formik.values.background_photo)
      delete formik.values.background_photo;
    if (user.profile_photo_link == formik.values.profile_photo)
      delete formik.values.profile_photo;

    api.user
      .update_profile(formik.values)
      .then((response) => {
        if (language != formik.values.language) {
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
    enableReinitialize: true,
    initialValues: {
      name: user.name,
      surname: user.surname,
      username: user.username,
      background_photo: user.background_photo_link,
      profile_photo: user.profile_photo_link,
      location: user.location,
      language: language,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors: any = {};
      if (user.username == values.username) return;
      return api.account.check_username(values.username).then((res) => {
        if (!res.validity) {
          errors.username = translate("form.validation.username_exist");
        }
        return errors;
      });
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleSaveAccount();
    },
  });
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
            <UsernameInput currentValue={user.username} formik={formik} />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder={translate("form.field.name")}
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
                placeholder={translate("form.field.surname")}
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
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
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                id="location"
                name="location"
                placeholder={translate("form.field.location")}
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
              <Select
                fullWidth
                id="language"
                name="language"
                placeholder={translate("form.field.language")}
                value={formik.values.language}
                onChange={formik.handleChange}
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
