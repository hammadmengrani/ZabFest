'use client'
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

interface Props {
  checkout?: boolean;
  order?: boolean;
}

const CartDetail: React.FC<Props> = ({ checkout, order }) => {
  const { cartItems } = useCart();
  const [lastOrder, setLastOrder] = useState<any>(null);

  // useEffect(() => {
  //   if (order) {
  //     const getLastOrder = async () => {
  //       const data = await fetchLastOrder();
  //       setLastOrder(data);
  //     };
  //     getLastOrder();
  //   }
  // }, [order]);

  // if (order && !lastOrder) {
  //   return <p className="text-center">Loading Order Details...</p>;
  // }

  return (
    <div className="p-5 border border-gray-300 md:h-1/2 md:w-1/4 mt-5">
      <h2 className="text-lg font-semibold mb-4">
        {checkout ? "Cart Details" : order ? "Order Details" : ""}
      </h2>

      {checkout && (
        <>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id + item.selectedAttribute} className="flex justify-between items-center border-b pb-3">
                  <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 px-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.selectedAttribute && <p className="text-sm text-gray-600">Attribute: {item.selectedAttribute}</p>}
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">Rs {(item.price - (item.discount || 0)).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {order && lastOrder && (
        <div className="space-y-4 ">
          {lastOrder.items.map((item: any) => (
            <div key={item.productId} className="flex justify-between items-center border-b pb-3">
              <img src={item.image || "/placeholder.png"} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 px-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">Rs {item.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartDetail;
