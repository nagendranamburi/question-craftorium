
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from '@/types/question';
import { useState } from 'react';

interface QuestionsTableProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

const QuestionsTable = ({ questions, onEdit, onDelete }: QuestionsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Function to format answer with code blocks
  const formatAnswer = (text: string) => {
    if (!text) return [];
    
    // Split by triple backticks
    const parts = text.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      // Check if this part is a code block
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (!match) return null;
        
        const [, language, code] = match;
        return (
          <pre key={index} className="my-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
            <code className="text-sm text-white font-mono whitespace-pre">
              {code.trim()}
            </code>
          </pre>
        );
      } else {
        // Regular text - split by newlines and create paragraphs
        const paragraphs = part.split('\n').filter(p => p.trim());
        return paragraphs.map((paragraph, pIndex) => (
          <p key={`${index}-${pIndex}`} className="my-2 text-neutral-dark">
            {paragraph.trim()}
          </p>
        ));
      }
    });
  };

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
            <>
              <tr key={question.id} className="border-b border-neutral-light">
                <td className="py-4 px-4">
                  <div>
                    <p className="text-neutral-darker font-medium">{question.title}</p>
                    <p className="text-sm text-neutral-dark mt-1">{question.description}</p>
                    <button
                      onClick={() => toggleRow(question.id)}
                      className="mt-2 flex items-center text-primary hover:text-primary-dark transition-colors"
                    >
                      {expandedRows[question.id] ? (
                        <>
                          Hide Answer <ChevronUp className="ml-1" size={16} />
                        </>
                      ) : (
                        <>
                          Show Answer <ChevronDown className="ml-1" size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </td>
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
              {expandedRows[question.id] && (
                <tr>
                  <td colSpan={4} className="px-4 py-4 bg-neutral-light/30">
                    <div className="prose prose-neutral max-w-none">
                      {formatAnswer(question.answer)}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
