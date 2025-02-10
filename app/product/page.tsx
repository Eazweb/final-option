import Container from "@/app/components/container";
import ProductCard from "@/app/components/products/product-card";
import getProducts, { IProductParams } from "@/actions/get-products";
import NullData from "@/app/components/null-data";
import { categories } from "@/utils/categories";

export const dynamic = "force-dynamic";

interface ProductsProps {
  searchParams: IProductParams;
}


export default async function Products({ searchParams }: ProductsProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters.' />
    );
  }

  return (
    <div className="p-8">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {products.map((product: any) => {
              return <ProductCard data={product} key={product.id} />;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
