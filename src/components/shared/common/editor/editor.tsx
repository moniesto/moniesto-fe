import { useTheme } from "@mui/system";
import { Card } from "@mui/material";
import { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import { OutputData } from "@editorjs/editorjs";
import { useTranslate } from "../../../../hooks/useTranslate";
import { FormItem } from "../formItem";

import "./editor.scss";

const ReactEditorJS = createReactEditorJS();

type EditorJsType = {
  label?: string;
  defaultValue?: OutputData;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

export const Editor = ({
  label,
  defaultValue,
  readOnly = false,
  onChange,
}: EditorJsType) => {
  const theme = useTheme();
  const translate = useTranslate();
  const ejInstance = useRef<{
    destroy: () => void;
    save: () => OutputData;
  } | null>(null);

  const handleInitialize = useCallback(
    (instance: any) => {
      if (ejInstance) ejInstance.current = instance;
    },
    [ejInstance]
  );

  const handleChange = async () => {
    let finalContent = "";
    let content = await ejInstance.current?.save();
    if (content?.blocks?.length) finalContent = JSON.stringify(content);
    else finalContent = "";

    onChange?.(finalContent);
  };

  return (
    <FormItem title={label || ""}>
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
        <ReactEditorJS
          placeholder={translate("form.field.desc_placeholder")}
          readOnly={readOnly}
          tools={EDITOR_JS_TOOLS}
          i18n={{
            messages: {
              ui: {
                blockTunes: {
                  toggler: {
                    "Click to tune": translate(
                      "component.editor.ui.blockTunes.toggler.click_tune"
                    ),
                    "or drag to move": translate(
                      "component.editor.ui.blockTunes.toggler.drag_move"
                    ),
                  },
                },
                inlineToolbar: {
                  converter: {
                    "Convert to": translate(
                      "component.editor.ui.inlineToolbar.converter.convert_to"
                    ),
                  },
                },
                toolbar: {
                  toolbox: {
                    Add: translate("component.editor.ui.toolbar.toolbox.add"),
                    Filter: translate("component.editor.blockTunes.filter"),
                  },
                },
                popover: {
                  Filter: translate("component.editor.popover.filter"),
                  "Nothing found": translate(
                    "component.editor.popover.notfound"
                  ),
                },
              },

              /**
               * Section for translation Tool Names: both block and inline tools
               */
              toolNames: {
                Text: translate("component.editor.toolNames.text"),
                Heading: translate("component.editor.toolNames.heading"),
                List: translate("component.editor.toolNames.list"),
                Warning: translate("component.editor.toolNames.warning"),
                Image: translate("component.editor.toolNames.image"),
              },

              /**
               * Section for passing translations to the external tools classes
               */
              tools: {
                /**
                 * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
                 * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
                 */
                // warning: {
                //   // <-- 'Warning' tool will accept this dictionary section
                //   Title: "Название",
                //   Message: "Сообщение",
                // },
                image: {
                  Caption: translate("component.editor.tools.image.caption"),
                  "Select an Image": translate(
                    "component.editor.tools.image.upload"
                  ),
                  "With border": translate(
                    "component.editor.tools.image.with_border"
                  ),
                  "Stretch image": translate(
                    "component.editor.tools.image.stretch"
                  ),
                  "With background": translate(
                    "component.editor.tools.image.with_background"
                  ),
                },
                header: {
                  Header: translate("component.editor.tools.header.header"),
                  "Heading 1": translate(
                    "component.editor.tools.header.heading_1"
                  ),
                  "Heading 2": translate(
                    "component.editor.tools.header.heading_2"
                  ),
                  "Heading 3": translate(
                    "component.editor.tools.header.heading_3"
                  ),
                  "Heading 4": translate(
                    "component.editor.tools.header.heading_4"
                  ),
                  "Heading 5": translate(
                    "component.editor.tools.header.heading_5"
                  ),
                  "Heading 6": translate(
                    "component.editor.tools.header.heading_6"
                  ),
                },
                paragraph: {
                  "Enter something": translate(
                    "component.editor.tools.paragraph"
                  ),
                },
                list: {
                  Ordered: translate("component.editor.tools.list.ordered"),
                  Unordered: translate("component.editor.tools.list.unordered"),
                },
              },

              // tools: {
              //   /**
              //    * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
              //    * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
              //    */
              //   warning: {
              //     // <-- 'Warning' tool will accept this dictionary section
              //     Title: translate("component.editor.tools.warning.title"),
              //     Message: translate("component.editor.tools.warning.message"),
              //   },
              //   image: {
              //     "Upload an image": translate(
              //       "component.editor.tools.image.upload"
              //     ),
              //   },
              // },

              /**
               * Section allows to translate Block Tunes
               */
              blockTunes: {
                /**
                 * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
                 * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
                 *
                 * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
                 */
                delete: {
                  Delete: translate("component.editor.blockTunes.delete.main"),
                  "Click to delete": translate(
                    "component.editor.blockTunes.delete.click_delete"
                  ),
                },
                moveUp: {
                  "Move up": translate("component.editor.blockTunes.moveup"),
                },
                moveDown: {
                  "Move down": translate(
                    "component.editor.blockTunes.movedown"
                  ),
                },
              },
            },
          }}
          onInitialize={handleInitialize}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </Card>
    </FormItem>
  );
};
