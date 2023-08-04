import { Stack, StackProps, Typography } from "@mui/material";
import { ScoreStar } from "./scoreStar";
import { Spinner } from "../common/spinner";

export const ScoreBadge = ({
  props,
  value,
  isLoading = false,
}: {
  props?: StackProps;
  value: number;
  isLoading?: boolean;
}) => {
  return (
    <Stack
      sx={{
        background: "var(--color-yellow-light)",
        padding: "2px 12px 2px 6px",
        borderRadius: "100px",
      }}
      direction="row"
      alignItems="center"
      gap={0.5}
      {...props}
    >
      <ScoreStar />
      <Typography display="flex" fontWeight={600} variant="h5">
        {isLoading ? <Spinner size={15}></Spinner> : value}
      </Typography>
    </Stack>
  );
};
