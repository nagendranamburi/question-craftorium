
import { Edit2, Trash2 } from 'lucide-react';
import { Question } from '@/types/question';

interface QuestionsTableProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

const QuestionsTable = ({ questions, onEdit, onDelete }: QuestionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-light">
            <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-dark">Title</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-dark">Category</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-neutral-dark">Difficulty</th>
            <th className="py-3 px-4 text-right text-sm font-semibold text-neutral-dark">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id} className="border-b border-neutral-light">
              <td className="py-4 px-4 text-neutral-darker">{question.title}</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {question.category}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  {
                    Easy: 'bg-green-100 text-green-800',
                    Medium: 'bg-yellow-100 text-yellow-800',
                    Hard: 'bg-red-100 text-red-800',
                  }[question.difficulty]
                }`}>
                  {question.difficulty}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <button
                  onClick={() => onEdit(question)}
                  className="text-neutral-dark hover:text-primary transition-colors mr-3"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(question.id)}
                  className="text-neutral-dark hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
