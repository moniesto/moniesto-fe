import {
  Avatar,
  Button,
  Card,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import LocationText from "../../../components/shared/common/locationText";
import ProfileTabs from "./profileTabs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useTheme } from "@mui/system";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import { Spinner } from "../../../components/shared/common/spinner";
import { CoverImageBox } from "../../../components/shared/user/coverImageBox";
import { EditOutlined } from "@mui/icons-material";
import Navigator from "../../../components/shared/common/navigatior";
import {
  SubscribeButton,
  SubscribeButtonImperativeHandleType,
} from "../../../components/shared/user/subscribeButton";
import { useTranslate } from "../../../hooks/useTranslate";
import { MoniestBadge } from "../../../components/shared/user/moniestBadge";
import {
  setIsMyAccount,
  setProfile,
  setSummaryStats,
} from "../../../store/slices/profileSlice";
import SubscriptionResultModal from "../../../components/ui/user/subscriptionResultModal";
import { ProfileStatistics } from "./profileStatistics";

const Profile = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user.user);
  const profileState = useAppSelector((state) => state.profile);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { username } = useParams();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const subscriptionButtonRef =
    useRef<SubscribeButtonImperativeHandleType>(null);

  const getAccount = useCallback(
    (username: string) => {
      setLoading(true);
      if (user.username === username) {
        dispatch(setProfile(user));
        dispatch(setIsMyAccount(true));
        setLoading(false);
      } else {
        api.user
          .user_by_username(username)
          .then((res) => {
            dispatch(setProfile(res));
            dispatch(setIsMyAccount(false));
          })
          .catch(() => console.log("user not found"))
          .finally(() => setLoading(false));
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    if (!username) {
      setLoading(false);
      dispatch(setProfile(null));
      return;
    }
    getAccount(username);
  }, [username, dispatch, getAccount]);

  useEffect(() => {
    if (
      !profileState.account ||
      profileState.subscriptionInfo ||
      profileState.summary_stats
    )
      return;

    api.user.summary_stats(profileState.account.username).then((response) => {
      dispatch(setSummaryStats(response));
    });
  }, [profileState, dispatch]);

  return (
    <Box position="relative" minHeight="20vh">
      {loading ? (
        <Spinner center={true} />
      ) : profileState.account ? (
        <>
          <Card
            sx={{
              width: "100%",
              paddingBottom: "45px",
              background: theme.palette.background[500],
            }}
            elevation={0}
          >
            <>
              <CoverImageBox
                image={profileState.account?.background_photo_link as string}
              >
                <Box
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    position: "absolute",
                    bottom: "-3rem",
                    left: { md: 24, xs: 16 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: "6rem",
                      height: "6rem",
                      border: `3px solid ${theme.palette.background[800]}`,
                      background: theme.palette.background[600],
                    }}
                    src={profileState.account?.profile_photo_link}
                  ></Avatar>
                  {profileState.account.moniest && (
                    <MoniestBadge size="large" />
                  )}
                </Box>
              </CoverImageBox>
              <Box paddingX={{ md: 3, xs: 2 }}>
                <Box>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    height={"3rem"}
                    justifyContent="end"
                  >
                    {profileState.isMyAccount ? (
                      <Navigator path="/settings/account">
                        <Button
                          size={matches ? "small" : "medium"}
                          startIcon={<EditOutlined color="secondary" />}
                          color="secondary"
                          variant="outlined"
                        >
                          {translate("common.edit")}
                        </Button>
                      </Navigator>
                    ) : profileState.account.moniest ? (
                      <SubscribeButton ref={subscriptionButtonRef} />
                    ) : (
                      ""
                    )}
                  </Stack>
                </Box>
                <Box mt={2} mb={4}>
                  <Stack spacing={1}>
                    <Stack flexDirection="row">
                      <Stack spacing={0.3} width="100%">
                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={{ xs: 1, md: 1.5 }}
                        >
                          <Typography variant="h3">
                            {profileState.account.fullname}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography sx={{ opacity: 0.7 }} variant="h4">
                            {profileState.account.username}
                          </Typography>
                          <LocationText
                            location={profileState.account.location}
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                    <Typography
                      sx={{ opacity: 0.7 }}
                      variant="h5"
                      fontSize="0.77rem"
                    >
                      {profileState.account.moniest?.bio}
                    </Typography>
                  </Stack>
                  {profileState.account.moniest && <ProfileStatistics />}
                </Box>
              </Box>
            </>
          </Card>
          <ProfileTabs />
          <SubscriptionResultModal
            onClose={(result) =>
              result && subscriptionButtonRef.current?.reCheckSubscription()
            }
          />
        </>
      ) : (
        <Card sx={{ padding: 3 }}>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h4">
              {translate("page.profile.user_not_found")}
            </Typography>
          </Stack>
        </Card>
      )}
      <img
        src="https://res.cloudinary.com/dniupzza6/image/upload/v1700860206/Photo/BackgroundPhotos/6400d94d-1852-4743-aae0-ef56df885d27.jpg"
        alt=""
      />
      <img
        src="https://res.cloudinary.com/dniupzza6/image/upload/v1700860303/Photo/BackgroundPhotos/593a4f2e-c342-4fe8-b614-9f222834a529.jpg"
        alt=""
      />
    </Box>
  );
};

export default Profile;
