
import { useState } from 'react';
import { Search } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const categories = [
  {
    name: 'React',
    count: 4,
    icon: '⚛️',
    color: 'bg-cyan-100',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-200'
  },
  {
    name: 'Virtual DOM',
    count: 1,
    icon: '🌳',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  {
    name: 'Props',
    count: 1,
    icon: '📦',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  },
  {
    name: 'Context',
    count: 1,
    icon: '🌐',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    name: 'Hooks',
    count: 2,
    icon: '🎣',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch questions from Supabase
  const { data: questions, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*');
      
      if (error) throw error;
      
      return data.map(q => ({
        id: q.id,
        title: q.title,
        description: q.title, // Using title as description for now
        answer: q.answer,
        category: q.tags[0], // Using first tag as category
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard'
      }));
    }
  });

  const filteredQuestions = questions?.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? question.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-darker mb-4">
              Master Your React Interview
            </h1>
            <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
              Prepare with our curated collection of React interview questions and expert answers
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                className={`${category.color} ${category.textColor} ${category.borderColor} border rounded-xl p-6 transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.name ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm opacity-75">{category.count} questions</p>
              </button>
            ))}
          </div>

          {/* Selected Category Title */}
          {selectedCategory && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-neutral-darker">
                {selectedCategory} Questions
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
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-neutral-dark">Loading questions...</p>
            </div>
          )}

          {/* Questions List */}
          {!isLoading && (
            <div className="space-y-6">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
              
              {filteredQuestions.length === 0 && (
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
