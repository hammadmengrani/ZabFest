import React from "react";
import { useCart } from "@/context/CartContext";

interface CartPopupProps {
  onClose: () => void;
}

// Truncate function
const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="relative p-4">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        <p>Your cart is empty!</p>
      </div>
    );
  }

  return (
    <div className="relative p-4">
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold">Your Cart</h2>
      <div className="mt-4">
        {cartItems.map((item) => (
          <div key={item.id + (item.selectedAttribute || "")} className="flex items-center mb-4">
            <img
              src={item.img}
              alt={item.title}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <span className="font-semibold block">
                {truncate(item.title, 25)}
              </span>
              {item.selectedAttribute && (
                <p className="text-sm text-gray-600">Attribute: {item.selectedAttribute}</p>
              )}
              <p className="text-sm text-gray-500">Category: {item.category.join(", ")}</p>
              <p className="text-sm text-green-500">Store: {item.store}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">${item.salePrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500">x{item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="font-semibold">
          Total: Rs,
          {cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0).toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <a
        href="/cart"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          View Cart
        </a>
        <a
        href="/checkout"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Checkout
        </a>
      </div>
    </div>
  );
};

export default CartPopup;
