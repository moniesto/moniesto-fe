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
  useTheme,
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

  return (
    <Card sx={{ position: "relative", paddingBottom: "50px" }}>
      <CardHeader
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
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
          <Stack flexDirection="row" gap="42px">
            <Stack alignItems="center">
              <Typography variant="h5">{post.currency}</Typography>
              <Typography variant="h5">{post.start_price}</Typography>
            </Stack>
            <StatusDot status={1}></StatusDot>
          </Stack>
        }
        title={
          <Typography variant="h4">
            {post.user.name + " " + post.user.surname}
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
      <Divider sx={{ width: "calc(100% - 40px)", margin: "auto" }}></Divider>
      <CardContent sx={{ paddingBottom: 0 }}>
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
              field: "percetage",
              title: "Percetage",
            },
            {
              field: "time_left",
              title: "Time Left",
            },
          ]}
          rows={[
            {
              direction: post.direction,
              start: post.start_price,
              target: post.target3,
              percetage: (post.start_price / post.target3).toFixed(3),
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
        <CardContent sx={{ paddingTop: 0 }}>
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
              {
                field: "",
                title: "",
              },
            ]}
            rows={[
              {
                tp_1: post.target1,
                tp_2: post.target2,
                tp_3: post.target3,
                stop: post.stop,
                "": "",
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
            {/* <Typography sx={{ paddingTop: 3 }} paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography> */}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
