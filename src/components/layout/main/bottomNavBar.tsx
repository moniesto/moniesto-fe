import {
  ControlPointOutlined,
  ExploreOutlined,
  HomeOutlined,
  RocketLaunchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

export const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const user = useAppSelector((state) => state.user.user);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangePath = (value: number) => {
    let path = "/";
    switch (value) {
      case 0:
        path = "/timeline";
        break;
      case 1:
        path = "/explore";
        break;
      case 2:
        path = user.moniest ? "/share" : "/bemoniest";
        break;
      case 3:
        path = "/settings";
        break;
      case 4:
        path = "/" + user.username;
        break;
    }
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: -1,
        left: 0,
        right: 0,
        background: theme.palette.background[200],
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChangePath(newValue);
        }}
      >
        <BottomNavigationAction icon={<HomeOutlined />} />
        <BottomNavigationAction icon={<ExploreOutlined />} />
        <BottomNavigationAction
          icon={
            user.moniest ? <ControlPointOutlined /> : <RocketLaunchOutlined />
          }
        />
        <BottomNavigationAction icon={<SettingsOutlined />} />
        <BottomNavigationAction
          icon={
            <Avatar
              src={user.profile_photo_thumbnail_link}
              sx={{ width: 34, height: 34 }}
            ></Avatar>
          }
        />
      </BottomNavigation>
    </Box>
  );
};
