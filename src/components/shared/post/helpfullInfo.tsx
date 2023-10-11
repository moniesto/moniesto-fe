import { HelpOutline } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { useState } from "react";
import { WrappedModal } from "../common/wrappedModal";
import { useTheme } from "@mui/system";
import analytic from "../../../services/analytic";
import { useAppDispatch } from "../../../store/hooks";
import { hidePostHelpButton } from "../../../store/slices/localStorageSlice";

export const HelpfullInfo = () => {
  const translate = useTranslate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleNotShow = () => {
    setOpen(false);
    analytic.sendEvent(
      analytic.events.HelpInfoCategory,
      analytic.events.HelpInfoNotShowClickAction
    );
    dispatch(hidePostHelpButton());
  };

  return (
    <>
      <Stack
        sx={{
          background: "var(--color-yellow-light)",
          padding: "3px",
          borderRadius: "100%",
          cursor: "pointer",
        }}
        direction="row"
        gap={0.3}
        alignItems="center"
        onClick={() => {
          setOpen(true);

          analytic.sendEvent(
            analytic.events.HelpInfoCategory,
            analytic.events.HelpInfoClickAction
          );
        }}
      >
        <HelpOutline
          sx={{
            fontSize: "1.3rem",
            color: "var(--color-yellow-primary)",
          }}
        />
        {/* <Typography
          sx={{
            color: "var(--color-yellow-primary)",
            transition: "font-weight 0.2s ease",
            "&:hover": {
              fontWeight: "bold",
            },
          }}
          variant="h5"
        >
          {translate("component.help_info.title")}
        </Typography> */}
      </Stack>
      <WrappedModal width={500} onClose={() => setOpen(false)} opened={open}>
        <Stack alignItems="center" spacing={4}>
          <Stack gap={1} alignItems="center">
            <HelpOutline
              sx={{
                padding: "6px",
                borderRadius: "100%",
                width: "40px",
                height: "40px",
                background: "var(--color-yellow-light)",
                color: "var(--color-yellow-primary)",
              }}
            />
            <Typography textAlign="center" variant="h2">
              {translate("component.help_info.title")}
            </Typography>
          </Stack>

          <Stack
            gap={1}
            sx={{
              ">div": {
                padding: "4px 8px",
                border: `1px solid ${theme.palette.background[800]}`,
                borderRadius: "8px",
              },
            }}
          >
            <Typography pb={2} variant="h4">
              {translate("component.help_info.desc")}
            </Typography>
            <Stack gap={0.3}>
              <Typography variant="h4">
                {translate("component.post_card.roi")}
              </Typography>
              <Typography variant="h4" fontWeight="normal">
                {translate("component.help_info.roi_desc")}
              </Typography>
            </Stack>
            <Stack gap={0.3}>
              <Typography variant="h4">
                {translate("component.post_card.pnl")}
              </Typography>
              <Typography variant="h4" fontWeight="normal">
                {translate("component.help_info.pnl_desc")}
              </Typography>
            </Stack>
            <Stack gap={0.3}>
              <Typography variant="h4">
                {translate("component.post_card.max_roi")}
              </Typography>
              <Typography variant="h4" fontWeight="normal">
                {translate("component.help_info.max_roi_desc")}
              </Typography>
            </Stack>
            <Stack gap={0.3}>
              <Typography variant="h4">
                {translate("component.post_card.max_pnl")}
              </Typography>
              <Typography variant="h4" fontWeight="normal">
                {translate("component.help_info.max_pnl_desc")}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            mt={2}
            gap={{ xs: 1, md: 2 }}
            justifyContent="space-between"
            width="100%"
            flexWrap="wrap-reverse"
          >
            <Button
              onClick={handleNotShow}
              type="button"
              sx={{ flex: 1, minWidth: 140 }}
              variant="outlined"
              color="inherit"
            >
              {translate("component.help_info.not_show_again")}
            </Button>
            <Button
              onClick={() => setOpen(false)}
              sx={{ alignSelf: "end", flex: 1, minWidth: 140 }}
              color="secondary"
              variant="contained"
            >
              {translate("common.ok")}
            </Button>
          </Stack>
        </Stack>
      </WrappedModal>
    </>
  );
};
