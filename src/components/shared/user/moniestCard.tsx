import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { User } from "../../../interfaces/user";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";

type propTypes = {
  user: User;
};

const MoniestCard = ({ user }: propTypes) => {
  const theme = useTheme();

  const handleUserClick = () => {};

  return (
    <Card>
      <CardHeader
        onClick={handleUserClick}
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
          },
          cursor: "pointer",
        }}
        avatar={
          <IconButton
            disableRipple
            onClick={handleUserClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar
              src={user.profile_photo_thumbnail}
              sx={{ width: 50, height: 50 }}
            ></Avatar>
          </IconButton>
        }
        action={
          <Stack alignItems="center">
            <Typography variant="h4">
              {user.moniest?.subscription_info.fee} $
            </Typography>
            <Typography variant="h5">per month</Typography>
          </Stack>
        }
        title={
          <Typography variant="h4" display="flex" alignItems="center">
            Davut Turug{" "}
            <ArrowForwardIosIcon
              sx={{ fontSize: "0.8rem", marginLeft: 1 }}
            ></ArrowForwardIosIcon>
          </Typography>
        }
        subheader={
          <Stack flexDirection="row" columnGap={1} alignItems="center">
            <Typography
              color={theme.palette.grey[500]}
              lineHeight="17px"
              variant="h5"
            >
              davuttrg
            </Typography>
          </Stack>
        }
      />
      <Stack padding="0 20px" flexDirection="row" columnGap={1}>
        <Chip
          sx={{ fontWeight: "600", fontSize: "0.7rem" }}
          icon={<PersonOutlineOutlinedIcon sx={{ fontSize: "1.15rem" }} />}
          label={12 + " Subscribers"}
        />
        <Chip
          sx={{ fontWeight: "600", fontSize: "0.7rem" }}
          icon={
            <StarIcon
              sx={{ fontSize: "1.10rem", color: "#FED839 !important" }}
            />
          }
          label={36 + " Score"}
        />
        {/* <Typography variant="inherit" className="badge">
          <Stack flexDirection="row">
            <PersonOutlineOutlinedIcon sx={{ fontSize: "1.15rem" }} />
            <Typography variant="h5">{12} Subscribers </Typography>
          </Stack>
        </Typography>
        <Typography className="badge">
          <Stack flexDirection="row">
            <StarBorderOutlinedIcon sx={{ fontSize: "1.10rem" }} />
            <Typography
              style={{ color: theme.palette.text.secondary }}
              variant="h5"
            >
              {36} Score
            </Typography>
          </Stack>
        </Typography> */}
      </Stack>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="body1">
          BTC Lover | Trader Specialist at TradeOptions | Professionals think
          about how much money they could lose.BTC Lover | Trader Marketin...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MoniestCard;
