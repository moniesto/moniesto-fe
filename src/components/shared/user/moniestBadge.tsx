import { Box } from "@mui/material";
import { useTheme } from "@mui/system";

export const MoniestBadge = ({ size = 20 }: { size?: number }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: "100%",
        width: size,
        height: size,
        position: "absolute",
        border: `1px solid ${theme.palette.secondary.main}`,
        background: theme.palette.background[500],
        textShadow: "0px 0.4px, 0.4px 0px, 0.4px 0.4px",
        fontWeight: "bold",
        right: "2px",
        bottom: "5px",
        display: "grid",
        placeContent: "center",
        fontSize: "0.8rem",
      }}
    >
      <Box pb="2px">m</Box>
    </Box>
  );
};
