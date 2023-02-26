import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { InfiniteScroll } from "../../../components/shared/common/infiniteScroll";
import PostCard from "../../../components/shared/post/postCard";
import { Post } from "../../../interfaces/post";
import api from "../../../services/api";

const ExplorePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [queryParams, setQueryParams] = useState<{
    active: boolean;
    sortBy: "created_at" | "score";
    subscribed: boolean;
    limit: number;
    offset: number;
  }>({
    active: true,
    subscribed: true,
    limit: 10,
    offset: 0,
    sortBy: "score",
  });

  const getPosts = () => {
    api.content.posts(queryParams).then((response) => {
      setPosts([...posts, ...response]);
      if (response.length < queryParams.limit) {
        if (!queryParams.active && !queryParams.subscribed) {
          setHasMore(false);
          return;
        }
        if (queryParams.subscribed) {
          queryParams.subscribed = false;
        } else if (queryParams.active) {
          queryParams.active = false;
        }
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
    });
  };

  const handleFetchData = () => {
    setQueryParams({ ...queryParams, offset: (queryParams.offset += 1) });
  };

  useEffect(() => {
    getPosts();
  }, [queryParams]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      dataLength={posts.length}
      fetchData={handleFetchData}
    >
      <Stack rowGap={2}>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};
export default ExplorePosts;
