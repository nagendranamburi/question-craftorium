
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
    </div>
  );
};

export default Hero;
