import {
  ListItem,
  ListItemAvatar,
  ListItemAvatarProps,
  ListItemButton,
  ListItemText,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { Card } from "../../../interfaces/card";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { ReactNode } from "react";

type propTypes = {
  card: Card;
  selectedCardId?: string;
  onClickCard?: () => void;
  listItemAvatar?: ReactNode;
};
const CardItem = ({
  card,
  onClickCard,
  selectedCardId,
  listItemAvatar,
}: propTypes) => {
  const theme = useTheme();
  return (
    <ListItem
      className={selectedCardId == card.id ? "selected" : ""}
      sx={{
        width: "100%",
        border: "1px solid " + theme.palette.primary[200] + "!important",
        borderRadius: theme.palette.borderRadius.main,
      }}
      key={card.id}
      secondaryAction={<Typography variant="h5">{card.brand}</Typography>}
      disablePadding
    >
      <ListItemButton selected={selectedCardId == card.id} onClick={onClickCard} alignItems="flex-start">
        {listItemAvatar}
        <ListItemText
          primary={
            <Stack pb={1} columnGap={1} flexDirection="row" alignItems="center">
              <CreditCardOutlinedIcon sx={{ fontSize: "1rem" }} />
              <Typography>{card.name}</Typography>
            </Stack>
          }
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="h5"
              color="text.primary"
            >
              **** **** **** {card.last4}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

CardItem.defaultProps = {
  selectedCardId: "",
};
export default CardItem;
