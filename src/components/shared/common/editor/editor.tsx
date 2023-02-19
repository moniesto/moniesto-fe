import { useTheme } from "@mui/system";
import { Box, Card, Typography } from "@mui/material";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import "./editor.scss";

const ReactEditorJS = createReactEditorJS();

type EditorJsType = {
  editorJs: any;
  label: string;
  defaultValue?: OutputData;
};

export const Editor = ({ editorJs, label, defaultValue }: EditorJsType) => {
  const theme = useTheme();
  const editor = new EditorJS({
    ...EDITOR_JS_TOOLS,
    /**
     * Id of Element that should contain Editor instance
     */
    holder: 'editorjs'
  });

  useEffect(() => {}, []);
  const handleInitialize = useCallback((instance: any) => {
    editorJs.current = instance;
  }, []);

  return (
    <Card
      className={theme.palette.mode == "dark" ? "dark-editor" : ""}
      style={{
        padding: 16,
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
      
      <div id="editorjs">

      </div>
      {/* <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
        // defaultValue={defaultValue}
      /> */}
    </Card>
  );
};
