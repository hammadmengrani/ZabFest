import React from 'react';
import ShopSidebar from './ShopSidebar';
import { product } from '@/products/product';

// Extract min & max price from dataset
const prices = product.map(item => item.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

const uniqueCategories: string[] = Array.from(new Set(product.map(item => item.category)));

const Sidebar = () => {
  return (
    <div className='flex p-5  w-96'>
      {/* Pass minPrice & maxPrice to ShopSidebar */}
      <ShopSidebar categories={uniqueCategories} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  );
};

export default Sidebar;
