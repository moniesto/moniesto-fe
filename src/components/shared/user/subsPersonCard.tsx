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
import { useTheme } from "@mui/system";
import { User } from "../../../interfaces/user";
import LocationText from "../common/locationText";
import { MoniestBadge } from "./moniestBadge";

type propTypes = ListItemButtonProps & {
  user: User;
  loading: boolean;
};

const SubsPersonCard = (props: propTypes) => {
  const theme = useTheme();

  return (
    <ListItemButton {...props} sx={{ ...props.sx, margin: "0 5px" }}>
      <ListItemAvatar>
        <IconButton disableRipple size="small" sx={{ mr: 1 }}>
          {!props.loading ? (
            <>
              <Avatar
                src={props.user.profile_photo_thumbnail_link}
                sx={{ width: 50, height: 50 }}
              ></Avatar>
              {props.user.moniest && <MoniestBadge />}
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
          !props.loading ? (
            <Typography variant="h4">
              {`${props.user.name} ${props.user.surname}`}
            </Typography>
          ) : (
            <Skeleton
              animation="wave"
              sx={{ width: 150 }}
              variant="text"
            ></Skeleton>
          )
        }
        secondary={
          !props.loading ? (
            <Typography
              color={theme.palette.grey[500]}
              lineHeight="17px"
              variant="h5"
              mt="2px"
            >
              {props.user.username}
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
      {!props.loading ? (
        <LocationText location={props.user.location} />
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
