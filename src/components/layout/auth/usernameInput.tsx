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
import api from "../../../services/api";

export const UsernameInput = ({ formik, currentValue }: any) => {
  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [displayCheckIcon, setDisplayCheckIcon] = useState<boolean>(false);
  const [isCorrectName, setIsCorrectName] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    if (currentValue == formik?.values?.username) return;

    if (!formik.values.username) {
      setIsCorrectName(false);
      setDisplayCheckIcon(false);
      return;
    }
    setDisplayCheckIcon(true);
    setCheckLoading(true);

    api.account
      .check_username(formik.values.username)
      .then((res) => {
        if (!res.validity) {
          formik.setFieldError("username", "username already exist");
        }
        setIsCorrectName(res.validity);
      })
      .finally(() =>
        setTimeout(() => {
          setCheckLoading(false);
        }, 200)
      );
  }, [formik?.values?.username]);

  return (
    formik && (
      <TextField
        fullWidth
        id="username"
        name="username"
        placeholder="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
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
            <InputAdornment className="notFly" position="end">
              {checkLoading ? (
                <CircularProgress
                  className="notFly"
                  size={25}
                  color="inherit"
                />
              ) : displayCheckIcon ? (
                isCorrectName ? (
                  <DoneOutlined
                    className="notFly"
                    sx={{ color: theme.palette.secondary.main }}
                  />
                ) : (
                  <HighlightOffOutlined
                    className="notFly"
                    sx={{ color: theme.palette.error.light }}
                  />
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
