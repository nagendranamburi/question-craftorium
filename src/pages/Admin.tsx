
import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Question {
  id: string;
  title: string;
  description: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const Admin = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      title: 'What is React?',
      description: 'Explain what React is and its core principles.',
      answer: 'React is a JavaScript library for building user interfaces...',
      category: 'React',
      difficulty: 'Easy',
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newCategory, setNewCategory] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    answer: '',
    category: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard'
  });

  const categories = Array.from(new Set([
    'JavaScript', 'React', 'HTML', 'CSS', 'Redux', 'TypeScript',
    ...questions.map(q => q.category)
  ]));

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      answer: '',
      category: '',
      difficulty: 'Easy'
    });
    setEditingQuestion(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Question deleted",
      description: "The question has been successfully removed.",
    });
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      title: question.title,
      description: question.description,
      answer: question.answer,
      category: question.category,
      difficulty: question.difficulty
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuestion) {
      // Update existing question
      setQuestions(questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...formData, id: editingQuestion.id }
          : q
      ));
      toast({
        title: "Question updated",
        description: "The question has been successfully updated.",
      });
    } else {
      // Add new question
      const newQuestion = {
        ...formData,
        id: Date.now().toString()
      };
      setQuestions([...questions, newQuestion]);
      toast({
        title: "Question added",
        description: "New question has been successfully added.",
      });
    }
    
    resetForm();
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setFormData({ ...formData, category: newCategory });
      setNewCategory('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold text-neutral-darker">
              Question Management
            </h1>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Question
            </button>
          </div>

          {/* Question Form */}
          {isFormOpen && (
            <div className="mb-8 p-6 border border-neutral-light rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingQuestion ? 'Edit Question' : 'Add New Question'}
                </h2>
                <button
                  onClick={resetForm}
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
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-light rounded-lg font-mono"
                    rows={6}
                    placeholder="Write your answer here. Use ``` for code blocks."
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
                    {editingQuestion ? 'Update Question' : 'Add Question'}
                  </button>
                </div>
              </form>
            </div>
          )}

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
