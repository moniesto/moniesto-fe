import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const AboutTab = ({ aboutText }: { aboutText: string }) => {
  return (
    <Card sx={{ padding: 3 }}>
      {aboutText ? (
        <Typography letterSpacing="1px">{aboutText}</Typography>
      ) : (
        <Stack justifyContent="center" direction="row">
          User didn't add any bio
        </Stack>
      )}
    </Card>
  );
};
export default AboutTab;
