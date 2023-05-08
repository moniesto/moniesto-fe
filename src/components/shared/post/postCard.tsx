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
import helper from "../../../services/helper";
import { useTheme } from "@mui/system";
import { InfoChip } from "./infoChip";
import { NotAdvice } from "../../ui/post/notAdvice";
import { useTranslate } from "../../../hooks/useTranslate";

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
  loading: boolean
};

const PostCard = ({ post, loading }: PostCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const theme = useTheme();
  const translate = useTranslate();

  const calculatePercentage = helper.parseCurrency(
    helper.operatonByDirection(post.direction) *
    ((post.target3 - post.start_price) / post.start_price) *
    100,
    3
  );

  const getColorByStatus = (status: PostSatus) => {
    let color = "";
    switch (status) {
      case "pending":
        color = theme.palette.grey[600];
        break;
      case "fail":
        color = theme.palette.orange.dark;
        break;
      case "success":
        color = theme.palette.success.dark;
        break;
    }
    return color;
  };

  return (
    <Card sx={{ position: "relative", paddingBottom: "44px" }}>
      {!loading && <NotAdvice />}
      <CardHeader
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
            marginRight: "unset",
          },
          padding: {
            xs: "0.8rem 0.8rem 0.2rem",
            md: "1.2rem 1.2rem 0.5rem",
          },
        }}
        avatar={
          !loading ? <Navigator path={"/" + post.user.username}>
            <IconButton disableRipple size="small" sx={{ ml: 2 }}>
              <Avatar
                src={post.user.profile_photo_thumbnail_link}
                sx={{ width: 50, height: 50 }}
              ></Avatar>
            </IconButton>
          </Navigator> :
            <Skeleton animation="wave" sx={{ width: 50, height: 50 }} variant="circular"></Skeleton>
        }
        action={
          <Stack flexDirection="row" gap={{ md: 5, xs: 3 }}>
            <Stack alignItems="center">
              {
                !loading ? <Typography variant="h4" color={theme.palette.warning.dark}>
                  {post.currency}
                </Typography> :
                  <Skeleton animation="wave" sx={{ width: 80 }} variant="text"></Skeleton>
              }

            </Stack>
          </Stack>
        }
        title={
          !loading ?
            <Typography variant="h4">
              {`${post.user.name} ${post.user.surname}`}
            </Typography>
            :
            <Skeleton animation="wave" sx={{ width: 120 }} variant="text"></Skeleton>
        }
        subheader={
          <Stack flexDirection="row" columnGap={1} alignItems="baseline">
            {
              !loading ? <Typography
                color={theme.palette.grey[500]}
                lineHeight="17px"
                variant="h5"
              >
                {post.user.username}
              </Typography> :
                <Skeleton animation="wave" sx={{ width: 80, maxHeight: 20 }} variant="text"></Skeleton>
            }
            {!loading && <Typography color={theme.palette.grey[500]}>•</Typography>}
            <Typography variant="h6" color={theme.palette.grey[500]}>
              {
                !loading ? <ReactTimeAgo date={new Date(post.created_at)} /> :
                  <Skeleton animation="wave" sx={{ width: 60, maxHeight: 17 }} variant="text"></Skeleton>
              }

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
        {post.score && !loading && (
          <InfoChip
            loading={loading}
            title="Score"
            value={post.score}
          ></InfoChip>
        )}

        <InfoChip
          title={translate("component.post_card.rate")}
          value={"%" + calculatePercentage}
          loading={loading}
        ></InfoChip>
        <InfoChip
          sx={{
            ".infochip--value": {
              color: getColorByStatus(post.status),
              textShadow: "0.5px 0 " + getColorByStatus(post.status),
            },
          }}
          loading={loading}
          value={translate("component.post_card.status." + post.status)}
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
          padding: { xs: "4px", md: 1 },
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
              title: "component.post_card.table.target",
            },
            {
              field: "time_left",
              title: "component.post_card.table.time_left",
            },
          ]}
          rows={[
            {
              direction: translate("common." + post.direction).toUpperCase(),
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
        {
          !loading && <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon />
          </ExpandMore>
        }
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ paddingTop: 0, padding: { xs: "4px", md: 2 } }}>
          <PredictionDataTable
            columns={[
              {
                field: "tp_1",
                title: "component.post_card.table.tp_1",
              },
              {
                field: "tp_2",
                title: "component.post_card.table.tp_2",
              },
              {
                field: "tp_3",
                title: "component.post_card.table.tp_3",
              },
              {
                field: "stop",
                title: "component.post_card.table.stop",
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


PostCard.defaultProps = {
  loading: false
}

export default PostCard;