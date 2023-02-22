import { CircularProgress, SxProps } from "@mui/material";
import { useTheme } from "@mui/system";

export const Spinner = ({
  sx,
  size = 25,
  center = false,
}: {
  size?: number;
  sx?: SxProps;
  center?: boolean;
}) => {
  const theme = useTheme();

  const centerSx: SxProps = {
    position: "absolute",
    left: `calc(50% - ${size / 2}px)`,
    top: `calc(50% - ${size / 2}px)`,
    transform: `translate(-50% , -50%)`,
  };
  return (
    <CircularProgress
      sx={{
        ...(center ? centerSx : {}),
        ...sx,
        boxShadow: "0px 0px 6px -3px " + theme.palette.text.primary,
        borderRadius: "100%",
      }}
      size={size}
      color="inherit"
    />
  );
};
