"use client";

import { truncateText } from "@/utils/truncate-text";
import { formatPrice } from "@/utils/format-price";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import toast from "react-hot-toast";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const defaultImage = "/images/placeholder.jpg";
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const isProductInCart = cartProducts?.find((item) => item.id === data.id);

  const handleAddToCart = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLoading(true);

    const cartProduct = {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      brand: data.brand,
      selectedImg: data.images[0],
      quantity: 1,
      price: data.price,
    };

    handleAddProductToCart(cartProduct);
    toast.success("Product added to cart");
    setIsLoading(false);
  }, [data]);

  return (
    <div className="flex flex-col gap-3 ">
      {/* Image */}
      <div 
        onClick={() => router.push(`/product/${data.id}`)}
        className="aspect-square relative rounded-lg overflow-hidden cursor-pointer"
      >
        <Image
          src={data.images && data.images[0] ? data.images[0].image : defaultImage}
          alt={data.name}
          fill
          className="object-cover hover:scale-105 transition"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <h3 
          onClick={() => router.push(`/product/${data.id}`)}
          className="font-light text-xl md:text-2xl uppercase tracking-wider cursor-pointer hover:text-slate-600 line-clamp-2 "
        >
          {truncateText(data.name)}
        </h3>
        
        <span className="text-sm font-medium text-slate-500">
          {data.brand}
        </span>

        {/* Price and Rating Section */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              ₹{formatPrice(data.price)}
            </span>
            {data.list !== data.price && (
              <span className="text-sm font-medium text-slate-400 line-through">
                ₹{formatPrice(data.list)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <span className="text-sm font-medium">5</span>
            <Star className="h-4 w-4 fill-yellow-500" />
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={!data.inStock || isLoading}
          className={`mt-2 flex items-center justify-center gap-2 ${
            !data.inStock 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-[#a7c957] hover:bg-slate-700'
          } text-white rounded-xl py-2.5 transition`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="text-sm font-medium">
            {!data.inStock 
              ? 'Out of Stock' 
              : isLoading 
                ? 'Adding...' 
                : isProductInCart 
                  ? 'In Cart' 
                  : 'Add to Cart'
            }
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
