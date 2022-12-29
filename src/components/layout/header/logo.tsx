import { Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BrandText from "../../shared/common/brandText";

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack onClick={() => navigate("/")}>
      <BrandText
        sx={{ fontSize: "1.5em" }}
        color={theme.palette.text.primary}
      ></BrandText>
    </Stack>
  );
};
export default Logo;
