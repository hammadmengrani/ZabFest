import React, { useState } from "react";
import AddProduct, { AddProductFormData } from "./AddProduct"; // Make sure you export AddProductFormData from AddProduct.tsx

interface Product {
  id: string;
  title: string;
  store: string;
  price: number;
  salePrice: number;
  category: string;
  imageUrl: string;
  description: string;
}

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProduct(true);
  };

  const handleClose = () => {
    setShowAddProduct(false);
  };

  // This is the new handler to add a product to the list
  const handleAddProduct = (newProductData: AddProductFormData) => {
    // Create a new product object to add
    const newProduct: Product = {
      id: Math.random().toString(36).substring(2, 9), // generate random id
      title: newProductData.title,
      store: newProductData.brand || "Unknown Store",
      price: newProductData.price,
      salePrice: newProductData.sale_price || newProductData.price,
      category: newProductData.category?.join(", ") || "",
      imageUrl: newProductData.image_url || "",
      description: newProductData.description,
    };

    setProducts((prev) => [...prev, newProduct]);
    setShowAddProduct(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product Table</h2>
        <button
          onClick={handleAddProductClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        {!showAddProduct && (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Sale Price</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white text-sm">
                  <td className="px-4 py-2">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {product.title}
                  </td>
                  <td className="px-4 py-2">Rs {product.price}</td>
                  <td className="px-4 py-2 text-green-600">
                    Rs {product.salePrice}
                  </td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {product.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Conditional rendering of AddProduct */}
      {showAddProduct && (
        <AddProduct onAdd={handleAddProduct} onClose={handleClose} />
      )}
    </div>
  );
};

export default Products;
