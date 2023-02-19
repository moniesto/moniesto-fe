import {
  ClearOutlined,
  DeleteOutline,
  SearchOutlined,
} from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { useState } from "react";

const SearchBar = () => {
  const theme = useTheme();
  const [text, setText] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleClickDelete = () => {
    setFocused(false);
    setText("");
  };

  return (
    <TextField
      sx={{
        minWidth: "278px",
        width: focused || text ? "350px" : "278px",
        transition: theme.transitions.create("width"),
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
  );
};
export default SearchBar;
