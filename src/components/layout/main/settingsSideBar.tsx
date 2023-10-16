import {
  CreditCardOutlined,
  EmailOutlined,
  ExpandLess,
  ExpandMore,
  KeyOutlined,
  LogoutOutlined,
  PersonOutline,
  PolicyOutlined,
  RocketLaunchOutlined,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setUser } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { emptyUser } from "../../../interfaces/user";
import { setToken } from "../../../store/slices/localStorageSlice";
import { useTranslate } from "../../../hooks/useTranslate";
import { useTheme } from "@mui/system";
import React from "react";

export const SettingsSideBar = () => {
  const [selectedLink, setSelectedLink] = useState("/settings/account");
  const user = useAppSelector((state) => state.user.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const translate = useTranslate();
  const theme = useTheme();

  const [openedLink, setOpenedLink] = useState("");

  const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const links = useMemo(() => {
    const items = [
      {
        path: "/settings/account",
        icon: <PersonOutline />,
        title: translate("navigation.account"),
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
      {
        path: "/settings/legals",
        icon: <PolicyOutlined />,
        title: translate("component.legals.legal_info"),
        child: [
          {
            path: "/settings/legals/disclaimer",
            title: translate("component.legals.disclaimer"),
          },
          {
            path: "/settings/legals/privacy-policy",
            title: translate("component.legals.privacy_policy"),
          },
          {
            path: "/settings/legals/terms-and-conditions",
            title: translate("component.legals.terms_and_conditions"),
          },
        ],
      },
    ];
    if (
      user.moniest &&
      !items.some((item) => item.path === "/settings/moniest")
    ) {
      items.splice(
        1,
        0,
        ...[
          {
            path: "/settings/moniest",
            icon: <RocketLaunchOutlined />,
            title: translate("navigation.moniest"),
          },
          {
            path: "/settings/payment",
            icon: <CreditCardOutlined />,
            title: translate("navigation.payment"),
          },
        ]
      );
    }
    return items;
  }, [translate, user.moniest]);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedLink(pathname);
  }, [links, pathname, translate, user]);

  const handleListItemClick = (
    link: string,
    hasChild: boolean,
    inChild: boolean = false
  ) => {
    if (hasChild) {
      setOpenedLink(link === openedLink ? "" : link);
    } else {
      if (!inChild) setOpenedLink("");

      navigate(link);
      setSelectedLink(link);
    }
  };

  const handleLogout = () => {
    dispatch(setUser(emptyUser));
    dispatch(setToken(""));
  };

  return (
    <Box
      height="100%"
      borderRight={`1px solid ${theme.palette.background[800]}`}
    >
      {matches && (
        <Typography sx={{ opacity: 0.8 }} p={3} pb={0} variant="h2">
          {translate("navigation.settings")}
        </Typography>
      )}
      <Stack
        height="100%"
        minHeight={"400px"}
        justifyContent="space-between"
        padding={2}
      >
        <Stack>
          <List component="nav" disablePadding>
            {links.map((link) => (
              <React.Fragment key={link.path}>
                <ListItemButton
                  sx={{
                    margin: "3px 0",
                    opacity: !matches && openedLink !== link.path ? 0.6 : 1,
                    "&.Mui-selected": {
                      opacity: 1,
                    },
                  }}
                  selected={selectedLink === link.path}
                  onClick={() => handleListItemClick(link.path, !!link.child)}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.title} />
                  {link.child ? (
                    openedLink === link.path ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>
                {link.child && (
                  <Collapse
                    in={openedLink === link.path}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {link?.child?.map((subLink) => (
                        <ListItemButton
                          key={subLink.path}
                          sx={{
                            margin: "3px 0",
                            ml: 4,
                            opacity: !matches ? 0.6 : 1,
                            "&.Mui-selected": {
                              opacity: 1,
                            },
                          }}
                          onClick={() =>
                            handleListItemClick(subLink.path, false, true)
                          }
                          selected={selectedLink === subLink.path}
                        >
                          <ListItemText primary={subLink.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
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
                <ListItemText primary={translate("navigation.logout")} />
              </ListItemButton>
            )}
          </List>
        </Stack>
      </Stack>
    </Box>
  );
};
