
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import QuestionForm from '@/components/QuestionForm';
import QuestionsTable from '@/components/QuestionsTable';
import { Question, FormData } from '@/types/question';

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

  const categories = Array.from(new Set([
    'JavaScript', 'React', 'HTML', 'CSS', 'Redux', 'TypeScript',
    ...questions.map(q => q.category)
  ]));

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Question deleted",
      description: "The question has been successfully removed.",
    });
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleSubmit = (formData: FormData) => {
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
    
    setEditingQuestion(null);
    setIsFormOpen(false);
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

          {isFormOpen && (
            <QuestionForm
              initialData={editingQuestion ? {
                title: editingQuestion.title,
                description: editingQuestion.description,
                answer: editingQuestion.answer,
                category: editingQuestion.category,
                difficulty: editingQuestion.difficulty
              } : undefined}
              categories={categories}
              onSubmit={handleSubmit}
              onClose={() => {
                setIsFormOpen(false);
                setEditingQuestion(null);
              }}
            />
          )}

          <QuestionsTable
            questions={questions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
