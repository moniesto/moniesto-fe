import { Box, List, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../../../interfaces/user";
import SubsPersonCard from "../../../../components/shared/user/subsPersonCard";
import { InfiniteScroll } from "../../../../components/shared/common/infiniteScroll";
import api from "../../../../services/api";
import Navigator from "../../../../components/shared/common/navigatior";
import { useTranslate } from "../../../../hooks/useTranslate";
import { TestUser } from "../../../../services/tempDatas";
import { useAppSelector } from "../../../../store/hooks";
import { Spinner } from "../../../../components/shared/common/spinner";

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
    setQueryParams({ ...queryParams, offset: queryParams.offset + 1 });
  };

  useEffect(() => {
    if (queryParams.hasMore) getSubscribers();
  }, [queryParams]);

  const dummyUser = { ...TestUser, id: "-1" };

  const getSubscribers = () => {
    setUsers(users.concat(Array(queryParams.limit).fill(dummyUser)));

    delete queryParams.hasMore;
    api.moniest
      .subscribers(profileState.account!.username, queryParams)
      .then((response) => {
        setUsers([...users.filter((user) => user.id !== "-1"), ...response]);
        if (response.length < queryParams.limit) {
          queryParams.offset = 0;
          setQueryParams(JSON.parse(JSON.stringify(queryParams)));
        }
        setLoading(false);
      });
  };

  return loading ? (
    <Box sx={{ position: "relative", minHeight: 100, width: "100%" }}>
      <Spinner center={true} />
    </Box>
  ) : (
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
            </Navigator>
          ))}
          {!loading && !users.length && (
            <Stack p={2} alignItems="center">
              <Typography variant="h5">
                {profileState.isMyAccount
                  ? translate("page.profile.no_subscriber")
                  : translate("page.profile.no_subscriber_account", {
                      username: profileState.account!.username,
                    })}
              </Typography>
            </Stack>
          )}
        </InfiniteScroll>
      </List>
    </Paper>
  );
};
export default SubscribersTab;
