import { Alert, Snackbar } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../store/hooks";

const Toast = () => {
  const [open, setOpen] = useState(false);
  const messageProps = useAppSelector((state) => state.toast.props);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (messageProps.message) setOpen(true);
  }, [messageProps]);

  const renderToast = useMemo(
    () => (
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={messageProps.severity}
          sx={{ width: "100%" }}
        >
          {messageProps.message}
        </Alert>
      </Snackbar>
    ),
    [open]
  );

  return renderToast;
};
export default Toast;
