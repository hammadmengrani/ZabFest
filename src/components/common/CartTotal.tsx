import React from "react";

interface CartTotalProps {
  subtotal: number;
  shipping: number;
  checkoutBtn:boolean
}

const CartTotal: React.FC<CartTotalProps> = ({ subtotal, shipping,checkoutBtn }) => {
  const total = subtotal + shipping;

  const MovetoCheckout = () =>{
    window.location.href = '/checkout'
  }

  return (
    <div className="p-5 border border-gray-300 w-1/4 ">
      <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>Rs {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping:</span>
        <span>Rs {shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>Rs {total.toFixed(2)}</span>
      </div>
      {checkoutBtn && (
      <button  onClick={MovetoCheckout} className="mt-4 w-full bg-green-600 text-white p-2 rounded">
        PROCEED TO CHECKOUT
      </button>
      )}
    </div>
  );
};

export default CartTotal;
