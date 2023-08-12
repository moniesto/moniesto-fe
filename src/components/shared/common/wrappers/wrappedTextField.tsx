import { TextField, TextFieldProps, useMediaQuery } from "@mui/material";

type WrappedTextFieldProps = TextFieldProps;
export const WrappedTextField = (props: WrappedTextFieldProps) => {
  // const matches = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  // return <TextField {...props} size={matches ? "small" : "medium"} />;
  return (
    <TextField
      {...props}
      // sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
    />
  );
};
