import { Skeleton, Stack, SxProps, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

type InfoChipProps = {
  title?: string;
  value: string | number;
  sx?: SxProps;
  loading: boolean;
};

export const InfoChip = ({ title, value, sx, loading }: InfoChipProps) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        ...sx,
        border: `1px solid ${theme.palette.background[800]}`,
        padding: { xs: "4px 8px", md: "6px 12px" },
        borderRadius: "100px",
      }}
      spacing={0.5}
      direction="row"
      alignItems="center"
    >
      {!loading ? (
        <>
          <Typography sx={{ opacity: 0.7 }} variant="h5">
            {title}
          </Typography>

          <Typography className="infochip--value" variant="h5">
            {value}
          </Typography>
        </>
      ) : (
        <>
          <Skeleton animation="wave" variant="text" width={50}></Skeleton>
          <Skeleton animation="wave" variant="text" width={30}></Skeleton>
        </>
      )}
    </Stack>
  );
};
