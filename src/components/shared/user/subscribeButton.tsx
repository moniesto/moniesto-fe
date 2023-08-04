import {
  AttachMoneyOutlined,
  DoneOutline,
  OpenInNewOutlined,
} from "@mui/icons-material";
import { useTranslate } from "../../../hooks/useTranslate";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import api from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsSubscribed } from "../../../store/slices/profileSlice";
import { LoadingButton } from "@mui/lab";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { SubscriptionInfoResponse } from "../../../interfaces/requests";
import Countdown from "../common/countdown";
import { SubscribeToMoniest } from "../../ui/user/subscibtionModal/subscribeToMoniest";

export type SubscribeButtonImperativeHandleType = {
  reCheckSubscription: () => void;
};
type SubscribeButtonProps = {
  onLinkClick?: () => void;
};

export const SubscribeButton = memo(
  forwardRef<SubscribeButtonImperativeHandleType, SubscribeButtonProps>(
    ({ onLinkClick }, ref) => {
      const dispatch = useAppDispatch();
      const profileState = useAppSelector((state) => state.profile);
      const [loading, setLoading] = useState<boolean>();
      const translate = useTranslate();
      const theme = useTheme();
      const [info, setInfo] = useState<SubscriptionInfoResponse>();
      const [isSubscribeModalOpen, setIsSubscribeModalOpen] =
        useState<boolean>(false);

      const matches = useMediaQuery(theme.breakpoints.down("sm"));

      const getSubsInfo = useCallback(() => {
        setLoading(true);
        api.moniest
          .subscription_info(profileState.account?.username as string)
          .then((res) => {
            setInfo(res);
            dispatch(setIsSubscribed(res?.subscribed as boolean));
          })
          .finally(() => setLoading(false));
      }, [dispatch, profileState.account?.username]);

      useEffect(() => {
        if (!profileState.account) {
          setLoading(false);
          return;
        }
        getSubsInfo();
      }, [profileState, dispatch, getSubsInfo]);

      const handleSubscribtionModalClose = (result: boolean) => {
        setIsSubscribeModalOpen(false);
        if (result) {
          getSubsInfo();
        }
      };
      useImperativeHandle(ref, () => ({
        reCheckSubscription() {
          getSubsInfo();
        },
      }));

      return info?.pending ? (
        <Button
          size={matches ? "small" : "medium"}
          color="secondary"
          variant="outlined"
          href={info.universal_link!}
          onClick={onLinkClick}
          endIcon={
            <Countdown
              startTime={info.timeout!}
              onDone={() => setInfo(undefined)}
            />
          }
          startIcon={<OpenInNewOutlined />}
        >
          {translate("moniest.go_payment")}
        </Button>
      ) : (
        <>
          <LoadingButton
            loading={loading}
            onClick={() => setIsSubscribeModalOpen(true)}
            size={matches ? "small" : "medium"}
            sx={{
              ".MuiButton-endIcon": {
                marginLeft: profileState.isSubscribed ? "" : "-4px",
                marginTop: profileState.isSubscribed ? "" : "-2px",
              },
            }}
            endIcon={
              !loading &&
              (profileState.isSubscribed ? (
                <DoneOutline />
              ) : (
                <AttachMoneyOutlined />
              ))
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
          {isSubscribeModalOpen && (
            <SubscribeToMoniest handleClose={handleSubscribtionModalClose} />
          )}
        </>
      );
    }
  )
);
