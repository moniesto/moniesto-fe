import { TextField, TextFieldProps } from "@mui/material";

type WrappedTextFieldProps = TextFieldProps;
export const WrappedTextField = (props: WrappedTextFieldProps) => {
  return (
    <TextField
      {...props}
      onWheelCapture={(e) =>
        props.type === "number"
          ? e.target.addEventListener(
              "wheel",
              (e) => {
                e.preventDefault();
              },
              { passive: false }
            )
          : () => ""
      }
    />
  );
};
