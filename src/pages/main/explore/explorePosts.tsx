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
    sortBy: "score";
    subscribed: boolean;
    limit: number;
    offset: number;
  }>({
    subscribed: false,
    limit: 10,
    offset: 0,
    sortBy: "score",
  });

  const getPosts = () => {
    api.content.posts(queryParams).then((response) => {
      setPosts([...posts, ...response]);
      if (response.length < queryParams.limit) {
        setHasMore(false);
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
    });
  };

  const handleFetchData = () => {
    setQueryParams({ ...queryParams, offset: (queryParams.offset += 1) });
  };

  useEffect(() => {
    if (hasMore) getPosts();
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
