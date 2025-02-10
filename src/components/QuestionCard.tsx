
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
    code_example?: string;
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
  const formatAnswer = (text: string, codeExample?: string) => {
    if (!text) return [];
    
    const parts = [];
    
    // First add the main answer with code blocks
    const answerParts = text.split(/(```[\s\S]*?```)/);
    parts.push(...answerParts.map((part, index) => {
      // Check if this part is a code block
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (!match) return null;
        
        const [, language, code] = match;
        return (
          <pre key={`answer-${index}`} className="my-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
            <code className="text-sm text-white font-mono whitespace-pre">
              {code.trim()}
            </code>
          </pre>
        );
      } else {
        // Regular text - split by newlines and create paragraphs
        const paragraphs = part.split('\n').filter(p => p.trim());
        return paragraphs.map((paragraph, pIndex) => (
          <p key={`answer-${index}-${pIndex}`} className="my-2 text-neutral-dark">
            {paragraph.trim()}
          </p>
        ));
      }
    }));

    // If there's a code example, add it after the answer
    if (codeExample) {
      parts.push(
        <div key="code-example" className="mt-4">
          <h4 className="font-medium text-neutral-darker mb-2">Code Example:</h4>
          <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto">
            <code className="text-sm text-white font-mono whitespace-pre">
              {codeExample.trim()}
            </code>
          </pre>
        </div>
      );
    }
    
    return parts;
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
            <div className="prose prose-neutral max-w-none">
              {formatAnswer(question.answer, question.code_example)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
