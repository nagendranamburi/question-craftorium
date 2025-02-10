
import { useState } from 'react';
import { Search } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  logo_url: string;
  _count?: {
    questions: number;
  };
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch categories and question counts from Supabase
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
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
        .select('category_id')
        .select(`
          category_id,
          count
        `)
        .count('category_id');

      if (countsError) throw countsError;

      // Map counts to categories
      const categoriesWithCounts = categoriesData.map(category => ({
        ...category,
        _count: {
          questions: counts.find(c => c.category_id === category.id)?.count || 0
        }
      }));

      return categoriesWithCounts as Category[];
    }
  });

  // Fetch questions from Supabase
  const { data: questions, isLoading: isQuestionsLoading } = useQuery({
    queryKey: ['questions', selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('questions')
        .select('*, categories(name)')
        
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
    }
  });

  const filteredQuestions = questions?.filter(question => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  // Helper function to get category color based on name
  const getCategoryStyles = (name: string) => {
    switch (name) {
      case 'JavaScript':
        return { color: 'bg-yellow-100', textColor: 'text-yellow-800', borderColor: 'border-yellow-200' };
      case 'TypeScript':
        return { color: 'bg-blue-100', textColor: 'text-blue-800', borderColor: 'border-blue-200' };
      case 'React':
        return { color: 'bg-cyan-100', textColor: 'text-cyan-800', borderColor: 'border-cyan-200' };
      case 'Redux':
        return { color: 'bg-purple-100', textColor: 'text-purple-800', borderColor: 'border-purple-200' };
      case 'Next.js':
        return { color: 'bg-neutral-100', textColor: 'text-neutral-800', borderColor: 'border-neutral-200' };
      case 'HTML':
        return { color: 'bg-orange-100', textColor: 'text-orange-800', borderColor: 'border-orange-200' };
      case 'CSS':
        return { color: 'bg-pink-100', textColor: 'text-pink-800', borderColor: 'border-pink-200' };
      default:
        return { color: 'bg-gray-100', textColor: 'text-gray-800', borderColor: 'border-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-darker mb-4">
              Master Your Web Development Interview
            </h1>
            <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
              Prepare with our curated collection of web development interview questions and expert answers
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-neutral-light focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral" size={20} />
              </div>
            </div>
          </div>

          {/* Category Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {isCategoriesLoading ? (
              // Loading skeleton for categories
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 rounded-xl p-6 h-32"></div>
              ))
            ) : (
              categories.map((category) => {
                const styles = getCategoryStyles(category.name);
                const questionCount = category._count?.questions || 0;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`${styles.color} ${styles.textColor} ${styles.borderColor} border rounded-xl p-6 transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {category.logo_url && (
                      <img 
                        src={category.logo_url} 
                        alt={`${category.name} logo`}
                        className="w-12 h-12 mb-2 mx-auto object-contain"
                      />
                    )}
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-75">{questionCount} questions</p>
                  </button>
                )
              })
            )}
          </div>

          {/* Selected Category Title */}
          {selectedCategory && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-neutral-darker">
                {categories.find(c => c.id === selectedCategory)?.name} Questions
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-2 text-primary hover:text-primary-dark transition-colors"
              >
                Show All Categories
              </button>
            </div>
          )}

          {/* Loading State */}
          {isQuestionsLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-neutral-dark">Loading questions...</p>
            </div>
          )}

          {/* Questions List */}
          {!isQuestionsLoading && (
            <div className="space-y-6">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
              
              {!filteredQuestions.length && (
                <div className="text-center py-8">
                  <p className="text-neutral-dark">No questions found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
