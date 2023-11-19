import { Stack } from "@mui/system";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InfiniteScroll } from "../../components/shared/common/infiniteScroll";
import PostCard from "../../components/shared/post/postCard";
import { Post } from "../../interfaces/post";
import api from "../../services/api";
import { TestPost } from "../../services/tempDatas";
import Fly from "../../components/shared/common/fly/fly";
import { Typography } from "@mui/material";
import { useTranslate } from "../../hooks/useTranslate";
import { useAppSelector } from "../../store/hooks";

const TimeLine = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  let timeout = useRef<NodeJS.Timeout>();
  const translate = useTranslate();
  const user = useAppSelector((state) => state.user.user);

  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    active: boolean;
    sortBy: "created_at" | "score";
    subscribed: boolean;
    limit: number;
    offset: number;
    pastPostsStartIndex: number;
    unsubPostsStartIndex: number;
    activePostCount: number;
  }>({
    hasMore: true,
    active: true,
    pastPostsStartIndex: 0,
    subscribed: true,
    unsubPostsStartIndex: 0,
    activePostCount: 0,
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
    let finalPosts: any[] = [];
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
          finalPosts = uniqueArr;

          return [...uniqueArr, ...Array(3).fill(dummyPost)] as Post[];
        });
        if (response.length < queryParams.limit) {
          if (!queryParams.active && !queryParams.subscribed) {
            queryParams.hasMore = false;
            return;
          }
          if (queryParams.active) {
            queryParams.active = false;
            queryParams.pastPostsStartIndex = finalPosts.length;
            queryParams.activePostCount =
              queryParams.activePostCount || finalPosts.length;
            //Past analyzes
          } else if (queryParams.subscribed) {
            queryParams.subscribed = false;
            queryParams.unsubPostsStartIndex = finalPosts.length;
            //Other analyzes
          }
          queryParams.offset = 0;
          setQueryParams(JSON.parse(JSON.stringify(queryParams)));
        } else {
          queryParams.hasMore = true;
        }
      })
      .catch(console.error)
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
      offset: queryParams.offset + queryParams.limit,
    });
  };

  useEffect(() => {
    getPosts();
  }, [queryParams, getPosts]);

  const postCounts = useMemo(() => {
    const totalPasivePostCount = queryParams.unsubPostsStartIndex
      ? queryParams.unsubPostsStartIndex - queryParams.pastPostsStartIndex
      : posts.length - queryParams.pastPostsStartIndex;

    const totalUnsubPostCount =
      !queryParams.activePostCount || queryParams.unsubPostsStartIndex
        ? posts.length - queryParams.unsubPostsStartIndex
        : 0;

    return {
      totalPasivePostCount,
      totalUnsubPostCount,
    };
  }, [posts.length, queryParams]);

  return (
    <InfiniteScroll
      hasMore={queryParams.hasMore!}
      dataLength={posts.length}
      fetchData={() => !loading && handleFetchData()}
    >
      <Fly>
        <Stack gap={2}>
          {posts.map((post, i) => (
            <Fly.Item key={i}>
              <>
                {!loading || posts.every((p) => p.id !== "-1") ? (
                  <>
                    {postCounts.totalPasivePostCount &&
                    i === queryParams.pastPostsStartIndex ? (
                      <Typography variant="h3" mb={1.5}>
                        • {translate("page.timeline.past_analyzes_title")}
                      </Typography>
                    ) : null}
                    {postCounts.totalUnsubPostCount &&
                    i === queryParams.unsubPostsStartIndex &&
                    !(
                      i === 0 && posts.some((item) => item.user.id === user.id)
                    ) ? (
                      <Typography variant="h3" mb={1.5}>
                        • {translate("page.timeline.unsub_analyzes_title")}
                      </Typography>
                    ) : null}
                  </>
                ) : null}

                <PostCard loading={post.id === "-1"} key={i} post={post} />
              </>
            </Fly.Item>
          ))}
        </Stack>
      </Fly>
    </InfiniteScroll>
  );
};
export default TimeLine;
