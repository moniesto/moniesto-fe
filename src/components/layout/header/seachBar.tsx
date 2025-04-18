import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import { Card, IconButton, InputAdornment, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import Navigator from "../../shared/common/navigatior";
import { Spinner } from "../../shared/common/spinner";
import SearchMoniestItem from "../../shared/user/searchMoniestItem";
import { WrappedTextField } from "../../shared/common/wrappers/wrappedTextField";

const SearchBar = ({
  onTypeSearch,
}: {
  onTypeSearch?: (searchText: string) => void;
}) => {
  const theme = useTheme();
  const [text, setText] = useState<string>("");
  const [moniests, setMoniests] = useState<User[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const translate = useTranslate();

  const handleClickDelete = () => {
    setFocused(false);
    setText("");
  };

  useEffect(() => {
    if (onTypeSearch) onTypeSearch(text);
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
  }, [onTypeSearch, text]);

  const handleClose = () => {
    setText("");
    setMoniests([]);
    setFocused(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <WrappedTextField
        size="small"
        sx={{
          minWidth: "280px",
          width: { md: focused || text ? "350px" : "280px", sm: "100%" },
          transition: (theme.transitions as any).create("width"),
          ".MuiInputBase-root": {
            background:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.background[600],
          },
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        fullWidth
        name="search"
        value={text}
        placeholder={translate("form.field.search_moniest")}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ padding: "4px" }} onClick={handleClickDelete}>
                <ClearOutlined
                  sx={{
                    opacity: text ? 1 : 0,
                    width: "0.8em",
                    height: "0.8em",
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {text && (
        <Card
          sx={{
            background:
              theme.palette.mode === "light"
                ? "white"
                : theme.palette.background[600],
            padding: "10px 0",
            position: "absolute",
            width: "100%",
            top: "36px",
            borderTop: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            minHeight: "50px",
            zIndex: 2,
          }}
        >
          {loading ? (
            <Spinner center={true}></Spinner>
          ) : moniests.length ? (
            <Stack columnGap={1}>
              {moniests.map((moniest) => (
                <Navigator
                  key={moniest.id}
                  handleOnClick={handleClose}
                  path={"/" + moniest.username}
                >
                  <SearchMoniestItem user={moniest}></SearchMoniestItem>
                </Navigator>
              ))}
            </Stack>
          ) : (
            <Box sx={{ wordBreak: "break-word" }} px={2}>
              <Typography variant="h5" sx={{ opacity: 0.7 }}>
                {translate("component.search.no_user_found", { text: text })}
              </Typography>
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
};
export default SearchBar;
