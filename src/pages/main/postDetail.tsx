import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/shared/post/postCard";
import { Post } from "../../interfaces/post";
import { TestPost } from "../../services/tempDatas";
import api from "../../services/api";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }
    api.content
      .post(postId)
      .then(setPost)
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [postId]);

  return isLoading && !post ? (
    <PostCard post={TestPost} loading={isLoading} />
  ) : (
    <PostCard displayEdit={true} post={post || TestPost} />
  );
};
