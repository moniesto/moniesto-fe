import { Chip, ChipProps } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type TypeStarChipProps = ChipProps & {
  count: number;
};
export const StarChip = (props: TypeStarChipProps) => {
  return (
    <Chip
      {...props}
      sx={{
        fontWeight: "600",
        fontSize: "0.7rem",
        ...props.sx,
      }}
      icon={
        <StarIcon
          sx={{
            marginLeft: "10px",
            fontSize: "1.10rem",
            color: "#FED839 !important",
          }}
        />
      }
      label={Number(props.count?.toFixed(2)).toString() + " Score"}
    />
  );
};
