import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import CardItem from "../../../components/shared/common/cardItem";
import { useTranslate } from "../../../hooks/useTranslate";
import { Card } from "../../../interfaces/card";

import { TestCard } from "../../../services/tempDatas";
import { BeMoniestStepperFooter } from "./beMoniestStepperFooter";
import { useAppDispatch } from "../../../store/hooks";
import { nextStep } from "../../../store/slices/beMoniestSlice";

const SubmitStep = () => {
  const [card] = useState<Card>(TestCard);
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Stack spacing={2.3}>
        <Typography variant="h2">
          {translate("page.be_moniest.submit.information")}
        </Typography>
        <Typography>
          {translate("page.be_moniest.submit.becoming_moniest")}

          <Typography component="span" fontWeight="bold">
            {" " + translate("page.be_moniest.submit.by_price", { price: 5 })}
          </Typography>
        </Typography>
        <Stack flexDirection="row" columnGap={0.5}>
          <Typography fontWeight="bold">moniesto.com</Typography>
          <Typography>
            {translate("page.be_moniest.submit.operation_fee")}
          </Typography>
          <Typography fontWeight="bold">10%</Typography>
        </Stack>
        <Typography>
          {translate("page.be_moniest.submit.payment_below")}{" "}
        </Typography>
        <CardItem card={card} selectedCardId={card.id}></CardItem>
      </Stack>
      <Typography mt={4} variant="h5" textAlign="center">
        {translate("page.be_moniest.submit.by_taking_agree")}
        <Typography component="span" color="secondary">
          {" " + translate("page.be_moniest.submit.terms_policy")}
        </Typography>
      </Typography>
      <BeMoniestStepperFooter handleNext={() => dispatch(nextStep(null))} />
    </Box>
  );
};
export default SubmitStep;
