import React from 'react';

interface CategoriesFilterProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ categories, onCategorySelect }) => {
  return (
    <div className='flex flex-col gap-3 pt-10'>
      <h3 className="text-lg font-semibold">CATEGORIES</h3>
      {categories.map((category, index) => (
        <div key={index} className='flex flex-col'>
          <span
            className="text-gray-700  text-[18px] cursor-pointer hover:text-black"
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
