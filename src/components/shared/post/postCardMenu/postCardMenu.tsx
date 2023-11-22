import { MoreVertOutlined, ShareOutlined } from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MenuProps } from "../../common/menuProps";
import { useState } from "react";
import { Post } from "../../../../interfaces/post";
import { PostMenushareItem } from "./postMenuShareItem";
import { useTranslate } from "../../../../hooks/useTranslate";

export const PostCardMenu = ({ post }: { post: Post }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<"share">();
  const translate = useTranslate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let component;

  switch (selectedItem) {
    case "share":
      component = (
        <PostMenushareItem
          post={post}
          onClose={() => setSelectedItem(undefined)}
        />
      );
      break;
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertOutlined
          sx={{
            width: "0.85em",
            height: "0.85em",
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{ ...MenuProps }}
      >
        <MenuItem onClick={() => setSelectedItem("share")}>
          <ListItemIcon>
            <ShareOutlined />
          </ListItemIcon>
          {translate("component.post_card.menu.share.title")}
        </MenuItem>
      </Menu>
      {component}
    </>
  );
};
