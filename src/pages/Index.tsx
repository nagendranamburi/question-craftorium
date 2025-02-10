
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
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Categories */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="space-y-4">
                {isCategoriesLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={index} className="animate-pulse bg-gray-200 rounded-xl p-6 h-20"></div>
                    ))}
                  </div>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id 
                          ? 'bg-primary/10 text-primary'
                          : 'bg-white hover:bg-neutral-light/50 text-neutral-darker'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {category.logo_url && (
                          <img 
                            src={category.logo_url} 
                            alt={`${category.name} logo`}
                            className="w-8 h-8 object-contain"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm opacity-75">{category._count?.questions} questions</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Right Content - Questions */}
            <div className="md:w-2/3 lg:w-3/4">
              {selectedCategory && (
                <h2 className="text-2xl font-semibold text-neutral-darker mb-6">
                  {categories.find(c => c.id === selectedCategory)?.name} Questions
                </h2>
              )}

              {isQuestionsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-neutral-dark">Loading questions...</p>
                </div>
              ) : (
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
      </div>
    </div>
  );
};

export default Index;
