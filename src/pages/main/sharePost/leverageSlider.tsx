import { Box, Slider } from "@mui/material";
import { useTheme } from "@mui/system";

export const LeverageScore = ({
  onChange,
}: {
  onChange: (value: number) => void;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.background[800]}`,
        borderRadius: "10px",
        background: theme.palette.background[600],
        paddingTop: "5px",
      }}
      paddingX={3}
    >
      <Slider
        onChange={(e, val) => onChange(val as number)}
        defaultValue={1}
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
    </Box>
  );
};
