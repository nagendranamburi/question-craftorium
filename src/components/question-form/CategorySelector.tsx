
interface CategorySelectorProps {
  category: string;
  categories: string[];
  newCategory: string;
  onCategoryChange: (category: string) => void;
  onNewCategoryChange: (category: string) => void;
  onAddCategory: () => void;
}

const CategorySelector = ({
  category,
  categories,
  newCategory,
  onCategoryChange,
  onNewCategoryChange,
  onAddCategory
}: CategorySelectorProps) => {
  return (
    <div className="flex gap-2">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="flex-1 px-3 py-2 border border-neutral-light rounded-lg"
        required
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => onNewCategoryChange(e.target.value)}
        placeholder="New category"
        className="flex-1 px-3 py-2 border border-neutral-light rounded-lg"
      />
      <button
        type="button"
        onClick={onAddCategory}
        className="px-4 py-2 bg-neutral-light text-neutral-darker rounded-lg hover:bg-neutral-light/80"
      >
        Add
      </button>
    </div>
  );
};

export default CategorySelector;
