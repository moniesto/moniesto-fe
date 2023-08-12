import { Select, SelectProps, useMediaQuery } from "@mui/material";

type WrappedSelectProps = SelectProps;
export const WrappedSelect = (props: WrappedSelectProps) => {
  // const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  // return <Select {...props} size={matches ? "small" : "medium"} />;
  return <Select {...props} />;
};
