
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <div className="min-h-[300px] border border-neutral-light rounded-lg overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'code',
            'codeBlock',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo'
          ],
          placeholder: 'Type your answer here...',
          codeBlock: {
            languages: [
              { language: 'plaintext', label: 'Plain text' },
              { language: 'javascript', label: 'JavaScript' },
              { language: 'typescript', label: 'TypeScript' },
              { language: 'css', label: 'CSS' },
              { language: 'html', label: 'HTML' },
            ]
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
