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
import Navigator from "../common/navigatior";
import { StarChip } from "../common/starChip";

type propTypes = {
  user: User;
};

const MoniestCard = ({ user }: propTypes) => {
  const theme = useTheme();

  const handleUserClick = () => {};

  return (
    <Card sx={{ height: "240px" }}>
      <Navigator path={`/${user.username}`}>
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
                src={user.profile_photo_link}
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
              {`${user.name} ${user.surname}`}
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
                {user.username}
              </Typography>
            </Stack>
          }
        />
      </Navigator>
      <Stack padding="0 20px" flexDirection="row" columnGap={1}>
        <Chip
          sx={{ fontWeight: "600", fontSize: "0.7rem" }}
          icon={
            <PersonOutlineOutlinedIcon
              sx={{ marginLeft: "10px", fontSize: "1.15rem" }}
            />
          }
          label={12 + " Subscribers"}
        />
        <StarChip count={"36"}></StarChip>
      </Stack>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
          variant="body1"
        >
          {user.moniest?.bio}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MoniestCard;
