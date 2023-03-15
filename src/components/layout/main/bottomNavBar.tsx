import {
  ControlPointOutlined,
  ExploreOutlined,
  HomeOutlined,
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

export const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();

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
        }}
      >
        <BottomNavigationAction label="Timeline" icon={<HomeOutlined />} />
        <BottomNavigationAction label="Explore" icon={<ExploreOutlined />} />
        <BottomNavigationAction label="Share" icon={<ControlPointOutlined />} />
        <BottomNavigationAction label="Settings" icon={<SettingsOutlined />} />
        <BottomNavigationAction
          label="Profile"
          icon={
            <Avatar
              src="https://res.cloudinary.com/dniupzza6/image/upload/v1678648873/Photo/ProfilePhotosThumbnail/8cae1897-f8b1-4470-a617-8087d2748bd5_thumbnail.jpg"
              sx={{ width: 32, height: 32 }}
            ></Avatar>
          }
        />
      </BottomNavigation>
    </Box>
  );
};
