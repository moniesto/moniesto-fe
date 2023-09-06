import { Box, Slider, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

export const LeverageSlider = ({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        border: `1px solid ${theme.palette.background[800]}`,
        borderRadius: "10px",
        background: theme.palette.background[600],
        paddingTop: "5px",
      }}
      paddingRight={3}
      paddingLeft={2}
      gap={2.2}
    >
      <Box width={32}>
        <Typography variant="h4">{value}X</Typography>
      </Box>
      <Slider
        onChange={(e, val) => onChange(val as number)}
        value={value}
        step={1}
        min={1}
        max={20}
        marks={Array(5)
          .fill(0)
          .map((item, i) => {
            return {
              value: i * 5 === 0 ? 1 : i * 5,
              label: i * 5 === 0 ? 1 : i * 5,
            };
          })}
      />
    </Stack>
  );
};
