import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export const MaintenanceMode = () => {
  const globalState = useAppSelector((state) => state.global);
  return globalState.inMaintenance ? (
    <Stack
      gap={10}
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 2,
        width: "100%",
        height: "100%",
        transition: "all 0.4s ease",
        backdropFilter: "blur(30px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img width="300" src="./images/auth/maintain.svg" alt="desktop" />
      <Stack alignItems="center" gap={2}>
        <Typography variant="h1"> We'll be right back!</Typography>
        <Typography variant="h3">
          We are currently in maintenance mode. We will be back online soon!
        </Typography>
      </Stack>
    </Stack>
  ) : null;
};
