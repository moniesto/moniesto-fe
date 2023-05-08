import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { InfiniteScroll } from "../../../components/shared/common/infiniteScroll";
import PostCard from "../../../components/shared/post/postCard";
import { Post } from "../../../interfaces/post";
import api from "../../../services/api";
import { TestPost } from "../../../services/tempDatas";

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

  const dummyPost = { ...TestPost, id: "-1" };
  const getPosts = () => {
    setPosts(posts.concat(Array(queryParams.limit).fill(dummyPost)));
    api.content.posts(queryParams).then((response) => {
      setPosts([...posts.filter((post) => post.id !== "-1"), ...response]);
      if (response.length < queryParams.limit) {
        setHasMore(false);
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
    });
  };

  const handleFetchData = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + queryParams.limit,
    });
  };

  useEffect(() => {
    if (hasMore) getPosts();
  }, [queryParams]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      dataLength={posts.length}
      fetchData={handleFetchData}
      loader={<PostCard post={TestPost} loading={true} />}
    >
      <Stack rowGap={2}>
        {posts.map((post, i) => (
          <PostCard key={i}  loading={post.id === "-1"} post={post} />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};
export default ExplorePosts;
