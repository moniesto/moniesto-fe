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

  const tableHeaderCell = (text: string) => (
    <TableCell>
      <Typography textAlign="end" variant="h5" fontWeight={900}>
        {text}
      </Typography>
    </TableCell>
  );

  const tableRowHeaderCell = (text: string) => (
    <TableCell>
      <Typography variant="h5" fontWeight={900}>
        {text}
      </Typography>
    </TableCell>
  );
  const tableRowCell = (
    value: number | undefined,
    symbol: string,
    hasColor: boolean = true
  ) => (
    <TableCell>
      <Typography
        variant="h5"
        textAlign="end"
        sx={{ color: colorByNumberValue(hasColor ? value : 0) }}
      >
        {value || (profileState.summary_stats?.post_count ? 0 : "--")}
        {symbol}
      </Typography>
    </TableCell>
  );

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
            {tableHeaderCell(translate("page.profile.statistics.7d"))}
            {tableHeaderCell(translate("page.profile.statistics.30d"))}
            {tableHeaderCell(translate("page.profile.statistics.total"))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {tableRowHeaderCell(translate("page.profile.statistics.win_rate"))}
            {tableRowCell(statistics?.win_rate_7days, "%", false)}
            {tableRowCell(statistics?.win_rate_30days, "%", false)}
            {tableRowCell(statistics?.win_rate_total, "%", false)}
          </TableRow>
          <TableRow>
            {tableRowHeaderCell(translate("page.profile.statistics.roi"))}
            {tableRowCell(statistics?.roi_7days, "%")}
            {tableRowCell(statistics?.roi_30days, "%")}
            {tableRowCell(statistics?.roi_total, "%")}
          </TableRow>
          <TableRow>
            {tableRowHeaderCell(translate("page.profile.statistics.pnl"))}
            {tableRowCell(statistics?.pnl_7days, "$")}
            {tableRowCell(statistics?.pnl_30days, "$")}
            {tableRowCell(statistics?.pnl_total, "$")}
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
};
