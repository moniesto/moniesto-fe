import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import HeaderProfile from "./headerProfile";
import Logo from "./logo";
import SearchBar from "./seachBar";
import ThemeModeButton from "./themeModeButton";

const Header = () => {
  return (
    <Container maxWidth="lg">
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          "> * ": {
            // flex: 1,
            "&:last-of-type": {
              justifyContent: "flex-end",
            },
          },
        }}
      >
        <Logo />
        <Stack direction="row" alignItems="center">
          <Box
            sx={{ display: { xs: "none", md: "block", marginRight: "10px" } }}
          >
            <SearchBar></SearchBar>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <ThemeModeButton />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <HeaderProfile></HeaderProfile>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Header;
