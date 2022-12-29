import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import PostCard from "../../components/shared/post/postCard";
import { Post } from "../../interfaces/post";
import { TestPost } from "../../services/tempDatas";

const TimeLine = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([TestPost, TestPost, TestPost]);
  }, []);

  return (
    <Stack rowGap={2}>
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </Stack>
  );
};
export default TimeLine;
