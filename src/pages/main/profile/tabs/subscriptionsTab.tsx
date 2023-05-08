import { List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../interfaces/user";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import Navigator from "../../../../components/shared/common/navigatior";
import { Stack } from "@mui/system";
import { useTranslate } from "../../../../hooks/useTranslate";
import { TestUser } from "../../../../services/tempDatas";

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
  const translate = useTranslate();
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

  const dummyUser = { ...TestUser, id: "-1" };

  const getSubscriptions = () => {
    setUsers(users.concat(Array(queryParams.limit).fill(dummyUser)));
    api.user.subscriptions(account.username, queryParams).then((response) => {
      setUsers([...users.filter((user) => user.id !== "-1"), ...response]);
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
            <Navigator key={i + user.id} path={"/" + user.username}>
              <SubsPersonCard
                loading={user.id === "-1"}
                user={user}
              ></SubsPersonCard>
            </Navigator>
          ))}
          {!loading && !users.length && (
            <Stack p={2} alignItems="center">
              <Typography variant="h5">
                {isMyAccount
                  ? translate("page.profile.no_subscription")
                  : translate("page.profile.no_subscription_account", {
                      username: account.username,
                    })}
              </Typography>
            </Stack>
          )}
        </InfiniteScroll>
      </List>
    </Paper>
  );
};
export default SubscriptionsTab;
