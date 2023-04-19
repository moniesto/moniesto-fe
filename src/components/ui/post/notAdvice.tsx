import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { useState } from "react";
import { ClearOutlined, WarningOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/system";

export const NotAdvice = () => {
  const translate = useTranslate();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          left: "14px",
          bottom: "16px",
          opacity: 0.4,
          fontSize: "0.75rem",
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card
          sx={{
            border: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { md: 550, xs: "90%" },
            background: theme.palette.background[600],
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 3, top: 3 }}
          >
            <ClearOutlined />
          </IconButton>
          <Box
            sx={{
              padding: "30px 20px 20px",
            }}
          >
            <Stack alignItems="center" spacing={1.3}>
              <Box>
                <WarningOutlined
                  sx={{
                    padding: "6px",
                    borderRadius: "100%",
                    width: "40px",
                    height: "40px",
                    background: theme.palette.warning.light,
                    color: theme.palette.warning.main,
                  }}
                />
              </Box>
              <Typography variant="h3">
                {translate("component.not_advice.header")}
              </Typography>
              <Typography variant="h4" textAlign="center" sx={{ opacity: 0.5 }}>
                {translate("component.not_advice.message")}
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
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};
