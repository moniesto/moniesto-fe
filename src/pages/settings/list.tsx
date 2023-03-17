import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import {
  CreditCardOutlined,
  EmailOutlined,
  KeyOutlined,
  PersonOutline,
  RocketLaunchOutlined,
  ChevronRightOutlined,
} from "@mui/icons-material";
import { SettingsSideBar } from "../../components/layout/main/settingsSideBar";

export const SettingsList = () => {
  return (
    <SettingsSideBar></SettingsSideBar>
    // <Card>
    //   <CardHeader title="Settings"></CardHeader>
    //   <List sx={{ width: "100%" }}>
    //     <ListItem
    //       secondaryAction={<ChevronRightOutlined />}
    //       alignItems="flex-start"
    //     >
    //       <ListItemAvatar>
    //         <PersonOutline />
    //       </ListItemAvatar>
    //       <ListItemText primary="Account" />
    //     </ListItem>
    //     <Divider variant="inset" component="li" />
    //   </List>
    // </Card>
  );
};
