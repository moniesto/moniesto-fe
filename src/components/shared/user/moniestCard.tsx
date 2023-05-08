import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Skeleton,
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

type MoniestCardProps = {
  user: User;
  loading: boolean;
};

const MoniestCard = ({ user, loading }: MoniestCardProps) => {
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
              marginRight: 0,
            },
            cursor: "pointer",
          }}
          avatar={
            !loading ? (
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
            ) : (
              <Skeleton
                animation="wave"
                sx={{ width: 42, height: 42 }}
                variant="circular"
              ></Skeleton>
            )
          }
          action={
            <Stack alignItems="center">
              {!loading ? (
                <>
                  <Typography variant="h4">
                    {user.moniest?.subscription_info.fee} $
                  </Typography>
                  <Typography variant="h5">
                    {translate("moniest.per_month")}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton
                    animation="wave"
                    sx={{ width: 30 }}
                    variant="text"
                  ></Skeleton>
                  <Skeleton
                    animation="wave"
                    sx={{ width: 40, maxHeight: 17 }}
                    variant="text"
                  ></Skeleton>
                </>
              )}
            </Stack>
          }
          title={
            !loading ? (
              <Typography variant="h4" display="flex" alignItems="center">
                {`${user.name} ${user.surname}`}
                <ArrowForwardIosIcon
                  sx={{ fontSize: "0.8rem", marginLeft: 1 }}
                ></ArrowForwardIosIcon>
              </Typography>
            ) : (
              <Skeleton
                animation="wave"
                sx={{ width: 90, maxHeight: 22 }}
                variant="text"
              ></Skeleton>
            )
          }
          subheader={
            <Stack flexDirection="row" columnGap={1} alignItems="center">
              {!loading ? (
                <Typography
                  color={theme.palette.grey[500]}
                  lineHeight="17px"
                  variant="h5"
                >
                  {user.username}
                </Typography>
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ width: 60, maxHeight: 17 }}
                  variant="text"
                ></Skeleton>
              )}
            </Stack>
          }
        />
      </Navigator>
      <Stack padding="0 20px" flexDirection="row" columnGap={1}>
        {!loading ? (
          <>
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
          </>
        ) : (
          <>
            <Chip
              label={
                <Skeleton
                  animation="wave"
                  sx={{ width: 60, maxHeight: 17 }}
                  variant="text"
                ></Skeleton>
              }
            ></Chip>
            <Chip
              label={
                <Skeleton
                  animation="wave"
                  sx={{ width: 60, maxHeight: 17 }}
                  variant="text"
                ></Skeleton>
              }
            ></Chip>
          </>
        )}
      </Stack>
      <CardContent sx={{ paddingBottom: "1rem !important" }}>
        {!loading ? (
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
        ) : (
          <>
            <Skeleton
              animation="wave"
              sx={{ width: "100%" }}
              variant="text"
            ></Skeleton>
            <Skeleton
              animation="wave"
              sx={{ width: "100%" }}
              variant="text"
            ></Skeleton>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoniestCard;
