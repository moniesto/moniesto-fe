import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
import imageService from "../../../../services/imageService";

const Table = require("@editorjs/table");
const Warning = require("@editorjs/warning");
const Image = require("@editorjs/image");
const Header = require("@editorjs/header");
const Quote = require("@editorjs/quote");
const Marker = require("@editorjs/marker");
const CheckList = require("@editorjs/checklist");
const Delimiter = require("@editorjs/delimiter");
const NestedList = require("@editorjs/nested-list");
const AnyButton = require("editorjs-button");

export const EDITOR_JS_TOOLS: {
  [toolName: string]: ToolConstructable | ToolSettings;
} = {
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return imageService.getBase64(file).then((data) => {
            return {
              success: 1,
              file: {
                url: data,
              },
            };
          });
        },
      },
    },
  },

  list: NestedList,
  // warning: Warning,
  // table: Table,
  // marker: Marker,
  // AnyButton: {
  //   class: AnyButton,
  //   inlineToolbar: false,
  //   config: {
  //     css: {
  //       btnColor: "btn--gray",
  //     },
  //   },
  // },
  // quote: Quote,
  // checklist: CheckList,
  // delimiter: Delimiter,
};
