import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

type propTypes = {
  columns: { field: string; title: string }[];
  rows: any[];
};

const PredictionDataTable = ({ columns, rows }: propTypes) => {
  const translate = useTranslate();

  return (
    <Table>
      <TableHead>
        <TableRow
          sx={{
            th: {
              width: "120px",
              padding: 1.1,
              fontWeight: 600,
              border: 0,
            },
          }}
        >
          {columns.map((column) => (
            <TableCell key={column.field} align="center">
              {translate(column.title)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          td: {
            padding: "10px",
            border: 0,
          },
        }}
      >
        {rows.map((row, i) => (
          <TableRow key={i}>
            {columns.map((column) => (
              <TableCell key={column.field} align="center">
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionDataTable;
