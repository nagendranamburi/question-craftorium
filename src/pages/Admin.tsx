
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import QuestionForm from '@/components/QuestionForm';
import QuestionsTable from '@/components/QuestionsTable';
import { Question, FormData } from '@/types/question';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Fetch questions from Supabase
  const { data: questions, isLoading } = useQuery({
    queryKey: ['admin-questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*, categories(name)');
      
      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answer: q.answer,
        category: q.categories?.name || '',
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
        code_example: q.code_example
      }));
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Invalidate and refetch questions
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });

      toast({
        title: "Question deleted",
        description: "The question has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the question.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      // Find category_id based on the category name
      const categoryId = categories?.find(c => c.name === formData.category)?.id;
      
      if (!categoryId) {
        throw new Error('Invalid category selected');
      }

      if (editingQuestion) {
        // Update existing question
        const { error } = await supabase
          .from('questions')
          .update({
            title: formData.title,
            description: formData.description,
            category_id: categoryId,
            tags: [formData.category],
            answer: formData.answer,
            difficulty: formData.difficulty,
            code_example: formData.code_example
          })
          .eq('id', editingQuestion.id);

        if (error) throw error;

        toast({
          title: "Question updated",
          description: "The question has been successfully updated.",
        });
      } else {
        // Add new question
        const { error } = await supabase
          .from('questions')
          .insert({
            title: formData.title,
            description: formData.description,
            category_id: categoryId,
            tags: [formData.category],
            answer: formData.answer,
            difficulty: formData.difficulty,
            code_example: formData.code_example
          });

        if (error) throw error;

        toast({
          title: "Question added",
          description: "New question has been successfully added.",
        });
      }

      // Invalidate and refetch questions
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
      
      setEditingQuestion(null);
      setIsFormOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the question.",
        variant: "destructive"
      });
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

          {isFormOpen && (
            <QuestionForm
              initialData={editingQuestion ? {
                title: editingQuestion.title,
                description: editingQuestion.description,
                answer: editingQuestion.answer,
                category: editingQuestion.category,
                difficulty: editingQuestion.difficulty,
                code_example: editingQuestion.code_example
              } : undefined}
              categories={categories?.map(c => c.name) || []}
              onSubmit={handleSubmit}
              onClose={() => {
                setIsFormOpen(false);
                setEditingQuestion(null);
              }}
            />
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-neutral-dark">Loading questions...</p>
            </div>
          ) : (
            <QuestionsTable
              questions={questions || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
