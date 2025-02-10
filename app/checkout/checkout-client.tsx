"use client";

import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import { loadScript } from "@/utils/load-script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutClient = () => {
  const router = useRouter();
  const { cartProducts, handleClearCart, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const initializeRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      setError("Failed to load Razorpay SDK");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!cartProducts || cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Initialize Razorpay first
      const isInitialized = await initializeRazorpay();
      if (!isInitialized) {
        return;
      }

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartProducts }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Failed to create payment order");
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Medimetics",
        description: "Thank you for your purchase",
        handler: async function (response: any) {
          try {
            // Create order in our database
            const createOrderRes = await fetch('/api/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: data.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                products: cartProducts,
                amount: data.amount,
                currency: data.currency
              })
            });

            const orderData = await createOrderRes.json();
            
            if (!createOrderRes.ok) {
              throw new Error(orderData.error || 'Failed to create order');
            }

            handleClearCart();
            setPaymentSuccess(true);
            handleSetPaymentIntent(null);
            toast.success("Payment successful!");
            router.push(`/order/${orderData.id}`);
          } catch (error: any) {
            toast.error("Payment successful but failed to create order. Please contact support.");
            console.error("Order creation error:", error);
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error: any) {
      setError(error.message || "Something went wrong");
      toast.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center text-lg">
          Processing your payment...
        </div>
      )}
      {error && (
        <div className="text-center text-rose-500 mb-4">
          {error}
        </div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center text-xl">
            Payment Successful! Thank you for your purchase.
          </div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
      {!paymentSuccess && cartProducts && cartProducts.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="text-center text-2xl font-bold">
            Total: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0) )}
          </div>
          <Button
            label={loading ? "Processing..." : "Pay now"}
            onClick={handlePayment}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
