import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/get-current-user";
import { Prisma } from "@prisma/client";

type ProductWithSelectedImg = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: Partial<{
    color: string;
    colorCode: string;
    image: string;
  }>;
  quantity: number;
  price: number;
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { 
      razorpayOrderId, 
      razorpayPaymentId, 
      products, 
      amount, 
      currency,
      address,
      deliveryCharge 
    } = body;

    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !products || !amount || !currency || !address) {
      console.error("Missing required fields:", { razorpayOrderId, razorpayPaymentId, products, amount, currency, address });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate address fields
    if (!address.line1 || !address.city || !address.state || !address.postalCode || !address.country || !address.phone) {
      console.error("Invalid address:", address);
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: amount,
      currency,
      status: "complete",
      deliveryStatus: "pending",
      paymentIntentId: razorpayPaymentId,
      products: products.map((product: ProductWithSelectedImg) => ({
        ...product,
        selectedImg: {
          color: "default",
          colorCode: "#000000",
          image: product.selectedImg?.image || ""
        }
      })),
      address,
      deliveryCharge: parseFloat(deliveryCharge?.toString() || "50")
    } satisfies Prisma.OrderCreateInput;

    try {
      const order = await prisma.order.create({ data: orderData });
      return NextResponse.json(order);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to create order in database" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 