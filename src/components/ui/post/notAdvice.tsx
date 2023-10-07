import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { useState } from "react";
import { WarningOutlined } from "@mui/icons-material";
import { WrappedModal } from "../../shared/common/wrappedModal";
import { Trans } from "react-i18next";

export const NotAdvice = () => {
  const translate = useTranslate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Box
        sx={{
          pr: "2px",
          opacity: 0.4,
          fontSize: "0.71rem",
          fontStyle: "italic",
          cursor: "pointer",
          transition: "opacity 0.2s ease",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={() => setOpen(true)}
      >
        {translate("component.post_card.not_advice")}
      </Box>
      <WrappedModal width={500} onClose={() => setOpen(false)} opened={open}>
        <Stack alignItems="center" spacing={4}>
          <Stack gap={2} alignItems="center">
            <WarningOutlined
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
              {translate("component.not_advice.header")}
            </Typography>
          </Stack>

          <Typography
            variant="h4"
            sx={{ opacity: 0.8, lineHeight: "20px" }}
            paddingX={{ xs: 0.2, md: 1 }}
          >
            <Trans i18nKey="component.not_advice.message"></Trans>
          </Typography>
          <Button
            onClick={() => setOpen(false)}
            sx={{ alignSelf: "end" }}
            color="secondary"
            variant="contained"
          >
            {translate("component.not_advice.understood")}
          </Button>
        </Stack>
      </WrappedModal>
    </Box>
  );
};
