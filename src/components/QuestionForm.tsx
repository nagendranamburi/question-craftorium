
import { useState } from 'react';
import { X } from 'lucide-react';
import { FormData } from '@/types/question';
import CategorySelector from './question-form/CategorySelector';
import FormField from './question-form/FormField';
import RichTextEditor from './question-form/RichTextEditor';

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

  // Function to format answer with code blocks for preview
  const formatPreview = (text: string) => {
    const parts = text.split('\n\n');
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```(\w+)?/, '').replace(/```$/, '').trim();
        return (
          <pre key={index} className="mt-4 p-4 bg-neutral-darker rounded-lg">
            <code className="text-sm text-white font-mono whitespace-pre-wrap">{code}</code>
          </pre>
        );
      }
      return <p key={index} className="mt-4">{part}</p>;
    });
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
        <FormField label="Title">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-light rounded-lg"
            required
          />
        </FormField>

        <FormField label="Description">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-neutral-light rounded-lg"
            rows={3}
            required
          />
        </FormField>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormField label="Answer">
              <RichTextEditor
                value={formData.answer}
                onChange={(value) => setFormData({ ...formData, answer: value })}
              />
            </FormField>
          </div>

          <div className="space-y-4">
            <FormField label="Preview">
              <div className="min-h-[300px] p-4 border border-neutral-light rounded-lg bg-white">
                {formatPreview(formData.answer)}
              </div>
            </FormField>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category">
            <CategorySelector
              category={formData.category}
              categories={categories}
              newCategory={newCategory}
              onCategoryChange={(category) => setFormData({ ...formData, category })}
              onNewCategoryChange={setNewCategory}
              onAddCategory={handleAddCategory}
            />
          </FormField>

          <FormField label="Difficulty">
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
          </FormField>
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
