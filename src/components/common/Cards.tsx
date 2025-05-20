"use client";
import React from "react";
import Discount from "./Discount";
import { useCart } from "@/context/CartContext";

export interface CardItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  multiImages?: string[];
  price: number;
  salePrice?: number;
  quantity: number;
  category: string[];  // array of strings
  attribute?: string[]; // Attribute means variants are available
  rating: number;
  brand: string;
}

export interface CardsPropsArray {
  card: CardItem[];
  className?: string;
  childClassName?: string;
  slicer?: number; // ✅ Optional prop to slice the array
}

const Cards: React.FC<CardsPropsArray> = ({
  card,
  className = "",
  childClassName = "",
  slicer,
}) => {
  const displayCards = slicer ? card.slice(0, slicer) : card;
  const { addToCart } = useCart();

  // Function to handle the Add to Cart button click
  const handleAddToCart = (item: CardItem) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      img: item.imageUrl,
      price: item.price,
      discount: item.salePrice,
      quantity: 1,
      category: item.category, // direct array pass karo
      selectedAttribute: null,
      salePrice: item.salePrice ?? item.price,
      store: item.brand,
    };
    addToCart(cartItem);
  };

  return (
    <div className={` ${className}`}>
      {displayCards.map((item) => (
        <div
          key={item.id}
          className={`bg-white shadow rounded p-4 ${childClassName}`}
        >
          <a href={`product/${item.id}`} className="mb-2">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="object-cover rounded w-full"
            />
          </a>

          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-600">Store: {item.brand}</p>
          <p className="text-sm text-gray-600">
            Category: {item.category.join(", ")} {/* array ko string banaya */}
          </p>
          <p className="text-sm text-gray-600">Store: {item.brand}</p>

          <div className="my-2">
            <Discount rate={item.price} discount={item.salePrice} />
          </div>

          <div className="flex justify-between items-center mt-4">
            {item.attribute && item.attribute.length > 0 ? (
              <a
                href={`product/${item.id}`}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
              >
                Select Options
              </a>
            ) : (
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 text-white cursor-pointer text-sm px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            )}

            {item.rating !== undefined && (
              <p className="text-sm text-yellow-600">Rating: {item.rating}/5</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
