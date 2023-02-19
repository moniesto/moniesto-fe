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
            flex: 1,
            "&:last-of-type":{
              justifyContent:"flex-end"
            }
          },
        }}
      >
        <Logo />
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SearchBar></SearchBar>
        </Box>
        <HeaderProfile></HeaderProfile>
      </Stack>
    </Container>
  );
};
export default Header;
