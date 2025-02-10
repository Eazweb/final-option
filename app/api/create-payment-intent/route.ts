import Razorpay from "razorpay";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/product-details";
import getCurrentUser from "@/actions/get-current-user";

// Debug log to check if keys are present and their format
console.log("Razorpay Key ID exists:", !!process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key ID format check:", process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test_'));
console.log("Razorpay Secret exists:", !!process.env.RAZORPAY_KEY_SECRET);
console.log("Key lengths:", {
  keyIdLength: process.env.RAZORPAY_KEY_ID?.length,
  secretLength: process.env.RAZORPAY_KEY_SECRET?.length
});

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("Razorpay credentials are not properly configured");
  throw new Error("Razorpay credentials are not properly configured");
}

let razorpayInstance: Razorpay;

try {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("Razorpay instance created successfully");
} catch (error) {
  console.error("Error creating Razorpay instance:", error);
  throw error;
}

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return totalPrice;
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items } = body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: No items in cart" },
        { status: 400 }
      );
    }

    const total = Math.round(calculateOrderAmount(items) * 100);

    try {
      // Log the order creation attempt (without sensitive data)
      console.log("Attempting to create Razorpay order with amount:", total);
      
      const order = await razorpayInstance.orders.create({
        amount: total,
        currency: "INR",
        receipt: `order_${Date.now()}`,
      });

      console.log("Razorpay order created successfully:", order.id);

      // Create order in database
      const dbOrder = await prisma.order.create({
        data: {
          user: { connect: { id: currentUser.id } },
          amount: total,
          currency: "INR",
          status: "pending",
          deliveryStatus: "pending",
          paymentIntentId: order.id,
          products: items,
        },
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (razorpayError: any) {
      console.error("Razorpay Error Details:", {
        statusCode: razorpayError.statusCode,
        errorCode: razorpayError.error?.code,
        description: razorpayError.error?.description,
        message: razorpayError.message
      });
      
      if (razorpayError.statusCode === 401) {
        return NextResponse.json(
          { error: "Payment service configuration error - Invalid API credentials" },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
