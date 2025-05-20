import { client } from "./api";

// ------------------- GET TRENDING PRODUCTS -------------------
export const GET_TRENDING_PRODUCTS_QUERY = `
  query GetTrendingProducts($email: String!, $keywords: [String!]!) {
    getTrendingProducts(email: $email, keywords: $keywords) {
      keywords
      trendingProducts
      error
    }
  }
`;

export interface ClusterResult {
  keywords: string[];
  trendingProducts: string | null;
  error: string | null;
}

export const getTrendingProducts = async (
  email: string,
  keywords: string[]
): Promise<ClusterResult | null> => {
  try {
    const variables = { email, keywords };

    interface GetTrendingProductsResponse {
      getTrendingProducts: ClusterResult;
    }

    const data = await client.request<GetTrendingProductsResponse>(
      GET_TRENDING_PRODUCTS_QUERY,
      variables
    );
    return data.getTrendingProducts;
  } catch (error) {
    console.error("❌ Error fetching trending products:", error);
    return null;
  }
};
