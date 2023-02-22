import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Avatar,
  Button,
  Card,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { User } from "../../../interfaces/user";
import { TestUser } from "../../../services/tempDatas";
import StarIcon from "@mui/icons-material/Star";
import LocationText from "../../../components/shared/common/locationText";
import ProfileTabs from "./profileTabs";

const Profile = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(TestUser);
  }, []);

  return (
    <Box>
      <Card sx={{ width: "100%", paddingBottom: "45px" }} elevation={0}>
        <Box
          height={{ xs: "8.2rem", md: "9.4rem" }}
          sx={{
            backgroundImage: `url(${user?.background_photo_link})`,
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
              border: `3px solid ${theme.palette.common.white}`,
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
                    <Typography variant="h3">Davut Turug</Typography>
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
                      34 Score
                    </Typography>
                  </Stack>

                  <Typography sx={{ opacity: 0.8 }} variant="h5">
                    davuttrg
                  </Typography>
                </Stack>
              </Stack>
              <LocationText />
              <Typography variant="body1">
                BTC Lover | Trader Specialist at TradeOptions | Professionals
                think about how much money they could lose.BTC Lover | Trader
                Marketing.
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
