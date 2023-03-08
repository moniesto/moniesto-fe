import { List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../interfaces/user";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import Navigator from "../../../../components/shared/common/navigatior";
import { Stack } from "@mui/system";

const SubscriptionsTab = ({
  account,
  isMyAccount,
}: {
  account: User;
  isMyAccount: boolean;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
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
    if (hasMore) getSubscriptions();
  }, [queryParams]);

  const getSubscriptions = () => {
    api.user.subscriptions(account.username, queryParams).then((response) => {
      setUsers([...users, ...response]);
      if (response.length < queryParams.limit) {
        setHasMore(false);
        queryParams.offset = 0;
        setQueryParams(JSON.parse(JSON.stringify(queryParams)));
      }
      setLoading(false);
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
            <Navigator key={user.id} path={"/" + user.username}>
              <SubsPersonCard user={user}></SubsPersonCard>
            </Navigator>
          ))}
          {!loading && !users.length && (
            <Stack p={2} alignItems="center">
              <Typography variant="h5">
                {isMyAccount ? (
                  "You don't have any subscriptions yet"
                ) : (
                  <>
                    <b>{account.username}</b> doesn't have any subscriptions yet
                  </>
                )}
              </Typography>
            </Stack>
          )}
        </InfiniteScroll>
      </List>
    </Paper>
  );
};
export default SubscriptionsTab;
