export const revalidate = 0;

import Container from "./components/container";
import HomeBanner from "./components/home-banner";
import ProductCard from "./components/products/product-card";
import getProducts, { IProductParams } from "@/actions/get-products";
import NullData from "./components/null-data";
import Problems from "./components/Problems";

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
        <HomeBanner />

          <Problems/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4 sm:gap-8 ">
          {products.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
