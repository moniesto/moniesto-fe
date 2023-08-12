import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../../../hooks/useTranslate";
import { ReactNode, useMemo, useState } from "react";
import localStorageService from "../../../../services/localStorageService";
import { useTheme } from "@mui/system";
import { useAppSelector } from "../../../../store/hooks";
import { WrappedSelect } from "../../../shared/common/wrappers/wrappedSelect";

export const paymentMethods = [
  {
    value: "binance_pay",
    image:
      "https://res.cloudinary.com/dniupzza6/image/upload/v1690191200/Photo/BackgroundPhotos/d0ff38a6-6db5-4e3a-8de5-4a89cd42dec4.png",
    text: "Binance Pay",
    disabled: false,
  },
  {
    value: "bank",
    image:
      "https://res.cloudinary.com/dniupzza6/image/upload/v1690218400/Photo/BackgroundPhotos/d9c786d2-4aa7-4e7e-a73a-cf421c3dd337.png",
    text: "Bank",
    disabled: true,
  },
];

export const SubscribtionInfoList = ({
  month,
  handleMonthChange,
}: {
  month: number;
  handleMonthChange: (value: number) => void;
}) => {
  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);
  const theme = useTheme();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);

  const finalDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    return date.toLocaleDateString(localStorageService.getStorage().language);
  }, [month]);

  return (
    <Box>
      <Stack gap={1} justifyContent="space-between">
        <SubscriptionInfoItem
          title={translate("page.profile.subs_modal.subscribtion_month")}
        >
          <FormControl>
            <WrappedSelect
              onChange={(event) =>
                handleMonthChange(Number(event.target.value))
              }
              size="small"
              value={month}
              color="secondary"
              name="type"
            >
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <MenuItem key={"month_" + index} value={index + 1}>
                    {index + 1}
                  </MenuItem>
                ))}
            </WrappedSelect>
          </FormControl>
        </SubscriptionInfoItem>
        <SubscriptionInfoItem
          title={translate("page.profile.subs_modal.payment_method.desc")}
        >
          <FormControl>
            <WrappedSelect
              value={selectedMethod.value}
              onChange={(event) =>
                setSelectedMethod(
                  paymentMethods.find(
                    (item) => item.value === event.target.value
                  )!
                )
              }
              size="small"
              renderValue={() => {
                return (
                  <Box alignItems="center" sx={{ display: "flex", gap: 1 }}>
                    <Box
                      justifyContent="center"
                      width={60}
                      display="flex"
                      height={20}
                    >
                      <img
                        src={selectedMethod.image}
                        alt={selectedMethod.text}
                      />
                    </Box>
                    {selectedMethod.text}
                  </Box>
                );
              }}
            >
              {paymentMethods.map((item) => (
                <MenuItem
                  disabled={item.disabled}
                  key={item.value}
                  value={item.value}
                >
                  <Box alignItems="center" sx={{ display: "flex", gap: 1 }}>
                    <Box
                      justifyContent="center"
                      width={60}
                      display="flex"
                      height={20}
                    >
                      <img
                        style={{
                          background: "white",
                          border: `1px solid ${theme.palette.background[800]}`,
                          borderRadius: "4px",
                        }}
                        src={item.image}
                        alt={item.text}
                      />
                    </Box>

                    {translate(
                      `page.profile.subs_modal.payment_method.${item.value}`
                    )}
                  </Box>
                </MenuItem>
              ))}
            </WrappedSelect>
          </FormControl>
        </SubscriptionInfoItem>
        <SubscriptionInfoItem
          title={translate("page.profile.subs_modal.subs_start_date")}
        >
          <Typography variant="h4" fontWeight={500}>
            {new Date().toLocaleDateString(
              localStorageService.getStorage().language
            )}
          </Typography>
        </SubscriptionInfoItem>
        <SubscriptionInfoItem
          title={translate("page.profile.subs_modal.subs_end_date")}
        >
          <Typography variant="h4" fontWeight={500}>
            {finalDate}
          </Typography>
        </SubscriptionInfoItem>
      </Stack>
      <Stack
        mt={3}
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography variant="h4">
          {translate("page.profile.subs_modal.total")}
        </Typography>
        <Typography variant="h4">
          {month * profileState.account!.moniest?.subscription_info.fee!}$
        </Typography>
      </Stack>
      <Divider sx={{ marginY: 2 }}></Divider>

      <Box>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          {translate("page.profile.subs_modal.subs_desc")}
        </Typography>
      </Box>
    </Box>
  );
};

export const SubscriptionInfoItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        background: theme.palette.background[800],
        padding: "4px 10px",
        borderRadius: "10px",
        minHeight: "50px",
      }}
      spacing={1}
      direction="row"
      alignItems="center"
    >
      <Typography flex={1} variant="h4">
        {title}{" "}
      </Typography>
      {children}
    </Stack>
  );
};
