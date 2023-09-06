import { Stack } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteScroll } from "../../components/shared/common/infiniteScroll";
import PostCard from "../../components/shared/post/postCard";
import { Post } from "../../interfaces/post";
import api from "../../services/api";
import { TestPost } from "../../services/tempDatas";
import Fly from "../../components/shared/common/fly/fly";
import { sendAnalytic } from "../../services/analytic";

const TimeLine = () => {
  sendAnalytic({ hitType: "pageview", page: "Timeline" });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  let timeout = useRef<NodeJS.Timeout>();
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

  const getPosts = useCallback(() => {
    const dummyPost = { ...TestPost, id: "-1" };

    setPosts((prev) =>
      !prev.some((item) => item.id === "-1")
        ? prev.concat(Array(3).fill(dummyPost))
        : prev
    );

    delete queryParams.hasMore;
    api.content
      .posts(queryParams)
      .then((response) => {
        setPosts((prev) => {
          const uniqueArr = [
            ...new Map(
              [...prev.filter((post) => post.id !== "-1"), ...response].map(
                (item) => [item.id, item]
              )
            ).values(),
          ];
          return [...uniqueArr, ...Array(3).fill(dummyPost)] as Post[];
        });
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
        } else {
          queryParams.hasMore = true;
        }
      })
      .finally(() => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setPosts((prev) => {
            setLoading(false);
            return prev.filter((post) => post.id !== "-1");
          });
        }, 500);
      });
  }, [queryParams]);

  const handleFetchData = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + 1,
    });
  };

  useEffect(() => {
    getPosts();
  }, [queryParams, getPosts]);

  return (
    <InfiniteScroll
      hasMore={queryParams.hasMore!}
      dataLength={posts.length}
      fetchData={() => !loading && handleFetchData()}
    >
      <Fly>
        <Stack rowGap={2}>
          {posts.map((post, i) => (
            <Fly.Item key={i}>
              <PostCard loading={post.id === "-1"} key={i} post={post} />
            </Fly.Item>
          ))}
        </Stack>
      </Fly>
    </InfiniteScroll>
  );
};
export default TimeLine;
