import { Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslate } from "../../../../hooks/useTranslate";

const AboutTab = ({ aboutText }: { aboutText: string }) => {
  const translate = useTranslate();
  return (
    <Card sx={{ padding: 3 }}>
      {aboutText ? (
        <Typography letterSpacing="1px">{aboutText}</Typography>
      ) : (
        <Stack justifyContent="center" direction="row">
          {translate("page.profile.no_bio")}
        </Stack>
      )}
    </Card>
  );
};
export default AboutTab;
