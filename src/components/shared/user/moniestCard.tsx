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
} from "@mui/material";
import { User } from "../../../interfaces/user";
import Navigator from "../common/navigatior";
import { useTranslate } from "../../../hooks/useTranslate";
import { GroupOutlined } from "@mui/icons-material";
import { colorByNumberValue } from "../../../services/utils";

type MoniestCardProps = {
  user: User;
  loading: boolean;
};

const MoniestCard = ({ user, loading }: MoniestCardProps) => {
  const translate = useTranslate();

  const handleUserClick = () => {};

  const statistics = user?.moniest?.post_statistics;

  const statisticSection = (
    label: string,
    symbol: string,
    value?: number,
    isTotal?: boolean
  ) => (
    <Stack flex={isTotal ? 1.2 : 1}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: colorByNumberValue(isTotal ? 0 : value) }}
      >
        {value}
        {symbol}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          opacity: 0.7,
          ...(isTotal
            ? {
                maxWidth: "88px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }
            : {}),
        }}
      >
        {label}
      </Typography>
    </Stack>
  );

  return (
    <Card sx={{ height: "100%" }}>
      <Navigator path={`/${user.username}`}>
        <CardHeader
          onClick={handleUserClick}
          sx={{
            padding: 2,
            ".MuiCardHeader-action": {
              alignSelf: "unset",
              marginRight: 0,
              marginLeft: 1,
            },
            ".MuiCardHeader-avatar": {
              marginRight: 1,
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
                <Stack alignItems="center">
                  <Typography variant="h4">
                    {user.moniest?.subscription_info.fee}$
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.7 }}>
                    {translate("moniest.per_month")}
                  </Typography>
                </Stack>
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
              <Stack direction="row" alignItems="center">
                <Typography
                  sx={{
                    maxWidth: 140,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="h4"
                  fontSize="0.75em"
                >
                  {`${user.fullname}`}
                </Typography>
              </Stack>
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
                  sx={{ opacity: 0.7 }}
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
      <CardContent
        sx={{ paddingBottom: "16px !important", padding: 2, paddingTop: 0 }}
      >
        <Stack gap={1.5}>
          {!loading ? (
            <>
              <Stack>
                <Chip
                  sx={{
                    fontWeight: "600",
                    fontSize: "0.7rem",
                  }}
                  icon={
                    <GroupOutlined
                      sx={{
                        fontSize: "0.8rem",
                        opacity: 0.6,
                      }}
                    />
                  }
                  label={
                    <Stack direction="row" alignItems="baseline" gap={0.6}>
                      {user.moniest?.subscriber_count || 0}
                      <Typography variant="h5" sx={{ opacity: 0.7 }}>
                        {translate("moniest.subscribers")}
                      </Typography>
                    </Stack>
                  }
                />
              </Stack>
              <Stack gap={1}>
                <Stack direction="row" gap={0.2}>
                  {statisticSection(
                    translate("component.moniest_card.30d_roi"),
                    "%",
                    statistics?.roi_30days
                  )}
                  {statisticSection(
                    translate("component.moniest_card.30d_pnl"),
                    "$",
                    statistics?.pnl_30days
                  )}
                  {statisticSection(
                    translate("component.moniest_card.30d_win_rate"),
                    "%",
                    statistics?.win_rate_30days,
                    true
                  )}
                </Stack>
                <Stack direction="row" gap={0.2}>
                  {statisticSection(
                    translate("component.moniest_card.total_roi"),
                    "%",
                    statistics?.roi_total
                  )}
                  {statisticSection(
                    translate("component.moniest_card.total_pnl"),
                    "$",
                    statistics?.pnl_total
                  )}
                  {statisticSection(
                    translate("component.moniest_card.total_win_rate"),
                    "%",
                    statistics?.win_rate_total,
                    true
                  )}
                </Stack>
              </Stack>
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
        {/* {!loading ? (
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              opacity: 0.8,
              fontSize: "0.82em",
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
        )} */}
      </CardContent>
    </Card>
  );
};

export default MoniestCard;
