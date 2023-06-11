import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { InfiniteScroll } from "../../components/shared/common/infiniteScroll";
import PostCard from "../../components/shared/post/postCard";
import { Post } from "../../interfaces/post";
import api from "../../services/api";
import { TestPost } from "../../services/tempDatas";

const TimeLine = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    active: boolean;
    sortBy: "created_at" | "score";
    subscribed: boolean;
    limit: number;
    offset: number;
  }>({
    hasMore: true,
    active: true,
    subscribed: true,
    limit: 10,
    offset: 0,
    sortBy: "created_at",
  });

  const dummyPost = { ...TestPost, id: "-1" };

  const getPosts = () => {
    setPosts(posts.concat(Array(queryParams.limit).fill(dummyPost)));

    delete queryParams.hasMore;
    api.content.posts(queryParams).then((response) => {
      setPosts([...posts.filter((post) => post.id !== "-1"), ...response]);
      if (response.length < queryParams.limit) {
        if (!queryParams.active && !queryParams.subscribed) {
          queryParams.hasMore = false;
          return;
        }
        if (queryParams.active) {
          queryParams.active = false;
        } else if (queryParams.subscribed) {
          queryParams.subscribed = false;
        }
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
    getPosts();
  }, [queryParams]);

  return (
    <InfiniteScroll
      hasMore={queryParams.hasMore!}
      dataLength={posts.length}
      fetchData={handleFetchData}
    >
      <Stack rowGap={2}>
        {posts.map((post, i) => (
          <PostCard loading={post.id === "-1"} key={i} post={post} />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};
export default TimeLine;
