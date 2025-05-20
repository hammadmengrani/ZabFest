import { addProduct, AddProductInput } from "@/graphql/Product";
import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AddProductFormData {
  title: string;
  price: number;
  sale_price?: number;
  category: string[]; // <-- changed to string array
  description: string;
  image_url?: string;
  images_files?: File[];

  stock: number; // new field
  sku: string; // new field
  variations?: string[]; // new optional field
}

interface AddProductProps {
  onClose: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onClose }) => {
  const [form, setForm] = useState<AddProductFormData>({
    title: "",
    price: 0,
    sale_price: undefined,
    category: [], // <-- initial empty array
    description: "",
    image_url: "",
    images_files: [],
    stock: 1, // default stock
    sku: "", // initially empty
    variations: [], // initially empty array
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      const categoriesArray = value
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      setForm((f) => ({
        ...f,
        category: categoriesArray,
      }));
    } else if (name === "stock") {
      setForm((f) => ({
        ...f,
        stock: Number(value),
      }));
    } else if (name === "sku") {
      setForm((f) => ({
        ...f,
        sku: value,
      }));
    } else {
      setForm((f) => ({
        ...f,
        [name]:
          name === "price" || name === "sale_price" ? Number(value) : value,
      }));
    }
  };

  // Separate handler for variations (comma separated)
  const handleVariationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const arr = val
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    console.log("Variations array:", arr); // <-- yahan dekhen console pe

    setForm((f) => ({ ...f, variations: arr }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, image_url: e.target.value }));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm((f) => ({ ...f, images_files: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Get brand from localStorage
    const brand = JSON.parse(
      localStorage.getItem("storeInfo") || "{}"
    )?.storeName;
    console.log("✅ Brand from localStorage:", brand);

    // Prepare mutation input
    const input: AddProductInput = {
      title: form.title,
      shortDescription: form.description.slice(0, 100),
      description: form.description,
      price: Math.floor(form.price), // <-- int me convert karo
      salePrice:
        form.sale_price !== undefined
          ? Math.floor(form.sale_price)
          : Math.floor(form.price),
      stock: form.stock,
      sku: form.sku || "sku-" + Date.now(),
      imageUrl: form.image_url || "",
      published: true,
      variations: form.variations || [],
      multiImages: [], // Add images_files handling later if needed
      category: form.category,
      brand,
    };

    try {
      const product = await addProduct(input);
      if (product) {
        toast.success("Product added successfully!");
        onClose();
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      toast.error("Error adding product.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center z-50 p-6">
        <div className="rounded-lg shadow-lg max-w-7xl w-full max-h-full overflow-auto flex gap-4 bg-white">
          <form
            onSubmit={handleSubmit}
            className="w-2/3 p-6 flex flex-col gap-4 overflow-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

            {/* Title */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Title</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
                placeholder="Product title"
              />
            </label>

            {/* Price */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Price</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
                placeholder="Price"
                min={0}
                step={0.01}
              />
            </label>

            {/* Sale Price */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Sale Price</span>
              <input
                type="number"
                name="sale_price"
                value={form.sale_price ?? ""}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                placeholder="Sale Price (optional)"
                min={0}
                step={0.01}
              />
            </label>

            {/* Stock */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Stock</span>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
                min={0}
              />
            </label>

            {/* SKU */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">SKU</span>
              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2"
                placeholder="SKU code"
              />
            </label>

            {/* Variations */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Variations</span>
              <input
                type="text"
                name="variations"
                value={form.variations?.join(", ") || ""}
                onChange={handleVariationsChange}
                onKeyDown={(e) => {
                  // Allow all keys including comma
                  if (e.key === ",") {
                    // Just allow comma, no preventDefault
                    return;
                  }
                }}
                className="border rounded px-3 py-2"
                placeholder="Comma separated variations (optional)"
              />
            </label>

            {/* Category */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Category</span>
              <input
                type="text"
                name="category"
                value={form.category.join(", ")} // <-- array to string
                onChange={handleChange}
                className="border rounded px-3 py-2"
                placeholder="Category (comma separated)"
              />
            </label>

            {/* Description */}
            <label className="flex flex-col">
              <span className="font-semibold mb-1">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border rounded px-3 py-2 resize-y"
                rows={5}
                placeholder="Product description"
              />
            </label>

            <div className="mt-auto flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </form>

          <div className="w-1/3 p-6 flex flex-col gap-6 border-l border-gray-200 overflow-auto">
            <div className="flex flex-col gap-2 border rounded p-4">
              <h3 className="text-lg font-semibold mb-2">
                Upload Image via URL
              </h3>
              <input
                type="text"
                placeholder="Paste image URL here"
                value={form.image_url}
                onChange={handleImageUrlChange}
                className="border rounded px-3 py-2"
              />
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="Preview"
                  className="mt-3 object-contain max-h-40 rounded border"
                />
              )}
            </div>

            {/* You can add multi image upload handling later here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
