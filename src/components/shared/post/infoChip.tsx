import { Skeleton, Stack, SxProps, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

type InfoChipProps = {
  title?: string;
  value: string | number;
  sx?: SxProps;
  loading?: boolean;
};

export const InfoChip = ({
  title,
  value,
  sx,
  loading = false,
}: InfoChipProps) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        ...sx,
        border: `1px solid ${theme.palette.background[800]}`,
        padding: { xs: "4px 8px", md: "4px 8px" },
        borderRadius: "100px",
      }}
      spacing={0.5}
      direction="row"
      alignItems="center"
    >
      {!loading ? (
        <>
          <Typography sx={{ opacity: 0.7 }} variant="h6">
            {title}
          </Typography>

          <Typography className="infochip--value" variant="h6" fontWeight={900}>
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
