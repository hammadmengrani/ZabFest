'use client';
import React, { useEffect, useState } from 'react';
import AdBanner from '@/components/common/AdBanner';
import Banner from '@/components/common/Banner';
import Cards from '@/components/common/Cards';
import Categories from '@/components/common/Categories';
import Service from '@/components/common/Service';
import SectionContainer from '@/components/container/SectionContainer';
import { categorys } from '@/data';
import { getAllProducts, ProductType } from '@/graphql/Product';
import { useParams } from 'next/navigation'; // 👈 for dynamic route param

const imageUrls = ["/banner_1.png", "/banner_2.png", "/banner_3.png"];

const Page = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const dynamicCategory = params?.category || 'Shoes'; // default fallback

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(
    (item) => Array.isArray(item.category) && item.category.includes(dynamicCategory)
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SectionContainer className='container mx-auto pt-5 ' childClassName='w-[1400px]'>
        <Service />
      </SectionContainer>

      <Banner images={imageUrls} />

      <SectionContainer className='container mx-auto py-5' childClassName='w-[1400px] '>
        <Categories card={categorys} />
      </SectionContainer>

      <SectionContainer
        title={dynamicCategory}
        className='container mx-auto py-10'
        childClassName='w-[1400px] '
      >
        <Cards
          slicer={4}
          card={filteredProducts}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'
        />
      </SectionContainer>

      <SectionContainer className='container mx-auto py-10' childClassName='w-[1400px] '>
        <AdBanner />
      </SectionContainer>
    </div>
  );
};

export default Page;
