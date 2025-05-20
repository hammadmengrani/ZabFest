import Sidebar from "@/components/common/Sidebar";
import Categories from "@/components/common/Categories";
import Cards from "@/components/common/Cards";
import { getAllProducts, ProductType } from "@/graphql/Product";


const Page = async () => {
  const products: ProductType[] = await getAllProducts();
  console.log("Products:", products);

  // Extract unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.flatMap((product) => product.category))
  );

  return (
    <div className="flex w-full flex-row items-start md:gap-10 justify-center py-5 px-5">
      <Sidebar />
      <div className="flex flex-col gap-5 w-full">
        {/* Pass extracted unique categories */}
        {/* <Categories card={uniqueCategories} /> */}
        <Cards
          card={products}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
        />
      </div>
    </div>
  );
};

export default Page;
