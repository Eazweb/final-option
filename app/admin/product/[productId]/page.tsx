import getProductById from '@/actions/get-product-by-id'
import Container from '@/app/components/container';
import { formatPrice } from '@/utils/format-price';
import { productRating } from '@/utils/product-rating';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { MdDone, MdOutlineClose } from 'react-icons/md';
import Status from '@/app/components/status';

const ProductPage = async({ params }: { params: { productId: string } }) => {
  const {productId} = params;
  const product = await getProductById({productId});

  if (!product) {
    return <div className="text-center text-2xl mt-10">Product not found</div>;
  }

  return (
    <div className="p-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="grid grid-cols-2 gap-4 h-fit">
            {product.images.map((image: any, index: number) => (
              <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.image}
                  alt={`${product.name} - ${image.color}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-sm">
                  {image.color}
                </div>
              </div>
            ))}
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center gap-2">
              <Rating value={productRating(product.reviews)} readOnly />
              <span className="text-sm text-gray-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
              ₹{formatPrice(product.price)}
              </div>
              {product.list !== product.price && (
                <div className="text-gray-500 line-through">
                  ₹{formatPrice(product.list)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <Status
                text={product.inStock ? "In stock" : "Out of stock"}
                icon={product.inStock ? MdDone : MdOutlineClose}
                bg={product.inStock ? "bg-teal-600" : "bg-rose-600"}
                color="text-white"
              />
            </div>

            <div>
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>

            <div>
              <span className="font-semibold">Category:</span> {product.category}
            </div>

            <div>
              <span className="font-semibold">Description:</span>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>

            {product.reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {product.reviews.slice(0, 3).map((review: any) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.user.name}</span>
                        <Rating value={review.rating} readOnly size="small" />
                      </div>
                      <p className="text-gray-600 mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
