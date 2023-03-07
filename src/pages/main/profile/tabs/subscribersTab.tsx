import { List, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../interfaces/user";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import Navigator from "../../../../components/shared/common/navigatior";

const SubscribersTab = ({ account }: { account: User }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [queryParams, setQueryParams] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 10,
    offset: 0,
  });

  const handleFetchData = () => {
    setQueryParams({ ...queryParams, offset: queryParams.offset + 1 });
  };

  useEffect(() => {
    if (hasMore) getSubscribers();
  }, [queryParams]);

  const getSubscribers = () => {
    api.moniest.subscribers(account.username, queryParams).then((response) => {
      setUsers([...users, ...response]);
      if (response.length < queryParams.limit) {
        setHasMore(false);
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
    });
  };

  return (
    <Paper>
      <List>
        <InfiniteScroll
          hasMore={hasMore}
          fetchData={handleFetchData}
          dataLength={users.length}
        >
          {users.map((user, i) => (
            <Navigator path={"/" + user.username}>
              <SubsPersonCard key={i} user={user}></SubsPersonCard>
            </Navigator>
          ))}
        </InfiniteScroll>
      </List>
    </Paper>
  );
};
export default SubscribersTab;
