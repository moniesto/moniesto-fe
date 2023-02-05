import { useTheme } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import { OutputData } from "@editorjs/editorjs";

const ReactEditorJS = createReactEditorJS();

type EditorJsType = {
  editorJs: any;
  label: string;
  defaultValue?: OutputData;
};

export const Editor = ({ editorJs, label, defaultValue }: EditorJsType) => {
  const theme = useTheme();
  console.log();

  useEffect(() => {}, []);
  const handleInitialize = useCallback((instance: any) => {
    editorJs.current = instance;
  }, []);

  return (
    <Box
      style={{
        position: "relative",
        backgroundColor: theme.palette.background.secondary,
        borderRadius: theme.palette.borderRadius.large,
        padding: 16,
        marginTop: 24,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: "-7px",
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
    </Box>
  );
};
