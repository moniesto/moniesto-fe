import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import PostCard from "../../components/shared/post/postCard";
import MoniestCard from "../../components/shared/user/moniestCard";
import { Post } from "../../interfaces/post";
import { User } from "../../interfaces/user";
import { TestMoniest, TestPost, TestUser } from "../../services/tempDatas";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [moniests, setMoniests] = useState<User[]>([]);

  useEffect(() => {
    setPosts([TestPost, TestPost, TestPost]);
    setMoniests([TestUser, TestUser, TestUser, TestUser]);
  }, []);

  return (
    <Stack rowGap={2}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {moniests.map((moniest, i) => (
          <Grid key={i} item xs={6}>
            <MoniestCard user={moniest} />
          </Grid>
        ))}
      </Grid>
      <Stack rowGap={3}>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </Stack>
    </Stack>
  );
};
export default Explore;
