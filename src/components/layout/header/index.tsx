import { Box, Container } from "@mui/material";
import { Stack } from "@mui/system";
import HeaderProfile from "./headerProfile";
import Logo from "./logo";
import SearchBar from "./seachBar";

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
          <HeaderProfile></HeaderProfile>
        </Stack>
      </Stack>
    </Container>
  );
};
export default Header;
