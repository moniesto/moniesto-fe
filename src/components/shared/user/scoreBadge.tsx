import { Stack, StackProps } from "@mui/material";
import { ReactNode } from "react";
import { ScoreStar } from "./scoreStar";

export const ScoreBadge = ({
  props,
  children,
}: {
  props?: StackProps;
  children?: ReactNode;
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
      {children}
    </Stack>
  );
};
