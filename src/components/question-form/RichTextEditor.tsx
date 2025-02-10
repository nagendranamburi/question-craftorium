
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <div className="min-h-[300px] border border-neutral-light rounded-lg overflow-hidden">
      <Editor
        apiKey="your-tiny-api-key" // You'll need to get a free API key from TinyMCE
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | code | help',
          content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
          skin: 'oxide',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
