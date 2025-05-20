"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { placeOrder } from "@/graphql/orders"; // 🔸 Commented out

const initialFormState = {
  title: "",
  email: "",
  phone: "000000000000",
  address: "",
  country: "Pakistan",
  city: "",
  postal: "",
  billingtitle: "",
  billingCity: "",
  billingPostalCode: "",
  billingAddress: "",
};

const Checkout = () => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [isDifferentBillingAddress, setIsDifferentBillingAddress] = useState(false);
  const { cartItems, clearCart } = useCart();

  const handleBillingAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDifferentBillingAddress(event.target.value === "different");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleOrderComplete = async (event: React.FormEvent) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("❌ Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const items = cartItems.map((item) => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        total: item.price * item.quantity,
        salePrice: item.salePrice,
      }));

      const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

      const orderData = {
        customerName: form.title,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        country: form.country,
        postalCode: form.postal,
        billingAddress: isDifferentBillingAddress
          ? {
              name: form.billingtitle,
              address: form.billingAddress,
              city: form.billingCity,
              postalCode: form.billingPostalCode,
            }
          : null,
        items,
        totalAmount,
      };

      // 🔸 Commented out GraphQL mutation
      // const response = await placeOrder(orderData);
      // if (response) {
      //   toast.success("✅ Order placed successfully!");
      //   clearCart();
      //   window.location.href = "/order";
      //   setForm(initialFormState);
      // } else {
      //   throw new Error("Order placement failed.");
      // }

      console.log("Order Data:", orderData); // 💬 For testing purpose
      toast.success("✅ Order simulated (GraphQL call disabled)");
      clearCart();
      setForm(initialFormState);
    } catch (error) {
      console.error("❌ Error placing order:", error);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-5">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col text-white items-center justify-center">
            <img src="/loader.gif" alt="Loading" width={100} height={100} />
            <p>Your order is being processed...</p>
          </div>
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleOrderComplete}>
        <span className="text-black font-bold text-[18px]">Delivery</span>
        <input
          type="text"
          name="email"
          placeholder="Email or mobile phone number"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full"
        />
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full"
        >
          <option value="Pakistan">Pakistan</option>
        </select>
        <input
          type="text"
          name="title"
          placeholder="Name"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border border-gray-200 rounded-md p-2 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border border-gray-200 rounded-md p-2 w-1/2"
          />
          <input
            type="text"
            name="postal"
            placeholder="Postal code"
            value={form.postal}
            onChange={handleChange}
            className="border border-gray-200 rounded-md p-2 w-1/2"
          />
        </div>

        <span className="text-black font-bold text-[18px]">Billing Address</span>
        <div className="flex flex-col gap-2">
          <label>
            <input
              type="radio"
              name="billingAddress"
              value="same"
              onChange={handleBillingAddressChange}
              checked={!isDifferentBillingAddress}
            />
            Same as shipping address
          </label>
          <label>
            <input
              type="radio"
              name="billingAddress"
              value="different"
              onChange={handleBillingAddressChange}
              checked={isDifferentBillingAddress}
            />
            Use a different billing address
          </label>
        </div>

        {isDifferentBillingAddress && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="billingtitle"
              placeholder="Name"
              value={form.billingtitle}
              onChange={handleChange}
              className="border border-gray-200 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="billingAddress"
              placeholder="Address"
              value={form.billingAddress}
              onChange={handleChange}
              className="border border-gray-200 rounded-md p-2 w-full"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="billingCity"
                placeholder="City"
                value={form.billingCity}
                onChange={handleChange}
                className="border border-gray-200 rounded-md p-2 w-1/2"
              />
              <input
                type="text"
                name="billingPostalCode"
                placeholder="Postal code"
                value={form.billingPostalCode}
                onChange={handleChange}
                className="border border-gray-200 rounded-md p-2 w-1/2"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-[#5a31f4] p-2 text-white w-full rounded-md"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Checkout;
