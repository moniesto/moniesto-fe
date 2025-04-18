import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../../hooks/useTranslate";
import { ReactNode } from "react";

type propTypes = {
  columns: { field: string; title?: string }[];
  rows: { [key: string]: string | number | ReactNode }[];
  loading?: boolean;
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
              paddingX: 1,
              paddingY: 0.3,
              opacity: 0.6,
              border: 0,
            },
          }}
        >
          {columns.map((column) => (
            <TableCell key={column.field} align="left">
              {!loading ? (
                <Typography variant="h5" fontWeight="bold">
                  {column.title && translate(column.title)}
                </Typography>
              ) : (
                <Skeleton
                  sx={{ margin: "auto" }}
                  variant="text"
                  width={50}
                ></Skeleton>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody
        sx={{
          td: {
            paddingX: 1,
            paddingY: 0.3,
            border: 0,
            fontWeight: 600,
          },
        }}
      >
        {rows.map((row, i) => (
          <TableRow key={i}>
            {columns.map((column) => (
              <TableCell key={column.field} align="left">
                {!loading ? (
                  <Typography variant="h5" fontWeight="bold">
                    {row[column.field]}
                  </Typography>
                ) : (
                  <Skeleton
                    sx={{ margin: "auto" }}
                    variant="text"
                    width={50}
                  ></Skeleton>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictionDataTable;
