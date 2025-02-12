export const revalidate = 0;

import Container from "./components/container";
import HomeBanner from "./components/home-banner";
import ProductCard from "./components/products/product-card";
import getProducts, { IProductParams } from "@/actions/get-products";
import NullData from "./components/null-data";
import Problems from "./components/Problems";
import Reviews from "./components/Reviews";
import ResponsiveCarousel from "./components/ResponsiveCarousel";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters.' />
    );
  }

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-2 sm:p-8">
      <Container>
       <ResponsiveCarousel/>

          <Problems/>
          <h1 className="text-center text-2xl md:text-4xl font-semibold py-5 md:py-8 text-[#a7c957]">Our Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4 sm:gap-8 ">
          {products.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
        <Reviews/>
    </div>
  );
}
