import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-8">
      {/* Ad 1 */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 text-white h-60 flex">
        {/* Left Text Side */}
        <div className="flex flex-col justify-center px-6 w-1/2">
          <span className="text-xs uppercase mb-1 font-semibold">Ad Offer</span>
          <h2 className="text-xl font-bold leading-tight mb-2">New Grooming Arrivals</h2>
          <button className="bg-white text-red-600 px-3 py-1 text-sm font-medium rounded hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>

        {/* Right Image Side */}
        <div className="w-1/2 relative">
          <img
            // src="https://placehold.co/600x400?text=Ad+1"
            src="/ad_1.png"
            alt="Ad 1"
            className="w-full h-60 object-cover"
          />
          <div className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded">Ad</div>
        </div>
      </div>

      {/* Ad 2 */}
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white h-60 flex">
        {/* Left Text Side */}
        <div className="flex flex-col justify-center px-6 w-1/2">
          <span className="text-xs uppercase mb-1 font-semibold">Hot Deal</span>
          <h2 className="text-xl font-bold leading-tight mb-2">Exclusive Beauty Products</h2>
          <button className="bg-white text-purple-700 px-3 py-1 text-sm font-medium rounded hover:bg-gray-100 transition">
            Discover
          </button>
        </div>

        {/* Right Image Side */}
        <div className="w-1/2 relative">
          <img
            // src="https://placehold.co/600x400?text=Ad+2"
            src="/ad_2.png"
            alt="Ad 2"
            className="w-full h-60 object-cover"
          />
          <div className="absolute top-2 left-2 text-xs bg-black text-white px-2 py-1 rounded">Ad</div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
