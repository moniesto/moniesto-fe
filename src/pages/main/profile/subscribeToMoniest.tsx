import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/system";
import { ClearOutlined, ErrorOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import api from "../../../services/api";
import { useTranslate } from "../../../hooks/useTranslate";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIsSubscribed } from "../../../store/slices/profileSlice";

export const SubscribeToMoniest = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const theme = useTheme();
  const translate = useTranslate();
  const [loading, setLoading] = useState<boolean>(false);
  const profileState = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  const handleSubscribe = () => {
    setLoading(true);
    api.moniest
      .subscribe(profileState.account!.username)
      .then(() => {
        dispatch(setIsSubscribed(true));
        handleClose();
      })
      .finally(() => setLoading(false));
  };

  const handleUnsubscribe = () => {
    api.moniest
      .unsubscribe(profileState.account!.username)
      .then(() => {
        handleClose();
        dispatch(setIsSubscribed(false));
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: 500, xs: "90%" },
          minHeight: 500,
          background: theme.palette.background[600],
        }}
      >
        <Box
          mb={2}
          height={120}
          position="relative"
          sx={{ background: theme.palette.background[800] }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 3, top: 3 }}
          >
            <ClearOutlined />
          </IconButton>
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
        <Box p={3} pt={6}>
          {!profileState.isSubscribed && (
            <Typography variant="h4" mb={2}>
              {translate("page.profile.subs_modal.monthly_payment")}
            </Typography>
          )}
          {!profileState.isSubscribed && (
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack spacing={1} direction="row" alignItems="center">
                  <Typography variant="h4">
                    {translate("page.profile.subs_modal.subs_start_date")} :
                  </Typography>
                  <Typography variant="h5" fontWeight={500}>
                    {new Date().toDateString()}
                  </Typography>
                </Stack>
                <Stack spacing={1} direction="row" alignItems="center">
                  <Typography variant="h4">
                    {translate("page.profile.subs_modal.total")} :
                  </Typography>
                  <Typography variant="h4">
                    {profileState.account!.moniest?.subscription_info.fee}$
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ margin: "16px 0" }}></Divider>
            </Box>
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
            <Box>
              {/* <Typography variant="h5" letterSpacing={0.5}>
                Faturalandırma her ay otomatik olarak yenilenir. Kısmi fatura
                dönemlerine ait ödemeler iade edilmez. Dilediğiniz zaman
                Ayarlar'dan iptal edebilirsiniz. Daha fazla bilgi edinin.
              </Typography>
              <Typography variant="h5" letterSpacing={0.5} pt={1}>
                Devam ederek 18 yaşından büyük olduğunuzu onaylar ve cayma
                hakkınıza dair ayrıntıları içeren bu şartları kabul edersiniz.
                Devam ederek Google Payments Hizmet Şartları hükümlerini kabul
                edersiniz. Gizlilik Bildirimi hükümlerinde verilerinizin nasıl
                kullanıldığı açıklanır.
              </Typography> */}
            </Box>
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
      </Card>
    </Modal>
  );
};
