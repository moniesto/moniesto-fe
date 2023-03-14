import { AttachMoneyOutlined, DoneOutline } from "@mui/icons-material";
import { Button } from "@mui/material";

export const SubscribeButton = ({
  isSubscribed,
  onClick,
  fee,
}: {
  isSubscribed: boolean;
  onClick: () => void;
  fee: number;
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        ".MuiButton-endIcon": {
          marginLeft: isSubscribed ? "" : "-4px",
        },
      }}
      endIcon={isSubscribed ? <DoneOutline /> : <AttachMoneyOutlined />}
      color="secondary"
      variant="contained"
    >
      {isSubscribed ? " Subscribed " : ` Subscribe ${fee}`}
    </Button>
  );
};
