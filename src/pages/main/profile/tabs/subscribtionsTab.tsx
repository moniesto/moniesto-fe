import { List, Paper } from "@mui/material";
import { useState } from "react";
import { User } from "../../../../interfaces/user";
import { TestUser } from "../../../../services/tempDatas";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";

const SubscribtionsTab = () => {
  const [users, setUsers] = useState<User[]>([TestUser, TestUser, TestUser,TestUser,TestUser]);

  return (
    <Paper>
      <List>
        {users.map((user, i) => (
          <SubsPersonCard key={i} user={user}></SubsPersonCard>
        ))}
      </List>
    </Paper>
  );
};
export default SubscribtionsTab;
