import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LocationText from "../../../components/shared/common/locationText";
import ProfileTabs from "./profileTabs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useTheme } from "@mui/system";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import { Spinner } from "../../../components/shared/common/spinner";
import { CoverImageBox } from "../../../components/shared/user/coverImageBox";
import { EditOutlined } from "@mui/icons-material";
import Navigator from "../../../components/shared/common/navigatior";
import { SubscribeToMoniest } from "./subscribeToMoniest";
import { SubscribeButton } from "../../../components/shared/user/subscribeButton";
import { useTranslate } from "../../../hooks/useTranslate";
import { MoniestBadge } from "../../../components/shared/user/moniestBadge";
import { setIsMyAccount, setProfile } from "../../../store/slices/profileSlice";
import { ScoreBadge } from "../../../components/shared/user/scoreBadge";

const Profile = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user.user);
  const profileState = useAppSelector((state) => state.profile);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] =
    useState<boolean>(false);
  const { username } = useParams();
  const translate = useTranslate();

  const dispatch = useAppDispatch();

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

  const handleSubscribtionModalClose = (result: boolean) => {
    setIsSubscribeModalOpen(false);
    // if(result){
    //   if(profileState.isSubscribed)
    // }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "20vh" }}>
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
                  {profileState.account.moniest && <MoniestBadge size={26} />}
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
                          startIcon={<EditOutlined color="secondary" />}
                          color="secondary"
                          variant="outlined"
                        >
                          {translate("common.edit")}
                        </Button>
                      </Navigator>
                    ) : profileState.account.moniest ? (
                      <SubscribeButton
                        onClick={() => setIsSubscribeModalOpen(true)}
                      />
                    ) : (
                      ""
                    )}
                  </Stack>
                </Box>
                <Box mt={1.5} mb={5}>
                  <Stack spacing={2}>
                    <Stack flexDirection="row">
                      <Stack spacing={0.3}>
                        <Stack flexDirection="row" alignItems="center" gap={2}>
                          <Typography variant="h3">
                            {profileState.account.fullname}
                          </Typography>
                          {profileState.account.moniest && (
                            <ScoreBadge
                              value={profileState.account.moniest?.score || 0}
                            />
                          )}
                        </Stack>

                        <Typography sx={{ opacity: 0.8 }} variant="h5">
                          {profileState.account.username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <LocationText location={profileState.account.location} />
                    <Typography variant="body1">
                      {profileState.account.moniest?.bio}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </>
          </Card>
          <ProfileTabs
            handleClickSubscribe={() => setIsSubscribeModalOpen(true)}
          ></ProfileTabs>
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
      {isSubscribeModalOpen && (
        <SubscribeToMoniest handleClose={handleSubscribtionModalClose} />
      )}
    </Box>
  );
};

export default Profile;
