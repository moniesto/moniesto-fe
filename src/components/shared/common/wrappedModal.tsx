import { ClearOutlined } from "@mui/icons-material";
import { Box, Card, IconButton, Modal } from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@mui/system";

export const WrappedModal = ({
  children,
  opened,
  onClose,
  width,
  noPadding,
}: {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
  width?: number;
  noPadding?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Modal open={opened} onClose={onClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: width || 800, xs: "90%" },
          maxHeight: "90vh",
          overflowY: "scroll",
          background: theme.palette.background[600],
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 3, top: 3, zIndex: 1 }}
        >
          <ClearOutlined />
        </IconButton>
        <Box
          sx={{
            padding: noPadding ? 0 : "30px 20px 20px",
          }}
        >
          {children}
        </Box>
      </Card>
    </Modal>
  );
};
