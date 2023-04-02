import { AttachMoneyOutlined, DoneOutline } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

export const SubscribeButton = ({
  isSubscribed,
  onClick,
  fee,
}: {
  isSubscribed: boolean;
  onClick: () => void;
  fee: number;
}) => {
  const translate = useTranslate();
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
      {isSubscribed
        ? translate("moniest.subscribed")
        : `${translate("moniest.subscribe")} ${fee}`}
    </Button>
  );
};
