import { Stack, Typography } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";

type propTypes = {
  state: string;
  country: string;
};

const LocationText = ({ state, country }: propTypes) => {
  return (
    <Stack sx={{ opacity: 0.8 }} flexDirection="row" columnGap={1}>
      <LocationOnOutlined sx={{ opacity: 0.8, fontSize: "1rem" }} />
      <Typography fontWeight="500 !important" variant="h5">
        {state} / {country}
      </Typography>
    </Stack>
  );
};

LocationText.defaultProps = {
  state: "San Francisco",
  country: "US",
};
export default LocationText;
