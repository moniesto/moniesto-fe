import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigator from "../../components/shared/common/navigatior";
import { Requests } from "../../interfaces/requests";
import httpService from "../../services/httpService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/slices/userSlice";

const VerifyEmail = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("token :",token)
    if (!token) {
      setLoading(false);
      return;
    }

    httpService
      .post(Requests.account.verify_email, { token })
      .then(() => {
        dispatch(setUser({ ...user, email_verified: true }));
        navigate("/bemoniest");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack rowGap={3}>
          <Typography variant="h2">Sorry, this page is unavailable.</Typography>
          <Typography variant="h4">
            The link you clicked may be broken or the page may have been
            removed. Back to 
            <Navigator path="/">
              <Typography pl={0.5} fontWeight="bold" component="span" color="secondary">
                 home
              </Typography>
            </Navigator>
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
export default VerifyEmail;
