import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import SearchBar from "../../../components/layout/header/seachBar";
import { ExploreMoniests } from "./exploreMoniests";
import ExplorePosts from "./explorePosts";

const Explore = () => {
  const [searchText, setSearchText] = useState<string>();

  const searchBarOverlay = searchText && {
    position: "fixed",
    height: "100%",
    backdropFilter: "blur(1px)",
    zIndex: 2,
    width: "calc(100% - 8px)",
    left: "4px",
  };

  const contentPadding = searchText && { paddingTop: "68px" };

  return (
    <Stack rowGap={2}>
      <Box
        sx={{
          width: "100%",
          transition: "all 0.2s ease",
          display: { xs: "block", md: "none" },
          ...searchBarOverlay,
        }}
      >
        <SearchBar onTypeSearch={(text) => setSearchText(text)}></SearchBar>
      </Box>
      <Stack rowGap={2} sx={{ ...contentPadding }}>
        <ExploreMoniests></ExploreMoniests>
        <Divider></Divider>
        <ExplorePosts></ExplorePosts>
      </Stack>
    </Stack>
  );
};
export default Explore;
