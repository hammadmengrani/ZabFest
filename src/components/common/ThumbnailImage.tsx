'use client'
import React, { useState } from "react";

interface ThumbnailProps {
  imageUrl: string;
  multiImages?: string[];
}

const ThumbnailImage: React.FC<ThumbnailProps> = ({ imageUrl, multiImages = [] }) => {
  const images = [imageUrl, ...multiImages];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="flex gap-4 relative">
      {/* Main Image Container with Arrows */}
            {/* Side Thumbnails */}
            <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Thumbnail"
            className={`w-16 h-16 object-cover cursor-pointer border-2 ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
      <div className="relative border p-5 rounded-lg">

        
        {/* Left Button (SVG Arrow) */}
        <button 
          onClick={handlePrev} 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Main Image */}
        <img
          src={selectedImage}
          alt="Main Product"
          className="md:w-96 md:h-96 w-60 h-60 object-cover"
        />

        {/* Right Button (SVG Arrow) */}
        <button 
          onClick={handleNext} 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default ThumbnailImage;
