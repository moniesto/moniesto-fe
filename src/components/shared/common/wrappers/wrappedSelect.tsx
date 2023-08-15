import { Select, SelectProps } from "@mui/material";

type WrappedSelectProps = SelectProps;
export const WrappedSelect = (props: WrappedSelectProps) => {
  return <Select {...props} />;
};
