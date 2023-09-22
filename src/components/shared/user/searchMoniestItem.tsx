import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Typography,
} from "@mui/material";
import { User } from "../../../interfaces/user";

type propTypes = ListItemButtonProps & {
  user: User;
};

const SearchMoniestItem = (props: propTypes) => {
  return (
    <ListItemButton
      {...props}
      sx={{ ...props.sx, margin: "0 5px", padding: 0 }}
    >
      <ListItemAvatar>
        <IconButton disableRipple size="small" sx={{ mr: 1 }}>
          <Avatar
            src={props.user.profile_photo_thumbnail_link}
            sx={{ width: 50, height: 50 }}
          ></Avatar>
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant="h4">{props.user.fullname}</Typography>}
        secondary={
          <Typography
            sx={{ opacity: 0.7 }}
            lineHeight="17px"
            variant="h5"
            mt="2px"
          >
            {props.user.username}
          </Typography>
        }
      />
    </ListItemButton>
  );
};
export default SearchMoniestItem;
