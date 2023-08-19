import { Stack, Typography, useTheme } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import api from "../../../services/api";
import { ScoreBadge } from "../../../components/shared/user/scoreBadge";
import { ErrorOutline, HelpOutlineOutlined } from "@mui/icons-material";
import { CreatePostReq } from "../../../interfaces/requests";

export const ApproximateScore = memo(
  ({
    post,
    isValid,
    isSubmitting,
  }: {
    post: CreatePostReq;
    isValid: boolean;
    isSubmitting: boolean;
  }) => {
    const translate = useTranslate();
    const theme = useTheme();
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [oldPost, setOldPost] =
      useState<Omit<CreatePostReq, "description">>();
    let timeout = useRef<NodeJS.Timeout | null>(null);

    const fetchScore = useCallback(
      (post: CreatePostReq) => {
        setLoading(true);
        if (timeout?.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
          api.post
            .approximate_score(post)
            .then((res) => {
              setScore(res.score);
            })
            .finally(() => setLoading(false));
        }, 300);
      },
      [timeout]
    );
    useEffect(() => {
      if (!isValid || isSubmitting) {
        return;
      }
      const { description, ...comparedPost } = post;

      const isEqual = JSON.stringify(oldPost) === JSON.stringify(comparedPost);
      const isAllFieldFilled = Object.keys(comparedPost).every(
        (key) => !!comparedPost[key as keyof Omit<CreatePostReq, "description">]
      );
      if (!isEqual && isAllFieldFilled) {
        fetchScore(post);
        setOldPost(comparedPost);
      }
    }, [post, oldPost, isValid, isSubmitting, fetchScore]);

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
  }
);
