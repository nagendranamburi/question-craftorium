
import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  description: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Admin = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      title: 'What is React?',
      description: 'Explain what React is and its core principles.',
      answer: 'React is a JavaScript library for building user interfaces...',
      category: 'Fundamentals',
      difficulty: 'Easy',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-neutral-light/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-darker">
              Question Management
            </h1>
            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">
              <Plus size={20} className="mr-2" />
              Add Question
            </button>
          </div>

          {/* Questions Table */}
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
                        onClick={() => handleEdit(question)}
                        className="text-neutral-dark hover:text-primary transition-colors mr-3"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
