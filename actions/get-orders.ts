import prisma from "@/libs/prismadb";

export default async function getOrders(paymentCompleted?: boolean) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      where: paymentCompleted ? {
        status: "complete"
      } : undefined,
      orderBy: {
        createDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch orders");
  }
}
