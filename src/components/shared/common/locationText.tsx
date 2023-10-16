import { Stack, SxProps, Typography } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";

type propTypes = {
  location: string;
  sx?: SxProps;
};

const LocationText = ({ location, sx }: propTypes) => {
  return (
    <Stack sx={{ opacity: 0.8, ...sx }} flexDirection="row" columnGap={1}>
      {location && (
        <>
          <LocationOnOutlined sx={{ opacity: 0.8, fontSize: "1rem" }} />
          <Typography fontWeight="500 !important" variant="h5">
            {location}
          </Typography>
        </>
      )}
    </Stack>
  );
};

LocationText.defaultProps = {
  location: "",
};
export default LocationText;
