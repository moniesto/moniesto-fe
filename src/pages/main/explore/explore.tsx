import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { ExploreMoniests } from "./exploreMoniests";
import ExplorePosts from "./explorePosts";

const Explore = () => {
  return (
    <Stack rowGap={2}>
      <ExploreMoniests></ExploreMoniests>
      <Divider></Divider>
      <ExplorePosts></ExplorePosts>
    </Stack>
  );
};
export default Explore;
