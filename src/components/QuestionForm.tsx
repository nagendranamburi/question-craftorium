
import { useState } from 'react';
import { X, Code2, Bold, Italic } from 'lucide-react';
import { FormData } from '@/types/question';

interface QuestionFormProps {
  initialData?: FormData;
  categories: string[];
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

const QuestionForm = ({ initialData, categories, onSubmit, onClose }: QuestionFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialData || {
    title: '',
    description: '',
    answer: '',
    category: '',
    difficulty: 'Easy'
  });
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setFormData({ ...formData, category: newCategory });
      setNewCategory('');
    }
  };

  const insertText = (tag: string) => {
    const textArea = document.getElementById('answer-textarea') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = textArea.value;
    let insertion = '';

    switch(tag) {
      case 'code':
        insertion = '\n```\n// your code here\n```\n';
        break;
      case 'bold':
        insertion = '**selected text**';
        break;
      case 'italic':
        insertion = '_selected text_';
        break;
      default:
        return;
    }

    const newText = text.substring(0, start) + insertion + text.substring(end);
    setFormData({ ...formData, answer: newText });

    setTimeout(() => {
      textArea.focus();
      const newCursorPos = start + insertion.length;
      textArea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="mb-8 p-6 border border-neutral-light rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {initialData ? 'Edit Question' : 'Add New Question'}
        </h2>
        <button
          onClick={onClose}
          className="text-neutral-dark hover:text-neutral-darker"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-darker mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-light rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-darker mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-light rounded-lg"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-darker mb-1">
            Answer
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => insertText('code')}
              className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
              title="Insert code block"
            >
              <Code2 size={16} className="mr-1" />
              Code
            </button>
            <button
              type="button"
              onClick={() => insertText('bold')}
              className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
              title="Make text bold"
            >
              <Bold size={16} className="mr-1" />
              Bold
            </button>
            <button
              type="button"
              onClick={() => insertText('italic')}
              className="inline-flex items-center px-3 py-1.5 rounded bg-neutral-dark text-white hover:bg-neutral-darker transition-colors"
              title="Make text italic"
            >
              <Italic size={16} className="mr-1" />
              Italic
            </button>
          </div>
          <textarea
            id="answer-textarea"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-light rounded-lg font-mono bg-neutral-darker text-white"
            rows={6}
            placeholder="Write your answer here. Use formatting buttons above or manually:
- ```code``` for code blocks
- **text** for bold
- _text_ for italic"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-darker mb-1">
              Category
            </label>
            <div className="flex gap-2">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex-1 px-3 py-2 border border-neutral-light rounded-lg"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="flex-1 px-3 py-2 border border-neutral-light rounded-lg"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-neutral-light text-neutral-darker rounded-lg hover:bg-neutral-light/80"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-darker mb-1">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' })}
              className="w-full px-3 py-2 border border-neutral-light rounded-lg"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            {initialData ? 'Update Question' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;

