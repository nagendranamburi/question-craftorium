
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    description: string;
    answer: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  }[question.difficulty];

  // Function to format answer with code blocks
  const formatAnswer = (text: string) => {
    const parts = text.split('\n\n');
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Remove the backticks and language identifier if present
        const code = part.replace(/```(\w+)?/, '').replace(/```$/, '').trim();
        return (
          <pre key={index} className="mt-4 p-4 bg-neutral-darker rounded-lg">
            <code className="text-sm text-white font-mono whitespace-pre-wrap">{code}</code>
          </pre>
        );
      }
      return <p key={index} className="mt-4">{part}</p>;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-light/50 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
              {question.difficulty}
            </span>
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {question.category}
            </span>
          </div>
        </div>
        
        <h3 className="mt-4 text-xl font-semibold text-neutral-darker">
          {question.title}
        </h3>
        
        <p className="mt-2 text-neutral-dark">
          {question.description}
        </p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          {isExpanded ? (
            <>
              Hide Answer <ChevronUp className="ml-1" size={16} />
            </>
          ) : (
            <>
              Show Answer <ChevronDown className="ml-1" size={16} />
            </>
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-4 p-4 bg-neutral-light/30 rounded-lg animate-fadeIn">
            <div className="text-neutral-dark">{formatAnswer(question.answer)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
