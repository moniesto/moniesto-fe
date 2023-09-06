import { Button, Divider, Stack, Typography } from "@mui/material";
import { WrappedModal } from "../../../components/shared/common/wrappedModal";
import PostCard from "../../../components/shared/post/postCard";
import { useTranslate } from "../../../hooks/useTranslate";
import { useAppSelector } from "../../../store/hooks";
import { useMemo } from "react";
import { Post } from "../../../interfaces/post";

import { normalizePostFromForm } from "./utils";
import { PostFormType } from "./sharePost";

export const PreviewPost = ({
  opened,
  values,
  onClose,
  onOkClik,
}: {
  onClose: () => void;
  onOkClik: () => void;
  opened: boolean;
  values: PostFormType;
}) => {
  const translate = useTranslate();
  const user = useAppSelector((state) => state.user.user);

  const previewPost = useMemo(() => {
    const postData: Post = {
      ...(normalizePostFromForm(values) as Post),
      user: user,
      created_at: new Date(),
      status: "pending",
      start_price: values.crypto_currency.price,
    };
    return postData;
  }, [values, user]);

  return (
    <WrappedModal width={600} opened={opened} onClose={onClose}>
      <Typography textAlign="center" mb={1} variant="h3">
        {translate("page.share_post.preview.title")}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography pt={1} sx={{ mb: 4 }} variant="h4">
        {translate("page.share_post.preview.message")}
      </Typography>
      <PostCard loading={false} post={previewPost} />
      <Stack direction="row" mt={4} spacing={4}>
        <Button
          onClick={onClose}
          type="button"
          sx={{ flex: 1 }}
          variant="outlined"
          color="inherit"
        >
          {translate("common.cancel")}
        </Button>
        <Button
          onClick={onOkClik}
          sx={{ flex: 1 }}
          type="submit"
          color="secondary"
          variant="contained"
        >
          {translate("common.confirm")}
        </Button>
      </Stack>
    </WrappedModal>
  );
};
