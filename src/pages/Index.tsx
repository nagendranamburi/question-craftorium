
import { useState } from 'react';
import { Search } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';

const categories = [
  {
    name: 'JavaScript',
    count: 2,
    icon: '⚡',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200'
  },
  {
    name: 'React',
    count: 3,
    icon: '⚛️',
    color: 'bg-cyan-100',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-200'
  },
  {
    name: 'HTML',
    count: 1,
    icon: '🌐',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  },
  {
    name: 'CSS',
    count: 1,
    icon: '🎨',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    name: 'Redux',
    count: 1,
    icon: '🔄',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  {
    name: 'TypeScript',
    count: 1,
    icon: '📘',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  }
];

const sampleQuestions = [
  {
    id: '1',
    title: 'What is React?',
    description: 'Explain what React is and its core principles.',
    answer: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient rendering. Core principles include:\n\n- Component-based architecture\n- Unidirectional data flow\n- Virtual DOM\n- JSX syntax',
    category: 'React',
    difficulty: 'Easy' as const,
  },
  {
    id: '2',
    title: 'Explain React Hooks',
    description: 'What are React Hooks and what problems do they solve?',
    answer: 'React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 to solve several problems:\n\n- Reuse stateful logic between components\n- Reduce complexity of class components\n- Avoid confusion with `this` binding',
    category: 'React',
    difficulty: 'Medium' as const,
  },
  {
    id: '3',
    title: 'What is TypeScript?',
    description: 'Explain the benefits of using TypeScript over JavaScript.',
    answer: 'TypeScript is a strongly typed programming language that builds on JavaScript. Key benefits include:\n\n- Static typing\n- Better IDE support\n- Early error detection\n- Enhanced code maintainability\n- Object-oriented features',
    category: 'TypeScript',
    difficulty: 'Medium' as const,
  },
  {
    id: '4',
    title: 'Explain CSS Box Model',
    description: 'What is the CSS Box Model and its components?',
    answer: 'The CSS Box Model is a fundamental concept that describes how elements are structured in web layouts. It consists of:\n\n- Content\n- Padding\n- Border\n- Margin\n\nEach element is treated as a box with these layers.',
    category: 'CSS',
    difficulty: 'Easy' as const,
  },
  {
    id: '5',
    title: 'What is Redux?',
    description: 'Explain Redux and its core principles.',
    answer: 'Redux is a predictable state container for JavaScript apps. Core principles include:\n\n- Single source of truth\n- State is read-only\n- Changes are made with pure functions\n- Unidirectional data flow',
    category: 'Redux',
    difficulty: 'Medium' as const,
  },
  {
    id: '6',
    title: 'Semantic HTML',
    description: 'What is semantic HTML and why is it important?',
    answer: 'Semantic HTML involves using HTML elements that clearly describe their meaning. Benefits include:\n\n- Better accessibility\n- Improved SEO\n- Clearer code structure\n- Easier maintenance',
    category: 'HTML',
    difficulty: 'Easy' as const,
  },
  {
    id: '7',
    title: 'JavaScript Closures',
    description: 'Explain closures in JavaScript.',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. Key points:\n\n- Enables data privacy\n- Preserves outer scope access\n- Used for module patterns\n- Creates function factories',
    category: 'JavaScript',
    difficulty: 'Medium' as const,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredQuestions = sampleQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? question.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
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

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
