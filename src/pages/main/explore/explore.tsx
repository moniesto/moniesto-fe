import { Divider, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import PostCard from "../../../components/shared/post/postCard";
import MoniestCard from "../../../components/shared/user/moniestCard";
import { Post } from "../../../interfaces/post";
import { User } from "../../../interfaces/user";
import { TestMoniest, TestPost, TestUser } from "../../../services/tempDatas";
import { ExploreMoniests } from "./exploreMoniests";
import ExplorePosts from "./explorePosts";

const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [moniests, setMoniests] = useState<User[]>([]);

  useEffect(() => {
    setPosts([TestPost, TestPost, TestPost]);
    setMoniests([TestUser, TestUser, TestUser, TestUser]);
  }, []);

  return (
    <Stack rowGap={2}>
      <ExploreMoniests></ExploreMoniests>
      <Divider></Divider>
      <ExplorePosts></ExplorePosts>
    </Stack>
  );
};
export default Explore;
