import { generateAndStoreImage } from "@/graphql/image";
import React, { useState } from "react";

const Marketing = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To handle any errors
  const [mode, setMode] = useState<"custom_prompt" | "product_name">("custom_prompt");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const storeInfo = JSON.parse(localStorage.getItem("storeInfo") || "{}");

      if (!storeInfo?.email) {
        setError("Store email not found. Please login again.");
        setLoading(false);
        return;
      }

      // Pass mode to the function
      const generatedImage = await generateAndStoreImage(prompt, storeInfo.email, mode);

      if (generatedImage) {
        setImageUrl(generatedImage.imageUrl);
      } else {
        setError("No image returned from server.");
      }
    } catch (error) {
      setError("Failed to generate image. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-5 p-6 bg-white rounded-2xl w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Marketing Image Generator</h2>

      {/* Mode selection buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className={`py-2 px-4 rounded-xl ${
            mode === "custom_prompt"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("custom_prompt")}
        >
          Custom Prompt
        </button>
        <button
          className={`py-2 px-4 rounded-xl ${
            mode === "product_name"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMode("product_name")}
        >
          Preset Example
        </button>
      </div>

      {/* Textarea for prompt input */}
      <textarea
        className="w-full p-4 border rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
        placeholder={
          mode === "custom_prompt"
            ? "Describe your marketing idea..."
            : "Try: 'Modern sneaker ad with vibrant colors and dynamic lighting'"
        }
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {imageUrl && !loading && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
          <img
            src={imageUrl}
            alt="Generated"
            className="rounded-xl border shadow-md h-96 w-96 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Marketing;
