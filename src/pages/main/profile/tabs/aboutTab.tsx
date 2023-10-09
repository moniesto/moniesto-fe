import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslate } from "../../../../hooks/useTranslate";

const AboutTab = ({ aboutText }: { aboutText: string }) => {
  const translate = useTranslate();
  return (
    <Card sx={{ padding: 3 }}>
      {aboutText ? (
        <Typography letterSpacing="0.4px" whiteSpace="break-spaces">
          {aboutText}
        </Typography>
      ) : (
        <Stack alignItems="center">
          <Typography variant="h5">
            {translate("page.profile.no_bio")}
          </Typography>
        </Stack>
      )}
    </Card>
  );
};
export default AboutTab;
