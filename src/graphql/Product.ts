import { client } from "./api";

// ------------------- Types -------------------

export interface AddProductInput {
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice: number;
  stock: number;
  sku: string;
  imageUrl: string;
  published: boolean;
  variations?: string[];
  multiImages?: string[];
  category?: string[];
  brand: string;
}

export interface ProductType {
  id: string;
  title: string;
  price: number;
  stock: number;
  brand: string;
  imageUrl: string;
  salePrice: number
  category?: string[]
  description: string;
}

// ------------------- GraphQL Mutation -------------------

export const ADD_PRODUCT_MUTATION = `
  mutation AddProduct(
    $title: String!,
    $shortDescription: String!,
    $description: String!,
    $price: Int!,           # <-- yahan Float! se Int! kar diya
    $salePrice: Int!,       # <-- yahan bhi Float! se Int! kar diya
    $stock: Int!,
    $sku: String!,
    $imageUrl: String!,
    $published: Boolean!,
    $variations: [String!],
    $multiImages: [String!],
    $category: [String!],
    $brand: String!
  ) {
    addProduct(
      title: $title,
      shortDescription: $shortDescription,
      description: $description,
      price: $price,
      salePrice: $salePrice,
      stock: $stock,
      sku: $sku,
      imageUrl: $imageUrl,
      published: $published,
      variations: $variations,
      multiImages: $multiImages,
      category: $category,
      brand: $brand
    ) {
      id
      title
      price
      stock
      brand
    }
  }
`;


// ------------------- Mutation Function -------------------

export const addProduct = async (
  input: AddProductInput
): Promise<ProductType | null> => {
  try {
    const data = await client.request<{ addProduct: ProductType }>(
      ADD_PRODUCT_MUTATION,
      input
    );
    return data.addProduct;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return null;
  }
};



export const GET_ALL_PRODUCTS_QUERY = `
  query {
    getProducts {
      id
      title
      price
      stock
      category
      imageUrl
      salePrice
      description
      brand
    }
  }
`;

export const getAllProducts = async (): Promise<ProductType[]> => {
  try {
    const data = await client.request<{ getProducts: ProductType[] }>(
      GET_ALL_PRODUCTS_QUERY
    );
    return data.getProducts;
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    return [];
  }
};



export const GET_PRODUCTS_BY_BRAND_QUERY = `
  query GetProductsByBrand($brand: String!) {
    getProductsByBrand(brand: $brand) {
      id
      title
      price
      stock
      imageUrl
      salePrice
      category
      description
      brand
    }
  }
`;

export const getProductsByBrand = async (
  brand: string
): Promise<ProductType[]> => {
  try {
    const data = await client.request<{ getProductsByBrand: ProductType[] }>(
      GET_PRODUCTS_BY_BRAND_QUERY,
      { brand }
    );
    return data.getProductsByBrand;
  } catch (error) {
    console.error("❌ Error fetching products by brand:", error);
    return [];
  }
};
