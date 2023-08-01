import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigator from "../../components/shared/common/navigatior";
import { useTranslate } from "../../hooks/useTranslate";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.account
      .verify_email({ token })
      .then((res) => {
        dispatch(setUser({ ...user, email_verified: true }));
        navigate(res.redirect_url);
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate, searchParams, user]);

  return (
    <Box
      p={3}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack rowGap={3}>
          <Typography variant="h2">
            {translate("page.change_pass.unavailable.title")}
          </Typography>
          <Typography variant="h4">
            {translate("page.change_pass.unavailable.body")}

            <Navigator path="/">
              <Typography
                pl={0.5}
                fontWeight="bold"
                component="span"
                color="secondary"
              >
                <b>{translate("navigation.home")} </b>
              </Typography>
            </Navigator>
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
export default VerifyEmail;
