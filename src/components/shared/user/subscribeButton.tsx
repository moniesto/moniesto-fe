import { AttachMoneyOutlined, DoneOutline } from "@mui/icons-material";
import { useTranslate } from "../../../hooks/useTranslate";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsSubscribed } from "../../../store/slices/profileSlice";
import { LoadingButton } from "@mui/lab";
import { useMediaQuery, useTheme } from "@mui/material";

export const SubscribeButton = ({ onClick }: { onClick: () => void }) => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(true);
  const translate = useTranslate();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!profileState.account) {
      setLoading(false);
      return;
    }
    api.moniest
      .subscribe_check(profileState.account.username as string)
      .then((res) => dispatch(setIsSubscribed(res?.subscribed as boolean)))
      .finally(() => setLoading(false));
  }, [profileState, dispatch]);

  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      size={matches ? "small" : "medium"}
      sx={{
        ".MuiButton-endIcon": {
          marginLeft: profileState.isSubscribed ? "" : "-4px",
          marginTop: profileState.isSubscribed ? "" : "-2px",
        },
      }}
      endIcon={
        !loading &&
        (profileState.isSubscribed ? <DoneOutline /> : <AttachMoneyOutlined />)
      }
      color="secondary"
      variant="contained"
    >
      {matches}
      {profileState.isSubscribed
        ? translate("moniest.subscribed")
        : `${translate("moniest.subscribe")} ${
            profileState.account?.moniest?.subscription_info.fee
          }`}
    </LoadingButton>
  );
};
