import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { User } from "../../../interfaces/user";
import LocationText from "../common/locationText";
import { MoniestBadge } from "./moniestBadge";

type propTypes = {
  user: User;
  loading: boolean;
  props?: ListItemButtonProps;
};

const SubsPersonCard = ({ user, loading, props }: propTypes) => {
  return (
    <ListItemButton
      {...props}
      sx={{ ...props?.sx, margin: "0 5px", padding: { xs: 0, md: "6px 10px" } }}
    >
      <ListItemAvatar>
        <IconButton disableRipple size="small" sx={{ mr: 1 }}>
          {!loading ? (
            <>
              <Avatar
                src={user.profile_photo_thumbnail_link}
                sx={{ width: 50, height: 50 }}
              ></Avatar>
              {user.moniest && <MoniestBadge />}
            </>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 50, height: 50 }}
              variant="circular"
            ></Skeleton>
          )}
        </IconButton>
      </ListItemAvatar>
      <ListItemText
        primary={
          !loading ? (
            <Typography variant="h4">{`${user.fullname}`}</Typography>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 150 }}
              variant="text"
            ></Skeleton>
          )
        }
        secondary={
          !loading ? (
            <Typography
              sx={{ opacity: 0.7 }}
              lineHeight="17px"
              variant="h5"
              mt="2px"
            >
              {user.username}
            </Typography>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 90, maxHeight: 17 }}
              variant="text"
            ></Skeleton>
          )
        }
      />
      {!loading ? (
        <LocationText location={user.location} />
      ) : (
        <Skeleton
          animation="wave"
          sx={{ width: 90, maxHeight: 17 }}
          variant="text"
        ></Skeleton>
      )}
    </ListItemButton>
  );
};

export default SubsPersonCard;
