import { Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BrandText from "../../shared/common/brandText";

const Logo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack sx={{ cursor: "pointer" }} onClick={() => navigate("/timeline")}>
      {/* <BrandText
        sx={{ fontSize: "1.5em" }}
        color={theme.palette.text.primary}
      ></BrandText> */}
      <img
        width={140}
        src={`./images/${
          theme.palette.mode === "dark" ? "logo-light.png" : "logo-dark.png"
        }`}
        alt="logo"
      ></img>
    </Stack>
  );
};
export default Logo;
