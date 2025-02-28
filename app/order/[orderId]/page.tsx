import Container from "@/app/components/container";
import OrderDetails from "./order-details";
import getOrderById from "@/actions/got-order-by-id";
import getUserById from "@/actions/get-user-by-id"; // Import the new function
import NullData from "@/app/components/null-data";
import OrderGrid from "./order-grid";
import OrderReceipt from "./order-receipt";
import getCurrentUser from "@/actions/get-current-user";

interface ItemParams {
  orderId: string;
}

const Order = async ({ params }: { params: ItemParams }) => {
  const order = await getOrderById(params);
  const currentUser = await getCurrentUser();
  
  if (!order) return <NullData title="Order not found" />;
  if (!currentUser) return <NullData title="Unauthorized" />;
  
  // Get user details using the order's userId 
  const userDetails = await getUserById({ userId: order.userId });
  
  if (!userDetails) return <NullData title="User not found" />;
  
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <OrderDetails order={order} />
        <div className="mt-8">
          <OrderReceipt 
            order={order} 
            userEmail={userDetails.email || ""} 
            userName={userDetails.name || "Customer"} 
          />
        </div>
        <div className="mt-12">
          <OrderGrid order={order} />
        </div>
      </div>
    </Container>
  );
};

export default Order;