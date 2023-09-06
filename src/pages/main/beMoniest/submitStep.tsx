import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslate } from "../../../hooks/useTranslate";
import { BeMoniestStepperFooter } from "./beMoniestStepperFooter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { nextStep } from "../../../store/slices/beMoniestSlice";
import configService from "../../../services/configService";
import { useTheme } from "@mui/system";
import Fly from "../../../components/shared/common/fly/fly";
import { sendAnalytic } from "../../../services/analytic";

const SubmitStep = () => {
  sendAnalytic({ hitType: "pageview", page: "Be Moniest Submit Step" });
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const stepperState = useAppSelector((state) => state.beMoniest);

  const moniestoFee =
    stepperState.data.fee /
    (configService.configs.general_info.operation_fee_percentage as number);

  return (
    <Fly>
      <Box>
        <Stack spacing={2.3}>
          <Fly.Item>
            <Typography variant="h3" sx={{ opacity: 0.8 }}>
              {translate("page.be_moniest.submit.almost_ready")}
            </Typography>
          </Fly.Item>
          <Fly.Item>
            <Typography sx={{ opacity: 0.8 }}>
              {translate("page.be_moniest.submit.becoming_moniest")}
            </Typography>
          </Fly.Item>
          <Stack
            gap={0.8}
            sx={{
              background: theme.palette.background[500],
              padding: "10px 16px",
              borderRadius: "10px",
            }}
          >
            <Fly.Item>
              <Typography variant="h4" mb={1}>
                {translate("page.be_moniest.submit.sub_detail.title")}
              </Typography>
            </Fly.Item>
            <Fly.Item>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">
                  {translate("page.be_moniest.submit.sub_detail.binance_id")}
                </Typography>
                <Typography fontWeight="bold" variant="h5">
                  {stepperState.data.binance_id}
                </Typography>
              </Stack>
            </Fly.Item>
            <Fly.Item>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">
                  {translate("page.be_moniest.submit.sub_detail.sub_price")}
                </Typography>
                <Typography fontWeight="bold" variant="h5">
                  {stepperState.data.fee}$
                </Typography>
              </Stack>
            </Fly.Item>
            <Fly.Item>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">
                  {translate("page.be_moniest.submit.sub_detail.moniesto_fee", {
                    percentage:
                      configService.configs.general_info
                        .operation_fee_percentage,
                  })}
                </Typography>
                <Typography fontWeight="bold" variant="h5">
                  -{moniestoFee.toFixed(2)}$
                </Typography>
              </Stack>
            </Fly.Item>
            <Fly.Item>
              <Stack
                pt={0.6}
                borderTop={`1px solid ${theme.palette.background[800]}`}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="h5">
                  {translate("page.be_moniest.submit.sub_detail.payout_price")}
                </Typography>
                <Typography fontWeight="bold" variant="h5">
                  {(stepperState.data.fee - moniestoFee).toFixed(2)}$
                </Typography>
              </Stack>
            </Fly.Item>
          </Stack>

          <Fly.Item>
            <Typography sx={{ opacity: 0.8 }} variant="h5">
              {translate("page.be_moniest.submit.change_variables")}
            </Typography>
          </Fly.Item>
        </Stack>
        <Fly.Item>
          <BeMoniestStepperFooter handleNext={() => dispatch(nextStep(null))} />
        </Fly.Item>
      </Box>
    </Fly>
  );
};
export default SubmitStep;
