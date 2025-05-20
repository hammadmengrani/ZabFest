"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import CartTable from "@/components/common/CartTable";
import CartTotal from "@/components/common/CartTotal";

const CartContainer: React.FC = () => {
  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price - (item.discount ?? 0)) * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 300 : 0;

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col p-5 gap-5">
          <div className="md:col-span-2">
            <CartTable cartItems={cartItems} />
          </div>
          <div className="flex items-end p-10 justify-end">
            <CartTotal subtotal={totalPrice} shipping={shipping} checkoutBtn={true} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContainer;
