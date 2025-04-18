import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { InfiniteScroll } from "../../../components/shared/common/infiniteScroll";
import PostCard from "../../../components/shared/post/postCard";
import { Post } from "../../../interfaces/post";
import api from "../../../services/api";
import { TestPost } from "../../../services/tempDatas";
import { useTranslate } from "../../../hooks/useTranslate";

const ExplorePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    sortBy: "score";
    subscribed: boolean;
    limit: number;
    offset: number;
  }>({
    hasMore: true,
    subscribed: false,
    limit: 10,
    offset: 0,
    sortBy: "score",
  });
  const translate = useTranslate();

  const getPosts = useCallback(() => {
    const dummyPost = { ...TestPost, id: "-1" };

    setPosts((prev) => prev.concat(Array(queryParams.limit).fill(dummyPost)));

    delete queryParams.hasMore;
    api.content
      .posts(queryParams)
      .then((response) => {
        setPosts((prev) => [
          ...prev.filter((post) => post.id !== "-1"),
          ...response,
        ]);
        if (response.length < queryParams.limit) {
          queryParams.hasMore = false;
          queryParams.offset = 0;
          setQueryParams(JSON.parse(JSON.stringify(queryParams)));
        } else queryParams.hasMore = true;
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [queryParams]);

  const handleFetchData = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + queryParams.limit,
    });
  };

  useEffect(() => {
    if (queryParams.hasMore) getPosts();
  }, [queryParams, getPosts]);

  return (
    <Box>
      <Typography variant="h3" mb={1.5}>
        • {translate("page.explore.explore_analysis")}
      </Typography>
      <InfiniteScroll
        hasMore={queryParams.hasMore!}
        dataLength={posts.length}
        fetchData={() => !loading && handleFetchData()}
        loader={<PostCard post={TestPost} loading={true} />}
      >
        <Stack rowGap={2}>
          {posts.map((post, i) => (
            <PostCard key={i} loading={post.id === "-1"} post={post} />
          ))}
        </Stack>
      </InfiniteScroll>
    </Box>
  );
};
export default ExplorePosts;
