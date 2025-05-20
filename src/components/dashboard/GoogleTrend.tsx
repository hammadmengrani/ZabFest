import { getTrendingProducts } from '@/graphql/trend';
import React, { useEffect, useState } from 'react';
import GoogleTrendsGraph from '../common/GoogleTrendGraph';

interface Product {
  productName: string;
  trend: string;
}

const GoogleTrend: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('storeInfo') || '{}')?.email;
    const categoriesStr = localStorage.getItem('categories');

    if (!email) {
      setError("No email found in localStorage.");
      setLoading(false);
      return;
    }

    if (!categoriesStr) {
      setError("No categories found in localStorage.");
      setLoading(false);
      return;
    }

    let categories: string[] = [];
    try {
      categories = JSON.parse(categoriesStr);
      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error("Categories is empty or not an array");
      }
    } catch {
      setError("Invalid categories data in localStorage.");
      setLoading(false);
      return;
    }

    const fetchTrendingProducts = async () => {
      try {
        // Use categories as keywords
        const keywords = categories;
        const data = await getTrendingProducts(email, keywords);
        console.log("Trending Products Data:", data);

        if (data?.trendingProducts) {
          setTrendingProducts([
            {
              productName: 'Trending Now',
              trend: data.trendingProducts,
            },
          ]);
        } else {
          setError("No trending data found.");
        }
      } catch (err) {
        setError("Failed to fetch trending data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 w-full">
      <h2 className="text-2xl font-bold mb-6">Google Trends</h2>

      <div className="space-y-4">
        {trendingProducts.map((product, index) => (
          <div
            key={index}
            className="bg-white p-4 h-[642px] overflow-y-auto rounded font-light flex flex-col gap-5 text-xl shadow-md border-l-4 border-blue-500"
          >
            <GoogleTrendsGraph data={product.trend} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleTrend;
