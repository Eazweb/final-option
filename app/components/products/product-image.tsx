"use client";

import React from "react";
import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[productId]/product-details";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="flex-col items-center justify-center h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex max-h-[500px] min-h-[300px] sm:min-h-[400px] relative mb-1 rounded-md">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.name}
          fill
          className="object-contain aspect-square"
        />
      </div>
      <div className="flex items-center justify-center gap-4 cursor-pointer border border-gray-200 h-[4.8rem] w-full max-w-[550px] min-w-[300px] sm:min-w-[400px] rounded-md">
        {product.images.map((image: SelectedImgType) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`relative h-[4.3rem] w-[4.3rem] ml-1 aspect-square rounded border ${
                cartProduct.selectedImg.color === image.color
                  ? "border-teal-300 border-[1.5px]"
                  : "border-gray-200"
              }`}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImage;
