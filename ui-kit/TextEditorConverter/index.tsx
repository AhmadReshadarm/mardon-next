import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';

type Props = {
  editorModal: string;
};

const TextEditorConverter: React.FC<Props> = ({ editorModal }) => {
  return (
    <>
      <FroalaEditorView model={editorModal} />
    </>
  );
};

export default TextEditorConverter;
