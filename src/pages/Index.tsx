
import { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import { useCategories } from '../hooks/useCategories';
import { useQuestions } from '../hooks/useQuestions';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { data: questions, isLoading: isQuestionsLoading } = useQuestions(selectedCategory);

  const filteredQuestions = questions?.filter(question => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          
          <CategoryGrid 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isLoading={isCategoriesLoading}
          />

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
