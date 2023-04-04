import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import CardItem from "../../../components/shared/common/cardItem";
import { useTranslate } from "../../../hooks/useTranslate";
import { Card } from "../../../interfaces/card";
import { BeMoniestReq } from "../../../interfaces/requests";
import { TestCard } from "../../../services/tempDatas";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleBack: () => void;
};

const SubmitStep = ({ handleNext, handleBack }: propType) => {
  const [card, setCard] = useState<Card>(TestCard);
  const translate = useTranslate();

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
      <Stack alignItems="center">
        <Stack
          width="80%"
          flexDirection="row"
          mt={4}
          justifyContent="space-between"
        >
          <Button onClick={handleBack} variant="outlined" color="secondary">
            {translate("common.back")}
          </Button>
          <Button
            onClick={() => handleNext({})}
            variant="contained"
            color="secondary"
          >
            {translate("common.next")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export default SubmitStep;
