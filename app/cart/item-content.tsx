"use client";

import React from "react";
import { CartProductType } from "../product/[productId]/product-details";
import { formatPrice } from "@/utils/format-price";
import Link from "next/link";
import { truncateText } from "@/utils/truncate-text";
import Image from "next/image";
import SetQuantity from "../components/products/set-quantity";
import { useCart } from "@/context/cart-context";
import toast from "react-hot-toast";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
  } = useCart();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      {/* Product Image and Details */}
      <div className="col-span-2 sm:col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between flex-grow max-w-[calc(100%-90px)]">
          <Link href={`/product/${item.id}`} className="font-medium text-sm line-clamp-2 break-words leading-tight">
            {item.name}
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-1">
            <button
              className="text-slate-500 underline"
              onClick={() => {
                handleRemoveProductFromCart(item);
                toast.success("Product removed.");
              }}
            >
              Remove
            </button>
            <div className="sm:hidden text-sm font-medium">
              {formatPrice(item.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Price - Hidden on Mobile */}
      <div className="hidden sm:block justify-self-center">
        {formatPrice(item.price)}
      </div>

      {/* Quantity Controls */}
      <div className="justify-self-start sm:justify-self-center pl-5 sm:pl-0">
        <SetQuantity
          cartMode={true}
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => handleCartQuantityIncrease(item)}
          handleQuantityDecrease={() => handleCartQuantityDecrease(item)}
        />
      </div>

      {/* Total Price */}
      <div className="justify-self-end flex gap-1 font-semibold pr-5 sm:pr-0">
        <span className="flex sm:hidden">Total:</span>
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
