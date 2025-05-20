'use client'
import React from 'react';
import PriceFilter from './Filter';
import CategoriesFilter from './CategoriesFilter';



export interface ShopSidebarProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ categories, minPrice, maxPrice }) => {
  const handleFilterApply = (range: [number, number]) => {
    console.log("Filtered Price Range:", range);
    // Add logic to update product list
  };

  const handleCategorySelect = (category: string) => {
    console.log("Selected Category:", category);
    // Add logic to filter products by category
  };

  return (
    <div className='sm:flex flex-col hidden'>
            {/* Price Filter Component */}
      <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onFilterApply={handleFilterApply} />

      {/* Categories Filter Component */}
      <CategoriesFilter categories={categories} onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export default ShopSidebar;
