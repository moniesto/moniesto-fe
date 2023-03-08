import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, useTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { User } from "../../../interfaces/user";
import AboutTab from "./tabs/aboutTab";
import PostsTab from "./tabs/postsTab";
import SubscribersTab from "./tabs/subscribersTab";
import SubscriptionsTab from "./tabs/subscriptionsTab";

type Tab = {
  title: string;
  value: string;
  content: ReactNode;
  only_moniest: boolean;
};

const ProfileTabs = ({
  account,
  isSubscribed,
  isMyAccount,
}: {
  account: User;
  isSubscribed: boolean;
  isMyAccount: boolean;
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState("posts");
  const [counts, setCounts] = useState({
    posts: 0,
    subscribtions: 0,
    subscribers: 0,
  });
  const [tabs] = useState<Tab[]>([
    {
      title: `Posts (${counts.posts})`,
      value: "posts",
      content: (
        <PostsTab
          isMyAccount={isMyAccount}
          account={account}
          isSubscribed={isSubscribed}
        />
      ),
      only_moniest: true,
    },
    {
      title: `Subscribers (${counts.subscribers})`,
      value: "subscribers",
      content: <SubscribersTab isMyAccount={isMyAccount} account={account} />,
      only_moniest: true,
    },
    {
      title: `Subscriptions (${counts.subscribers})`,
      value: "subscriptions",
      content: <SubscriptionsTab isMyAccount={isMyAccount} account={account} />,
      only_moniest: false,
    },
    {
      title: "About",
      value: "about",
      content: <AboutTab aboutText={account.moniest?.description as string} />,
      only_moniest: true,
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (!account) return;
    if (!account.moniest) setTabValue("subscriptions");
  }, [account]);

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
              className={tabValue == tab.value ? "selected" : ""}
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
