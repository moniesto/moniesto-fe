import * as yup from "yup";
import configService from "../services/configService";
import { useTranslate } from "./useTranslate";
import api from "../services/api";
import { useAppSelector } from "../store/hooks";
import { ChangeEvent, useCallback, useState } from "react";
import { CircularProgress, InputAdornment, useTheme } from "@mui/material";
import {
  DoneOutlined,
  HighlightOffOutlined,
  PermIdentity,
} from "@mui/icons-material";
import { WrappedTextField } from "../components/shared/common/wrappers/wrappedTextField";

let debounceTimer: NodeJS.Timeout | null = null;
export const useUsernameValidation = () => {
  const translate = useTranslate();
  const user = useAppSelector((state) => state.user.user);
  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const theme = useTheme();
  const [lastChechedValue, setLastChechedValue] = useState("");

  const usernameInput = useCallback(
    (
      value: string,
      onChange: (e: ChangeEvent<any>) => void,
      touched?: boolean,
      error?: boolean,
      helperText?: string
    ) => {
      return (
        <WrappedTextField
          fullWidth
          id="username"
          name="username"
          placeholder={translate("form.field.username")}
          value={value}
          onChange={onChange}
          error={touched && error}
          helperText={touched && helperText}
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
                {user?.username !== value ? (
                  checkLoading ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : value ? (
                    valid ? (
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
      );
    },
    [checkLoading, theme, translate, user.username, valid]
  );

  const usernameValidation = yup
    .string()
    .required(translate("form.validation.username_req"))
    .matches(
      configService?.validations?.username_regex,
      translate("form.validation.username_valid")
    )
    .test(
      "Unique Email",
      translate("form.validation.username_exist"),
      (value: any) => {
        setCheckLoading(true);
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        if (user.username === value) {
          setCheckLoading(false);
          return true;
        }
        if (value === lastChechedValue) {
          setCheckLoading(false);
          return valid;
        }

        return new Promise((resolve) => {
          debounceTimer = setTimeout(() => {
            api.account
              .check_username(value)
              .then((response) => {
                setLastChechedValue(value);
                resolve(response.validity);
                setValid(response.validity);
              })
              .catch(() => {
                resolve(false);
                setValid(false);
              })
              .finally(() => setCheckLoading(false));
          }, 300); // Debounce delay of 300 milliseconds
        });
      }
    );
  return { usernameValidation, usernameInput };
};
