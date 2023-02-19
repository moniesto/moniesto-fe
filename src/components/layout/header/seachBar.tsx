import {
  ClearOutlined,
  DeleteOutline,
  SearchOutlined,
} from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState<string>("");
  return (
    <TextField
      fullWidth
      name="Search"
      placeholder="Search for Moniests ..."
      onChange={(e) => setText(e.target.value)}
      InputProps={{
        color: "secondary",
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <ClearOutlined sx={{ opacity: text ? 1 : 0 }} />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;
