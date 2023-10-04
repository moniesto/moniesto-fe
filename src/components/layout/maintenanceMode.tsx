import { Card, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useTranslate } from "../../hooks/useTranslate";

export const MaintenanceMode = () => {
  const globalState = useAppSelector((state) => state.global);
  const translate = useTranslate();
  return globalState.inMaintenance ? (
    <Stack
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        margin: "10px",
        width: "calc(100% - 20px)",
        zIndex: 2,
        height: "100%",
        transition: "all 0.4s ease",
        backdropFilter: "blur(20px)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          paddingX: 3,
          paddingY: 4,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Stack alignItems="center" gap={8}>
          <img width="300" src="./images/auth/maintain.svg" alt="desktop" />
          <Stack alignItems="center" gap={2}>
            <Typography textAlign="center" variant="h1">
              {translate("component.maintenance_mode.title")}{" "}
            </Typography>
            <Typography textAlign="center" variant="h3">
              {translate("component.maintenance_mode.message")}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  ) : null;
};
