import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import  getCurrentUser  from "@/actions/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { products, amount, currency, razorpayOrderId, razorpayPaymentId } = body;

    if (!products || !amount || !currency || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: currentUser.id,
        amount,
        currency,
        status: "paid",
        deliveryStatus: "pending",
        paymentIntentId: razorpayPaymentId,
        products: products
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
} 