import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslate } from "../../../../hooks/useTranslate";
import { sendAnalytic } from "../../../../services/analytic";

const AboutTab = ({ aboutText }: { aboutText: string }) => {
  sendAnalytic({ hitType: "pageview", page: "About Tab" });
  const translate = useTranslate();
  return (
    <Card sx={{ padding: 3 }}>
      {aboutText ? (
        <Typography letterSpacing="1px">{aboutText}</Typography>
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
