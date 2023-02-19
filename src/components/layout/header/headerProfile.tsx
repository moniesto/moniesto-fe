import { Logout } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { emptyUser } from "../../../interfaces/user";
import { useAppDispatch } from "../../../store/hooks";
import { setToken } from "../../../store/slices/localStorageSlice";
import { setUser } from "../../../store/slices/userSlice";
import ThemeModeButton from "./themeModeButton";

const HeaderProfile = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const menuItems = [
    {
      icon: <PersonOutlineOutlinedIcon />,
      title: "Profile",
      path: "/asd",
    },
    {
      icon: <SettingsOutlinedIcon />,
      title: "Settings",
      path: "/settings/account",
    },
  ];
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(setUser(emptyUser));
    dispatch(setToken(""));
  };

  return (
    <>
      <Stack flexDirection="row" alignItems="center">
        <ThemeModeButton />
        {/* <Stack alignItems="end" sx={{ display: { xs: "none", md: "block" } }}>
          <Typography variant="h4">Davut Turug</Typography>
          <Typography fontSize="0.76rem" lineHeight="17px" variant="h6">
            davuttrg
          </Typography>
        </Stack> */}

        <IconButton
          disableRipple
          onClick={handleClick}
          size="small"
          // sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src="/images/user/Avatar.png"
            sx={{ width: 50, height: 50 }}
          ></Avatar>
        </IconButton>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            fontSize: "1.06em",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 45,
              height: 45,
              ml: -0.5,
              mr: 1,
            },

            " .MuiSvgIcon-root": {
              fontSize: "1.45rem",
              width: "0.95em",
              height: "0.95em",
            },
            " .MuiMenuItem-root": {
              padding: "10px 16px",
              fontSize: "1rem",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              borderTop: "1px solid",
              borderLeft: "1px solid",
            },
          },
        }}
      >
        <MenuItem
          onClick={($event) => $event.stopPropagation()}
          sx={{
            "&:hover": {
              background: "unset",
              cursor: "unset",
            },
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <Avatar src="/images/user/Avatar.png"></Avatar>
            <Stack>
              <Typography variant="h4">Davut Turug</Typography>
              <Typography fontSize="0.76rem" lineHeight="17px" variant="h6">
                davutturug@gmail.com
              </Typography>
            </Stack>
          </Stack>
        </MenuItem>
        <Divider />
        {menuItems.map((item) => (
          <MenuItem key={item.path} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.title}
          </MenuItem>
        ))}
        <Divider></Divider>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logut
        </MenuItem>
      </Menu>
    </>
  );
};
export default HeaderProfile;
