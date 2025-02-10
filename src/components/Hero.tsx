
import { Search } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  return (
    <div className="text-center mb-8">
      <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
        Prepare with our curated collection of web development interview questions and expert answers
      </p>
      
      <div className="mt-6 max-w-xl mx-auto">
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
  );
};

export default Hero;
