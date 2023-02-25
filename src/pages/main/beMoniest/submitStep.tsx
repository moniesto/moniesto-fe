import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import CardItem from "../../../components/shared/common/cardItem";
import { Card } from "../../../interfaces/card";
import { BeMoniestReq } from "../../../interfaces/requests";
import { TestCard } from "../../../services/tempDatas";

type propType = {
  handleNext: (data: Partial<BeMoniestReq>) => void;
  handleBack: () => void;
};

const SubmitStep = ({ handleNext, handleBack }: propType) => {
  const [card, setCard] = useState<Card>(TestCard);

  return (
    <Box>
      <Stack spacing={2.3}>
        <Typography variant="h2"> Information</Typography>
        <Typography>
          You are becoming a Moniest. You can share your predictions now with
          the world. Users can subsribe you by paying{" "}
          <Typography component="span" fontWeight="bold">
            5 $/month.
          </Typography>
        </Typography>
        <Stack flexDirection="row" columnGap={0.5}>
          <Typography fontWeight="bold">moniesto.com</Typography>
          <Typography>operation fee is</Typography>
          <Typography fontWeight="bold">10%</Typography>
        </Stack>
        <Typography>You will recieve your payments to account below</Typography>
        <CardItem card={card} selectedCardId={card.id}></CardItem>
      </Stack>
      <Typography mt={4} variant="h5" textAlign="center">
        By taking this step, you agree to our{" "}
        <Typography component="span" color="secondary">
          terms and policies.
        </Typography>{" "}
      </Typography>
      <Stack alignItems="center">
        <Stack
          width="80%"
          flexDirection="row"
          mt={4}
          justifyContent="space-between"
        >
          <Button onClick={handleBack} variant="outlined"  color="secondary">
            Back
          </Button>
          <Button
            onClick={() => handleNext({})}
            variant="contained"
            color="secondary"
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export default SubmitStep;
