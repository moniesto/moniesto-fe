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
  styled,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import StatusDot from "./statusDot";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PredictionDataTable from "./predictionDataTable";
import { Post } from "../../../interfaces/post";
import Navigator from "../common/navigatior";
import ReactTimeAgo from "react-time-ago";
import { Editor } from "../common/editor/editor";
import helper from "../../../services/helper";
import { useTheme } from "@mui/system";
import { InfoChip } from "./infoChip";
import { PercentOutlined, StarOutline } from "@mui/icons-material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

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
};

const PostCard = ({ post }: PostCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const theme = useTheme();

  const calculatePercentage = (
    helper.operatonByDirection(post.direction) *
    ((post.target3 - post.start_price) / post.start_price) *
    100
  ).toFixed(3);

  return (
    <Card sx={{ position: "relative", paddingBottom: "50px" }}>
      <CardHeader
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
          },
          padding: {
            xs: 2,
            md: 2.5,
          },
        }}
        avatar={
          <Navigator path={"/" + post.user.username}>
            <IconButton disableRipple size="small" sx={{ ml: 2 }}>
              <Avatar
                src={post.user.profile_photo_thumbnail_link}
                sx={{ width: 50, height: 50 }}
              ></Avatar>
            </IconButton>
          </Navigator>
        }
        action={
          <Stack flexDirection="row" gap={{ md: 5, xs: 3 }}>
            <Stack alignItems="center">
              <Typography variant="h5">{post.currency}</Typography>
              <Typography variant="h5">{post.start_price}</Typography>
            </Stack>
            <StatusDot date={post.duration as string}></StatusDot>
          </Stack>
        }
        title={
          <Typography variant="h4">
            {`${post.user.name} ${post.user.surname}`}
          </Typography>
        }
        subheader={
          <Stack flexDirection="row" columnGap={1} alignItems="baseline">
            <Typography
              color={theme.palette.grey[500]}
              lineHeight="17px"
              variant="h5"
            >
              {post.user.username}
            </Typography>
            <Typography color={theme.palette.grey[500]}>•</Typography>
            <Typography variant="h6" color={theme.palette.grey[500]}>
              <ReactTimeAgo date={new Date(post.created_at)} />
            </Typography>
          </Stack>
        }
      />
      <Stack
        spacing={2}
        pb={1}
        pr={{ xs: "10px", md: "20px" }}
        direction="row"
        justifyContent="flex-end"
      >
        {post.score && (
          <InfoChip
            title="Score"
            value={post.score}
            startAdornment={
              <StarOutline
                sx={{ fontSize: "1.1rem", opacity: "0.7" }}
              ></StarOutline>
            }
          ></InfoChip>
        )}

        <InfoChip
          title="Rate"
          startAdornment={
            <PercentOutlined
              sx={{ fontSize: "1.1rem", opacity: "0.7" }}
            ></PercentOutlined>
          }
          value={calculatePercentage}
        ></InfoChip>
      </Stack>
      <Divider
        sx={{
          width: { xs: "calc(100% - 20px)", md: "calc(100% - 40px)" },
          margin: "auto",
        }}
      ></Divider>
      <CardContent
        sx={{
          paddingBottom: 0,
          padding: { xs: "4px", md: 2 },
          overflowX: "auto",
        }}
      >
        <PredictionDataTable
          columns={[
            {
              field: "direction",
              title: "Direction",
            },
            {
              field: "start",
              title: "Start",
            },
            {
              field: "target",
              title: "Target",
            },
            {
              field: "time_left",
              title: "Time Left",
            },
          ]}
          rows={[
            {
              direction: post.direction.toUpperCase(),
              start: post.start_price,
              target: post.target3,
              time_left: <ReactTimeAgo date={new Date(post.duration)} />,
            },
          ]}
        ></PredictionDataTable>
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
        <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ paddingTop: 0, padding: { xs: "4px", md: 2 } }}>
          <PredictionDataTable
            columns={[
              {
                field: "tp_1",
                title: "TP 1",
              },
              {
                field: "tp_2",
                title: "TP 2",
              },
              {
                field: "tp_3",
                title: "TP 3",
              },
              {
                field: "stop",
                title: "Stop",
              },
            ]}
            rows={[
              {
                tp_1: post.target1,
                tp_2: post.target2,
                tp_3: post.target3,
                stop: post.stop,
              },
            ]}
          ></PredictionDataTable>

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
export default PostCard;
