import { Box } from "@mui/material";
import { FormItem } from "../../../components/shared/common/formItem";
import { LeverageSlider } from "./leverageSlider";
import { MarketTypeKeys, MarketTypeValues } from "../../../interfaces/post";
import { useTranslate } from "../../../hooks/useTranslate";

export const LeverageSliderWrapper = ({
  value,
  market_type,
  onChange,
}: {
  value: number;
  market_type: MarketTypeValues;
  onChange: (val: number) => void;
}) => {
  const translate = useTranslate();
  return (
    <Box
      sx={{
        transition: "all 0.2s ease",
        ...(market_type === MarketTypeKeys.Spot
          ? {
              maxHeight: 0,
              opacity: 0,
              zIndex: -1,
              transform: "translateY(-20px)",
            }
          : {
              maxHeight: 500,
              opacity: 1,
              zIndex: 1,
              transform: "translateY(0px)",
            }),
      }}
    >
      <FormItem title={translate("form.field.set_leverage")}>
        <LeverageSlider value={value} onChange={onChange} />
      </FormItem>
    </Box>
  );
};
