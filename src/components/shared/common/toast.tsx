import { Alert, Snackbar } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import { useAppSelector } from "../../../store/hooks";

const Toast = () => {
  const [open, setOpen] = useState(false);
  const translate = useTranslate();
  const messageProps = useAppSelector((state) => state.toast);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpen(false);
    if (reason === "clickaway") {
      return;
    }
  };

  useEffect(() => {
    if (messageProps.message) setOpen(true);
  }, [messageProps, translate]);

  const renderToast = useMemo(
    () => (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageProps.severity}
          sx={{ width: "100%" }}
        >
          {translate(messageProps.message)}
        </Alert>
      </Snackbar>
    ),
    [messageProps.message, messageProps.severity, open, translate]
  );

  return renderToast;
};
export default Toast;
