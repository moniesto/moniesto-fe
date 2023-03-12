import { ArrowDownward } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/system";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import MoniestCard from "../../../components/shared/user/moniestCard";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";

export const ExploreMoniests = () => {
  const theme = useTheme();
  const [moniests, setMoniests] = useState<User[]>([]);
  const [paginate, setPaginate] = useState({
    limit: 4,
    offset: 0,
  });
  useEffect(() => {
    getMoniests();
  }, [paginate]);

  const getMoniests = () => {
    api.content
      .moniests(paginate)
      .then((response) => setMoniests([...moniests, ...response]));
  };
  const handleClickMore = () => {
    setPaginate({ ...paginate, offset: paginate.offset + paginate.limit });
  };

  return (
    <Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {moniests.map((moniest, i) => (
          <Grid key={i} item xs={6}>
            <MoniestCard user={moniest} />
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
          Show More
        </LoadingButton>
      </Stack>
    </Box>
  );
};
