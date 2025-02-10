
import { Code2, Bold, Italic } from 'lucide-react';

interface FormattingToolbarProps {
  onInsertText: (tag: string) => void;
}

const FormattingToolbar = ({ onInsertText }: FormattingToolbarProps) => {
  return (
    <div className="flex gap-2 mb-2">
      <button
        type="button"
        onClick={() => onInsertText('code')}
        className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
        title="Insert code block"
      >
        <Code2 size={16} className="mr-1" />
        Code
      </button>
      <button
        type="button"
        onClick={() => onInsertText('bold')}
        className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
        title="Make text bold"
      >
        <Bold size={16} className="mr-1" />
        Bold
      </button>
      <button
        type="button"
        onClick={() => onInsertText('italic')}
        className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
        title="Make text italic"
      >
        <Italic size={16} className="mr-1" />
        Italic
      </button>
    </div>
  );
};

export default FormattingToolbar;
