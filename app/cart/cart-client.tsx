"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/heading";
import Button from "../components/button";
import ItemContent from "./item-content";
import { formatPrice } from "@/utils/format-price";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, cartTotalAmount, handleClearCart } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div
        className="flex justify-center items-center gap-4 sm:gap-8"
        style={{ minHeight: "calc(100vh - 430px)" }}
      >
        <div className="p-4 sm:p-6 border-4 border-slate-700 rounded-full">
          <IoCartOutline size={70} />
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="text-2xl">Your cart is empty</div>
          <div>
            <Link
              href={"/"}
              className="text-slate-500 flex items-center justify gap-1 mt-2 hover:scale-110 active:scale-100 transition"
            >
              <MdArrowBack />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      
      {/* Cart Headers - Hidden on Mobile */}
      <div className="hidden sm:grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>

      <div className="mt-4 sm:mt-0">
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-t-[1.5px] border-slate-200 py-8 flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start w-full sm:w-auto">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">
            Taxes and shipping calculated at checkout
          </p>
          <div className="w-full">
            <Button
              label={currentUser ? "Checkout" : "Login to Checkout"}
              outline={currentUser ? false : true}
              onClick={() => {
                currentUser ? router.push("/checkout") : router.push("/login");
              }}
            />
          </div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2 hover:scale-110 active:scale-100 transition"
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
