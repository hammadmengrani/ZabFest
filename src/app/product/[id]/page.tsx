import React from "react";
import ThumbnailImage from "@/components/common/ThumbnailImage";
import ProductDescription from "@/components/common/ProductDescription";
import { getAllProducts, ProductType } from "@/graphql/Product";

export interface SingleProductProps {
  params: { id: string };
}

const Page = async ({ params }: SingleProductProps) => {
  const id = params.id;

  // Server-side fetching all products (ideally this should be optimized)
  const products: ProductType[] = await getAllProducts();
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="container py-10 text-center text-red-600">No Product Found</div>;

  return (
    <div className="container py-10 w-full mx-auto flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <ThumbnailImage imageUrl={product.imageUrl} multiImages={product.multiImages} />
        <ProductDescription
          id={product.id}
          img={product.multiImages?.[0] || product.imageUrl}
          title={product.title}
          category={product.category}
          description={product.description}
          price={product.price}
          discount={product.salePrice}
        />
      </div>

      {/* Optionally: Product Description Tab or More Details */}
      {/* <Desc desc={product.description}/> */}
    </div>
  );
};

export default Page;
