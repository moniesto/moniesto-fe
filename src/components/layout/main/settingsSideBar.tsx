import {
  ChevronRightOutlined,
  CreditCardOutlined,
  EmailOutlined,
  KeyOutlined,
  LogoutOutlined,
  PersonOutline,
  RocketLaunchOutlined,
} from "@mui/icons-material";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setUser } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { emptyUser } from "../../../interfaces/user";
import { setToken } from "../../../store/slices/localStorageSlice";
import { useTranslate } from "../../../hooks/useTranslate";

export const SettingsSideBar = () => {
  const [selectedLink, setSelectedLink] = useState("/settings/account");
  const user = useAppSelector((state) => state.user.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const translate = useTranslate();

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const [links, setLinks] = useState<
    { path: string; icon: ReactNode; title: string }[]
  >([
    {
      path: "/settings/account",
      icon: <PersonOutline />,
      title: translate("navigation.account"),
    },
    {
      path: "/settings/card",
      icon: <CreditCardOutlined />,
      title: translate("navigation.card"),
    },
    {
      path: "/settings/password",
      icon: <KeyOutlined />,
      title: translate("navigation.password"),
    },
    {
      path: "/settings/verify-email",
      icon: <EmailOutlined />,
      title: translate("navigation.verify_email"),
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedLink(pathname);
    if (
      user.moniest &&
      !links.some((item) => item.path === "/settings/moniest")
    ) {
      const newLinks = links.slice();

      newLinks.splice(1, 0, {
        path: "/settings/moniest",
        icon: <RocketLaunchOutlined />,
        title: translate("navigation.moniest"),
      });
      setLinks(newLinks);
    }
  }, [links, pathname, translate, user]);

  const handleListItemClick = (link: string) => {
    setSelectedLink(link);
    navigate(link);
  };

  const handleLogout = () => {
    dispatch(setUser(emptyUser));
    dispatch(setToken(""));
  };

  return (
    <Card>
      {matches && (
        <Typography sx={{ opacity: 0.8 }} p={3} pb={0} variant="h2">
          {translate("navigation.settings")}
        </Typography>
      )}
      <Stack minHeight={"400px"} justifyContent="space-between" padding={2}>
        <Stack>
          <List component="nav">
            {links.map((link) => (
              <ListItem
                key={link.path}
                disablePadding
                secondaryAction={matches ? <ChevronRightOutlined /> : ""}
              >
                <ListItemButton
                  sx={{
                    margin: "3px 0",
                    opacity: !matches ? 0.6 : 1,
                    "&.Mui-selected": {
                      opacity: 1,
                      backgroundColor: "transparent",
                    },
                  }}
                  selected={selectedLink === link.path}
                  onClick={() => handleListItemClick(link.path)}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}

            {matches && (
              <ListItemButton
                sx={{
                  margin: "3px 0",
                }}
                onClick={() => handleLogout()}
              >
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            )}
          </List>
        </Stack>
      </Stack>
    </Card>
  );
};
