import { useTheme } from "@mui/system";
import { Box, Card, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import { OutputData } from "@editorjs/editorjs";
import "./editor.scss";

const ReactEditorJS = createReactEditorJS();

type EditorJsType = {
  editorJs: any;
  label: string;
  defaultValue?: OutputData;
};

export const Editor = ({ editorJs, label, defaultValue }: EditorJsType) => {
  const theme = useTheme();

  useEffect(() => {}, []);
  const handleInitialize = useCallback((instance: any) => {
    editorJs.current = instance;
  }, []);

  return (
    <Card
      className={theme.palette.mode == "dark" ? "dark-editor" : ""}
      sx={{
        padding: 2,
        overflow: "unset",
        background: theme.palette.background[600],
      }}
    >
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

      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        defaultValue={defaultValue}
      />
    </Card>
  );
};
