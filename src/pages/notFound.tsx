import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import Navigator from "../components/shared/common/navigatior";
import { useTranslate } from "../hooks/useTranslate";
import Logo from "../components/shared/common/logo";

const NotFound = () => {
  const theme = useTheme();
  const translate = useTranslate();
  return (
    <Stack
      rowGap={3}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Typography fontSize={"7rem"} variant="h1" letterSpacing={20}>
        404
      </Typography>
      <Typography
        fontSize={"1.5rem"}
        color={theme.palette.secondary.main}
        variant="h4"
      >
        {translate("page.404.page_not_found")}
      </Typography>
      <Navigator path="/">
        <Stack
          pt={10}
          flexDirection={"row"}
          columnGap={1}
          alignItems={"center"}
        >
          <ArrowBackOutlined></ArrowBackOutlined>
          <Typography sx={{ cursor: "pointer" }} variant="h4">
            {translate("page.404.go_home")}
          </Typography>
        </Stack>
      </Navigator>
      <Box sx={{ position: "absolute", bottom: "40px" }}>
        <Logo width={100} navigateHome />
      </Box>
    </Stack>
  );
};

export default NotFound;
