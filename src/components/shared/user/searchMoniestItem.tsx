import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { User } from "../../../interfaces/user";

type propTypes = ListItemButtonProps & {
  user: User;
};

const SearchMoniestItem = (props: propTypes) => {
  const theme = useTheme();

  return (
    <ListItemButton {...props} sx={{ ...props.sx, margin: "0 5px" }}>
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
            color={theme.palette.grey[500]}
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
