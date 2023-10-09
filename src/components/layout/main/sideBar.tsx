import {
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { Stack } from "@mui/system";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import Navigator from "../../shared/common/navigatior";
import { useAppSelector } from "../../../store/hooks";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useTranslate } from "../../../hooks/useTranslate";
import { useTheme } from "@mui/system";

const SideBar = () => {
  const [selectedLink, setSelectedLink] = useState("timeline");
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);
  const { pathname } = useLocation();
  const translate = useTranslate();

  const links = useMemo(
    () => [
      {
        path: "/timeline",
        icon: <HomeOutlinedIcon />,
        title: translate("navigation.timeline"),
      },
      {
        path: "/explore",
        icon: <ExploreOutlinedIcon />,
        title: translate("navigation.explore"),
      },
    ],
    [translate]
  );

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedLink(pathname);
  }, [pathname]);

  const handleListItemClick = (link: string) => {
    setSelectedLink(link);
    navigate(link);
  };

  return (
    <Stack
      height="100%"
      borderRight={`1px solid ${theme.palette.background[800]}`}
      minHeight={"400px"}
      justifyContent="space-between"
      padding={2}
    >
      <Stack>
        <List component="nav">
          {links.map((link) => (
            <ListItemButton
              key={link.path}
              sx={{
                marginY: 0.5,
                opacity: 0.6,
                "&.Mui-selected": {
                  opacity: 1,
                },
                "&:hover": {
                  opacity: 1,
                },
              }}
              selected={selectedLink === link.path}
              onClick={() => handleListItemClick(link.path)}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItemButton>
          ))}
        </List>
      </Stack>
      <Stack>
        <Navigator path={user.moniest ? "share" : "bemoniest"}>
          <Button
            size="large"
            startIcon={
              user.moniest ? <AddOutlinedIcon /> : <RocketLaunchIcon />
            }
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
          >
            {translate(`navigation.${user.moniest ? "share" : "bemoniest"}`)}
          </Button>
        </Navigator>

        <Stack
          padding={"20px 0"}
          flexDirection="row"
          alignItems="center"
          sx={{ opacity: 0.7 }}
        >
          <CopyrightOutlinedIcon
            sx={{
              opacity: 0.7,
              fontSize: "1.2rem",
              paddingBottom: "2px",
            }}
          />
          {new Date().getFullYear() + " Moniesto"}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SideBar;
