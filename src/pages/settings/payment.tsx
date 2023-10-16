import { Card, Stack, Typography } from "@mui/material";
import PaymentMethod from "../main/beMoniest/paymentStep/paymentMethod";
import api from "../../services/api";
import { useCallback, useEffect, useState } from "react";
import { PayoutInfoResponse } from "../../interfaces/requests";
import { LoadingButton } from "@mui/lab";
import { useTranslate } from "../../hooks/useTranslate";
import toastService from "../../services/toastService";

export const PaymentSettings = () => {
  const translate = useTranslate();
  const [data, setData] = useState<PayoutInfoResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const getPayoutInfo = useCallback(() => {
    api.moniest.get_payout().then((res) => setData(res));
  }, []);

  useEffect(() => {
    getPayoutInfo();
  }, [getPayoutInfo]);

  const handleChangePayout = (val: string) => {
    setLoading(true);
    api.moniest
      .patch_payout({ binance_id: val })
      .then((_) => {
        toastService.open({
          message: translate("page.settings.payment.toast.updated_success"),
          severity: "success",
        });
      })
      .catch()
      .finally(() => setLoading(false));
  };

  return data ? (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <Stack mt={2} p={3} spacing={4}>
        <Typography variant="h2" sx={{ opacity: 0.9 }}>
          {translate("page.settings.payment.title")}
        </Typography>
        <PaymentMethod
          footer={<SavePayment loading={loading}></SavePayment>}
          defaults={{ binance_id: data.payout_methods.binance[0].value }}
          onChange={{ binance: handleChangePayout }}
        />
      </Stack>
    </Card>
  ) : null;
};

const SavePayment = ({
  handleNext,
  loading,
}: {
  handleNext?: () => void;
  loading: boolean;
}) => {
  const translate = useTranslate();
  return (
    <LoadingButton
      sx={{ mt: 4 }}
      type="submit"
      size="large"
      color="secondary"
      loading={loading}
      variant="contained"
      onClick={handleNext}
    >
      {translate("common.save")}
    </LoadingButton>
  );
};
