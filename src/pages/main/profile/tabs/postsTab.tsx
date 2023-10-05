import { Box, Card, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import StreamIcon from "@mui/icons-material/Stream";
import PostCard from "../../../../components/shared/post/postCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Post } from "../../../../interfaces/post";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import { SubscribeButton } from "../../../../components/shared/user/subscribeButton";
import { useTranslate } from "../../../../hooks/useTranslate";
import { TestPost } from "../../../../services/tempDatas";
import { useAppSelector } from "../../../../store/hooks";
import { useTheme } from "@mui/system";
import Fly from "../../../../components/shared/common/fly/fly";

type FilterType = "all" | "live";
type Filter = {
  title: string;
  value: FilterType;
  icon: React.ReactNode;
  boolValue: boolean;
};
const filters: Filter[] = [
  { title: "all", value: "all", boolValue: false, icon: <FilterListIcon /> },
  { title: "live", value: "live", boolValue: true, icon: <StreamIcon /> },
];

const PostsTab = () => {
  const theme = useTheme();
  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    active: boolean;
    limit: number;
    offset: number;
  }>({
    hasMore: false,
    active: false,
    limit: 10,
    offset: 0,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostFilter, setActivePostFilter] = useState<Filter>(filters[0]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);

  const handleFetchData = () => {
    setQueryParams((prev) => {
      return {
        ...prev,
        offset: prev.offset + prev.limit,
      };
    });
  };

  useEffect(() => {
    if (isInitialRender) setIsInitialRender(false);
  }, [isInitialRender]);

  const getPosts = useCallback(
    (activeFilter: boolean) => {
      const dummyPost = { ...TestPost, id: "-1" };

      setPosts((prev) => prev.concat(Array(queryParams.limit).fill(dummyPost)));

      queryParams.active = activeFilter;
      delete queryParams.hasMore;

      api.post
        .user_posts(profileState.account!.username, queryParams)
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
        .catch(console.error);
    },
    [profileState.account, queryParams]
  );

  useEffect(() => {
    setPosts([]);
    setActivePostFilter(filters[0]);
    setQueryParams((prev) =>
      JSON.parse(JSON.stringify({ ...prev, ...{ hasMore: true, offset: 0 } }))
    );
  }, [profileState.account]);

  const notShowLivePost = useMemo(
    () =>
      !profileState.isMyAccount &&
      activePostFilter.boolValue === true &&
      !profileState.subscriptionInfo?.subscribed,
    [activePostFilter, profileState]
  );

  useEffect(() => {
    queryParams.hasMore &&
      !notShowLivePost &&
      getPosts(activePostFilter.boolValue);
  }, [queryParams, getPosts, activePostFilter.boolValue, notShowLivePost]);

  const handleChangeFilter = (filterItem: Filter) => {
    if (filterItem.value === activePostFilter.value) return;
    setActivePostFilter(filterItem);
    setPosts([]);

    if (notShowLivePost) return;

    setQueryParams({
      ...queryParams,
      active: filterItem.boolValue,
      offset: 0,
      hasMore: true,
    });
  };

  const oneDayAfter = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now;
  };

  const testPost: Post = {
    ...TestPost,
    duration: oneDayAfter().toISOString(),
    user: profileState.account!,
    status: "pending",
    finished: false,
  };

  const getColorByActive = (filter: Filter) =>
    activePostFilter.value === filter.value
      ? theme.palette.secondary.main
      : theme.palette.text.primary;

  return (
    <Stack spacing={2}>
      <Card>
        <Stack
          sx={{
            borderRadius: "10px",
            padding: "16px 24px",
            fontWeight: "bold",
          }}
          flexDirection="row"
          columnGap={2}
        >
          {filters.map((filter) => (
            <Stack
              key={filter.value}
              onClick={() => handleChangeFilter(filter)}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                color: getColorByActive(filter),
              }}
              flexDirection="row"
              alignItems="center"
              columnGap={0.3}
            >
              <Stack
                sx={{
                  ".MuiSvgIcon-root": {
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    color: getColorByActive(filter),
                  },
                }}
              >
                {filter.icon}
              </Stack>
              {translate("page.profile.post_filter." + filter.title)}
            </Stack>
          ))}
        </Stack>
      </Card>
      {!profileState.isMyAccount &&
      activePostFilter.boolValue === true &&
      !profileState.subscriptionInfo?.subscribed ? (
        <Box position="relative">
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                padding: "32px 16px",
                borderRadius: "10px",
              }}
              gap={2}
              alignItems="center"
              textAlign="center"
            >
              <Typography variant="h2">
                {translate("page.profile.sub_for_live")}
              </Typography>
              <SubscribeButton />
            </Stack>
          </Box>
          <Stack sx={{ filter: "blur(4px)" }} rowGap={2}>
            {[testPost, testPost].map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </Stack>
        </Box>
      ) : (
        <Fly>
          <InfiniteScroll
            hasMore={queryParams.hasMore!}
            fetchData={handleFetchData}
            dataLength={posts.length}
          >
            <Fly.Item>
              <Stack rowGap={2}>
                {posts.map((post, i) => (
                  <Fly.Item key={i}>
                    <PostCard loading={post.id === "-1"} post={post} />
                  </Fly.Item>
                ))}
              </Stack>
            </Fly.Item>
            {!posts.length && (
              <Fly.Item>
                <Card>
                  <Stack p={3} alignItems="center">
                    <Typography variant="h5">
                      {translate("page.profile.no_post")}
                    </Typography>
                  </Stack>
                </Card>
              </Fly.Item>
            )}
          </InfiniteScroll>
        </Fly>
      )}
    </Stack>
  );
};
export default PostsTab;
