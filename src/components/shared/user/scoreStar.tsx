import { SvgIconProps } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export const ScoreStar = ({ props }: { props?: SvgIconProps }) => {
  return (
    <StarIcon
      {...props}
      sx={{
        fontSize: "1rem",
        color: "var(--color-yellow-primary) !important",
      }}
    />
  );
};
