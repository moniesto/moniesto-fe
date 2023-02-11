import {
  CreditCardOutlined,
  EmailOutlined,
  KeyOutlined,
  PersonOutline,
  RocketLaunchOutlined,
} from "@mui/icons-material";
import {
  Card,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SettingsSideBar = () => {
  const [selectedLink, setSelectedLink] = useState("timeline");
  const { pathname } = useLocation();
  const links = [
    {
      path: "settings/account",
      icon: <PersonOutline />,
      title: "Account",
    },
    {
      path: "settings/moniest",
      icon: <RocketLaunchOutlined />,
      title: "Moniest",
    },
    {
      path: "settings/card",
      icon: <CreditCardOutlined />,
      title: "Card",
    },
    {
      path: "settings/password",
      icon: <KeyOutlined />,
      title: "Password",
    },
    {
      path: "settings/verify-email",
      icon: <EmailOutlined />,
      title: "Verify Email",
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
      </Stack>
    </Card>
  );
};
