import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import { Card, IconButton, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "@mui/system";

import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import Navigator from "../../shared/common/navigatior";
import { Spinner } from "../../shared/common/spinner";
import SearchMoniestItem from "../../shared/user/searchMoniestItem";

const SearchBar = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>("");
  const [moniests, setMoniests] = useState<User[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickDelete = () => {
    setFocused(false);
    setText("");
  };

  useEffect(() => {
    if (!text) {
      setMoniests([]);
      return;
    }
    setLoading(true);
    const timeOutId = setTimeout(() => {
      api.content
        .moniest_search({ searchText: text, limit: 5, offset: 0 })
        .then((res) => {
          setMoniests(res);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [text]);

  const handleClose = () => {
    setText("");
    setMoniests([]);
    setFocused(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        sx={{
          minWidth: "278px",
          width: focused || text ? "350px" : "278px",
          transition: (theme.transitions as any).create("width"),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        fullWidth
        name="Search"
        value={text}
        placeholder="Search for Moniests ..."
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickDelete}>
                <ClearOutlined sx={{ opacity: text ? 1 : 0 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {text && (
        <Card
          sx={{
            background: theme.palette.background[600],
            padding: "10px 0",
            position: "absolute",
            width: "100%",
            top: "47px",
            borderTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            minHeight: "50px",
          }}
        >
          {moniests.length ? (
            <Stack columnGap={1}>
              {moniests.map((moniest) => (
                <Navigator
                  key={moniest.id}
                  handleOnClick={handleClose}
                  path={moniest.username}
                >
                  <SearchMoniestItem user={moniest}></SearchMoniestItem>
                </Navigator>
              ))}
            </Stack>
          ) : (
            <Box sx={{ wordBreak: "break-word" }} px={2}>
              {!loading && (
                <>
                  No user found with <b>{text}</b>
                </>
              )}
            </Box>
          )}
          {loading && <Spinner center={true}></Spinner>}
        </Card>
      )}
    </Box>
  );
};
export default SearchBar;
