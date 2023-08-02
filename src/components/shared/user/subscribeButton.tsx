import {
  AttachMoneyOutlined,
  DoneOutline,
  OpenInNewOutlined,
} from "@mui/icons-material";
import { useTranslate } from "../../../hooks/useTranslate";
import { memo, useEffect, useState } from "react";
import api from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsSubscribed } from "../../../store/slices/profileSlice";
import { LoadingButton } from "@mui/lab";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { SubscriptionInfoResponse } from "../../../interfaces/requests";
import Countdown from "../common/countdown";

export const SubscribeButton = memo(({ onClick }: { onClick: () => void }) => {
  const dispatch = useAppDispatch();
  const profileState = useAppSelector((state) => state.profile);
  const [loading, setLoading] = useState<boolean>(true);
  const translate = useTranslate();
  const theme = useTheme();
  const [info, setInfo] = useState<SubscriptionInfoResponse>();

  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!profileState.account) {
      setLoading(false);
      return;
    }
    api.moniest
      .subscription_info(profileState.account.username as string)
      .then((res) => {
        setInfo(res);
        dispatch(setIsSubscribed(res?.subscribed as boolean));
      })
      .finally(() => setLoading(false));
  }, [profileState, dispatch]);

  return info?.pending ? (
    <Button
      size={matches ? "small" : "medium"}
      color="secondary"
      variant="outlined"
      href={info.universal_link!}
      endIcon={
        <Countdown
          startTime={info.timeout!}
          onDone={() => setInfo(undefined)}
        />
      }
      startIcon={<OpenInNewOutlined />}
    >
      Ödemeye git
    </Button>
  ) : (
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
});
