import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  IconButtonProps,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PredictionDataTable from "./predictionDataTable";
import { Post } from "../../../interfaces/post";
import Navigator from "../common/navigatior";
import ReactTimeAgo from "react-time-ago";
import { Editor } from "../common/editor/editor";
import { useTheme } from "@mui/system";
import { InfoChip } from "./infoChip";
import { NotAdvice } from "../../ui/post/notAdvice";
import { useTranslate } from "../../../hooks/useTranslate";
import { AccessTimeOutlined } from "@mui/icons-material";
import { TimeAgo } from "../common/timeAgo";
import { colorByNumberValue } from "../../../services/utils";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type PostSatus = "pending" | "fail" | "success";

const ExpandMore: any = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type PostCardProps = {
  post: Post;
  loading: boolean;
};

const PostCard = ({ post, loading }: PostCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

  const getColorByStatus = (status: PostSatus) =>
    colorByNumberValue(
      status === "pending" ? 0 : status === "success" ? 1 : -1
    );

  return (
    <Card
      sx={{
        position: "relative",
        padding: {
          xs: "0.8rem",
          md: "1rem",
        },
        paddingBottom: post.description ? "44px !important" : "",
      }}
    >
      <CardHeader
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
            marginRight: "unset",
          },
          padding: 0,
          ".MuiCardHeader-avatar": {
            marginRight: {
              xs: 1,
              md: 1.5,
            },
          },
        }}
        avatar={
          !loading ? (
            <Navigator path={"/" + post.user.username}>
              <IconButton disableRipple size="small" sx={{ ml: 2 }}>
                <Avatar
                  src={post.user.profile_photo_thumbnail_link}
                  sx={{ width: 50, height: 50 }}
                ></Avatar>
              </IconButton>
            </Navigator>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 50, height: 50 }}
              variant="circular"
            ></Skeleton>
          )
        }
        action={
          <Stack flexDirection="row" gap={{ md: 5, xs: 3 }}>
            <Stack alignItems="end">
              {!loading ? (
                <>
                  <Box
                    sx={{
                      borderBottom: "1px solid transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderBottom: `1px solid ${theme.palette.warning.dark}`,
                      },
                    }}
                    component="a"
                    target="_blank"
                    href={`https://www.binance.com/trade/${post.currency}`}
                  >
                    <Typography variant="h4" color={theme.palette.warning.dark}>
                      {post.currency}
                    </Typography>
                  </Box>
                  <Stack alignItems="center" gap={0.4} direction="row">
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ opacity: 0.6 }}
                    >
                      {new Date(post.duration) <= new Date() ||
                      post.status !== "pending" ? (
                        translate("component.post_card.table.finish")
                      ) : (
                        <TimeAgo date={post.duration as string} />
                      )}
                    </Typography>

                    <AccessTimeOutlined
                      sx={{ fontSize: "0.8rem", opacity: 0.6 }}
                    />
                  </Stack>
                </>
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ width: 80 }}
                  variant="text"
                ></Skeleton>
              )}
            </Stack>
          </Stack>
        }
        title={
          !loading ? (
            <Navigator path={"/" + post.user.username}>
              <Typography variant="h4">{`${post.user.fullname}`}</Typography>
            </Navigator>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 120 }}
              variant="text"
            ></Skeleton>
          )
        }
        subheader={
          <Navigator path={"/" + post.user.username}>
            <Stack
              flexWrap="wrap"
              flexDirection="row"
              columnGap={1}
              alignItems="baseline"
            >
              {!loading ? (
                <Typography
                  sx={{ opacity: 0.7 }}
                  lineHeight="17px"
                  variant="h5"
                >
                  {post.user.username}
                </Typography>
              ) : (
                <Skeleton
                  animation="wave"
                  sx={{ width: 80, maxHeight: 20 }}
                  variant="text"
                ></Skeleton>
              )}
              {!loading && <Typography sx={{ opacity: 0.7 }}>•</Typography>}
              <Typography variant="h6" sx={{ opacity: 0.7 }}>
                {!loading ? (
                  <ReactTimeAgo date={new Date(post.created_at)} />
                ) : (
                  <Skeleton
                    animation="wave"
                    sx={{ width: 60, maxHeight: 17 }}
                    variant="text"
                  ></Skeleton>
                )}
              </Typography>
            </Stack>
          </Navigator>
        }
      />
      <Stack
        gap={{ xs: 0.8, md: 1 }}
        pb={1}
        mt={{ xs: 1.5, md: 1 }}
        direction="row"
        justifyContent="flex-end"
        flexWrap="wrap"
      >
        <InfoChip
          sx={{
            ".infochip--value": {
              color: colorByNumberValue(
                post.status === "pending" ? 0 : post.roi
              ),
            },
          }}
          title={
            translate(
              `component.post_card.${
                post.status === "pending" ? "max_roi" : "roi"
              }`
            ) + ":"
          }
          value={(post.roi || 0) + "%"}
          loading={loading}
        ></InfoChip>
        <InfoChip
          sx={{
            ".infochip--value": {
              color: colorByNumberValue(
                post.status === "pending" ? 0 : post.pnl
              ),
            },
          }}
          title={
            translate(
              `component.post_card.${
                post.status === "pending" ? "max_pnl" : "pnl"
              }`
            ) + ":"
          }
          value={(post.pnl || 0) + "$"}
          loading={loading}
        ></InfoChip>
        <InfoChip
          sx={{
            ".infochip--value": {
              color: getColorByStatus(post.status),
            },
          }}
          loading={loading}
          value={translate("component.post_card.status." + post.status)}
        ></InfoChip>
      </Stack>
      <Divider
        sx={{
          margin: "auto",
        }}
      ></Divider>
      <CardContent
        sx={{
          paddingX: 0,
          paddingY: { xs: "4px", md: 1 },
          overflowX: "auto",
        }}
      >
        <PredictionDataTable
          loading={loading}
          columns={[
            {
              field: "direction",
              title: "component.post_card.table.direction",
            },
            {
              field: "start",
              title: "component.post_card.table.start",
            },
            {
              field: "target",
              title: "component.post_card.table.take_profit",
            },
            {
              field: "stop",
              title: "component.post_card.table.stop",
            },
          ]}
          rows={[
            {
              direction: (
                <Box
                  color={colorByNumberValue(post.direction === "long" ? 1 : -1)}
                >
                  {translate("common." + post.direction).toUpperCase()}
                  {` ${
                    post.market_type === "futures"
                      ? " · " + post.leverage + "X"
                      : ""
                  }`}
                </Box>
              ),
              start: post.start_price,
              target: post.take_profit,
              stop: post.stop,
            },
          ]}
        ></PredictionDataTable>
        {!loading && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            gap={1}
            flexWrap="wrap"
          >
            <Box>
              {post?.target1 && (
                <Stack
                  sx={{
                    border: `1px solid ${theme.palette.background[800]}`,
                    borderRadius: "10px",
                    padding: "4px 8px",
                    width: "max-content",
                  }}
                  gap={1}
                  pl={1}
                  direction="row"
                  pt={1.5}
                >
                  <Typography
                    variant="h6"
                    sx={{ opacity: 0.6 }}
                    fontWeight="bold"
                  >
                    {translate("component.post_card.target_points")}:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ opacity: 0.8 }}
                  >
                    {post.target1 ? post.target1 : ""}
                    {post.target2 ? " ➜ " + post.target2 : ""}
                    {post.target3 ? " ➜ " + post.target3 : ""}
                  </Typography>
                </Stack>
              )}
            </Box>

            <NotAdvice />
          </Stack>
        )}
      </CardContent>
      <CardActions
        sx={{
          padding: "5px 20px",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {!loading && post.description && (
          <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            padding: { xs: "4px", md: 1 },
            paddingTop: "0 !important",
            overflowX: "auto",
          }}
        >
          <Stack sx={{ padding: "0 10px" }}>
            {post.description && (
              <Box>
                <Divider sx={{ margin: "16px 0" }}></Divider>
                <Editor
                  readOnly={true}
                  defaultValue={JSON.parse(post?.description || "") as any}
                ></Editor>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

PostCard.defaultProps = {
  loading: false,
};

export default PostCard;
