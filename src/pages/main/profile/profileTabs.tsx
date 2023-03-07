import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import { User } from "../../../interfaces/user";
import AboutTab from "./tabs/aboutTab";
import PostsTab from "./tabs/postsTab";
import SubscribersTab from "./tabs/subscribersTab";
import SubscribtionsTab from "./tabs/subscribtionsTab";

type Tab = { title: string; value: string; content: ReactNode };

const ProfileTabs = ({ account }: { account: User }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState("posts");
  const [tabs, setTabs] = useState<Tab[]>([
    {
      title: "Posts (0)",
      value: "posts",
      content: <PostsTab account={account} />,
    },
    {
      title: "Subscribers (0)",
      value: "subscribers",
      content: <SubscribersTab />,
    },
    {
      title: "Subscribtions (0)",
      value: "subscribtions",
      content: <SubscribtionsTab />,
    },
    {
      title: "About",
      value: "about",
      content: <AboutTab aboutText={account.moniest?.description as string} />,
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
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
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.title} value={tab.value} />
            ))}
          </TabList>
        </Box>

        {tabs.map((tab) => (
          <TabPanel
            key={tab.value}
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
