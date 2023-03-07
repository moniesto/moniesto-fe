import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { User } from "../../../interfaces/user";
import LocationText from "../common/locationText";

type propTypes = ListItemButtonProps & {
  user: User;
};

const SubsPersonCard = (props: propTypes) => {
  const theme = useTheme();

  return (
    <ListItemButton {...props} sx={{ ...props.sx, margin: "0 5px" }}>
      <ListItemAvatar>
        <IconButton disableRipple size="small" sx={{ mr: 1 }}>
          <Avatar
            src={props.user.profile_photo_thumbnail_link}
            sx={{ width: 50, height: 50 }}
          ></Avatar>
          {props.user.moniest && (
            <Box
              sx={{
                borderRadius: "100%",
                width: 22,
                height: 22,
                position: "absolute",
                border: `1px solid ${theme.palette.secondary.main}`,
                background: theme.palette.background[500],
                textShadow: "0px 0.4px, 0.4px 0px, 0.4px 0.4px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                right: "2px",
                bottom: "5px",
              }}
            >
              m
            </Box>
          )}
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h4">
            {props.user.name + " " + props.user.surname}
          </Typography>
        }
        secondary={
          <Typography
            color={theme.palette.grey[500]}
            lineHeight="17px"
            variant="h5"
            mt="2px"
          >
            {props.user.username}
          </Typography>
        }
      />
      <LocationText />
    </ListItemButton>
  );
};
export default SubsPersonCard;
