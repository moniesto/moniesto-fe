import {
  UnfoldMoreDoubleOutlined,
  UnfoldMoreOutlined,
} from "@mui/icons-material";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { MarketTypeValues } from "../../../interfaces/post";

export const SelectMarket = ({
  onChange,
  value,
}: {
  onChange: (val: MarketTypeValues) => void;
  value: string;
}) => {
  return (
    <ToggleButtonGroup
      color="primary"
      fullWidth
      exclusive
      value={value}
      onChange={(_, val) => onChange(val)}
    >
      <ToggleButton value="futures">
        <Stack direction="row" alignItems="center">
          <UnfoldMoreDoubleOutlined fontSize="small" />
          <Typography variant="h4">Futures</Typography>
        </Stack>
      </ToggleButton>
      <ToggleButton value="spot">
        <Stack direction="row" alignItems="center">
          <UnfoldMoreOutlined fontSize="small" />
          <Typography variant="h4">Spot</Typography>
        </Stack>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
