"use client";

import React, { useState } from "react";
import Discount from "./Discount";
import { useCart } from '@/context/CartContext'; // Import Cart Context

export interface productDetail {
  id: string;
  title: string;
  description?: string;
  price: number;
  discount?: number;
  category: string[];
  variations?: string[];
  img?: string;
}

const ProductDescription = (props: productDetail) => {
  const { addToCart } = useCart();  // Context Hook
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const isAttributeRequired = props.variations?.length > 0;

  // Function to add product to cart
  const handleAddToCart = () => {
    if (isAttributeRequired && !selectedAttribute) return;

    const salePrice = props.discount
      ? props.price - (props.price * props.discount) / 100
      : props.price;

    addToCart({
      id: props.id,
      title: props.title,
      img: props.img || '',
      price: props.price,
      discount: props.discount,
      quantity: 1,
      category: props.category,
      attribute: selectedAttribute ? [selectedAttribute] : [],
      selectedAttribute: selectedAttribute || null,
      salePrice,
      store: "" // Replace with actual store value if available
    });
  };

  const truncateDesc = (description: string = "", maxLength: number = 100): string => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="flex flex-col gap-4 md:px-0 px-5">
      {/* Title & Discount */}
      <h3 className="text-3xl">{props.title}</h3>
      <Discount
        rate={props.price}
        className="text-xl"
        discount={props.discount}
      />

      {/* Description */}
      <p className="text-gray-600 md:w-[850px]">
        {truncateDesc(props.description, 150)}
      </p>

      {/* Attributes Selection */}
      {props.variations?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {props.variations.map((attr, index) => (
            <button
              key={index}
              onClick={() => setSelectedAttribute(attr)}
              className={`px-3 py-1 rounded-full text-sm transition 
                ${selectedAttribute === attr
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              {attr}
            </button>
          ))}
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAttributeRequired && !selectedAttribute}
        className={`mt-4 flex w-40 text-center items-center justify-center text-white px-6 py-2 rounded-full transition duration-300 
          ${!isAttributeRequired || selectedAttribute
            ? "bg-[#059DDE] hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Add to Cart
      </button>

      {/* Category Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Category</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {props.category.map((cat, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
