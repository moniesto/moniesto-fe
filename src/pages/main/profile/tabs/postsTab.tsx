import { Card, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import StreamIcon from "@mui/icons-material/Stream";
import PostCard from "../../../../components/shared/post/postCard";
import { TestPost } from "../../../../services/tempDatas";
import { useEffect, useState } from "react";
import { Post } from "../../../../interfaces/post";

type FilterType = "all" | "live";
type Filter = {
  title: string;
  value: FilterType;
  icon: React.ReactNode;
};

const PostsTab = () => {
  const theme = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePostFilter, setActivePostFilter] = useState<FilterType>("all");
  const filters: Filter[] = [
    { title: "All", value: "all", icon: <FilterListIcon /> },
    { title: "Live", value: "live", icon: <StreamIcon /> },
  ];

  useEffect(() => {
    setPosts([TestPost, TestPost, TestPost]);
  }, []);

  const handleChangeFilter = (value: FilterType) => {
    setActivePostFilter(value);
  };

  const getColorByActive = (filter: string) =>
    activePostFilter == filter
      ? theme.palette.secondary.main
      : theme.palette.text.primary;

  return (
    <Stack spacing={2}>
      <Card>
        <Stack
          sx={{
            // background: theme.palette.background.paper,
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
              onClick={() => handleChangeFilter(filter.value)}
              sx={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                color: getColorByActive(filter.value),
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
                    color: getColorByActive(filter.value),
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

      <Stack rowGap={2}>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </Stack>
    </Stack>
  );
};
export default PostsTab;
