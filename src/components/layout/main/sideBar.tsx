import {
  Button,
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Stack } from "@mui/system";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import Navigator from "../../shared/common/navigatior";
import { useAppSelector } from "../../../store/hooks";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const [selectedLink, setSelectedLink] = useState("timeline");
  const theme = useTheme();
  const user = useAppSelector((state) => state.user.user);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const links = [
    {
      path: "/timeline",
      icon: <HomeOutlinedIcon />,
      title: t("navigation.timeline"),
    },
    {
      path: "/explore",
      icon: <ExploreOutlinedIcon />,
      title: t("navigation.explore"),
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedLink(pathname);
  }, []);

  const handleListItemClick = (link: string) => {
    setSelectedLink(link);
    navigate(link);
  };

  return (
    <Card>
      <Stack minHeight={"400px"} justifyContent="space-between" padding={2}>
        <Stack>
          <List component="nav">
            {links.map((link) => (
              <ListItemButton
                key={link.path}
                sx={{
                  margin: "3px 0",
                  opacity: 0.6,
                  "&.Mui-selected": {
                    opacity: 1,
                    backgroundColor: "transparent",
                  },
                }}
                selected={selectedLink == link.path}
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
              {user.moniest ? "Share post" : "Be moniest"}
            </Button>
          </Navigator>

          <Stack
            padding={"20px 0"}
            flexDirection="row"
            alignItems="center"
            sx={{ color: theme.palette.grey[500] }}
          >
            <CopyrightOutlinedIcon
              sx={{
                color: theme.palette.grey[500],
                fontSize: "1.2rem",
                paddingBottom: "2px",
              }}
            />
            {new Date().getFullYear() + " Moniesto"}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
export default SideBar;
