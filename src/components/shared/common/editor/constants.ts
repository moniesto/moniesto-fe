const Table = require('@editorjs/table');
const Warning = require('@editorjs/warning');
const Image = require('@editorjs/image');
const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');
const Marker = require('@editorjs/marker');
const CheckList = require('@editorjs/checklist');
const Delimiter = require('@editorjs/delimiter');
const NestedList = require('@editorjs/nested-list');
const AnyButton = require('editorjs-button');

export const EDITOR_JS_TOOLS: any = {
  holder: 'editorjs',
  table: Table,
  marker: Marker,
  list: NestedList,
  warning: Warning,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return _getBase64(file).then((data) => {
            return {
              success: 1,
              file: {
                url: data
              }
            }
          })
        }
      },
    }
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  AnyButton: {
    class: AnyButton,
    inlineToolbar: false,
    config: {
      css: {
        btnColor: 'btn--gray',
      },
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
};


export const _getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function () { return resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}