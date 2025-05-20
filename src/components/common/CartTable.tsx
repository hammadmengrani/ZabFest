import React from "react";
import { CartItem } from "@/context/CartContext"; // Import the correct type
import { useCart } from "@/context/CartContext";
import Discount from "./Discount";

interface CartTableProps {
  cartItems: CartItem[];
}

const CartTable: React.FC<CartTableProps> = ({ cartItems }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount ? (item.price - item.discount) : item.price; // Apply discount if available
      return total + itemPrice * item.quantity;
    }, 0);
  };

  

  return (
    <div className="p-10 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Subtotal</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index} className="text-center border-b">
              <td className="p-3 flex items-center gap-3">
                <img src={item.img} alt={item.title} className="w-16 h-16" />
                {item.title} - {item.selectedAttribute}
              </td>
              <td className="p-3">
                <Discount rate={item.price} discount={item.discount} className=""/>
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => decrementQuantity(item.id, item.selectedAttribute)}
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded"
                    onClick={() => incrementQuantity(item.id, item.selectedAttribute)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-3">Rs {item.price * item.quantity}</td>
              <td className="p-3">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeFromCart(item.id, item.selectedAttribute)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
