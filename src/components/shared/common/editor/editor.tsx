import { useTheme } from "@mui/system";
import { Card, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import { OutputData } from "@editorjs/editorjs";
import "./editor.scss";

const ReactEditorJS = createReactEditorJS();

type EditorJsType = {
  editorJs?: any;
  label?: string;
  defaultValue?: OutputData;
  readOnly?: boolean;
};

export const Editor = ({
  editorJs,
  label,
  defaultValue,
  readOnly = false,
}: EditorJsType) => {
  const theme = useTheme();

  useEffect(() => {}, []);
  const handleInitialize = useCallback(
    (instance: any) => {
      if (editorJs) editorJs.current = instance;
    },
    [editorJs]
  );

  return (
    <Card
      className={`__editorjs__ ${readOnly && "readOnly"} ${
        theme.palette.mode === "dark" && "dark-editor"
      }`}
      sx={{
        padding: readOnly ? 0 : 2,
        overflow: "unset",
        background: !readOnly && theme.palette.background[600],
      }}
    >
      {label && (
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            marginTop: "-25px",
            fontSize: "12px",
          }}
        >
          {label}
        </Typography>
      )}

      <ReactEditorJS
        readOnly={readOnly}
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        defaultValue={defaultValue}
      />
    </Card>
  );
};
