import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/system";
import { TaskAltOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import api from "../../../../services/api";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { SubscribtionInfoList } from "./subscribtionInfoList";
import { WrappedModal } from "../../../shared/common/wrappedModal";
import { SubscribeButton } from "../../../shared/user/subscribeButton";
import { setSubscriptionInfo } from "../../../../store/slices/profileSlice";
import { UnsubscribtionInfoList } from "./unsubscribtionInfoList";
import { Trans } from "react-i18next";
import toastService from "../../../../services/toastService";

export const SubscribeToMoniest = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const theme = useTheme();
  const translate = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const profileState = useAppSelector((state) => state.profile);
  const [month, setMonth] = useState(1);
  const [isCancelConfirmModalOpened, setIsCancelConfirmModalOpened] =
    useState(false);

  const dispatch = useAppDispatch();

  const handleSubscribe = () => {
    setLoading(true);
    api.moniest
      .subscribe(profileState.account!.username, {
        returnURL: window.location.href + "/subscription/success",
        cancelURL: window.location.href + "/subscription/fail",
        number_of_months: month,
      })
      .then(() => {
        dispatch(setSubscriptionInfo(null));
      })
      .catch(() => handleClose())
      .finally(() => setLoading(false));
  };

  const handleUnsubscribe = () => {
    api.moniest
      .unsubscribe(profileState.account!.username)
      .then(() => {
        toastService.open({
          message: "page.profile.subs_modal.cancel_toast",
          severity: "success",
        });
        dispatch(setSubscriptionInfo(null));
        handleClose();
      })
      .finally(() => setLoading(false));
  };

  return (
    <WrappedModal
      headerBackgroundColor={theme.palette.background[800]}
      noPadding
      width={500}
      opened={true}
      onClose={() => handleClose()}
    >
      {profileState.subscriptionInfo?.pending ? (
        <Stack alignItems="center" p={3} gap={5} pb={7}>
          <Box>
            <TaskAltOutlined
              sx={{
                padding: "6px",
                borderRadius: "100%",
                width: "40px",
                height: "40px",
                background: theme.palette.secondary[200],
                color: theme.palette.secondary.main,
              }}
            />
          </Box>
          <Stack alignItems="center" gap={2}>
            <Typography textAlign="center" variant="h2">
              {translate("component.subscription.link_created")}
            </Typography>
            <Typography textAlign="center" variant="h3" sx={{ opacity: 0.8 }}>
              {translate("component.subscription.click_link")}
            </Typography>
          </Stack>
          <SubscribeButton onLinkClick={() => handleClose()} />
        </Stack>
      ) : (
        <>
          <Box
            mb={2}
            height={60}
            position="relative"
            sx={{ background: theme.palette.background[800] }}
          >
            <Stack
              sx={{ height: "100%" }}
              justifyContent="flex-end"
              p={3}
              pb={0}
            >
              <Avatar
                sx={{
                  position: "absolute",
                  width: "5rem",
                  height: "5rem",
                  border: `3px solid ${theme.palette.background[500]}`,
                  bottom: "-2.5rem",
                }}
                src={profileState.account!.profile_photo_link}
              ></Avatar>
              <Stack
                ml="6rem"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" fontWeight={500}>
                  {!profileState.subscriptionInfo?.subscribed ? (
                    <Trans
                      values={{ username: profileState.account!.username }}
                      i18nKey="page.profile.subs_modal.to"
                      components={{ bold: <b /> }}
                    ></Trans>
                  ) : (
                    <b>{profileState.account!.username}</b>
                  )}
                </Typography>
                <Typography variant="h4">
                  {profileState.account!.moniest?.subscription_info.fee}$
                  <Typography pl={1} component="span">
                    / {translate("page.profile.subs_modal.monthly")}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box p={{ xs: 1.5, md: 3 }} pt={{ xs: 5, md: 8 }}>
            {!profileState.subscriptionInfo?.subscribed ? (
              <SubscribtionInfoList
                month={month}
                handleMonthChange={setMonth}
              />
            ) : (
              <UnsubscribtionInfoList />
            )}
            <Stack mt={3}>
              <LoadingButton
                onClick={() => {
                  profileState.subscriptionInfo?.subscribed
                    ? setIsCancelConfirmModalOpened(true)
                    : handleSubscribe();
                }}
                color="secondary"
                loading={loading}
                variant="contained"
              >
                {translate(
                  `page.profile.${
                    profileState.subscriptionInfo?.subscribed
                      ? "unsubscribe"
                      : "subscribe"
                  }`
                )}
              </LoadingButton>
            </Stack>
          </Box>
        </>
      )}
      <WrappedModal
        width={400}
        opened={isCancelConfirmModalOpened}
        onClose={() => setIsCancelConfirmModalOpened(false)}
      >
        <Typography textAlign="center" mb={1} variant="h3">
          {translate("page.profile.subs_modal.cancel_modal.title")}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4">
          {translate("page.profile.subs_modal.cancel_modal.message")}
        </Typography>
        <Typography pt={1} sx={{ mb: 4 }} variant="h4">
          {translate("page.profile.subs_modal.cancel_modal.message_body")}
        </Typography>

        <Stack direction="row" mt={2} spacing={4}>
          <Button
            onClick={() => setIsCancelConfirmModalOpened(false)}
            type="button"
            sx={{ flex: 1 }}
            variant="outlined"
            color="inherit"
          >
            {translate("common.cancel")}
          </Button>
          <LoadingButton
            sx={{ flex: 1 }}
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleUnsubscribe}
          >
            {translate("common.confirm")}
          </LoadingButton>
        </Stack>
      </WrappedModal>
    </WrappedModal>
  );
};
