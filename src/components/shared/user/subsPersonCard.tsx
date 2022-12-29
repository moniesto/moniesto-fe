import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { User } from "../../../interfaces/user";
import LocationText from "../common/locationText";

type propTypes = {
  user: User;
};

const SubsPersonCard = ({ user }: propTypes) => {
  const theme = useTheme();

  return (
    <ListItemButton sx={{ margin: "0 5px" }}>
      <ListItemAvatar>
        <IconButton disableRipple size="small" sx={{ mr: 1 }}>
          <Avatar
            src={user.profile_photo_thumbnail}
            sx={{ width: 50, height: 50 }}
          ></Avatar>
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h4">{user.name + " " + user.surname}</Typography>
        }
        secondary={
          <Typography
            color={theme.palette.grey[500]}
            lineHeight="17px"
            variant="h5"
            mt="2px"
          >
            {user.username}
          </Typography>
        }
      />
      <LocationText />
    </ListItemButton>
  );
};
export default SubsPersonCard;
