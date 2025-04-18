import Tabs from "@mui/material/Tabs";
import { Box, Tab, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import AboutTab from "./tabs/aboutTab";
import PostsTab from "./tabs/postsTab";
import SubscribersTab from "./tabs/subscribersTab";
import SubscriptionsTab from "./tabs/subscriptionsTab";
import { useAppSelector } from "../../../store/hooks";

const ProfileTabs = () => {
  const theme = useTheme();
  const profileState = useAppSelector((state) => state.profile);
  const defaultTab = profileState.account?.moniest ? "posts" : "subscriptions";
  const [tabValue, setTabValue] = useState<string>(defaultTab);

  useEffect(() => {
    setTabValue(defaultTab);
  }, [defaultTab, profileState.account]);

  const translate = useTranslate();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getTabs = useMemo(() => {
    let tabs = [
      {
        title: translate("page.profile.tab.posts", {
          count: profileState.summary_stats?.post_count || 0,
        }),
        value: "posts",
        content: <PostsTab />,
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscribers", {
          count: profileState.summary_stats?.subscriber_count || 0,
        }),
        value: "subscribers",
        content: <SubscribersTab />,
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscriptions", {
          count: profileState.summary_stats?.subscription_count || 0,
        }),
        value: "subscriptions",
        content: <SubscriptionsTab />,
        only_moniest: false,
      },
      {
        title: translate("page.profile.tab.about"),
        value: "about",
        content: (
          <AboutTab
            aboutText={profileState.account!.moniest?.description as string}
          />
        ),
        only_moniest: true,
      },
    ];

    return tabs.filter((tab) =>
      profileState.account!.moniest ? true : !tab.only_moniest
    );
  }, [profileState, translate]);

  return (
    <Box
      sx={{
        transform: "translateY(-65px)",
        ".MuiTabPanel-root": {
          padding: 0,
          "&.selected": {
            animation: "fadeIn 0.3s ease",
          },
        },
      }}
    >
      <Tabs
        variant="scrollable"
        // scrollButtons
        allowScrollButtonsMobile
        sx={{
          background: theme.palette.secondary.light,
          marginX: { xs: "6px", md: 2 },
          borderRadius: "10px",
          paddingX: "6px",
          ".MuiTabs-flexContainer": {
            justifyContent: "space-between",
          },
          ".Mui-selected": {
            fontWeight: 600,
            color: theme.palette.text.secondary + " !important",
          },
          ".MuiTabs-indicator": {
            backgroundColor: theme.palette.secondary.main,
          },
          ".MuiTab-root": {
            whiteSpace: "nowrap",
            fontSize: "0.8rem",
            width: "unset !important",
          },
        }}
        onChange={handleChange}
        value={tabValue}
      >
        {getTabs.map((tab) => (
          <Tab
            key={"tab_" + tab.value}
            label={tab.title}
            value={tab.value}
          ></Tab>
        ))}
      </Tabs>
      <Box mt={4}>
        {getTabs.find((item) => item.value === tabValue)?.content}
      </Box>
    </Box>
  );
};
export default ProfileTabs;
