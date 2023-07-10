import { Box, Button, Stack } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { backStep } from "../../../store/slices/beMoniestSlice";

export const BeMoniestStepperFooter = ({
  handleNext,
}: {
  handleNext: () => void;
}) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const stepperState = useAppSelector((state) => state.beMoniest);
  return (
    <Stack alignItems="center">
      <Stack
        width="80%"
        flexDirection="row"
        mt={4}
        justifyContent="space-between"
      >
        {stepperState.activeStep !== 1 ? (
          <Button
            onClick={() => dispatch(backStep())}
            variant="outlined"
            color="secondary"
          >
            {translate("common.back")}
          </Button>
        ) : (
          <Box></Box>
        )}

        <Button onClick={handleNext} variant="contained" color="secondary">
          {translate("common.next")}
        </Button>
      </Stack>
    </Stack>
  );
};
