
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Question } from '@/types/question';

export const useQuestions = (selectedCategory: string | null) => {
  return useQuery({
    queryKey: ['questions', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('questions')
        .select('*, categories(name)');
      
      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description || q.title,
        answer: q.answer,
        category: q.categories?.name || 'General',
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
        code_example: q.code_example
      }));
    },
    staleTime: 0, // Make the data stale immediately
    cacheTime: 0, // Don't cache the data
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true // Refetch when window gains focus
  });
};

