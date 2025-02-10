
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [isAddingCode, setIsAddingCode] = useState(false);

  const handleAddCodeBlock = () => {
    const codeTemplate = "\n```javascript\n// Your code here\n```\n";
    onChange(value + codeTemplate);
    setIsAddingCode(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddCodeBlock}
          className="px-3 py-1 text-sm bg-neutral-light hover:bg-neutral-light/80 rounded-md transition-colors"
        >
          Add Code Block
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[300px] px-3 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type your answer here... Use the 'Add Code Block' button to insert code snippets."
      />
    </div>
  );
};

export default RichTextEditor;
