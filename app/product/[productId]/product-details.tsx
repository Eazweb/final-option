"use client";

import { useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { productRating } from "@/utils/product-rating";
import SetColor from "@/app/components/products/set-color";
import SetQuantity from "@/app/components/products/set-quantity";
import Button from "@/app/components/button";
import ProductImage from "@/app/components/products/product-image";
import { useCart } from "@/context/cart-context";
import { MdCheckCircle, MdDone, MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/format-price";
import Status from "@/app/components/status";
interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { cartProducts, handleAddProductToCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value };
      });
    },
    [cartProduct.selectedImg]
  );

  const handleQuantityIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:mt-6">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-1 text-black text-sm md:my-auto">
        <h2 className="text-3xl font-light text-black mb-1 uppercase">
          {product.name}
        </h2>
        {/* <div className="flex items-center gap-2">
          <Rating value={productRating(product.reviews)} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div> */}
        {/* <Horizontal /> */}
       
        {/* <Horizontal /> */}
        <div className="flex flex-wrap justify-between mt-3">
          <div className="flex-col">
            {/* <div className="mb-2">
              <span className="font-semibold">CATEGORY:</span>{" "}
              {product.category}
            </div> */}
            <div className="text-sm px-2 py-1 bg-gray-300">
               {product.brand}
            </div>
          </div>
        </div>
        <Horizontal />

        <div className="flex flex-col gap-1">
          <SetQuantity
            cartProduct={cartProduct}
            handleQuantityIncrease={handleQuantityIncrease}
            handleQuantityDecrease={handleQuantityDecrease}
          />

          <Horizontal />
          
          <div className="md:flex items-center gap-6">
            <div className="flex gap-2 text-3xl text-black font-medium">
              <span>₹</span>
              {formatPrice(product.price * cartProduct.quantity)}
            </div>
            {product.list !== product.price && (
              <div className="flex items-center gap-3">
                <span className="line-through text-2xl font-medium text-gray-400">
                ₹{formatPrice(product.list * cartProduct.quantity)}
                </span>
                <Status
                  text={
                    Math.round(
                      ((product.list - product.price) / product.price) * 100
                    ) + "% OFF"
                  }
                  icon={MdDone}
                  bg="bg-green-600"
                  color="text-white font-medium"
                />
              </div>
            )}
          </div>
          <Horizontal />

          {isProductInCart && (
            <p className="mt-1 text-black flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-500" />
              <span>Product added to cart</span>
            </p>
          )}
          <div className=" mt-3">
            <Button
              label={isProductInCart ? "View cart" : "Add to cart"}
              outline={isProductInCart}
              onClick={() => {
                if (isProductInCart) {
                  router.push("/cart");
                } else {
                  handleAddProductToCart(cartProduct);
                  toast.success("Product added to cart.");
                }
              }}
            />
          </div>
        </div>
        <div className="text-justify mt-5 font-light text-gray-600 text-md">{product.description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;
