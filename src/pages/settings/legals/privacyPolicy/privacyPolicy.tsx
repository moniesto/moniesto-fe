import { Card, Stack } from "@mui/material";
import { useAppSelector } from "../../../../store/hooks";
import { PrivacyPolicyEn } from "./privacyPolicyEn";
import { PrivacyPolicyTr } from "./privacyPolicyTr";

export const PrivacyPolicy = () => {
  const storage = useAppSelector((state) => state.storage);

  let component;

  switch (storage.language) {
    // case "en":
    //   component = <PrivacyPolicyEn />;
    //   break;
    // case "tr":
    //   component = <PrivacyPolicyTr />;
    //   break;
    default:
      component = <PrivacyPolicyEn />;
      break;
  }

  return (
    <Card
      sx={{
        paddingBottom: 2,
      }}
    >
      <Stack mt={2} p={3}>
        {component}
      </Stack>
    </Card>
  );
};
