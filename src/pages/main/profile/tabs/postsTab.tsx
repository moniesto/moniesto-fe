import { Box, Card, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import StreamIcon from "@mui/icons-material/Stream";
import PostCard from "../../../../components/shared/post/postCard";
import { useCallback, useEffect, useState } from "react";
import { Post } from "../../../../interfaces/post";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import { SubscribeButton } from "../../../../components/shared/user/subscribeButton";
import { useTranslate } from "../../../../hooks/useTranslate";
import { TestPost } from "../../../../services/tempDatas";
import { useAppSelector } from "../../../../store/hooks";
import { Spinner } from "../../../../components/shared/common/spinner";

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

const PostsTab = ({
  handleClickSubscribe,
}: {
  handleClickSubscribe: () => void;
}) => {
  const theme = useTheme();
  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    active: boolean;
    limit: number;
    offset: number;
  }>({
    hasMore: true,
    active: false,
    limit: 10,
    offset: 0,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePostFilter, setActivePostFilter] = useState<Filter>(filters[0]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);

  const handleFetchData = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + queryParams.limit,
    });
  };

  useEffect(() => {
    if (isInitialRender) setIsInitialRender(false);
  }, [isInitialRender]);

  // useEffect(() => {
  //   console.log("isInitialRender");
  //   if (isInitialRender) return;

  //   setPosts([]);
  //   setActivePostFilter(filters[0]);

  //   queryParams.offset = 0;
  //   queryParams.hasMore = true;

  //   setQueryParams(JSON.parse(JSON.stringify(queryParams)));
  // }, [isInitialRender, queryParams]);

  const getPosts = useCallback(
    (activeFilter: boolean) => {
      const dummyPost = { ...TestPost, id: "-1" };

      setLoading(true);
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
          }
        })
        .finally(() => setLoading(false));
    },
    [profileState.account, queryParams]
  );

  useEffect(() => {
    queryParams.hasMore && getPosts(activePostFilter.boolValue);
  }, [queryParams, getPosts, activePostFilter.boolValue]);

  const handleChangeFilter = (filterItem: Filter) => {
    if (filterItem.value === activePostFilter.value) return;
    setActivePostFilter(filterItem);
    setPosts([]);

    if (
      !profileState.isMyAccount &&
      filterItem.boolValue === true &&
      !profileState.isSubscribed
    )
      return;

    setLoading(true);
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

  return loading ? (
    <Box sx={{ position: "relative", minHeight: 100, width: "100%" }}>
      <Spinner center={true} />
    </Box>
  ) : (
    <Stack spacing={2}>
      <Card>
        <Stack
          sx={{
            borderRadius: "10px",
            padding: "14px 20px",
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
      !profileState.isSubscribed ? (
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
            <Stack spacing={2} alignItems="center">
              <Typography variant="h2">
                {translate("page.profile.sub_for_live")}
              </Typography>
              <SubscribeButton onClick={() => handleClickSubscribe()} />
            </Stack>
          </Box>
          <Stack sx={{ filter: "blur(3px)" }} rowGap={2}>
            {[testPost, testPost].map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </Stack>
        </Box>
      ) : (
        <InfiniteScroll
          hasMore={queryParams.hasMore!}
          fetchData={handleFetchData}
          dataLength={posts.length}
        >
          <Stack rowGap={2}>
            {posts.map((post, i) => (
              <PostCard loading={post.id === "-1"} key={i} post={post} />
            ))}
          </Stack>
          {!posts.length && (
            <Card>
              <Stack p={3} alignItems="center">
                <Typography variant="h5">
                  {translate("page.profile.no_post")}
                </Typography>
              </Stack>
            </Card>
          )}
        </InfiniteScroll>
      )}
    </Stack>
  );
};
export default PostsTab;
