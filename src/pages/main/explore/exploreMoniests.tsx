import { ArrowDownward } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import MoniestCard from "../../../components/shared/user/moniestCard";
import { useTranslate } from "../../../hooks/useTranslate";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import { TestUser } from "../../../services/tempDatas";
import Fly from "../../../components/shared/common/fly/fly";

export const ExploreMoniests = () => {
  const translate = useTranslate();
  const [moniests, setMoniests] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState({
    limit: 4,
    offset: 0,
  });

  const getMoniests = useCallback(() => {
    const dummyUser = { ...TestUser, id: "-1" };

    setMoniests((prev) => prev.concat(Array(paginate.limit).fill(dummyUser)));
    setLoading(true);
    api.content
      .moniests(paginate)
      .then((response) => {
        setMoniests((prev) => [
          ...prev.filter((user) => user.id !== "-1"),
          ...response,
        ]);
      })
      .catch()
      .finally(() => setLoading(false));
  }, [paginate]);

  useEffect(() => {
    getMoniests();
  }, [paginate, getMoniests]);

  const handleClickMore = () => {
    setPaginate({ ...paginate, offset: paginate.offset + paginate.limit });
  };

  return (
    <Box>
      <Typography variant="h3" mb={1.5}>
        • {translate("page.explore.explore_moniests")}
      </Typography>
      <Fly>
        <Grid container spacing={2}>
          {moniests?.map((moniest, i) => (
            <Grid key={i} item xs={12} md={6}>
              <Fly.Item>
                <MoniestCard loading={moniest.id === "-1"} user={moniest} />
              </Fly.Item>
            </Grid>
          ))}
        </Grid>
      </Fly>
      <Stack alignItems="center" mt={2}>
        <LoadingButton
          disabled={loading}
          sx={{
            width: "max-content",
            background: "transparent",
          }}
          color="inherit"
          endIcon={<ArrowDownward></ArrowDownward>}
          onClick={handleClickMore}
        >
          {translate("moniest.show_more")}
        </LoadingButton>
      </Stack>
    </Box>
  );
};
