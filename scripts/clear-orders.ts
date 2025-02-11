import prisma from "@/libs/prismadb";

async function clearOrders() {
  try {
    await prisma.order.deleteMany({});
    console.log('All orders have been deleted');
  } catch (error) {
    console.error('Error deleting orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearOrders(); 