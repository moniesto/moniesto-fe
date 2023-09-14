import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

export const MoniestBadge = ({
  size = "medium",
}: {
  size?: "medium" | "large";
}) => {
  const theme = useTheme();
  const sizeNumber = size === "large" ? 26 : 20;
  const fontSize = size === "large" ? 1 : 0.75;

  return (
    <Box
      sx={{
        borderRadius: "100%",
        width: sizeNumber,
        height: sizeNumber,
        position: "absolute",
        border: `1px solid ${theme.palette.secondary.main}`,
        background: theme.palette.background[500],
        textShadow: "0px 0.4px, 0.4px 0px, 0.4px 0.4px",
        fontWeight: "bold",
        right: "2px",
        bottom: "5px",
        display: "grid",
        placeContent: "center",
        fontSize: `${fontSize}rem`,
      }}
    >
      <Box pb="2px">m</Box>
    </Box>
  );
};
