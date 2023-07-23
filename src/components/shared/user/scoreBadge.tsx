import { Stack, StackProps, Typography } from "@mui/material";
import { ScoreStar } from "./scoreStar";

export const ScoreBadge = ({
  props,
  value,
}: {
  props?: StackProps;
  value: number;
}) => {
  return (
    <Stack
      sx={{
        background: "var(--color-yellow-light)",
        padding: "4px 10px",
        borderRadius: "100px",
      }}
      direction="row"
      gap={0.5}
      {...props}
    >
      <ScoreStar />
      <Typography variant="h5">{value} </Typography>
    </Stack>
  );
};
