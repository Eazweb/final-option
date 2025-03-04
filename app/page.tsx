export const revalidate = 0;

import Container from "./components/container";
import HomeBanner from "./components/home-banner";
import ProductCard from "./components/products/product-card";
import getProducts, { IProductParams } from "@/actions/get-products";
import NullData from "./components/null-data";
import Problems from "./components/Problems";
import Reviews from "./components/Reviews";
import ResponsiveCarousel from "./components/ResponsiveCarousel";
import Link from "next/link";
import { CompareDemo } from "./components/Compare";
import FadeInWrapper from "./components/FadeInWrapper";
import BeautyComponent from "./components/BeautyComponent";

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
        <FadeInWrapper>
          <ResponsiveCarousel/>
        </FadeInWrapper>

        <FadeInWrapper delay={0.2}>
          <Problems/>
        </FadeInWrapper>

        <FadeInWrapper delay={0.4}>
          <h1 className="text-center text-3xl md:text-4xl font-bold py-5 md:py-8 text-[#a7c957]">Our Products</h1>
          </FadeInWrapper>

        <FadeInWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  gap-4 sm:gap-8 ">
          {products.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
        </FadeInWrapper>
      </Container>

      <FadeInWrapper>
        <section className="mt-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="flex flex-col gap-3 text-center md:text-left max-w-xl">
            <h1 className="text-3xl md:text-6xl font-semibold text-[#a7c957] md:mb-5">
              Hello Pretty Faces!
            </h1>
            <p className="text-xl font-light">
              You can see the difference that our products make and give your skin
              the glow it deserves.
            </p>
            <p className="text-xl font-light">
              Join us on this journey to healthy and radiant skin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/product">
                <button className="px-6 py-2 border-2 border-[#a7c957] text-[#a7c957] rounded-md hover:bg-[#a7c957] hover:text-white transition-colors">
                  Explore Products
                </button>
              </Link>
              <Link href="/about">
                <button className="px-6 py-2 border-2 border-[#a7c957] text-[#a7c957] rounded-md hover:bg-[#a7c957] hover:text-white transition-colors">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <CompareDemo />
        </div>
        </section>
      </FadeInWrapper>

      <FadeInWrapper>
      <BeautyComponent/>
      </FadeInWrapper>

      <FadeInWrapper>
      <Reviews/>
      </FadeInWrapper>

    </div>
  );
}
