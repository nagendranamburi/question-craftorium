
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // First get categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');
      
      if (categoriesError) throw categoriesError;

      // Then get question counts for each category
      const { data: counts, error: countsError } = await supabase
        .from('questions')
        .select('category_id', { count: 'exact' });

      if (countsError) throw countsError;

      // Map counts to categories
      const categoriesWithCounts = categoriesData.map(category => ({
        ...category,
        _count: {
          questions: counts.filter(c => c.category_id === category.id).length
        }
      }));

      return categoriesWithCounts as Category[];
    }
  });
};
