import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from "@mui/icons-material/Star";
import LocationText from "../../../components/shared/common/locationText";
import ProfileTabs from "./profileTabs";
import { useAppSelector } from "../../../store/hooks";
import { useTheme } from "@mui/system";

const Profile = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);

  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          paddingBottom: "45px",
          background: theme.palette.background[500],
        }}
        elevation={0}
      >
        <Box
          height={{ xs: "8.2rem", md: "9.4rem" }}
          sx={{
            backgroundImage: `url(${user?.background_photo_link})`,
            background: theme.palette.background[600],
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            position: "relative",
          }}
        >
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
            src={user?.profile_photo_link}
          ></Avatar>
        </Box>
        <Box padding={"0 30px"}>
          <Box>
            <Stack
              flexDirection="row"
              alignItems="center"
              height={"3rem"}
              justifyContent="end"
            >
              <Button
                sx={{
                  ".MuiButton-endIcon": {
                    marginLeft: "-4px",
                  },
                }}
                endIcon={<AttachMoneyIcon />}
                color="secondary"
                variant="contained"
              >
                Subscribe {5}
              </Button>
            </Stack>
          </Box>
          <Box mt={1.5} mb={5}>
            <Stack spacing={2}>
              <Stack flexDirection="row">
                <Stack spacing={0.3}>
                  <Stack flexDirection="row" alignItems="end">
                    <Typography variant="h3">
                      {user.name + " " + user.surname}
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
                      {user.moniest?.score || 0}
                    </Typography>
                  </Stack>

                  <Typography sx={{ opacity: 0.8 }} variant="h5">
                    {user.username}
                  </Typography>
                </Stack>
              </Stack>
              <LocationText />
              <Typography variant="body1">
                {user.moniest?.bio ||
                  `BTC Lover | Trader Specialist at TradeOptions | Professionals
                think about how much money they could lose.BTC Lover | Trader
                Marketing.`}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Card>
      <ProfileTabs></ProfileTabs>
    </Box>
  );
};

export default Profile;
