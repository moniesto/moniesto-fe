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
import { setSubscriptionInfo } from "../../../store/slices/profileSlice";
import { LoadingButton } from "@mui/lab";
import { Button, useMediaQuery, useTheme } from "@mui/material";
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
      const [isSubscribeModalOpen, setIsSubscribeModalOpen] =
        useState<boolean>(false);

      const matches = useMediaQuery(theme.breakpoints.down("sm"));

      const getSubsInfo = useCallback(() => {
        setLoading(true);
        api.moniest
          .subscription_info(profileState.account?.username as string)
          .then((res) => {
            dispatch(setSubscriptionInfo(res));
          })
          .finally(() => setLoading(false));
      }, [dispatch, profileState.account?.username]);

      useEffect(() => {
        if (profileState.subscriptionInfo) {
          setLoading(false);
          return;
        }
        getSubsInfo();
      }, [profileState.subscriptionInfo, dispatch, getSubsInfo]);

      const handleSubscribtionModalClose = () => {
        setIsSubscribeModalOpen(false);
      };
      useImperativeHandle(ref, () => ({
        reCheckSubscription() {
          getSubsInfo();
        },
      }));

      const handleDone = () => {
        dispatch(setSubscriptionInfo(null));
      };

      return (
        <>
          {profileState.subscriptionInfo?.pending ? (
            <Button
              size={matches ? "small" : "medium"}
              color="secondary"
              variant="outlined"
              href={profileState.subscriptionInfo?.universal_link!}
              onClick={onLinkClick}
              endIcon={
                <Countdown
                  startTime={profileState.subscriptionInfo?.timeout || 0}
                  onDone={handleDone}
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
                    marginLeft: profileState.subscriptionInfo?.subscribed
                      ? ""
                      : "-4px",
                    marginTop: profileState.subscriptionInfo?.subscribed
                      ? ""
                      : "-2px",
                  },
                }}
                endIcon={
                  !loading &&
                  (profileState.subscriptionInfo?.subscribed ? (
                    <DoneOutline />
                  ) : (
                    <AttachMoneyOutlined />
                  ))
                }
                color="secondary"
                variant="contained"
              >
                {matches}
                {profileState.subscriptionInfo?.subscribed
                  ? translate("moniest.subscribed")
                  : `${translate("moniest.subscribe")} ${
                      profileState.account?.moniest?.subscription_info.fee
                    }`}
              </LoadingButton>
            </>
          )}
          {isSubscribeModalOpen && (
            <SubscribeToMoniest handleClose={handleSubscribtionModalClose} />
          )}
        </>
      );
    }
  )
);
