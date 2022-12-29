import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import BrandText from "../components/shared/common/brandText";
import Navigator from "../components/shared/common/navigatior";

const NotFound = () => {
  const theme = useTheme();
  return (
    <Stack
      rowGap={3}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
      sx={{ background: theme.palette.primary.main }}
    >
      <Typography
        fontSize={"7rem"}
        color={theme.palette.text.secondary}
        variant="h1"
        letterSpacing={20}
      >
        404
      </Typography>
      <Typography
        fontSize={"1.5rem"}
        color={theme.palette.text.secondary}
        variant="h4"
      >
        Page Not Found
      </Typography>
      <Navigator path="/">
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h4"
          pt={10}
          color="secondary"
        >
          <Stack flexDirection={'row'} columnGap={1} alignItems={'center'}>
            <ArrowBackOutlined></ArrowBackOutlined> Go Home
          </Stack>
        </Typography>
      </Navigator>
      <Typography sx={{ position: "absolute", bottom: "40px" }}>
        <BrandText></BrandText>
      </Typography>
    </Stack>
  );
};

export default NotFound;
