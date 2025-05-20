import { fetchRecommendedProducts, Product } from "@/graphql/Recommandation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedProductsList();
  }, []);

  const fetchRecommendedProductsList = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await fetchRecommendedProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      } else {
        console.error("❌ No recommended products found.");
      }
    } catch (error) {
      console.error("❌ Failed to fetch recommended products:", error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    // 🧹 Clear last order when closing popup
    localStorage.removeItem('lastOrder');
    setShowPopup(false);
  };

  const handleProductClick = (productId: string) => {
    // 🧹 Clear last order when clicking a product link
    localStorage.removeItem('lastOrder');
    window.location.href = `/product/${productId}`;
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Recommended Products Based on Your Last Order
            </h2>

            {loading ? (
              <div>Loading...</div>
            ) : products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id} className="mb-4">
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="flex flex-col text-left space-y-1 hover:underline"
                    >
                      <p className="text-lg font-medium">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.category.join(", ")}</p>
                      <p className="text-xl font-semibold mt-1">${product.price}</p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recommended products available.</p>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Popup;
