import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import api from "../../../services/api";
import AboutTab from "./tabs/aboutTab";
import PostsTab from "./tabs/postsTab";
import SubscribersTab from "./tabs/subscribersTab";
import SubscriptionsTab from "./tabs/subscriptionsTab";
import { useAppSelector } from "../../../store/hooks";

const ProfileTabs = ({
  handleClickSubscribe,
}: {
  handleClickSubscribe: () => void;
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState<string>("");
  const [counts, setCounts] = useState({
    posts: 0,
    subscriptions: 0,
    subscribers: 0,
  });

  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getTabs = useMemo(() => {
    let tabs = [
      {
        title: translate("page.profile.tab.posts", { count: counts.posts }),
        value: "posts",
        content: <PostsTab handleClickSubscribe={handleClickSubscribe} />,
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscribers", {
          count: counts.subscribers,
        }),
        value: "subscribers",
        content: <SubscribersTab />,
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscriptions", {
          count: counts.subscriptions,
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
  }, [counts, handleClickSubscribe, profileState.account, translate]);

  useEffect(() => {
    if (!profileState.account) return;
    if (!profileState.account.moniest) setTabValue("subscriptions");
    else setTabValue("posts");

    api.user.summary_stats(profileState.account.username).then((response) => {
      setCounts({
        posts: response.post_count || 0,
        subscriptions: response.subscription_count,
        subscribers: response.subscriber_count || 0,
      });
    });
  }, [profileState.account, profileState.isSubscribed]);

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
      <TabContext value={tabValue}>
        <Box
          mb={4}
          sx={{
            overflowX: "auto",
          }}
        >
          <TabList
            sx={{
              minWidth: "600px",
              padding: "0 30px",
              ".Mui-selected": {
                fontWeight: 600,
                color: theme.palette.text.secondary + " !important",
              },
              ".MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main,
              },
              ".MuiTab-root": {
                flex: 1,
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
              },
            }}
            onChange={handleChange}
          >
            {getTabs.map((tab) => (
              <Tab
                key={"tab_" + tab.value}
                label={tab.title}
                value={tab.value}
              />
            ))}
          </TabList>
        </Box>

        {getTabs.map((tab) => (
          <TabPanel
            key={"panel_" + tab.value}
            className={tabValue === tab.value ? "selected" : ""}
            value={tab.value}
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
export default ProfileTabs;
