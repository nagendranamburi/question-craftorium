
import { useState } from 'react';
import { Search } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

const sampleQuestions = [
  {
    id: '1',
    title: 'What is React?',
    description: 'Explain what React is and its core principles.',
    answer: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient rendering. Core principles include:\n\n- Component-based architecture\n- Unidirectional data flow\n- Virtual DOM\n- JSX syntax',
    category: 'Fundamentals',
    difficulty: 'Easy' as const,
  },
  {
    id: '2',
    title: 'Explain React Hooks',
    description: 'What are React Hooks and what problems do they solve?',
    answer: 'React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 to solve several problems:\n\n- Reuse stateful logic between components\n- Reduce complexity of class components\n- Avoid confusion with `this` binding',
    category: 'Hooks',
    difficulty: 'Medium' as const,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
