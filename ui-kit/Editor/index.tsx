import FroalaEditor from 'react-froala-wysiwyg';
import Froalaeditor from 'froala-editor';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import { useAppDispatch } from 'redux/hooks';
import { createImage } from 'redux/slicers/imagesSlicer';
import styled from 'styled-components';

type Props = {
  handleEditorChange: any;
  editorModal: string;
};

const Editor: React.FC<Props> = ({ handleEditorChange, editorModal }) => {
  const dispatch = useAppDispatch();

  const handleImageUpload = async (images, editor) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    try {
      const image = await dispatch(
        createImage({
          config,
          file: images[0],
        }),
      );

      editor.image.insert(
        `/api/images/${image.payload}`,
        null,
        null,
        editor.image.get(),
      );
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FroalaEditor
        onModelChange={handleEditorChange}
        config={{
          key: 'TEB9iD7D5A3A4E3G3c1JWSDBCQJ1ZGDa1F1c1JXDAAOZWJhB3D3C10A6C3B4B4F3G3B3==',
          enter: Froalaeditor.ENTER_BR,
          tableStyles: {
            'no-border': 'No border',
          },
          useClasses: true,
          attribution: false,
          toolbarSticky: false,
          charCounterCount: false,
          fontFamilySelection: true,
          fontSizeSelection: true,
          paragraphFormatSelection: true,
          placeholderText: 'Edit Your Content Here!',
          heightMin: 200,
          heightMax: 550,
          language: 'ru',
          fontFamily: {
            'Arial,Helvetica,sans-serif': 'Arial',
            'Georgia,serif': 'Georgia',
            'Impact,Charcoal,sans-serif': 'Impact',
            'Tahoma,Geneva,sans-serif': 'Tahoma',
            "'Times New Roman',Times,serif": 'Times New Roman',
            'Verdana,Geneva,sans-serif': 'Verdana',
            ricordi: 'ricordi',
            Circe: 'Circe',
          },
          // ------------------- image config --------------

          imageDefaultAlign: 'left',
          imageDefaultDisplay: 'inline-block',
          imageMaxSize: 5 * 1024 * 1024,
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          imageUpload: true,
          imageManagerLoadURL: '/api/images/editor',
          imageManagerLoadMethod: 'GET',
          requestWithCredentials: true,
          requestHeaders: {
            Authorization: `bearer ${localStorage.getItem('accessToken')}`,
          },
          // -----------------------------------------------
          linkInsertButtons: [],
          toolbarButtons: [
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'fontFamily',
            'fontSize',
            'textColor',
            'paragraphFormat',
            'lineHeight',
            'align',
            'formatOL',
            'formatUL',
            'outdent',
            'indent',
            'leftToRight',
            'rightToLeft',
            'insertLink',
            'insertImage',
            'insertTable',
            'emoticons',
            'personalize',
            'insertButton',
            'clearFormatting',
            'selectAll',
            'insertHR',
            'undo',
            'redo',
            'fullscreen',
            'html',
          ],
          linkList: [],
          events: {
            // initialized: function onEditorInitialized() {
            //   const editor = this;
            // },
            // blur: () => {},

            'image.beforeUpload': function (images) {
              const editor: any = this;
              handleImageUpload(images, editor);
              return false;
            },
          },
        }}
        model={editorModal}
      />
      <span>Просмотр:</span>
      <FroalaEditorView model={editorModal} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
`;

export default Editor;
