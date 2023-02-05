// import Embed from '@editorjs/embed';
const Embed = require('@editorjs/embed');
const Table = require('@editorjs/table');
// import List from '@editorjs/list'
const Warning = require('@editorjs/warning');
// const Code = require('@editorjs/code');
// const LinkTool = require('@editorjs/link');
const Image = require('@editorjs/image');
// const Raw = require('@editorjs/raw');
const Header = require('@editorjs/header');
const Quote = require('@editorjs/quote');
const Marker = require('@editorjs/marker');
const CheckList = require('@editorjs/checklist');
const Delimiter = require('@editorjs/delimiter');
const InlineCode = require('@editorjs/inline-code');
// const  SimpleImage  = require('@editorjs/simple-image');
// const  Paragraph  = require('@editorjs/table');
const NestedList = require('@editorjs/nested-list');
// const  AttachesTool  = require('@editorjs/table');
const AnyButton = require('editorjs-button');

export const EDITOR_JS_TOOLS: any = {
  embed: Embed,
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
  inlineCode: InlineCode,
};


export const _getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function () { return resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}