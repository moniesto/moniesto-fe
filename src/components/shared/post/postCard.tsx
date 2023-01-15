import {
  Avatar,
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

type propTypes = {
  post: Post;
};
const PostCard = ({ post }: propTypes) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const theme = useTheme();
  const handleUserClick = () => {};

  return (
    <Card sx={{ position: "relative", paddingBottom: "50px" }}>
      <CardHeader
        sx={{
          ".MuiCardHeader-action": {
            alignSelf: "unset",
          },
        }}
        avatar={
          <IconButton
            disableRipple
            onClick={handleUserClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar
              src="/images/user/Avatar.png"
              sx={{ width: 50, height: 50 }}
            ></Avatar>
          </IconButton>
        }
        action={
          <Stack flexDirection="row" gap="42px">
            <Stack alignItems="center">
              <Typography variant="h5">BTCUSDT</Typography>
              <Typography variant="h5">18.910</Typography>
            </Stack>
            <StatusDot status={1}></StatusDot>
          </Stack>
        }
        title={<Typography variant="h4">Davut Turug</Typography>}
        subheader={
          <Stack flexDirection="row" columnGap={1} alignItems="baseline">
            <Typography
              color={theme.palette.grey[500]}
              lineHeight="17px"
              variant="h5"
            >
              davuttrg
            </Typography>
            <Typography color={theme.palette.grey[500]}>•</Typography>
            <Typography
              variant="h6"
              color={theme.palette.grey[500]}
            >
              2 days ago
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
              direction: "Long",
              start: "18.900",
              target: "18.950",
              percetage: "2.12%",
              time_left: "3 hour",
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
                tp_1: "18.930",
                tp_2: "-",
                tp_3: "18.950",
                stop: "18.880",
                "": "",
              },
            ]}
          ></PredictionDataTable>

          <Stack sx={{ padding: "0 10px" }}>
            <Typography sx={{ paddingTop: 3 }} paragraph>
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
            </Typography>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostCard;
