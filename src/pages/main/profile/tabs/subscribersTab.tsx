import { Divider, List, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { User } from "../../../../interfaces/user";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import Navigator from "../../../../components/shared/common/navigatior";
import { useTranslate } from "../../../../hooks/useTranslate";
import { TestUser } from "../../../../services/tempDatas";
import { useAppSelector } from "../../../../store/hooks";

const SubscribersTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);

  const [queryParams, setQueryParams] = useState<{
    hasMore?: boolean;
    limit: number;
    offset: number;
  }>({
    hasMore: true,
    limit: 10,
    offset: 0,
  });

  const handleFetchData = () => {
    setQueryParams({
      ...queryParams,
      offset: queryParams.offset + queryParams.limit,
    });
  };

  const getSubscribers = useCallback(() => {
    const dummyUser = { ...TestUser, id: "-1" };
    setUsers((prev) => prev.concat(Array(queryParams.limit).fill(dummyUser)));

    delete queryParams.hasMore;
    api.moniest
      .subscribers(profileState.account!.username, queryParams)
      .then((response) => {
        setUsers((prev) => [
          ...prev.filter((user) => user.id !== "-1"),
          ...response,
        ]);
        if (response.length < queryParams.limit) {
          queryParams.hasMore = false;
          queryParams.offset = 0;
          setQueryParams(JSON.parse(JSON.stringify(queryParams)));
        } else {
          queryParams.hasMore = true;
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [profileState.account, queryParams]);

  useEffect(() => {
    queryParams.hasMore && getSubscribers();
  }, [queryParams, getSubscribers]);

  return (
    <Paper>
      <List>
        <InfiniteScroll
          hasMore={queryParams.hasMore!}
          fetchData={handleFetchData}
          dataLength={users.length}
        >
          {users.map((user, i) => (
            <Navigator key={i + user.id} path={"/" + user.username}>
              <SubsPersonCard
                loading={user.id === "-1"}
                user={user}
              ></SubsPersonCard>
              {i + 1 !== users.length && <Divider sx={{ m: 1 }} />}
            </Navigator>
          ))}
          {!loading
            ? !users.length && (
                <Stack p={2} alignItems="center">
                  <Typography variant="h5">
                    {profileState.isMyAccount
                      ? translate("page.profile.no_subscriber")
                      : translate("page.profile.no_subscriber_account", {
                          username: profileState.account!.username,
                        })}
                  </Typography>
                </Stack>
              )
            : null}
        </InfiniteScroll>
      </List>
    </Paper>
  );
};
export default SubscribersTab;
