import Container from "@/app/components/container";
import ProductCard from "@/app/components/products/product-card";
import getProducts from "@/actions/get-products";
import NullData from "@/app/components/null-data";

export const dynamic = "force-dynamic";

export default async function Products() {
  const products = await getProducts({});

  if (products.length === 0) {
    return (
      <NullData title="No products available at the moment." />
    );
  }

  return (
    <div className="p-8">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
