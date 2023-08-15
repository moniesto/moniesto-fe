import { TextField, TextFieldProps } from "@mui/material";

type WrappedTextFieldProps = TextFieldProps;
export const WrappedTextField = (props: WrappedTextFieldProps) => {
  return <TextField {...props} />;
};
