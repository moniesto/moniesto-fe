import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";

type propTypes = {
  columns: { field: string; title: string }[];
  rows: any[];
  loading?: boolean
};

const PredictionDataTable = ({ columns, rows, loading }: propTypes) => {
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
              {
                !loading ? translate(column.title) :
                  <Skeleton sx={{ margin: "auto" }} variant="text" width={50}></Skeleton>
              }

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
                {
                  !loading ? row[column.field] :
                    <Skeleton sx={{ margin: "auto" }} variant="text" width={50}></Skeleton>
                }

              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionDataTable;
