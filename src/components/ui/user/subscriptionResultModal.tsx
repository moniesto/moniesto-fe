import { Box, Stack, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import {
  useMatches,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { WrappedModal } from "../../shared/common/wrappedModal";
import api from "../../../services/api";
import { ErrorOutline, TaskAltOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import Confetti from "../../shared/common/confetti";
import { useTranslate } from "../../../hooks/useTranslate";

const SubscriptionResultModal = ({
  onClose,
}: {
  onClose?: (result: boolean) => void;
}) => {
  let [searchParams] = useSearchParams();
  const match = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const translate = useTranslate();
  const { username } = useParams();

  const checkTransaction = useCallback((id: string) => {
    api.payment
      .binance_transaction_check(id)
      .then(() => {
        console.log("transaction success");
      })
      .catch(() => {
        console.log("transaction error");
      });
  }, []);

  useEffect(() => {
    const transactionId = searchParams.get("transactionID");
    if (!transactionId) return;

    const fail = !!match.find((item) => item.id === "fail");
    const success = !!match.find((item) => item.id === "success");
    const hasResult = fail || success;
    if (!hasResult) return;

    checkTransaction(transactionId);

    setIsOpen(hasResult);
    setIsSuccess(success);
  }, [checkTransaction, match, searchParams]);

  return (
    <WrappedModal
      width={500}
      opened={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose?.(isSuccess);
        navigate("/" + username, { replace: true });
      }}
    >
      <Box
        sx={{
          padding: "30px 20px 30px",
        }}
      >
        {isSuccess && <Confetti />}
        <Stack alignItems="center" spacing={4}>
          <Stack gap={2} alignItems="center">
            {isSuccess ? (
              <TaskAltOutlined
                sx={{
                  padding: "6px",
                  borderRadius: "100%",
                  width: "40px",
                  height: "40px",
                  background: theme.palette.secondary[200],
                  color: theme.palette.secondary.main,
                }}
              />
            ) : (
              <ErrorOutline
                sx={{
                  padding: "6px",
                  borderRadius: "100%",
                  width: "40px",
                  height: "40px",
                  background: "var(--color-yellow-light)",
                  color: "var(--color-yellow-primary)",
                }}
              />
            )}
            <Typography textAlign="center" variant="h2">
              {translate(
                `component.subscription.title.${isSuccess ? "success" : "fail"}`
              )}
            </Typography>
          </Stack>

          <Typography
            textAlign="center"
            variant="h4"
            sx={{ opacity: 0.6 }}
            paddingX={{ xs: 0.5, md: 2 }}
          >
            {translate(
              `component.subscription.message.${isSuccess ? "success" : "fail"}`
            )}
          </Typography>
        </Stack>
      </Box>
    </WrappedModal>
  );
};
export default memo(SubscriptionResultModal);
