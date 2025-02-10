
import { Category } from '@/types/category';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  isLoading: boolean;
}

const CategoryGrid = ({ categories, selectedCategory, setSelectedCategory, isLoading }: CategoryGridProps) => {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-xl p-6 h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
      {categories.map((category) => {
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
        );
      })}
    </div>
  );
};

export default CategoryGrid;
