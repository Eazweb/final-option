"use client";

import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/button";
import { loadScript } from "@/utils/load-script";
import { formatPrice } from "@/utils/format-price";
import Select from "react-select";
import { countries } from "@/utils/countries";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface AddressData {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface CountryOption {
  value: string;
  label: string;
}

const countryOptions: CountryOption[] = countries.map((country: string) => ({
  value: country.toLowerCase(),
  label: country
}));

const BASE_INTERNATIONAL_RATE = 2850; // Base rate for first 1000 grams in rupees
const ADDITIONAL_RATE_PER_TIER = 1425; // Additional rate per 500g tier in rupees

const CheckoutClient = () => {
  const router = useRouter();
  const { cartProducts, handleClearCart, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState<AddressData>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });


  const totalWeight = cartProducts?.reduce((acc, item) => {
    const weight = parseInt(item.brand.split(' ').pop() || '0');
    if (isNaN(weight)) {
      console.error('Invalid weight for product:', item.brand);
      return acc;
    }
    return acc + (weight * item.quantity);
  }, 0) || 0;

  const totalItems = cartProducts?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Calculate delivery charge based on country and conditions
  const calculateDeliveryCharge = () => {
    if (!address.country) return 50;
    
    if (address.country.toLowerCase() === 'india') {
      return totalItems >= 3 ? 0 : 50;
    } else {
      // International delivery calculation
      if (totalWeight <= 1000) {
        return BASE_INTERNATIONAL_RATE;
      } else {
        // Calculate additional tiers needed beyond the first 1000g
        const additionalWeight = totalWeight - 1000;
        // Calculate number of 500g tiers (ceiling division)
        const additionalTiers = Math.ceil(additionalWeight / 500);
        return BASE_INTERNATIONAL_RATE + (additionalTiers * ADDITIONAL_RATE_PER_TIER);
      }
    }
  };

  const deliveryCharge = calculateDeliveryCharge();
  const subtotal = cartProducts?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const total = subtotal + deliveryCharge;

  const isFormValid = address.line1 && address.city && address.state && 
                     address.postalCode && address.country && address.phone;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (option: CountryOption | null) => {
    setAddress(prev => ({
      ...prev,
      country: option ? option.label : ''
    }));
  };

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

    if (!isFormValid) {
      toast.error("Please fill in all address fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const isInitialized = await initializeRazorpay();
      if (!isInitialized) {
        return;
      }

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: cartProducts,
          deliveryCharge
        }),
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
            const createOrderRes = await fetch('/api/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: data.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                products: cartProducts,
                amount: data.amount,
                currency: data.currency,
                address: {
                  line1: address.line1,
                  line2: address.line2,
                  city: address.city,
                  state: address.state,
                  postalCode: address.postalCode,
                  country: address.country,
                  phone: address.phone
                },
                deliveryCharge: deliveryCharge,
                totalWeight: totalWeight
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
    <div className="w-full max-w-[800px] mx-auto">
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
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-500 border-r-transparent"></div>
            <p className="text-slate-500">Redirecting you to your order...</p>
          </div>
        </div>
      )}
      {!paymentSuccess && cartProducts && cartProducts.length > 0 && (
        <div className="flex flex-col gap-6">
          {/* Address Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 1*</label>
                <input
                  type="text"
                  name="line1"
                  value={address.line1}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  value={address.line2}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City*</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State*</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country*</label>
                <Select
                  value={address.country ? countryOptions.find(option => 
                    option.label.toLowerCase() === address.country.toLowerCase()
                  ) : null}
                  onChange={handleCountryChange}
                  options={countryOptions}
                  className="mt-1"
                  classNamePrefix="select"
                  placeholder="Search for a country..."
                  isClearable
                  isSearchable
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Weight:</span>
                <span>{totalWeight} g</span>
              </div>
            
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">Free Delivery</span>
                  ) : (
                    `₹${formatPrice(deliveryCharge)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>₹{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <Button
            label={loading ? "Processing..." : "Proceed to Payment"}
            onClick={handlePayment}
            disabled={loading || !isFormValid}
          />
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;