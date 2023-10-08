import { ClearOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Modal,
  SxProps,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@mui/system";

export const WrappedModal = ({
  children,
  opened,
  onClose,
  width,
  noPadding,
  title,
  headerBackgroundColor,
  sx,
}: {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
  width?: number;
  noPadding?: boolean;
  title?: string;
  headerBackgroundColor?: string;
  sx?: SxProps;
}) => {
  const theme = useTheme();

  return (
    <Modal open={opened} onClose={onClose} sx={sx}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { md: width || 800, xs: "90%" },
          maxHeight: "85vh",
          overflowY: "scroll",
          background: theme.palette.background[600],
        }}
      >
        <CardHeader
          sx={{
            position: "sticky",
            top: 0,
            background: headerBackgroundColor || theme.palette.background[600],
            minHeight: 60,
            zIndex: 2,
          }}
          title={
            <Typography variant="h3" textAlign="center">
              {title}{" "}
            </Typography>
          }
          action={
            <IconButton
              onClick={onClose}
              sx={{ position: "absolute", right: 10, top: 10, zIndex: 1 }}
            >
              <ClearOutlined />
            </IconButton>
          }
        ></CardHeader>

        <Box
          className="wrappedModalContainer"
          sx={{
            padding: noPadding ? 0 : "0px 30px 20px 20px",
          }}
        >
          {children}
        </Box>
      </Card>
    </Modal>
  );
};
