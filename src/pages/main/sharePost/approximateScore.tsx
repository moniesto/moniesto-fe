import { Stack, Typography, useTheme } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { Post } from "../../../interfaces/post";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { ScoreBadge } from "../../../components/shared/user/scoreBadge";
import { ErrorOutline, HelpOutlineOutlined } from "@mui/icons-material";

export const ApproximateScore = ({
  post,
  isValid,
  isSubmitting,
}: {
  post: Partial<Post>;
  isValid: boolean;
  isSubmitting: boolean;
}) => {
  const translate = useTranslate();
  const theme = useTheme();
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isValid || isSubmitting) return;
    const timeOutId = setTimeout(() => {
      setLoading(true);
      setScore(0);
      setTimeout(() => {
        api.post
          .approximate_score(post)
          .then((res) => {
            setScore(res.score);
          })
          .finally(() => setLoading(false));
      }, 300);
    }, 100);

    return () => clearTimeout(timeOutId);
  }, [post, isValid, isSubmitting]);

  return (
    <Stack
      gap={1}
      direction="row"
      justifyContent={{ xs: "center", md: "space-between" }}
      flexWrap="wrap"
      sx={{
        background: theme.palette.secondary.light,
        padding: "12px 16px",
        borderRadius: "10px",
      }}
    >
      <Stack
        justifyContent="end"
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ opacity: "0.8" }}>
          {translate("page.share_post.approximate_score")}
        </Typography>

        <ScoreBadge isLoading={loading} value={score}></ScoreBadge>
      </Stack>
      {!isValid && !loading ? (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          flexWrap="wrap"
          whiteSpace="nowrap"
        >
          <ErrorOutline sx={{ fontSize: "0.9rem", opacity: 0.5 }} />
          <Typography sx={{ opacity: 0.5 }} variant="h5">
            {translate("page.share_post.approximate_score_invalid")}
          </Typography>
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          flexWrap="wrap"
          whiteSpace="nowrap"
        >
          <HelpOutlineOutlined sx={{ fontSize: "0.9rem", opacity: 0.5 }} />
          <Typography sx={{ opacity: 0.5 }} variant="h5">
            {translate("page.share_post.approximate_score_valid")}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
