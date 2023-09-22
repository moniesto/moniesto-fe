import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useAppSelector } from "../../../store/hooks";
import { useTranslate } from "../../../hooks/useTranslate";
import { colorByNumberValue } from "../../../services/utils";

export const ProfileStatistics = () => {
  const theme = useTheme();
  const translate = useTranslate();
  const profileState = useAppSelector((state) => state.profile);
  const statistics = profileState?.account?.moniest?.post_statistics;

  return (
    <Stack
      mt={1}
      pt={0.5}
      direction="row"
      borderTop={`1px solid ${theme.palette.background[800]}`}
    >
      <Table
        sx={{
          ".MuiTableCell-root": {
            padding: 0.5,
            border: 0,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography textAlign="end" variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.7d")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography textAlign="end" variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.30d")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography textAlign="end" variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.total")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.win_rate")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.win_rate_7days || "--"}%
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.win_rate_30days || "--"}%
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.win_rate_total || "--"}%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.roi")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.roi_7days || "--"}%
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.roi_30days || "--"}%
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" textAlign="end">
                {statistics?.roi_total || "--"}%
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="h5" fontWeight={900}>
                {translate("page.profile.statistics.pnl")}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h5"
                textAlign="end"
                sx={{ color: colorByNumberValue(statistics?.pnl_7days) }}
              >
                {statistics?.pnl_7days || "--"}$
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h5"
                textAlign="end"
                sx={{ color: colorByNumberValue(statistics?.pnl_30days) }}
              >
                {statistics?.pnl_30days || "--"}$
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h5"
                textAlign="end"
                sx={{ color: colorByNumberValue(statistics?.pnl_total) }}
              >
                {statistics?.pnl_total || "--"}$
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
};
