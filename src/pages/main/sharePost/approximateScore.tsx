import { Stack, Typography } from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { ScoreStar } from "../../../components/shared/common/scoreStar";
import { Post } from "../../../interfaces/post";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Spinner } from "../../../components/shared/common/spinner";

export const ApproximateScor = ({
  post,
  isValid,
}: {
  post: Partial<Post>;
  isValid: boolean;
}) => {
  const translate = useTranslate();
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isValid) return;
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
  }, [post, isValid]);

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography variant="h5" sx={{ opacity: "0.8" }}>
        {translate("page.share_post.approximate_score")}
      </Typography>
      <Typography variant="h5" sx={{ paddingRight: "4px" }} fontWeight={700}>
        {loading ? <Spinner size={15}></Spinner> : isValid ? score : 0}
      </Typography>
      <ScoreStar></ScoreStar>
    </Stack>
  );
};
