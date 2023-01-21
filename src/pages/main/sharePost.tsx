import { Divider, Paper, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export const SharePost = () => {
  return (
    <Paper sx={{ minHeight: "calc(100vh - 150px)", padding: "1.8rem 2rem" }}>
      <Stack pb={6}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h2" pb={1.4}>
            Share Post
          </Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h5" sx={{ opacity: "0.8" }}>
              Max Score
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              21.3
            </Typography>
            <StarIcon
            
              sx={{ marginLeft:"0 !important", paddingBottom:"2px", fontSize: "1.1rem", color: "#FED839 !important" }}
            />
          </Stack>
        </Stack>
        <Divider></Divider>
      </Stack>
    </Paper>
  );
};
