import {
  DoneOutlined,
  HighlightOffOutlined,
  PermIdentity,
} from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import api from "../../../services/api";

export const UsernameInput = ({
  formik,
  currentValue,
}: {
  formik: any;
  currentValue?: string;
}) => {
  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [displayCheckIcon, setDisplayCheckIcon] = useState<boolean>(false);
  const [isCorrectName, setIsCorrectName] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

  useEffect(() => {
    if (currentValue === formik?.values?.username) return;

    if (!formik.values.username) {
      setIsCorrectName(false);
      setDisplayCheckIcon(false);
      return;
    }

    const timeOutId = setTimeout(() => {
      setDisplayCheckIcon(true);
      setCheckLoading(true);
      setTimeout(() => {
        api.account
          .check_username(formik.values.username)
          .then((res) => {
            if (!res.validity) {
              formik.setFieldError(
                "username",
                translate("form.validation.username_exist")
              );
            }
            setIsCorrectName(res.validity);
          })
          .catch((_) => setIsCorrectName(false))
          .finally(() => setCheckLoading(false));
      }, 300);
    }, 100);

    return () => clearTimeout(timeOutId);
  }, [formik?.values?.username, currentValue, formik, translate]);

  const handleUsernameChange = (value: string) => {
    formik.setFieldValue("username", value.toLowerCase());
  };

  return (
    formik && (
      <TextField
        fullWidth
        id="username"
        name="username"
        placeholder={translate("form.field.username")}
        value={formik.values.username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{
          ".MuiInputAdornment-positionEnd": {
            "*>": { animation: "fade 0.2s ease" },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermIdentity />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {currentValue !== formik?.values?.username ? (
                checkLoading ? (
                  <CircularProgress size={25} color="inherit" />
                ) : displayCheckIcon ? (
                  isCorrectName ? (
                    <DoneOutlined
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  ) : (
                    <HighlightOffOutlined
                      sx={{ color: theme.palette.error.light }}
                    />
                  )
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </InputAdornment>
          ),
        }}
      />
    )
  );
};
