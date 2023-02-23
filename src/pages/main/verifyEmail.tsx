import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigator from "../../components/shared/common/navigatior";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(false);
    api.password
      .verify_token({ token })
      .then(() => {
        dispatch(setUser({ ...user, email_verified: true }));
        navigate("/bemoniest");
      })
      .finally(() => setLoading(false));
  }, []);

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
          <Typography variant="h2">Sorry, this page is unavailable.</Typography>
          <Typography variant="h4">
            The link you clicked may be broken or the page may have been
            removed. Back to
            <Navigator path="/">
              <Typography
                pl={0.5}
                fontWeight="bold"
                component="span"
                color="secondary"
              >
                <b>Home Page</b>
              </Typography>
            </Navigator>
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
export default VerifyEmail;
