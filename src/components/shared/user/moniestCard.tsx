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
import Navigator from "../common/navigatior";
import { StarChip } from "../common/starChip";
import { useTranslate } from "../../../hooks/useTranslate";

type propTypes = {
  user: User;
};

const MoniestCard = ({ user }: propTypes) => {
  const theme = useTheme();
  const translate = useTranslate();

  const handleUserClick = () => {};

  return (
    <Card sx={{ height: "184px" }}>
      <Navigator path={`/${user.username}`}>
        <CardHeader
          onClick={handleUserClick}
          sx={{
            ".MuiCardHeader-action": {
              alignSelf: "unset",
              marginRight:0
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
                sx={{ width: 42, height: 42 }}
              ></Avatar>
            </IconButton>
          }
          action={
            <Stack alignItems="center">
              <Typography variant="h4">
                {user.moniest?.subscription_info.fee} $
              </Typography>
              <Typography variant="h5">
                {translate("moniest.per_month")}
              </Typography>
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
          label={
            ((user.moniest as any)["subscriber_count"] || 0) +
            ` ${translate("moniest.subscribers")}`
          }
        />
        <StarChip count={user.moniest?.score as number}></StarChip>
      </Stack>
      <CardContent sx={{ paddingBottom: "1rem !important" }}>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
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
