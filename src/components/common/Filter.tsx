import React, { useState } from 'react';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onFilterApply: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, onFilterApply }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(event.target.value);
    setPriceRange(prev => {
      const updatedRange: [number, number] =
        type === 'min' ? [Math.min(value, prev[1] - 1), prev[1]] : [prev[0], Math.max(value, prev[0] + 1)];
      return updatedRange;
    });
  };

  return (
    <div className="pt-10 w-full">
      <h3 className="text-lg font-semibold mb-2">FILTER BY PRICE</h3>

      {/* Slider Track */}
      <div className="relative w-full h-6">
        {/* Background Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-lg"></div>

        {/* Min Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(e, 'min')}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer z-10"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />

        {/* Max Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(e, 'max')}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer z-10"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />

        {/* Active Range Indicator */}
        <div
          className="absolute top-1/2 h-1 bg-green-500 rounded-lg"
          style={{
            left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
            transform: 'translateY(-50%)',
          }}
        ></div>
      </div>

      {/* Price Range Display */}
      <p className="text-sm text-gray-700 text-center mt-2">
        Price: Rs{priceRange[0]} - Rs{priceRange[1]}
      </p>

      {/* Apply Filter Button */}
      <button
        onClick={() => onFilterApply(priceRange)}
        className="mt-5 bg-[#059DDE] text-white py-2 px-4 rounded-full hover:bg-gray-800"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
