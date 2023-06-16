import { ArrowDownward } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import MoniestCard from "../../../components/shared/user/moniestCard";
import { useTranslate } from "../../../hooks/useTranslate";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";
import { TestUser } from "../../../services/tempDatas";

export const ExploreMoniests = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const [moniests, setMoniests] = useState<User[]>([]);
  const [paginate, setPaginate] = useState({
    limit: 4,
    offset: 0,
  });

  const getMoniests = useCallback(() => {
    const dummyUser = { ...TestUser, id: "-1" };

    setMoniests((prev) => prev.concat(Array(paginate.limit).fill(dummyUser)));
    api.content.moniests(paginate).then((response) => {
      setMoniests((prev) => [
        ...prev.filter((user) => user.id !== "-1"),
        ...response,
      ]);
    });
  }, [paginate]);

  useEffect(() => {
    getMoniests();
  }, [paginate, getMoniests]);

  const handleClickMore = () => {
    setPaginate({ ...paginate, offset: paginate.offset + paginate.limit });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {moniests.map((moniest, i) => (
          <Grid key={i} item xs={12} md={6}>
            <MoniestCard loading={moniest.id === "-1"} user={moniest} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="center" mt={2}>
        <LoadingButton
          sx={{
            width: "max-content",
            background: theme.palette.background[800],
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
