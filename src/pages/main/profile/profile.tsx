import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Avatar, Button, Card, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import LocationText from "../../../components/shared/common/locationText";
import ProfileTabs from "./profileTabs";
import { useAppSelector } from "../../../store/hooks";
import { useTheme } from "@mui/system";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import { Spinner } from "../../../components/shared/common/spinner";
import { CoverImageBox } from "../../../components/shared/user/coverImageBox";
import { EditOutlined } from "@mui/icons-material";
import Navigator from "../../../components/shared/common/navigatior";
import { SubscribeToMoniest } from "./subscribeToMoniest";

const Profile = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);
  const [account, setAccount] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] =
    useState<boolean>(false);
  const { username } = useParams();

  useEffect(() => {
    if (!username) return;
    getAccount(username);
  }, [username]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [account]);

  const getAccount = (username: string) => {
    if (user.username == username) setAccount(user);
    else api.user.user_by_username(username).then((res) => setAccount(res));
  };

  const isMyAccount: boolean = username == user.username;

  return (
    <Box sx={{ position: "relative", minHeight: "20vh" }}>
      {loading ? (
        <Spinner center={true} />
      ) : account ? (
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
              <CoverImageBox image={account?.background_photo_link as string}>
                <Avatar
                  sx={{
                    width: "6rem",
                    height: "6rem",
                    position: "absolute",
                    bottom: "-3rem",
                    left: "30px",
                    border: `3px solid ${theme.palette.background[800]}`,
                    background: theme.palette.background[600],
                  }}
                  src={account?.profile_photo_link}
                ></Avatar>
              </CoverImageBox>
              <Box padding={"0 30px"}>
                <Box>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    height={"3rem"}
                    justifyContent="end"
                  >
                    {isMyAccount ? (
                      <Navigator path="/settings/account">
                        <Button
                          startIcon={<EditOutlined color="secondary" />}
                          color="secondary"
                          variant="outlined"
                        >
                          Edit
                        </Button>
                      </Navigator>
                    ) : account.moniest ? (
                      <Button
                        onClick={() => setIsSubscribeModalOpen(true)}
                        sx={{
                          ".MuiButton-endIcon": {
                            marginLeft: "-4px",
                          },
                        }}
                        endIcon={<AttachMoneyIcon />}
                        color="secondary"
                        variant="contained"
                      >
                        Subscribe {account.moniest?.subscription_info.fee}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Box>
                <Box mt={1.5} mb={5}>
                  <Stack spacing={2}>
                    <Stack flexDirection="row">
                      <Stack spacing={0.3}>
                        <Stack flexDirection="row" alignItems="end">
                          <Typography variant="h3">
                            {account.name + " " + account.surname}
                          </Typography>
                          <Typography
                            ml={1.5}
                            display="flex"
                            alignItems="center"
                            variant="h6"
                          >
                            <StarIcon
                              sx={{
                                marginRight: "3px",
                                fontSize: "1rem",
                                color: "#FED839 !important",
                              }}
                            />
                            {account.moniest?.score || 0}
                          </Typography>
                        </Stack>

                        <Typography sx={{ opacity: 0.8 }} variant="h5">
                          {account.username}
                        </Typography>
                      </Stack>
                    </Stack>
                    <LocationText />
                    <Typography variant="body1">
                      {account.moniest?.bio}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </>
          </Card>
          <ProfileTabs account={account}></ProfileTabs>
        </>
      ) : (
        <Card sx={{ padding: 3 }}>
          <Stack direction="row" justifyContent="center">
            <Typography variant="h4">User not found </Typography>
          </Stack>
        </Card>
      )}
      {isSubscribeModalOpen && (
        <SubscribeToMoniest
          account={account as User}
          handleClose={() => setIsSubscribeModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default Profile;
