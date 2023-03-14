import { Box, Card, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import StreamIcon from "@mui/icons-material/Stream";
import PostCard from "../../../../components/shared/post/postCard";
import { useEffect, useState } from "react";
import { Post } from "../../../../interfaces/post";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import { User } from "../../../../interfaces/user";
import { Spinner } from "../../../../components/shared/common/spinner";
import { SubscribeButton } from "../../../../components/shared/user/subscribeButton";

type FilterType = "all" | "live";
type Filter = {
  title: string;
  value: FilterType;
  icon: React.ReactNode;
  boolValue: boolean;
};
const filters: Filter[] = [
  { title: "All", value: "all", boolValue: false, icon: <FilterListIcon /> },
  { title: "Live", value: "live", boolValue: true, icon: <StreamIcon /> },
];

const PostsTab = ({
  account,
  isSubscribed,
  isMyAccount,
  handleClickSubscribe,
}: {
  account: User;
  isSubscribed: boolean;
  isMyAccount: boolean;
  handleClickSubscribe: () => void;
}) => {
  const theme = useTheme();
  const [queryParams, setQueryParams] = useState<{
    active: boolean;
    limit: number;
    offset: number;
  }>({
    active: false,
    limit: 10,
    offset: 0,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activePostFilter, setActivePostFilter] = useState<Filter>(filters[0]);

  const handleFetchData = () => {
    setQueryParams({ ...queryParams, offset: queryParams.offset + 1 });
  };

  useEffect(() => {
    queryParams.offset = 0;
    setQueryParams(JSON.parse(JSON.stringify(queryParams)));
  }, [isSubscribed]);

  useEffect(() => {
    if (hasMore) getPosts();
  }, [queryParams]);

  const getPosts = () => {
    api.post.user_posts(account.username, queryParams).then((response) => {
      setPosts([...posts, ...response]);
      if (response.length < queryParams.limit) {
        setHasMore(false);
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
      setLoading(false);
    });
  };

  const handleChangeFilter = (filterItem: Filter) => {
    if (filterItem.value === activePostFilter.value) return;
    setActivePostFilter(filterItem);
    setPosts([]);
    setLoading(true);
    setHasMore(true);
    if (!isMyAccount && filterItem.boolValue === true && !isSubscribed) {
      return;
    }
    setQueryParams({ ...queryParams, active: filterItem.boolValue });
  };

  const oneDayAfter = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now;
  };

  const testPost: Post = {
    currency: "BTCUSDT",
    direction: "long",
    duration: oneDayAfter().toISOString(),
    created_at: new Date(),
    id: "1",
    score: 32,
    start_price: 2103.99,
    stop: 2103.99,
    target1: 1,
    target2: 1,
    target3: 2203.99,
    updated_at: new Date(),
    user: account,
    status: "",
    finished: false,
    description: "",
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
            padding: "15px 20px",
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
              {filter.title}
            </Stack>
          ))}
        </Stack>
      </Card>
      {!isMyAccount && activePostFilter.boolValue === true && !isSubscribed ? (
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
              <Typography variant="h2"> Subscribe to see live posts</Typography>
              <SubscribeButton
                fee={account.moniest?.subscription_info.fee as number}
                isSubscribed={isSubscribed}
                onClick={() => handleClickSubscribe()}
              />
            </Stack>
          </Box>
          <Stack sx={{ filter: "blur(3px)" }} rowGap={2}>
            {[testPost, testPost].map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </Stack>
        </Box>
      ) : loading ? (
        <Box sx={{ position: "relative" }}>
          <Spinner sx={{ mt: "15px" }} center={true}></Spinner>
        </Box>
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          fetchData={handleFetchData}
          dataLength={posts.length}
        >
          <Stack rowGap={2}>
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </Stack>
          {!posts.length && (
            <Card>
              <Stack p={3} alignItems="center">
                <Typography variant="h5">There are no posts yet</Typography>
              </Stack>
            </Card>
          )}
        </InfiniteScroll>
      )}
    </Stack>
  );
};
export default PostsTab;
