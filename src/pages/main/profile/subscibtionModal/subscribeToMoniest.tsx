import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/system";
import { ErrorOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import api from "../../../../services/api";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setIsSubscribed } from "../../../../store/slices/profileSlice";
import { SubscribtionInfoList } from "./subscribtionInfoList";
import { WrappedModal } from "../../../../components/shared/common/wrappedModal";

export const SubscribeToMoniest = ({
  handleClose,
}: {
  handleClose: (result: boolean) => void;
}) => {
  const theme = useTheme();
  const translate = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const profileState = useAppSelector((state) => state.profile);
  const [month, setMonth] = useState(1);

  const dispatch = useAppDispatch();

  const handleSubscribe = () => {
    setLoading(true);
    api.moniest
      .subscribe(profileState.account!.username, {
        returnURL: window.location.href + "/returnUrl",
        cancelURL: window.location.href + "/cancelUrl",
        number_of_months: month,
      })
      .then((res) => {
        var link = document.createElement("a");
        link.href = res.universal_link!;
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => handleClose(false))
      .finally(() => setLoading(false));
  };

  const handleUnsubscribe = () => {
    api.moniest
      .unsubscribe(profileState.account!.username)
      .then(() => {
        handleClose(true);
        dispatch(setIsSubscribed(false));
      })
      .finally(() => setLoading(false));
  };

  return (
    <WrappedModal
      noPadding
      width={500}
      opened={true}
      onClose={() => handleClose(false)}
    >
      <Box
        mb={2}
        height={120}
        position="relative"
        sx={{ background: theme.palette.background[800] }}
      >
        <Stack sx={{ height: "100%" }} justifyContent="flex-end" p={3} pb={0}>
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
              {translate(
                `page.profile.subs_modal.${
                  profileState.isSubscribed ? "from" : "to"
                }`
              )}

              <b>{" " + profileState.account!.username}</b>
            </Typography>
            {!profileState.isSubscribed && (
              <Typography variant="h4">
                {profileState.account!.moniest?.subscription_info.fee}$
                <Typography pl={1} component="span">
                  / {translate("page.profile.subs_modal.monthly")}
                </Typography>
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
      <Box p={{ xs: 1.5, md: 3 }} pt={{ xs: 5, md: 8 }}>
        {!profileState.isSubscribed && (
          <SubscribtionInfoList month={month} handleMonthChange={setMonth} />
        )}
        {profileState.isSubscribed ? (
          <Box>
            <Stack mb={3} spacing={1} direction="row" alignItems="center">
              <ErrorOutline></ErrorOutline>
              <Typography variant="h4">
                {translate("page.profile.subs_modal.paying_currently", {
                  fee: profileState.account!.moniest?.subscription_info.fee,
                })}
              </Typography>
            </Stack>
            <Typography variant="h5" letterSpacing={0.5}>
              {translate("page.profile.subs_modal.if_unsubscribe", {
                username: profileState.account!.username,
              })}
            </Typography>
          </Box>
        ) : (
          <Box>{/* test */}</Box>
        )}
        <Stack mt={3}>
          <LoadingButton
            onClick={() => {
              profileState.isSubscribed
                ? handleUnsubscribe()
                : handleSubscribe();
            }}
            color="secondary"
            loading={loading}
            variant="contained"
          >
            {translate(
              `page.profile.${
                profileState.isSubscribed ? "unsubscribe" : "subscribe"
              }`
            )}
          </LoadingButton>
        </Stack>
      </Box>
    </WrappedModal>
  );
};
