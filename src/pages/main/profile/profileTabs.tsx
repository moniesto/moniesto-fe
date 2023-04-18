import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, useTheme } from "@mui/material";
import { ReactNode, memo, useEffect, useMemo, useState } from "react";
import { useTranslate } from "../../../hooks/useTranslate";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import AboutTab from "./tabs/aboutTab";
import PostsTab from "./tabs/postsTab";
import SubscribersTab from "./tabs/subscribersTab";
import SubscriptionsTab from "./tabs/subscriptionsTab";

type TypeTab = {
  title: string;
  value: string;
  content: ReactNode;
  only_moniest: boolean;
};

const ProfileTabs = ({
  account,
  isSubscribed,
  isMyAccount,
  handleClickSubscribe,
}: {
  account: User;
  isSubscribed: boolean;
  isMyAccount: boolean;
  handleClickSubscribe: () => void;
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState<string>("");
  const [counts, setCounts] = useState({
    posts: 0,
    subscriptions: 0,
    subscribers: 0,
  });
  const [tabs, setTabs] = useState<TypeTab[]>([]);
  const translate = useTranslate();

  useEffect(() => {
    console.log("Profile Tabs");
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!account) return;
    if (!account.moniest) setTabValue("subscriptions");
    else setTabValue("posts");

    api.user.summary_stats(account.username).then((response) => {
      setCounts({
        posts: response.post_count || 0,
        subscriptions: response.subscription_count,
        subscribers: response.subscriber_count || 0,
      });
    });
  }, [account, isSubscribed]);

  useEffect(() => {
    setTabs([
      {
        title: translate("page.profile.tab.posts", { count: counts.posts }),
        value: "posts",
        content: (
          <PostsTab
            handleClickSubscribe={handleClickSubscribe}
            isMyAccount={isMyAccount}
            account={account}
            isSubscribed={isSubscribed}
          />
        ),
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscribers", {
          count: counts.subscribers,
        }),
        value: "subscribers",
        content: <SubscribersTab isMyAccount={isMyAccount} account={account} />,
        only_moniest: true,
      },
      {
        title: translate("page.profile.tab.subscriptions", {
          count: counts.subscriptions,
        }),
        value: "subscriptions",
        content: (
          <SubscriptionsTab isMyAccount={isMyAccount} account={account} />
        ),
        only_moniest: false,
      },
      {
        title: translate("page.profile.tab.about"),
        value: "about",
        content: (
          <AboutTab aboutText={account.moniest?.description as string} />
        ),
        only_moniest: true,
      },
    ]);
  }, [counts, tabValue, isSubscribed]);

  const renderTabs = useMemo(
    () => (
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
            {tabs
              .filter((tab) => (account.moniest ? true : !tab.only_moniest))
              .map((tab) => (
                <Tab
                  key={"tab_" + tab.value}
                  label={tab.title}
                  value={tab.value}
                />
              ))}
          </TabList>
        </Box>

        {tabs
          .filter((tab) => (account.moniest ? true : !tab.only_moniest))
          .map((tab) => (
            <TabPanel
              key={"panel_" + tab.value}
              className={tabValue === tab.value ? "selected" : ""}
              value={tab.value}
            >
              {tab.content}
            </TabPanel>
          ))}
      </TabContext>
    ),
    [tabs]
  );

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
      {renderTabs}
    </Box>
  );
};
export default memo(ProfileTabs);
