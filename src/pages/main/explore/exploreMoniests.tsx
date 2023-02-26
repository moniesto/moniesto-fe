import { ArrowDownward } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import MoniestCard from "../../../components/shared/user/moniestCard";
import { User } from "../../../interfaces/user";
import api from "../../../services/api";

export const ExploreMoniests = () => {
  const [moniests, setMoniests] = useState<User[]>([]);
  const [paginage, setPaginage] = useState({
    limit: 4,
    offset: 0,
  });
  useEffect(() => {
    getMoniests();
  }, [paginage]);

  const getMoniests = () => {
    api.content.moniests(paginage).then((response) => setMoniests(response));
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
          sx={{ width: "max-content" }}
          color="inherit"
          endIcon={<ArrowDownward></ArrowDownward>}
        >
          Show More
        </LoadingButton>
      </Stack>
    </Box>
  );
};
