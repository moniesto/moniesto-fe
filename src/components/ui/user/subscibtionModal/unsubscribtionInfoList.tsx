import { Divider, Stack, Typography } from "@mui/material";
import { SubscriptionInfoItem } from "./subscribtionInfoList";
import configService from "../../../../services/configService";
import { useAppSelector } from "../../../../store/hooks";
import { useTranslate } from "../../../../hooks/useTranslate";
import { useMemo } from "react";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import localStorageService from "../../../../services/localStorageService";
import { Trans } from "react-i18next";

export const UnsubscribtionInfoList = () => {
  const profileState = useAppSelector((state) => state.profile);
  const translate = useTranslate();

  const remainingMonth = useMemo(() => {
    const differenceInMonths = (date1: Date, date2: Date) => {
      const monthDiff = date1.getMonth() - date2.getMonth();
      const yearDiff = date1.getFullYear() - date2.getFullYear();

      return monthDiff + yearDiff * 12;
    };
    return [
      differenceInMonths(
        new Date(
          profileState.subscriptionInfo?.subscription_info
            ?.subscription_end_date as string
        ),
        new Date(
          profileState.subscriptionInfo?.subscription_info
            ?.subscription_start_date as string
        )
      ),
      Math.max(
        differenceInMonths(
          new Date(
            profileState.subscriptionInfo?.subscription_info
              ?.subscription_end_date as string
          ),
          new Date()
        ) - 1,
        0
      ),
    ];
  }, [profileState.subscriptionInfo]);
  return (
    <Stack gap={1} justifyContent="space-between">
      <Typography variant="h3" mb={1} sx={{ opacity: 0.9 }}>
        {translate("page.profile.subs_modal.subs_detail")}
      </Typography>
      <SubscriptionInfoItem
        title={translate("page.profile.subs_modal.subs_start_date")}
      >
        <Typography variant="h4" fontWeight={500}>
          {new Date(
            profileState.subscriptionInfo?.subscription_info
              ?.subscription_start_date as string
          ).toLocaleDateString(localStorageService.getStorage().language)}
        </Typography>
      </SubscriptionInfoItem>
      <SubscriptionInfoItem
        title={translate("page.profile.subs_modal.subs_end_date")}
      >
        <Typography variant="h4" fontWeight={500}>
          {new Date(
            profileState.subscriptionInfo?.subscription_info
              ?.subscription_end_date as string
          ).toLocaleDateString(localStorageService.getStorage().language)}
        </Typography>
      </SubscriptionInfoItem>
      <SubscriptionInfoItem
        title={translate("page.profile.subs_modal.subscribed_price")}
      >
        <Typography variant="h4" fontWeight={500}>
          {profileState.subscriptionInfo?.subscription_info?.subscribed_fee}$
        </Typography>
      </SubscriptionInfoItem>
      <SubscriptionInfoItem
        title={translate("page.profile.subs_modal.remaining_time")}
      >
        <Typography variant="h4" fontWeight={500}>
          {remainingMonth[1]} / {remainingMonth[0]}
        </Typography>
      </SubscriptionInfoItem>
      <Divider sx={{ marginY: 2 }}></Divider>
      <Stack mb={1} direction="row" gap={0.7} alignItems="start">
        <ErrorOutlineOutlined sx={{ opacity: 0.7 }} fontSize="small" />

        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          <Trans
            values={{
              fee: configService.configs.general_info.operation_fee_percentage,
              payer_id:
                profileState.subscriptionInfo?.subscription_info?.payer_id,
            }}
            i18nKey="page.profile.subs_modal.unsub_desc"
            components={{ bold: <b /> }}
          ></Trans>
        </Typography>
      </Stack>
    </Stack>
  );
};
